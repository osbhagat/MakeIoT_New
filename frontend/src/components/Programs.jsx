import React from "react";
import { Check, MapPin, Zap, Award, ArrowRight } from "lucide-react";

const programs = [
  {
    id: "arduino-iot",
    name: "Arduino & IoT",
    mode: "Online",
    price: 999,
    tag: "Beginner Friendly",
    accent: "blue",
    highlights: [
      "Arduino programming from scratch",
      "IoT with ESP32 / NodeMCU",
      "Cloud dashboards & sensor projects",
      "Live + Recorded classes with doubt sessions",
      "Certificate of completion",
    ],
  },
  {
    id: "stm32-embedded",
    name: "Embedded with STM32",
    mode: "Online",
    price: 1499,
    tag: "Most Popular",
    featured: true,
    accent: "dark",
    highlights: [
      "ARM Cortex-M4 architecture deep dive",
      "STM32CubeIDE + HAL programming",
      "Peripherals: GPIO, UART, I2C, SPI, ADC",
      "Real embedded projects & code reviews",
      "Interview-focused mentor sessions",
    ],
  },
  {
    id: "offline-pune",
    name: "Offline @ Pune",
    mode: "Offline",
    price: 2999,
    tag: "Hands-on Lab",
    accent: "orange",
    highlights: [
      "In-lab hardware sessions (Hinjawadi)",
      "1-on-1 mentoring with industry experts",
      "PCB design & soldering practice",
      "Placement referrals with partner network",
      "Certificate + LinkedIn showcase",
    ],
  },
];

export default function Programs({ onEnroll }) {
  return (
    <section id="programs" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-title-eyebrow">Programs &amp; Pricing</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Pick your path into embedded engineering
          </h2>
          <div className="gradient-underline mt-4" />
          <p className="mt-5 text-slate-600 text-lg">
            A 4-week structured internship program — designed to make you industry-ready in Embedded Systems &amp; IoT.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} onEnroll={onEnroll} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program, onEnroll }) {
  const isDark = program.featured;
  return (
    <div
      data-testid={`program-card-${program.id}`}
      className={`relative rounded-2xl border p-7 card-hover ${
        isDark
          ? "bg-[#0A0F1C] text-white border-transparent eng-shadow-primary"
          : "bg-white border-slate-200 eng-shadow"
      }`}
    >
      {program.featured && (
        <div className="absolute -top-3 left-6 bg-[#F97316] text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">
          {program.tag}
        </div>
      )}
      {!program.featured && (
        <div className={`inline-flex items-center gap-2 tag-chip ${program.accent === "orange" ? "!text-[#F97316] !border-[#F97316]/40" : ""}`}>
          {program.mode === "Offline" ? <MapPin size={12} /> : <Zap size={12} />}
          {program.tag}
        </div>
      )}
      <h3 className={`mt-4 font-display font-bold text-2xl ${isDark ? "text-white" : "text-slate-900"}`}>
        {program.name}
      </h3>
      <div className={`mt-1 text-xs font-mono uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        {program.mode} · 4 Weeks
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className={`font-display font-bold text-4xl ${isDark ? "text-white" : "text-slate-900"}`}>
          ₹{program.price}
        </span>
        <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>/ program</span>
      </div>

      <ul className="mt-6 space-y-2.5">
        {program.highlights.map((h) => (
          <li key={h} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            <Check size={16} className={isDark ? "text-[#F97316]" : "text-[#0055FF]"} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <button
        data-testid={`program-enroll-${program.id}`}
        onClick={() => onEnroll(program.id)}
        className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold py-3 transition ${
          program.featured
            ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
            : program.accent === "orange"
            ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
            : "bg-[#0055FF] text-white hover:bg-[#0044CC]"
        }`}
      >
        Enroll Now <ArrowRight size={16} />
      </button>

      {program.mode === "Offline" && (
        <div className={`mt-4 text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          <MapPin size={12} className="inline mr-1" />
          Gera Imperium Rise, Hinjawadi Phase II, Pune
        </div>
      )}
      {program.featured && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <Award size={12} /> Industry-recognised certificate
        </div>
      )}
    </div>
  );
}
