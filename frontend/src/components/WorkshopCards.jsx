import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { workshops } from "../pages/Workshops";

export default function WorkshopCards() {
  return (
    <section
      id="workshops"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0055FF]" />

              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-slate-500">
                Campus Workshops
              </span>
            </div>

            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950">
              Learning beyond the classroom.
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
              Explore real workshops conducted by Make IoT at engineering
              colleges, covering Embedded Systems, STM32, Arduino, IoT,
              programming and embedded career opportunities.
            </p>
          </div>

          <Link
            to="/workshops"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-[#0055FF] hover:text-[#0055FF]"
          >
            View all workshops
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* WORKSHOP CARDS */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.slice(0, 3).map((workshop) => {
            const heroImage = workshop.images?.[0];

            return (
              <Link
                key={workshop.id}
                to={`/workshops#${workshop.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                  {heroImage && (
                    <img
                      src={heroImage.src}
                      alt={heroImage.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                  {/* LOCATION */}
                  <div className="absolute left-4 bottom-4 flex items-center gap-1.5 text-xs font-medium text-white">
                    <MapPin size={13} />
                    {workshop.location}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0055FF]">
                      Make IoT Workshop
                    </span>

                    <span className="text-xs text-slate-400">
                      {workshop.date}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-display font-bold leading-snug text-slate-950 group-hover:text-[#0055FF] transition">
                    {workshop.college}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {workshop.title}
                  </p>

                  {/* TOPICS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {workshop.topics?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0055FF]">
                    Explore workshop
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0055FF] transition"
          >
            See all campus workshops
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}