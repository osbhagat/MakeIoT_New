import React from "react";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      <a
        href="tel:+918856905687"
        data-testid="floating-call-btn"
        className="w-14 h-14 rounded-full bg-[#0055FF] text-white grid place-items-center shadow-lg hover:bg-[#0044CC] transition"
        aria-label="Call us"
      >
        <Phone size={22} />
      </a>
      <a
        href="https://wa.me/918856905687"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:bg-[#1DA851] transition animate-pulse-ring"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
