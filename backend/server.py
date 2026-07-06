from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Cookie, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hmac
import hashlib
import uuid
import jwt
import asyncio
import razorpay
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
from datetime import datetime, timezone, timedelta

from offer_letter import generate_offer_letter_pdf, generate_offer_letter_base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay
RZP_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RZP_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')
RZP_ENABLED = bool(RZP_KEY_ID and RZP_KEY_SECRET and not RZP_KEY_ID.startswith('rzp_test_MOCK'))
rzp_client = razorpay.Client(auth=(RZP_KEY_ID, RZP_KEY_SECRET)) if RZP_ENABLED else None

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
REPLY_TO_EMAIL = os.environ.get('REPLY_TO_EMAIL', SENDER_EMAIL)
SENDER_NAME = os.environ.get('SENDER_NAME', 'Make IoT')
FRONTEND_URL = os.environ.get('FRONTEND_URL', '')
resend.api_key = RESEND_API_KEY
EMAIL_ENABLED = bool(RESEND_API_KEY)

# Admin & referral
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@makeiot.in')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'MakeIoT@2026')
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
JWT_ALGO = 'HS256'
REFERRAL_DISCOUNT_INR = int(os.environ.get('REFERRAL_DISCOUNT_INR', '200'))

app = FastAPI()
api_router = APIRouter(prefix="/api")


# --------- Programs ---------
class ProgramInfo(BaseModel):
    id: str
    name: str
    amount_inr: int
    mode: Literal['online', 'offline']
    description: str


PROGRAMS = {
    "arduino-iot": ProgramInfo(id="arduino-iot", name="Arduino & IoT (Online)", amount_inr=999, mode="online",
                               description="4-Week hands-on Arduino & IoT internship"),
    "stm32-embedded": ProgramInfo(id="stm32-embedded", name="Embedded System with STM32 (Online)", amount_inr=1499, mode="online",
                                  description="ARM Cortex-M4 STM32 embedded systems internship"),
    "offline-pune": ProgramInfo(id="offline-pune", name="Offline Internship — Hinjawadi, Pune", amount_inr=2999, mode="offline",
                                description="Offline internship at Hinjawadi Phase II, Pune"),
}


# --------- Models ---------
class EnrollmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    program_id: str
    college: Optional[str] = None
    message: Optional[str] = None
    referral_code: Optional[str] = None  # code applied at checkout


class Enrollment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    program_id: str
    program_name: str
    base_amount_inr: int
    discount_inr: int = 0
    amount_inr: int  # final amount to pay
    college: Optional[str] = None
    message: Optional[str] = None
    payment_status: Literal['pending', 'paid', 'failed'] = 'pending'
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    referral_code_used: Optional[str] = None  # code they entered at checkout (someone else's)
    referral_code_own: Optional[str] = None   # unique code assigned to THIS enrollment after paid
    credits_earned_inr: int = 0
    email_sent: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class CreateOrderRequest(BaseModel):
    enrollment_id: str


class VerifyPaymentRequest(BaseModel):
    enrollment_id: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class CallbackRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None


class ValidateReferralRequest(BaseModel):
    code: str
    program_id: str


class CourseContent(BaseModel):
    program_id: str
    course_link: str = ""
    coupon_code: str = ""
    whatsapp_group_link: str = ""
    welcome_note: str = ""


# --------- Helpers ---------
def make_jwt(email: str) -> str:
    payload = {"sub": email, "role": "admin",
               "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def require_admin(
    authorization: Optional[str] = Header(None),
    session: Optional[str] = Cookie(default=None, alias="mk_admin_session"),
):
    data: Optional[dict] = None
    token: Optional[str] = None
    if session:
        token = session
    elif authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]
    if not token:
        raise HTTPException(status_code=401, detail="Missing auth")
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    if data is None or data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return data


def generate_referral_code(name: str) -> str:
    base = ''.join([c for c in name.upper() if c.isalpha()])[:4] or "USER"
    return f"MK-{base}-{uuid.uuid4().hex[:4].upper()}"


async def get_course_content(program_id: str) -> CourseContent:
    doc = await db.course_content.find_one({"program_id": program_id}, {"_id": 0})
    if doc:
        return CourseContent(**doc)
    return CourseContent(program_id=program_id)


def build_confirmation_email(enrollment: dict, content: CourseContent) -> tuple[str, str]:
    ref = enrollment.get("referral_code_own") or ""
    share_url = f"{FRONTEND_URL}?ref={ref}" if ref else FRONTEND_URL
    first_name = enrollment["name"].split(" ")[0]
    batch = datetime.now().strftime("%B %Y")

    program_meta = {
        "arduino-iot": ("Academic Internship", "Online Self Paced", "4 weeks",
                        "Internet of Things with Arduino and ESP32"),
        "stm32-embedded": ("Academic Internship", "Online Self Paced", "4 weeks",
                            "Embedded Systems with STM32 (ARM Cortex-M4)"),
        "offline-pune": ("Academic Internship", "Offline · Hinjawadi Pune", "4 weeks",
                          "Embedded Systems, IoT and PCB Design"),
    }
    itype, mode, duration, domain = program_meta.get(
        enrollment["program_id"], program_meta["arduino-iot"]
    )

    # Build the single course access section
    course_cta = ""
    if content.course_link:
        link = content.course_link
        if content.coupon_code and "couponCode=" not in link and "coupon=" not in link:
            sep = "&" if "?" in link else "?"
            link = f"{link}{sep}couponCode={content.coupon_code}"
        course_cta = f"""
        <tr><td style="padding:8px 32px 20px">
          <a href="{link}" style="display:inline-block;background:#0055FF;color:#fff;padding:14px 26px;border-radius:8px;font-weight:700;text-decoration:none;font-size:15px">🚀 Start My Course</a>
          <div style="margin-top:8px;font-size:12px;color:#64748B">Coupon is already applied — course opens as free.</div>
        </td></tr>
        """

    wa_line = ""
    if content.whatsapp_group_link:
        wa_line = f"""
        <tr><td style="padding:0 32px 18px;font-size:14px;color:#334155">
          💬 <strong>Batch WhatsApp group:</strong>
          <a href="{content.whatsapp_group_link}" style="color:#0055FF;text-decoration:none">Join here</a>
        </td></tr>
        """

    referral_line = f"""
    <tr><td style="padding:0 32px 18px;font-size:14px;color:#334155">
      🎁 <strong>Refer a friend, earn ₹{REFERRAL_DISCOUNT_INR}:</strong>
      share code <span style="font-family:Menlo,monospace;background:#F97316;color:#fff;padding:2px 8px;border-radius:4px;font-weight:700;letter-spacing:1px">{ref}</span>
      · <a href="https://wa.me/?text=Hey!%20Enrolled%20at%20Make%20IoT.%20Use%20code%20{ref}%20for%20%E2%82%B9{REFERRAL_DISCOUNT_INR}%20off%20-%20{share_url}" style="color:#25D366;font-weight:600;text-decoration:none">Share on WhatsApp →</a>
    </td></tr>
    """ if ref else ""

    subject = f"🎉 Welcome to Make IoT — {itype} confirmed"
    html = f"""
    <div style="background:#F1F5F9;padding:24px 0;font-family:Arial,sans-serif;color:#1F2937">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(15,23,42,0.08)">
        <tr><td style="background:#0055FF;padding:22px 32px;color:#fff">
          <div style="font-family:'Outfit',Arial,sans-serif;font-weight:800;font-size:22px">Make IoT</div>
          <div style="font-size:11px;letter-spacing:2px;opacity:0.85;font-family:Menlo,monospace">EMPOWERING THE FUTURE</div>
        </td></tr>

        <tr><td style="padding:26px 32px 8px">
          <div style="font-family:'Outfit',Arial,sans-serif;font-weight:800;font-size:22px;color:#0F172A">🎉 Welcome, {first_name}!</div>
          <p style="margin:8px 0 0;color:#334155;line-height:1.55;font-size:14.5px">
            Your <strong>{itype}</strong> at Make IoT is confirmed. Your offer letter is <strong>attached to this email</strong> — click below to start learning right away.
          </p>
        </td></tr>

        {course_cta}

        <tr><td style="padding:0 32px 16px">
          <table role="presentation" cellpadding="4" style="font-family:Arial,sans-serif;font-size:13.5px;color:#1F2937">
            <tr><td style="color:#64748B;padding-right:18px">Domain</td><td><strong>{domain}</strong></td></tr>
            <tr><td style="color:#64748B;padding-right:18px">Duration</td><td><strong>{duration}</strong> · {mode}</td></tr>
            <tr><td style="color:#64748B;padding-right:18px">Batch</td><td><strong>{batch}</strong></td></tr>
            <tr><td style="color:#64748B;padding-right:18px">Amount Paid</td><td><strong>₹{enrollment['amount_inr']}</strong></td></tr>
          </table>
        </td></tr>

        {wa_line}
        {referral_line}

        <tr><td style="padding:6px 32px 22px;font-size:13px;color:#64748B;line-height:1.55">
          For any questions, WhatsApp us at <a href="https://wa.me/918856905687" style="color:#0055FF;text-decoration:none">+91 88569 05687</a>.
          <br/>Please do not share the course link with others.
        </td></tr>

        <tr><td style="padding:0 32px 24px;font-size:14px;color:#334155">
          Best regards,<br/>
          <strong style="color:#F97316">Omkar Bhagat</strong><br/>
          <span style="color:#64748B;font-size:12.5px">Founder · Make IoT · <a href="https://makeiot.in" style="color:#0055FF;text-decoration:none">makeiot.in</a></span>
        </td></tr>

        <tr><td style="background:#0A0F1C;color:#94A3B8;padding:12px 32px;font-size:11px;text-align:center">
          © {datetime.now().year} Make IoT · Hinjawadi Phase II, Pune
        </td></tr>
      </table>
    </div>
    """
    return subject, html


async def send_confirmation_email(enrollment: dict):
    if not EMAIL_ENABLED:
        return
    content = await get_course_content(enrollment["program_id"])
    subject, html = build_confirmation_email(enrollment, content)

    async def _send(from_addr: str):
        pdf_b64 = generate_offer_letter_base64(
            student_name=enrollment["name"],
            program_id=enrollment["program_id"],
            college=enrollment.get("college"),
        )
        safe_name = "".join(ch for ch in enrollment["name"] if ch.isalnum() or ch in "-_ ").strip().replace(" ", "_") or "Student"
        params = {
            "from": from_addr,
            "to": [enrollment["email"]],
            "subject": subject,
            "html": html,
            "reply_to": [REPLY_TO_EMAIL],
            "attachments": [{
                "filename": f"Offer_Letter_{safe_name}.pdf",
                "content": pdf_b64,
            }],
        }
        return await asyncio.to_thread(resend.Emails.send, params)

    used_fallback = False
    try:
        result = await _send(f"{SENDER_NAME} <{SENDER_EMAIL}>")
    except Exception as e:  # noqa: BLE001
        err_msg = str(e).lower()
        if "not verified" in err_msg or "domain" in err_msg:
            logging.warning("Primary sender rejected (%s); falling back to onboarding@resend.dev", e)
            try:
                result = await _send(f"{SENDER_NAME} <onboarding@resend.dev>")
                used_fallback = True
            except Exception as e2:  # noqa: BLE001
                logging.exception("Fallback email send also failed: %s", e2)
                return
        else:
            logging.exception("Failed to send confirmation email: %s", e)
            return

    await db.enrollments.update_one(
        {"id": enrollment["id"]},
        {"$set": {"email_sent": True,
                  "email_id": result.get("id"),
                  "email_via_fallback": used_fallback}},
    )


async def credit_referrer_if_any(enrollment: dict):
    ref = enrollment.get("referral_code_used")
    if not ref:
        return
    # Find the enrollment that owns this referral code
    referrer = await db.enrollments.find_one({"referral_code_own": ref}, {"_id": 0})
    if not referrer:
        return
    # Don't self-refer
    if referrer["email"].lower() == enrollment["email"].lower():
        return
    await db.enrollments.update_one(
        {"id": referrer["id"]},
        {"$inc": {"credits_earned_inr": REFERRAL_DISCOUNT_INR}},
    )
    await db.referrals.insert_one({
        "id": str(uuid.uuid4()),
        "referrer_enrollment_id": referrer["id"],
        "referrer_email": referrer["email"],
        "referrer_name": referrer["name"],
        "referrer_code": ref,
        "referred_enrollment_id": enrollment["id"],
        "referred_email": enrollment["email"],
        "referred_name": enrollment["name"],
        "credit_amount_inr": REFERRAL_DISCOUNT_INR,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })


async def finalise_paid_enrollment(enrollment_id: str, razorpay_payment_id: Optional[str] = None,
                                   razorpay_order_id: Optional[str] = None):
    """Runs after payment is confirmed: assign referral code, credit referrer, email."""
    update = {"payment_status": "paid"}
    if razorpay_payment_id:
        update["razorpay_payment_id"] = razorpay_payment_id
    if razorpay_order_id:
        update["razorpay_order_id"] = razorpay_order_id

    enrollment = await db.enrollments.find_one({"id": enrollment_id}, {"_id": 0})
    if not enrollment:
        return None
    if not enrollment.get("referral_code_own"):
        update["referral_code_own"] = generate_referral_code(enrollment["name"])
    await db.enrollments.update_one({"id": enrollment_id}, {"$set": update})
    enrollment = await db.enrollments.find_one({"id": enrollment_id}, {"_id": 0})
    await credit_referrer_if_any(enrollment)
    await send_confirmation_email(enrollment)
    return enrollment


# --------- Routes ---------
@api_router.get("/")
async def root():
    return {"message": "MakeIoT API is live",
            "razorpay_enabled": RZP_ENABLED,
            "email_enabled": EMAIL_ENABLED}


@api_router.get("/programs", response_model=List[ProgramInfo])
async def list_programs():
    return list(PROGRAMS.values())


@api_router.post("/referrals/validate")
async def validate_referral(payload: ValidateReferralRequest):
    program = PROGRAMS.get(payload.program_id)
    if not program:
        raise HTTPException(status_code=400, detail="Invalid program_id")
    code = payload.code.strip().upper()
    referrer = await db.enrollments.find_one(
        {"referral_code_own": code, "payment_status": "paid"}, {"_id": 0}
    )
    if not referrer:
        raise HTTPException(status_code=404, detail="Referral code not found or inactive")
    return {
        "valid": True,
        "code": code,
        "referrer_name": referrer["name"].split(" ")[0],
        "discount_inr": REFERRAL_DISCOUNT_INR,
        "base_amount_inr": program.amount_inr,
        "final_amount_inr": max(program.amount_inr - REFERRAL_DISCOUNT_INR, 0),
    }


@api_router.post("/enrollments", response_model=Enrollment)
async def create_enrollment(payload: EnrollmentCreate):
    program = PROGRAMS.get(payload.program_id)
    if not program:
        raise HTTPException(status_code=400, detail="Invalid program_id")

    discount = 0
    ref_code_used = None
    if payload.referral_code:
        code = payload.referral_code.strip().upper()
        referrer = await db.enrollments.find_one(
            {"referral_code_own": code, "payment_status": "paid"}, {"_id": 0}
        )
        if referrer and referrer["email"].lower() != payload.email.lower():
            discount = REFERRAL_DISCOUNT_INR
            ref_code_used = code

    final_amount = max(program.amount_inr - discount, 0)
    obj = Enrollment(
        name=payload.name, email=payload.email, phone=payload.phone,
        program_id=program.id, program_name=program.name,
        base_amount_inr=program.amount_inr,
        discount_inr=discount,
        amount_inr=final_amount,
        college=payload.college, message=payload.message,
        referral_code_used=ref_code_used,
    )
    await db.enrollments.insert_one(obj.model_dump())
    return obj


@api_router.post("/callbacks")
async def request_callback(payload: CallbackRequest):
    doc = {"id": str(uuid.uuid4()), "name": payload.name, "phone": payload.phone,
           "email": payload.email, "created_at": datetime.now(timezone.utc).isoformat()}
    await db.callbacks.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.post("/razorpay/create-order")
async def create_order(payload: CreateOrderRequest):
    enrollment = await db.enrollments.find_one({"id": payload.enrollment_id}, {"_id": 0})
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    amount_paise = enrollment["amount_inr"] * 100
    receipt = f"mk_{enrollment['id'][:20]}"

    if RZP_ENABLED:
        order = rzp_client.order.create({
            "amount": amount_paise, "currency": "INR", "receipt": receipt,
            "payment_capture": 1,
        })
        await db.enrollments.update_one(
            {"id": enrollment["id"]},
            {"$set": {"razorpay_order_id": order["id"]}},
        )
        return {"order_id": order["id"], "amount": amount_paise, "currency": "INR",
                "key_id": RZP_KEY_ID, "is_mocked": False}
    mock_order_id = f"order_MOCK_{uuid.uuid4().hex[:16]}"
    await db.enrollments.update_one(
        {"id": enrollment["id"]},
        {"$set": {"razorpay_order_id": mock_order_id}},
    )
    return {"order_id": mock_order_id, "amount": amount_paise, "currency": "INR",
            "key_id": "rzp_test_MOCK", "is_mocked": True}


@api_router.post("/razorpay/verify")
async def verify_payment(payload: VerifyPaymentRequest):
    enrollment = await db.enrollments.find_one({"id": payload.enrollment_id}, {"_id": 0})
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    if RZP_ENABLED:
        body = f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode()
        expected = hmac.new(RZP_KEY_SECRET.encode(), body, hashlib.sha256).hexdigest()
        if not hmac.compare_digest(expected, payload.razorpay_signature):
            await db.enrollments.update_one({"id": enrollment["id"]},
                                            {"$set": {"payment_status": "failed"}})
            raise HTTPException(status_code=400, detail="Invalid payment signature")

    final = await finalise_paid_enrollment(
        enrollment["id"],
        razorpay_payment_id=payload.razorpay_payment_id,
        razorpay_order_id=payload.razorpay_order_id,
    )
    return {"ok": True, "status": "paid",
            "referral_code": final.get("referral_code_own") if final else None}


@api_router.post("/razorpay/mock-pay")
async def mock_pay(payload: CreateOrderRequest):
    if RZP_ENABLED:
        raise HTTPException(status_code=400, detail="Real Razorpay is enabled; use /verify")
    enrollment = await db.enrollments.find_one({"id": payload.enrollment_id}, {"_id": 0})
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    fake_pid = f"pay_MOCK_{uuid.uuid4().hex[:16]}"
    final = await finalise_paid_enrollment(enrollment["id"], razorpay_payment_id=fake_pid)
    return {"ok": True, "status": "paid",
            "referral_code": final.get("referral_code_own") if final else None,
            "is_mocked": True}


@api_router.get("/enrollments/{enrollment_id}")
async def get_enrollment(enrollment_id: str):
    e = await db.enrollments.find_one({"id": enrollment_id}, {"_id": 0})
    if not e:
        raise HTTPException(status_code=404, detail="Not found")
    return e


# --------- Admin ---------
COOKIE_NAME = "mk_admin_session"
COOKIE_MAX_AGE = 12 * 60 * 60  # 12 hours


def _set_session_cookie(response: Response, token: str):
    response.set_cookie(
        key=COOKIE_NAME, value=token, max_age=COOKIE_MAX_AGE,
        httponly=True, secure=True, samesite="none", path="/",
    )


@api_router.post("/admin/login")
async def admin_login(payload: AdminLoginRequest, response: Response):
    if payload.email.lower() != ADMIN_EMAIL.lower() or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = make_jwt(payload.email)
    _set_session_cookie(response, token)
    # Also return the token for backwards compatibility with existing clients.
    return {"token": token, "email": payload.email}


@api_router.post("/admin/logout")
async def admin_logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME, path="/", samesite="none", secure=True)
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(current: dict = Depends(require_admin)):
    return {"email": current.get("sub"), "role": current.get("role")}


class ResetDataRequest(BaseModel):
    confirm: str  # must be exactly "DELETE ALL"
    scopes: List[Literal['enrollments', 'callbacks', 'referrals']]


@api_router.post("/admin/reset-data")
async def reset_data(payload: ResetDataRequest, _: dict = Depends(require_admin)):
    if payload.confirm != "DELETE ALL":
        raise HTTPException(status_code=400, detail="Confirmation phrase mismatch")
    result = {}
    if 'enrollments' in payload.scopes:
        r = await db.enrollments.delete_many({})
        result['enrollments_deleted'] = r.deleted_count
    if 'callbacks' in payload.scopes:
        r = await db.callbacks.delete_many({})
        result['callbacks_deleted'] = r.deleted_count
    if 'referrals' in payload.scopes:
        r = await db.referrals.delete_many({})
        result['referrals_deleted'] = r.deleted_count
    return {"ok": True, **result}


@api_router.get("/admin/enrollments")
async def list_enrollments(_: dict = Depends(require_admin)):
    return await db.enrollments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.get("/admin/callbacks")
async def list_callbacks(_: dict = Depends(require_admin)):
    return await db.callbacks.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.get("/admin/stats")
async def admin_stats(_: dict = Depends(require_admin)):
    total = await db.enrollments.count_documents({})
    paid = await db.enrollments.count_documents({"payment_status": "paid"})
    pending = await db.enrollments.count_documents({"payment_status": "pending"})
    cb = await db.callbacks.count_documents({})
    paid_docs = await db.enrollments.find({"payment_status": "paid"},
                                          {"_id": 0, "amount_inr": 1, "credits_earned_inr": 1}
                                          ).to_list(10000)
    revenue = sum(d.get("amount_inr", 0) for d in paid_docs)
    outstanding_credits = sum(d.get("credits_earned_inr", 0) for d in paid_docs)
    referrals = await db.referrals.count_documents({})
    return {"total_enrollments": total, "paid": paid, "pending": pending,
            "callback_requests": cb, "revenue_inr": revenue,
            "referrals_count": referrals,
            "outstanding_credits_inr": outstanding_credits}


@api_router.get("/admin/referrals")
async def admin_referrals(_: dict = Depends(require_admin)):
    return await db.referrals.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.get("/admin/top-referrers")
async def top_referrers(_: dict = Depends(require_admin)):
    cursor = db.enrollments.find(
        {"credits_earned_inr": {"$gt": 0}},
        {"_id": 0, "id": 1, "name": 1, "email": 1, "phone": 1,
         "referral_code_own": 1, "credits_earned_inr": 1},
    ).sort("credits_earned_inr", -1)
    return await cursor.to_list(500)


@api_router.get("/admin/course-content")
async def list_course_content(_: dict = Depends(require_admin)):
    docs = await db.course_content.find({}, {"_id": 0}).to_list(100)
    by_id = {d["program_id"]: d for d in docs}
    result = []
    for pid in PROGRAMS:
        item = by_id.get(pid) or {"program_id": pid, "course_link": "",
                                   "coupon_code": "", "whatsapp_group_link": "",
                                   "welcome_note": ""}
        item["program_name"] = PROGRAMS[pid].name
        item["program_amount_inr"] = PROGRAMS[pid].amount_inr
        result.append(item)
    return result


@api_router.put("/admin/course-content/{program_id}")
async def upsert_course_content(program_id: str, payload: CourseContent,
                                _: dict = Depends(require_admin)):
    if program_id not in PROGRAMS:
        raise HTTPException(status_code=400, detail="Invalid program_id")
    doc = payload.model_dump()
    doc["program_id"] = program_id
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.course_content.update_one({"program_id": program_id},
                                        {"$set": doc}, upsert=True)
    return {"ok": True}


class ResendEmailRequest(BaseModel):
    enrollment_id: str


@api_router.post("/admin/resend-email")
async def resend_email(payload: ResendEmailRequest, _: dict = Depends(require_admin)):
    e = await db.enrollments.find_one({"id": payload.enrollment_id}, {"_id": 0})
    if not e:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    await send_confirmation_email(e)
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware, allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()],
    allow_methods=["*"], allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
