import React from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0A0F1C] text-white relative overflow-hidden">
      <div className="absolute inset-0 pcb-bg-dark opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-title-eyebrow !text-[#F97316]">Contact</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Have questions? Let&apos;s talk.
          </h2>
          <div className="gradient-underline mt-4" />
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            icon={<MapPin size={22} />}
            title="Visit Us"
            lines={["Make IoT", "Gera Imperium Rise", "Hinjawadi Phase II, Pune"]}
          />
          <Card
            icon={<Phone size={22} />}
            title="Call"
            lines={["+91 72183 48853"]}
            href="tel:+917218348853"
            testid="contact-call"
          />
          <Card
            icon={<MessageCircle size={22} />}
            title="WhatsApp"
            lines={["Chat with us instantly"]}
            href="https://wa.me/917218348853"
            testid="contact-whatsapp"
          />
          <Card
            icon={<Mail size={22} />}
            title="Email"
            lines={["hello@makeiot.in"]}
            href="mailto:hello@makeiot.in"
            testid="contact-email"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, lines, href, testid }) {
  const inner = (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 backdrop-blur p-6 h-full transition hover:border-[#F97316]">
      <div className="w-11 h-11 rounded-lg bg-[#F97316]/15 text-[#F97316] grid place-items-center">
        {icon}
      </div>
      <div className="mt-4 font-display font-semibold text-lg">{title}</div>
      <div className="mt-2 text-sm text-slate-300 space-y-0.5">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testid || `contact-card`}>
      {inner}
    </a>
  ) : (
    inner
  );
}
