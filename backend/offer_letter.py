"""Generate a clean, business-letter style personalised offer letter PDF."""
from __future__ import annotations

import base64
import io
from datetime import datetime
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

ORANGE = HexColor("#F97316")
BLACK = HexColor("#111111")
GREY = HexColor("#555555")
LIGHT = HexColor("#E5E7EB")

LOGO_PATH = Path("/app/frontend/public/assets/logo.png")

PROGRAM_META = {
    "arduino-iot": {
        "type": "Academic Internship",
        "mode": "Online Self Paced",
        "duration": "4 weeks",
        "domain": "Internet of Things with Arduino and ESP32",
    },
    "stm32-embedded": {
        "type": "Academic Internship",
        "mode": "Online Self Paced",
        "duration": "4 weeks",
        "domain": "Embedded Systems with STM32 (ARM Cortex-M4)",
    },
    "offline-pune": {
        "type": "Academic Internship",
        "mode": "Offline (Hinjawadi, Pune)",
        "duration": "4 weeks",
        "domain": "Embedded Systems, IoT and PCB Design",
    },
}


def _current_batch() -> str:
    return datetime.now().strftime("%B %Y")


def _draw_paragraph(c: canvas.Canvas, text: str, x: float, y: float,
                    max_width: float, font: str = "Helvetica",
                    size: float = 10.5, leading: float = 14) -> float:
    c.setFont(font, size)
    words = text.split()
    line = ""
    yy = y
    for w in words:
        candidate = (line + " " + w).strip()
        if c.stringWidth(candidate, font, size) < max_width:
            line = candidate
        else:
            c.drawString(x, yy, line)
            yy -= leading
            line = w
    if line:
        c.drawString(x, yy, line)
        yy -= leading
    return yy


def generate_offer_letter_pdf(*, student_name: str, program_id: str,
                              college: str | None = None,
                              offer_date: datetime | None = None) -> bytes:
    meta = PROGRAM_META.get(program_id, PROGRAM_META["arduino-iot"])
    offer_date = offer_date or datetime.now()

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    width, height = A4
    margin_x = 20 * mm
    content_w = width - 2 * margin_x

    # ---------- Header ----------
    header_top = height - 20 * mm
    if LOGO_PATH.exists():
        try:
            c.drawImage(ImageReader(str(LOGO_PATH)), margin_x, header_top - 18 * mm,
                        width=40 * mm, height=20 * mm,
                        preserveAspectRatio=True, mask="auto")
        except Exception:
            pass

    # Right-aligned address
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(width - margin_x, header_top - 2 * mm, "Make IoT")
    c.setFillColor(GREY)
    c.setFont("Helvetica", 9)
    right_lines = [
        "Gera Imperium Rise, Hinjawadi Phase II",
        "Pune, Maharashtra 411057, India",
        "hello@makeiot.in  ·  +91 88569 05687",
        "makeiot.in",
    ]
    yy = header_top - 7 * mm
    for line in right_lines:
        c.drawRightString(width - margin_x, yy, line)
        yy -= 4.2 * mm

    # Thin divider
    c.setStrokeColor(LIGHT)
    c.setLineWidth(0.6)
    c.line(margin_x, header_top - 26 * mm, width - margin_x, header_top - 26 * mm)

    # ---------- Date ----------
    cursor = header_top - 34 * mm
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 10)
    c.drawString(margin_x, cursor, f"Date: {offer_date.strftime('%d %B %Y')}")

    # ---------- Title ----------
    cursor -= 18 * mm
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(margin_x, cursor, "Internship Offer Letter")
    # Orange underline
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    c.line(margin_x, cursor - 3 * mm, margin_x + 55 * mm, cursor - 3 * mm)

    # ---------- Salutation ----------
    cursor -= 14 * mm
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 11)
    c.drawString(margin_x, cursor, f"Dear {student_name},")

    # ---------- Body 1 ----------
    cursor -= 8 * mm
    body1 = (
        f"We are pleased to inform you that you have been accepted for an "
        f"{meta['type']} at Make IoT in the domain of {meta['domain']}. "
        f"We warmly welcome you to the Make IoT family."
    )
    cursor = _draw_paragraph(c, body1, margin_x, cursor, content_w, size=10.5, leading=14)

    # ---------- Details (plain lines) ----------
    cursor -= 6 * mm
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin_x, cursor, "Internship Details")
    cursor -= 6 * mm

    details = [
        ("Internship Type", meta["type"]),
        ("Mode", meta["mode"]),
        ("Duration", meta["duration"]),
        ("Domain", meta["domain"]),
        ("Batch", _current_batch()),
    ]
    if college:
        details.append(("Institute", college))

    for label, value in details:
        c.setFillColor(GREY)
        c.setFont("Helvetica", 10)
        c.drawString(margin_x, cursor, f"{label}:")
        c.setFillColor(BLACK)
        c.setFont("Helvetica", 10.5)
        c.drawString(margin_x + 40 * mm, cursor, value)
        cursor -= 6 * mm

    # ---------- Nature of Work ----------
    cursor -= 4 * mm
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin_x, cursor, "Scope of Work")
    cursor -= 6 * mm
    c.setFont("Helvetica", 10.5)
    tasks = [
        "Structured technical training on the assigned domain",
        "Assignment-based learning and self-study",
        "Project implementation and hands-on practice",
        "Internship documentation and progress reporting",
    ]
    for i, t in enumerate(tasks, 1):
        c.setFillColor(GREY)
        c.drawString(margin_x, cursor, f"{i}.")
        c.setFillColor(BLACK)
        c.drawString(margin_x + 6 * mm, cursor, t)
        cursor -= 5.5 * mm

    # ---------- Closing ----------
    cursor -= 4 * mm
    closing = (
        "You are expected to actively participate in the assigned modules, "
        "complete all assignments, and submit the project deliverables within "
        "the internship duration. Upon successful completion of the internship "
        "requirements, an Internship Completion Certificate will be issued."
    )
    cursor = _draw_paragraph(c, closing, margin_x, cursor, content_w, size=10.5, leading=14)

    cursor -= 8 * mm
    c.setFont("Helvetica", 10.5)
    c.drawString(margin_x, cursor, "We wish you a productive learning experience with Make IoT.")

    # ---------- Signature ----------
    sig_y = max(cursor - 22 * mm, 45 * mm)
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 10.5)
    c.drawString(margin_x, sig_y + 12 * mm, "Best regards,")
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-BoldOblique", 15)
    c.drawString(margin_x, sig_y + 4 * mm, "Omkar Bhagat")
    c.setStrokeColor(LIGHT)
    c.setLineWidth(0.5)
    c.line(margin_x, sig_y, margin_x + 55 * mm, sig_y)
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin_x, sig_y - 5 * mm, "Omkar Bhagat")
    c.setFillColor(GREY)
    c.setFont("Helvetica", 9)
    c.drawString(margin_x, sig_y - 10 * mm, "Founder, Make IoT")

    # ---------- Footer ----------
    c.setStrokeColor(LIGHT)
    c.line(margin_x, 18 * mm, width - margin_x, 18 * mm)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8.5)
    c.drawString(margin_x, 12 * mm, "Make IoT · Empowering the Future")
    c.drawRightString(width - margin_x, 12 * mm,
                       "hello@makeiot.in  ·  makeiot.in")

    c.showPage()
    c.save()
    return buf.getvalue()


def generate_offer_letter_base64(**kwargs) -> str:
    return base64.b64encode(generate_offer_letter_pdf(**kwargs)).decode("ascii")
