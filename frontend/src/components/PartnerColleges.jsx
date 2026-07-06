import React from "react";

const colleges = [
  { name: "SVPM College of Engineering, Baramati", logo: "/assets/college-svpm.png" },
  { name: "Sinhgad College of Engineering, Vadgaon, Pune", logo: "/assets/college-sinhgad.png" },
  { name: "VP's K B Institute of Engineering, Baramati", logo: "/assets/college-vpkb.png" },
  { name: "Karmaveer Bhaurao Patil College of Engineering, Satara", logo: "/assets/college-kbp.png" },
  { name: "Sanjivani College of Engineering, Kopargaon", logo: "/assets/college-sanjivani.png" },
  { name: "Sharadchandra Pawar College of Engineering, Pune", logo: "/assets/college-spcoe.png" },
];

export default function PartnerColleges() {
  const list = [...colleges, ...colleges];
  return (
    <section id="colleges" className="py-20 bg-[#0A0F1C] text-white relative overflow-hidden">
      <div className="absolute inset-0 pcb-bg-dark opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-title-eyebrow !text-[#F97316]">Trusted Across</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Partner Engineering Colleges
          </h2>
          <p className="mt-4 text-slate-300 max-w-xl">
            We host workshops and hands-on training in <span className="font-mono text-[#F97316]">Embedded Systems</span>, <span className="font-mono text-[#F97316]">IoT</span>, and <span className="font-mono text-[#F97316]">PLC-SCADA</span> at leading institutes.
          </p>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0F1C] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0F1C] to-transparent z-10" />
        <div className="marquee flex gap-5 w-max whitespace-nowrap" data-testid="colleges-marquee">
          {list.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex items-center gap-4 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur min-w-[380px]"
            >
              <div className="w-14 h-14 rounded-lg bg-white p-1.5 grid place-items-center shrink-0">
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="font-display font-medium text-sm text-slate-100 whitespace-normal leading-snug">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 mt-10">
        <div className="text-slate-300">
          Let&apos;s collaborate with your college —{" "}
          <a href="#contact" className="text-[#F97316] font-semibold">get in touch →</a>
        </div>
      </div>
    </section>
  );
}
