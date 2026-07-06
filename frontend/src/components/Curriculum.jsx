import React from "react";
import { ChevronDown, Cpu, Wifi, CircuitBoard, Code, Zap, Layers } from "lucide-react";

const modules = [
  {
    icon: Code,
    title: "Embedded C Programming",
    items: ["Data types, pointers, memory model", "Bitwise ops for register-level control", "Volatile, structs, unions in embedded context"],
  },
  {
    icon: Cpu,
    title: "ARM Cortex-M4 & STM32",
    items: ["ARM architecture & instruction set", "STM32F4 clock, memory map", "HAL programming & CubeIDE workflow"],
  },
  {
    icon: Layers,
    title: "Peripheral Interfacing",
    items: ["GPIO, UART, I2C, SPI", "ADC/DAC & timers", "Interrupts & DMA"],
  },
  {
    icon: Wifi,
    title: "IoT with ESP32 & Cloud",
    items: ["Wi-Fi, MQTT, HTTP requests", "IoT dashboards & alerts", "Sensor + cloud integration"],
  },
  {
    icon: CircuitBoard,
    title: "PCB Design Fundamentals",
    items: ["Schematic capture", "Component placement & routing", "Design rule checks & fabrication tips"],
  },
  {
    icon: Zap,
    title: "Real Projects & Interview Prep",
    items: ["Capstone project mentoring", "Resume + LinkedIn showcase", "Mock interviews with feedback"],
  },
];

export default function Curriculum() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="section-title-eyebrow">Curriculum</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            A curriculum forged in the industry, not the classroom.
          </h2>
          <div className="gradient-underline mt-4" />
          <p className="mt-5 text-slate-600">
            Every module is designed around real interview questions and production embedded work — no theoretical fluff.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm">
            <MiniStat n="4 wks" label="Duration" />
            <MiniStat n="40+" label="Sessions" />
            <MiniStat n="6" label="Projects" />
          </div>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            const isOpen = open === i;
            return (
              <div
                key={m.title}
                data-testid={`curriculum-item-${i}`}
                className={`rounded-xl border bg-white transition-all ${isOpen ? "border-[#0055FF] eng-shadow-primary" : "border-slate-200"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  data-testid={`curriculum-toggle-${i}`}
                >
                  <div className={`w-10 h-10 rounded-lg grid place-items-center ${isOpen ? "bg-[#0055FF] text-white" : "bg-slate-100 text-slate-700"}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-slate-900">
                      Module {String(i + 1).padStart(2, "0")} — {m.title}
                    </div>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <ul className="px-5 pb-5 pl-[76px] space-y-1.5">
                    {m.items.map((it) => (
                      <li key={it} className="text-sm text-slate-600 font-mono flex gap-2">
                        <span className="text-[#F97316]">▸</span> {it}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MiniStat({ n, label }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="font-display font-bold text-xl text-slate-900">{n}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
