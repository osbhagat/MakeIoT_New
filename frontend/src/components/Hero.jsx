import React from "react";
import { ArrowRight, Award, GraduationCap, Sparkles, ShieldCheck } from "lucide-react";

// Returns the *next* batch label (this month if not past, otherwise next month) — auto updates.
function useNextBatchLabel() {
  return React.useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    // If we're past the 15th, roll to next month; else use current month.
    const target = new Date(now.getFullYear(), now.getMonth() + (day > 15 ? 1 : 0), 1);
    const month = target.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return `${month}-${target.getFullYear()}`;
  }, []);
}

export default function Hero({ onEnrollClick }) {
  const batch = useNextBatchLabel();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pcb-bg opacity-70" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0055FF]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#F97316]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 tag-chip mb-6" data-testid="hero-batch-chip">
              <Sparkles size={14} className="text-[#F97316]" />
              New Batch · {batch} · Limited Seats
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
              Master{" "}
              <span className="text-[#0055FF]">Embedded Systems</span>
              <br />
              &amp; <span className="relative inline-block whitespace-nowrap">
                IoT
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#F97316] rounded" />
              </span>{" "}
              with real-world<br className="hidden lg:block" /> internships.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              A structured 4-week internship in <span className="font-mono text-slate-900">Embedded C</span>, <span className="font-mono text-slate-900">IoT</span>, <span className="font-mono text-slate-900">STM32</span> &amp; <span className="font-mono text-slate-900">PCB Design</span>. Live mentorship. Hands-on projects. Industry-ready certification.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button data-testid="hero-enroll-btn" onClick={onEnrollClick} className="btn-primary">
                Enroll Now <ArrowRight size={18} />
              </button>
              <a
                data-testid="hero-syllabus-btn"
                href="/assets/embedded-syllabus.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Get Syllabus
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              <Stat n="10K+" label="Students Trained" />
              <Stat n="60+" label="Partner Colleges" />
              <Stat n="30 Days" label="Interview-Ready Prep" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 border-2 border-dashed border-slate-300 rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden eng-shadow bg-white">
                <div className="bg-slate-50 p-4">
                  <img
                    src="/assets/certificate.png"
                    alt="Make IoT Internship Certificate"
                    className="w-full h-auto object-contain rounded-lg"
                    data-testid="hero-certificate-image"
                  />
                </div>
                <div className="p-5 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0055FF]/10 text-[#0055FF] grid place-items-center">
                        <Award size={20} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-slate-900">Industry-Recognised Certificate</div>
                        <div className="text-xs text-slate-500 font-mono">Awarded on successful completion</div>
                      </div>
                    </div>
                    <span className="tag-chip !text-[#F97316] !border-[#F97316]/40">
                      <ShieldCheck size={12} /> VERIFIED
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-[#F97316] text-white rounded-xl px-5 py-3 eng-shadow-accent hidden sm:flex items-center gap-3">
                <GraduationCap size={22} />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-90">Boost your resume</div>
                  <div className="text-sm font-display font-semibold">Verified Credential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900">{n}</div>
      <div className="text-xs text-slate-500 mt-1 leading-tight">{label}</div>
    </div>
  );
}
