from pathlib import Path
from io import BytesIO
from datetime import datetime
import base64

import qrcode
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT_DIR = Path(__file__).parent
TEMPLATE_DIR = ROOT_DIR / "certificate_templates"


def generate_certificate_id(program_id: str, enrollment_id: str) -> str:
    """
    Creates a certificate ID using the enrollment ID.
    Example: MIOT-STM32-2026-A4F4E3B0
    """
    year = datetime.now().year

    if program_id == "stm32-embedded":
        code = "STM32"
    elif program_id == "arduino-iot":
        code = "IOT"
    else:
        code = "GEN"

    short_id = enrollment_id.replace("-", "")[:8].upper()

    return f"MIOT-{code}-{year}-{short_id}"


def get_template(program_id: str) -> Path:
    if program_id == "stm32-embedded":
        return TEMPLATE_DIR / "certificate_stm32.png"

    if program_id == "arduino-iot":
        return TEMPLATE_DIR / "certificate_iot.png"

    raise ValueError("Certificate is not available for this program")


def generate_qr_code(certificate_id: str) -> BytesIO:
    verify_url = f"https://makeiot.in/verify/{certificate_id}"

    qr = qrcode.make(verify_url)

    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    buffer.seek(0)

    return buffer


def generate_certificate_pdf(
    student_name: str,
    program_id: str,
    enrollment_id: str,
) -> tuple[bytes, str]:

    template_path = get_template(program_id)

    if not template_path.exists():
        raise FileNotFoundError(
            f"Certificate template not found: {template_path}"
        )

    certificate_id = generate_certificate_id(
        program_id,
        enrollment_id
    )

    issue_date = datetime.now().strftime("%d %B %Y")

    # Read template dimensions
    template = ImageReader(str(template_path))
    image_width, image_height = template.getSize()

    pdf_buffer = BytesIO()

    c = canvas.Canvas(
        pdf_buffer,
        pagesize=(image_width, image_height)
    )

    # Certificate background
    c.drawImage(
        template,
        0,
        0,
        width=image_width,
        height=image_height
    )

    # --------------------------------------------------
    # STUDENT NAME
    # --------------------------------------------------

    c.setFillColorRGB(0.03, 0.12, 0.32)

    # Automatically reduce font for very long names
    if len(student_name) <= 22:
        name_font_size = 72
    elif len(student_name) <= 30:
        name_font_size = 66
    else:
        name_font_size = 60

    c.setFont("Helvetica-Bold", name_font_size)

    c.drawCentredString(
        image_width / 2,
        image_height * 0.555,
        student_name.upper()
    )

# --------------------------------------------------
# ISSUE DATE + CERTIFICATE ID
# --------------------------------------------------

    c.setFillColorRGB(0.03, 0.12, 0.32)
    c.setFont("Helvetica-Bold", 30)

    c.drawString(
        image_width * 0.135,
        image_height * 0.365,
        f"Issued: {issue_date}"
    )

    c.drawString(
        image_width * 0.135,
        image_height * 0.338,
        f"Certificate ID: {certificate_id}"
    )

    # --------------------------------------------------
    # QR CODE
    # --------------------------------------------------

    qr_buffer = generate_qr_code(certificate_id)
    qr_image = ImageReader(qr_buffer)

    qr_size = image_height * 0.140

    qr_x = image_width * 0.750
    qr_y = image_height * 0.325

    c.drawImage(
        qr_image,
        qr_x,
        qr_y,
        width=qr_size,
        height=qr_size,
        preserveAspectRatio=True,
        mask="auto"
    )

    c.setFont("Helvetica-Bold", 22)

    c.drawCentredString(
        qr_x + qr_size / 2,
        qr_y - 12,
        "VERIFIED"
    )
    c.save()

    pdf_buffer.seek(0)

    return pdf_buffer.getvalue(), certificate_id


def generate_certificate_base64(
    student_name: str,
    program_id: str,
    enrollment_id: str,
) -> tuple[str, str]:

    pdf_bytes, certificate_id = generate_certificate_pdf(
        student_name=student_name,
        program_id=program_id,
        enrollment_id=enrollment_id,
    )

    encoded = base64.b64encode(pdf_bytes).decode("utf-8")

    return encoded, certificate_id