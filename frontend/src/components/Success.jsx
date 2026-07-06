import React from "react";
import { Star } from "lucide-react";

const placements = [
  "/assets/story-rohit.png",
  "/assets/story-renuka.png",
  "/assets/placement-2.png",
  "/assets/placement-3.png",
  "/assets/placement-4.png",
  "/assets/placement-5.png",
  "/assets/placement-6.png",
  "/assets/placement-7.png",
  "/assets/placement-8.png",
  "/assets/placement-9.png",
  "/assets/placement-10.png",
  "/assets/placement-11.png",
  "/assets/placement-12.png",
  "/assets/placement-13.png",
  "/assets/placement-14.png",
  "/assets/placement-15.png",
];

export default function Success() {
  const list = [...placements, ...placements];
  return (
    <section id="success" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-2xl">
            <span className="section-title-eyebrow">Success Stories</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Real students. Real embedded careers.
            </h2>
            <div className="gradient-underline mt-4" />
            <p className="mt-4 text-slate-600">
              A glimpse of our alumni now working across leading embedded &amp; IoT companies in India.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#F97316] text-[#F97316]" />
              ))}
            </div>
            <span className="font-mono">4.8 avg — 200+ reviews</span>
          </div>
        </div>
      </div>

      <div className="mt-12 relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <div className="marquee flex gap-6 w-max" data-testid="success-marquee">
          {list.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-white eng-shadow"
              data-testid={`success-poster-${i}`}
            >
              <img
                src={src}
                alt={`Placement story ${i + 1}`}
              className="w-full h-auto object-contain bg-white"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
