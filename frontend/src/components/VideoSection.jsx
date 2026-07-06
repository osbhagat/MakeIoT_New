import React from "react";
import { PlayCircle, Youtube } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="section-title-eyebrow">Free STM32 Tutorials</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Start with our free STM32 crash course on YouTube.
          </h2>
          <div className="gradient-underline mt-4" />
          <ul className="mt-6 space-y-2 text-slate-700">
            {[
              "Introduction to ARM & its importance",
              "STM32F4 architecture & clock diagram",
              "Installing STM32CubeIDE",
              "HAL programming basics",
              "First LED blink project (hands-on)",
            ].map((it) => (
              <li key={it} className="flex gap-2 text-sm font-mono">
                <span className="text-[#0055FF]">›</span> {it}
              </li>
            ))}
          </ul>
          <a
            href="https://www.youtube.com/@MakeIoT"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="youtube-cta"
            className="mt-6 inline-flex items-center gap-2 btn-outline"
          >
            <Youtube size={18} /> Watch on YouTube
          </a>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden eng-shadow bg-black aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/cLqSwkYFclo"
              title="STM32 Tutorial - MakeIoT"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="stm32-video-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
