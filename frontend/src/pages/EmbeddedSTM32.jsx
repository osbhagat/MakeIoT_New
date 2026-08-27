import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollmentModal from "../components/EnrollmentModal";

const BLUE = "#0055FF";
const ORANGE = "#FF7A00";
const OFFWHITE = "#F8F7F2";

const curriculumModules = [
  {
    number: "01",
    title: "Embedded Foundations",
    tag: "Fundamentals",
    color: BLUE,
    rows: [
      ["1.1", "Embedded C", "C programming concepts required for embedded systems development."],
      ["1.2", "STM32 Microcontroller", "Introduction to STM32 and the microcontroller development workflow."],
      ["1.3", "Register-Level to HAL", "Understand low-level register configuration and move from register-level programming to STM32 HAL APIs."],
    ],
  },
  {
    number: "02",
    title: "Microcontroller Peripherals",
    tag: "Programming + Interfacing",
    color: ORANGE,
    rows: [
      ["2.1", "GPIO", "GPIO configuration and digital input/output programming."],
      ["2.2", "Timers", "Timer configuration and timing-based embedded applications."],
      ["2.3", "PWM", "PWM generation and practical control applications."],
      ["2.4", "Interrupts & ISR", "Interrupt-driven programming and Interrupt Service Routines."],
      ["2.5", "ADC & DAC", "Analog signal conversion and working with ADC/DAC peripherals."],
      ["2.6", "Display Interfacing", "7-segment display and 16x2 LCD interfacing."],
      ["2.7", "Sensors & Inputs", "Potentiometer and analog sensor interfacing."],
      ["2.8", "Motor Interfacing", "Microcontroller-based motor interfacing and control concepts."],
    ],
  },
  {
    number: "03",
    title: "Communication Protocols",
    tag: "Connectivity",
    color: BLUE,
    rows: [
      ["3.1", "UART", "Serial communication using UART."],
      ["3.2", "I²C", "Two-wire communication and peripheral interfacing using I²C."],
      ["3.3", "SPI", "SPI-based communication and device interfacing."],
      ["3.4", "CAN", "CAN communication concepts and embedded communication use cases."],
    ],
  },
  {
    number: "04",
    title: "Labs & Project Work",
    tag: "Build + Apply",
    color: ORANGE,
    rows: [
      ["4.1", "Hands-on Labs", "Practical exercises designed to apply the concepts covered throughout the internship."],
      ["4.2", "Real-Time Projects", "Apply embedded programming and peripheral concepts through practical project work."],
      ["4.3", "STM32Cube Projects", "Access to STM32Cube projects and source code for continued practice."],
      ["4.4", "Learning Resources", "Exclusive PDFs and cheat sheets to support revision and reference during the internship."],
    ],
  },
];

const faqs = [
  {
    question: "What is the Embedded Systems with STM32 internship?",
    answer:
      "This is a structured 4-week online internship focused on practical embedded systems development using STM32 and ARM Cortex-M. The program covers embedded fundamentals, Embedded C, STM32 peripherals, register-level programming, STM32 HAL, communication protocols, simulation, debugging, exercises and practical projects.",
  },
  {
    question: "Who is this STM32 internship for?",
    answer:
      "The internship is designed primarily for engineering students and learners who want to build practical skills in embedded systems, microcontrollers and firmware development. It is suitable for students from Electronics, Electrical, Electronics & Telecommunication, Instrumentation, Computer Engineering and related engineering disciplines.",
  },
  {
    question: "Do I need prior STM32 experience?",
    answer:
      "No. The program follows a structured learning path from fundamentals to practical implementation. Basic programming knowledge is helpful, but the internship progressively introduces ARM Cortex-M, STM32 architecture, Embedded C, peripherals and firmware development.",
  },
  {
    question: "Do I need an STM32 development board?",
    answer:
      "No dedicated STM32 hardware is required to complete the internship. The practical workflow uses software-based tools including STM32CubeIDE, QEMU and Proteus simulation, allowing you to practice and debug concepts without requiring a physical development board.",
  },
  {
    question: "What will I learn during the STM32 internship?",
    answer:
      "The curriculum covers ARM architecture and Cortex-M fundamentals, STM32 architecture, Embedded C, GPIO, timers, ADC, PWM, UART, I²C, CAN, register-level programming, STM32 HAL programming, STM32CubeIDE, simulation, debugging and practical embedded systems development.",
  },
  {
    question: "What is the difference between register-level programming and HAL programming?",
    answer:
      "You will learn both approaches. Register-level programming helps you understand how microcontroller peripherals work by directly configuring registers, while STM32 HAL provides a higher-level abstraction for developing applications more efficiently. Learning both helps you understand what the abstraction layer is doing.",
  },
  {
    question: "What tools are used in the internship?",
    answer:
      "The internship uses a software-based embedded development workflow including STM32CubeIDE, QEMU and Proteus simulation. These tools allow you to write, build, simulate and debug embedded firmware without depending entirely on physical hardware.",
  },
  {
    question: "How much practical work is included?",
    answer:
      "The internship includes 20+ practical exercises and three capstone projects designed to help you apply the concepts covered in the curriculum.",
  },
  {
    question: "Is the internship completely online?",
    answer:
      "Yes. The internship is conducted online with recorded learning content and live doubt-clearing sessions. You can follow the structured 4-week learning path while using the live sessions to clarify technical questions.",
  },
  {
    question: "How long is the internship?",
    answer:
      "The internship duration is 4 weeks. The program follows a structured learning path covering fundamentals, programming, peripherals, communication protocols, practical exercises and project work.",
  },
  {
    question: "Will I receive an internship offer letter?",
    answer:
      "Yes. An internship offer letter is provided as part of the enrollment documentation and documents your participation in the internship program.",
  },
  {
    question: "Will I receive an internship completion certificate?",
    answer:
      "Yes. After successfully completing the required learning activities, exercises, project work and assessment or evaluation, you receive an internship completion certificate with a verification mechanism.",
  },
  {
    question: "Can I submit the internship certificate to my college?",
    answer:
      "The internship documentation is designed to support students who need to document their internship participation and completion. Final acceptance is determined by your college or university's internship requirements and policies, so students should confirm any specific documentation requirements with their institution.",
  },
  {
    question: "Can I add this internship to my resume and LinkedIn profile?",
    answer:
      "Yes. After completing the internship, you can include the internship experience, skills developed and projects completed in your resume and LinkedIn profile. You should accurately represent the work you completed during the program.",
  },
  {
    question: "What do I receive after completing the internship?",
    answer:
      "Your internship journey includes structured 4-week learning content, 20+ practical exercises, three capstone projects, live doubt-clearing support, an internship offer letter, an internship completion certificate and practical embedded systems project experience.",
  },
  {
    question: "When can I start the internship?",
    answer:
      "You can begin accessing the structured internship content after completing your enrollment, allowing you to start the learning journey without unnecessary waiting.",
  },
  {
    question: "Is this an internship or a course?",
    answer:
      "It is structured as an internship program combining technical learning, practical exercises, project work and evaluation. The program is designed to provide students with documented internship participation alongside practical embedded systems learning.",
  },
  {
    question: "How do I enroll in the STM32 internship?",
    answer:
      "Click the Enroll Now button, complete your enrollment details and proceed with the payment. After enrollment, you can begin the internship journey and access the program documentation and learning content according to the program process.",
  },
  {
    question: "Is there a referral benefit?",
    answer:
      "Yes. Make IoT provides a referral program where an eligible referral can provide a benefit to both the existing participant and the referred student after the referred student's enrollment is successfully confirmed.",
  },
  {
    question: "What if I have a technical question during the internship?",
    answer:
      "You can use the available live doubt-clearing sessions to ask questions and clarify concepts related to the internship curriculum and practical work.",
  },
];

function SectionLabel({ children, accent = BLUE }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-slate-600">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ black, blue, className = "" }) {
  return (
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-slate-900 ${className}`}
    >
      {black}
      {blue && (
        <>
          <br className="hidden sm:block" />
          <span className="text-[#0055FF]">{blue}</span>
        </>
      )}
    </h2>
  );
}

function CurriculumModule({ module }) {
  return (
    <div className="overflow-hidden border-b border-slate-200 last:border-b-0">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4"
        style={{ backgroundColor: module.color }}
      >
        <span className="font-mono text-sm sm:text-base uppercase tracking-[0.14em] font-semibold text-white">
          Module {module.number} — {module.title}
        </span>
        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-white/85">
          {module.tag}
        </span>
      </div>

      <div className="bg-white">
        {module.rows.map(([number, title, description], index) => (
          <div
            key={number}
            className={`grid grid-cols-[64px_1fr] sm:grid-cols-[82px_230px_1fr] ${
              index !== module.rows.length - 1
                ? "border-b border-slate-200"
                : ""
            }`}
          >
            <div className="px-3 sm:px-4 py-4 bg-slate-50 text-sm font-mono text-[#0055FF]">
              {number}
            </div>

            <div className="col-start-2 sm:col-start-auto px-4 py-4 font-semibold text-slate-900">
              {title}
            </div>

            <div className="col-start-2 sm:col-start-auto px-4 pb-4 sm:py-4 text-slate-600 sm:col-span-1">
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmbeddedSTM32() {
  const [enrollOpen, setEnrollOpen] = React.useState(false);

  const openEnrollment = () => setEnrollOpen(true);

  React.useEffect(() => {
    const title =
      "Embedded Systems Internship with STM32 | Make IoT";

    const description =
      "Join Make IoT's 4-week Embedded Systems Internship with STM32 and ARM Cortex-M. Learn Embedded C, register-level programming, STM32 HAL, peripherals, communication protocols and practical project development.";

    document.title = title;

    const upsertMeta = (name, content, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;

      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        if (property) element.setAttribute("property", name);
        else element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    upsertMeta("description", description);
    upsertMeta(
      "keywords",
      "Embedded Systems Internship, STM32 Internship, STM32 course, ARM Cortex-M, Embedded C, register level programming, STM32 HAL, microcontroller internship, embedded systems training, Make IoT"
    );
    upsertMeta("robots", "index, follow");
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("og:url", window.location.href, true);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${window.location.origin}${window.location.pathname}`
    );

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: "Embedded Systems Internship with STM32",
          description,
          provider: {
            "@type": "Organization",
            name: "Make IoT",
          },
          courseMode: "online",
          educationalLevel: "Undergraduate",
          timeRequired: "P4W",
          offers: {
            "@type": "Offer",
            price: "1499",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: window.location.href,
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    };

    let schema = document.getElementById("embedded-stm32-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "embedded-stm32-schema";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);

    return () => {
      const currentSchema = document.getElementById("embedded-stm32-schema");
      if (currentSchema) currentSchema.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onEnrollClick={openEnrollment} />

      <main>
        {/* =========================================================
            01. HERO
        ========================================================== */}
        <section
          id="hero"
          className="relative overflow-hidden bg-white border-b border-slate-200"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#0055FF12 1px, transparent 1px), linear-gradient(90deg, #0055FF12 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#FF7A00]" />
                  Online
                  <span className="text-slate-300">•</span>
                  4 Weeks
                  <span className="text-slate-300">•</span>
                  Live + Recorded
                </div>

                <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-slate-900">
                  Embedded Systems
                  <br />
                  <span className="text-[#0055FF]">
                    Internship with STM32
                  </span>
                  <br />
                  &amp; ARM Cortex-M4
                </h1>

                <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-slate-600">
                  Build practical embedded systems skills using STM32,
                  Embedded C, microcontroller peripherals and communication
                  protocols through a structured 4-week internship.
                </p>

                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-display font-bold text-4xl lg:text-5xl text-slate-900">
                    ₹1,499
                  </span>
                  <span className="text-sm text-slate-500">one-time</span>
                </div>

                <div className="mt-7 flex flex-wrap gap-4">
                  <button
                    onClick={openEnrollment}
                    className="inline-flex items-center justify-center rounded-xl bg-[#0055FF] px-7 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#0044CC] transition"
                  >
                    Enroll for ₹1,499
                  </button>

                  <a
                    href="/assets/embedded-syllabus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition"
                  >
                    View 4-Week Syllabus
                  </a>
                </div>

                <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {[
                    ["4 Weeks", "Structured internship"],
                    ["Live + Recorded", "Flexible learning"],
                    ["3 Projects", "Practical work"],
                    ["Certificate", "On completion"],
                  ].map(([title, text]) => (
                    <div key={title}>
                      <div className="text-sm font-semibold text-slate-900">
                        {title}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <img
                    src="/assets/stm32-training.png"
                    alt="Students learning embedded systems and STM32 at Make IoT"
                    className="w-full h-[430px] sm:h-[500px] lg:h-[540px] object-cover object-center"
                  />

                  <div className="grid grid-cols-3 bg-[#0A0F1C] text-white">
                    {[
                      ["Live Training", "Technical sessions"],
                      ["STM32", "Practical learning"],
                      ["Real Projects", "Industry skills"],
                    ].map(([title, text], index) => (
                      <div
                        key={title}
                        className={`px-3 sm:px-5 py-4 ${
                          index < 2 ? "border-r border-slate-700" : ""
                        }`}
                      >
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="mt-1 text-xs text-slate-400">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -bottom-5 left-5 right-5 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                  <p className="text-sm leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-900">
                      Learn by building.
                    </span>{" "}
                    Practical embedded systems training with STM32, Embedded C
                    and project-based learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            02. UNIVERSITIES
        ========================================================== */}
        <section id="colleges" className={`bg-[${OFFWHITE}] border-b border-slate-200`}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-14">
            <div className="text-center">
              <SectionLabel accent={ORANGE}>
                Learners from universities across India
              </SectionLabel>

              <SectionHeading
                black="Students from leading engineering institutions"
                blue="learn with Make IoT"
                className="text-2xl sm:text-3xl"
              />

              <p className="mt-4 max-w-2xl mx-auto text-sm lg:text-base leading-7 text-slate-600">
                Students and learners from universities and autonomous
                engineering colleges have participated in Make IoT's technical
                workshops and programs.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Savitribai Phule Pune University",
                "Dr. Babasaheb Ambedkar Technological University",
                "Panjab University",
                "Manipal Academy of Higher Education",
                "Visvesvaraya Technological University",
                "Anna University",
                "Jadavpur University",
              ].map((university) => (
                <div
                  key={university}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm"
                >
                  {university}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            03. WHY THIS INTERNSHIP
        ========================================================== */}
        <section id="why-this-internship" className="bg-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="max-w-3xl mb-12">
              <SectionLabel>Why This Internship</SectionLabel>

              <SectionHeading
                black="Build the skills."
                blue="Show the work."
              />

              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed">
                A structured four-week internship combining guided learning,
                practical exercises and project work — giving you technical
                experience and tangible work you can confidently showcase.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["20+", "Hours of structured content"],
                ["20+", "Embedded coding exercises"],
                ["3", "Capstone projects"],
                ["4 Weeks", "Structured internship"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="border border-slate-200 rounded-2xl p-6 bg-slate-50"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900">
                    {number}
                  </div>
                  <p className="mt-2 text-sm lg:text-base text-slate-600">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[#0B1720] text-white p-7 lg:p-9">
              <div className="grid lg:grid-cols-[1.1fr_2fr] gap-8 items-center">
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-blue-300 font-mono mb-3">
                    Take It Beyond the Internship
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                    Turn your work into something you can showcase.
                  </h3>

                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Build evidence of what you learned — not just a line on a
                    certificate.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    "Add the internship experience to your resume.",
                    "Showcase completed projects in your portfolio.",
                    "Share your projects and learning journey on LinkedIn.",
                    "Discuss your project work during technical interviews.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="text-[#0055FF] font-bold">✓</span>
                      <p className="text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            04. CURRICULUM
        ========================================================== */}
        <section
          id="curriculum"
          className={`bg-[${OFFWHITE}] py-16 lg:py-24 border-y border-slate-200`}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="max-w-3xl mb-10 lg:mb-12">
              <SectionLabel accent={ORANGE}>Curriculum</SectionLabel>

              <SectionHeading
                black="From embedded fundamentals."
                blue="Build what works."
              />

              <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600 max-w-2xl">
                A structured 4-week internship covering Embedded C, STM32
                microcontroller programming, peripherals, communication
                protocols, simulation and practical project work.
              </p>
            </div>

            {/* Subtle container — no heavy black border */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {curriculumModules.map((module) => (
                <CurriculumModule key={module.number} module={module} />
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Structured learning • Practical exercises • Project-based
              application
            </p>
          </div>
        </section>

        {/* =========================================================
            05. TOOLS & SETUP
        ========================================================== */}
        <section id="tools" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <SectionLabel accent={ORANGE}>Tools &amp; Setup</SectionLabel>

                <SectionHeading
                  black="No development board."
                  blue="No excuse to fall behind."
                  className="max-w-xl"
                />

                <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600 max-w-xl">
                  The internship is designed so you can begin learning and
                  practising from your laptop without needing dedicated STM32
                  hardware.
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    [
                      "STM32CubeIDE",
                      "Use STM32CubeIDE for project development, code compilation, debugging and working with STM32 firmware projects.",
                    ],
                    [
                      "QEMU Emulation",
                      "Practise and debug supported STM32 firmware concepts in a software-based environment without physical hardware.",
                    ],
                    [
                      "Proteus Simulation",
                      "Visualise and test selected microcontroller circuits, peripherals and interfacing concepts through simulation.",
                    ],
                    [
                      "Register-Level + HAL",
                      "Learn what happens underneath the abstraction by working with both direct register configuration and STM32 HAL APIs.",
                    ],
                  ].map(([title, description]) => (
                    <div key={title} className="flex gap-4">
                      <span className="mt-2 text-[#0055FF] text-sm">▸</span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm sm:text-base leading-6 text-slate-600">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:pt-10">
                <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#071A12] shadow-xl">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-700 bg-[#092319]">
                    <span className="h-3 w-3 rounded-full bg-slate-600" />
                    <span className="h-3 w-3 rounded-full bg-slate-600" />
                    <span className="h-3 w-3 rounded-full bg-slate-600" />
                    <span className="ml-3 text-xs font-mono text-slate-500">
                      stm32_gpio.c
                    </span>
                  </div>

                  <pre className="p-5 sm:p-6 overflow-x-auto text-sm sm:text-base leading-7 font-mono">
                    <code>
                      <span className="text-slate-500">
                        {"// GPIO toggle — register level vs HAL\n"}
                        {"// Register-level: direct write to ODR\n\n"}
                      </span>

                      <span className="text-[#5EE6A8]">
                        {"GPIOA->ODR ^= (1U << 5);"}
                      </span>

                      <span className="text-slate-500">
                        {"  // toggle PA5\n\n"}
                        {"// HAL equivalent\n"}
                      </span>

                      <span className="text-[#FFB347]">
                        {"HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);\n\n"}
                      </span>

                      <span className="text-slate-500">
                        {"// UART interrupt-driven receive (HAL)\n"}
                      </span>

                      <span className="text-[#FFB347]">
                        {"HAL_UART_Receive_IT("}
                      </span>
                      <span className="text-white">
                        {"&huart2, (uint8_t*)&rxByte, 1"}
                      </span>
                      <span className="text-[#FFB347]">{" );"}</span>
                    </code>
                  </pre>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#0055FF]">
                      Register Level
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Understand how the peripheral is controlled directly
                      through microcontroller registers.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#FF7A00]">
                      STM32 HAL
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Implement the same functionality using STM32's Hardware
                      Abstraction Layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            06. OFFER LETTER & CERTIFICATE
        ========================================================== */}
        <section
          id="certification"
          className={`bg-[${OFFWHITE}] py-16 lg:py-24 border-t border-slate-200`}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="max-w-3xl mb-10 lg:mb-12">
              <SectionLabel accent={ORANGE}>
                Internship Documentation
              </SectionLabel>

              <SectionHeading
                black="Get the documents."
                blue="Keep the proof."
              />

              <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600 max-w-2xl">
                Complete your internship with formal documentation that you
                can submit to your college, add to your resume and showcase as
                part of your professional profile.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* OFFER LETTER */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#0055FF]">
                      Internship Document
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      Internship Offer Letter
                    </h3>
                  </div>
                  <div className="shrink-0 h-11 w-11 rounded-full bg-blue-50 flex items-center justify-center text-[#0055FF] font-bold">
                    01
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#F8F7F2] p-5 sm:p-7 min-h-[250px] flex items-center justify-center">
                  <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-lg p-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-lg font-bold text-[#0055FF]">
                          Make IoT
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Empowering The Future
                        </p>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400">
                        OFFER LETTER
                      </p>
                    </div>

                    <div className="py-6 text-center">
                      <p className="text-xs text-slate-500">
                        This is a preview of the
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        Internship Offer Letter
                      </p>
                      <div className="mt-5 space-y-2">
                        <div className="h-2 bg-slate-100 rounded w-3/4 mx-auto" />
                        <div className="h-2 bg-slate-100 rounded w-2/3 mx-auto" />
                        <div className="h-2 bg-slate-100 rounded w-1/2 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-slate-900">
                    Issued as part of your enrollment
                  </h4>
                  <p className="mt-2 text-sm sm:text-base leading-6 text-slate-600">
                    Receive your internship offer letter as part of your
                    program documentation after successful enrollment.
                  </p>
                </div>
              </div>

              {/* CERTIFICATE */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#FF7A00]">
                      Internship Document
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      Completion Certificate
                    </h3>
                  </div>
                  <div className="shrink-0 h-11 w-11 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7A00] font-bold">
                    02
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#F8F7F2] p-5 sm:p-7 min-h-[250px] flex items-center justify-center">
                  <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-lg p-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#0055FF]">
                        Make IoT
                      </p>
                      <p className="mt-4 text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                        Certificate of Completion
                      </p>
                      <p className="mt-3 text-base font-semibold text-slate-900">
                        Embedded Systems with STM32
                      </p>
                      <div className="mt-5 flex justify-center">
                        <div className="h-12 w-12 rounded-md border border-[#FF7A00] flex items-center justify-center">
                          <span className="text-[9px] text-slate-400">QR</span>
                        </div>
                      </div>
                      <div className="mt-5 space-y-2">
                        <div className="h-2 bg-slate-100 rounded w-2/3 mx-auto" />
                        <div className="h-2 bg-slate-100 rounded w-1/2 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-slate-900">
                    Earned after completing the internship
                  </h4>
                  <p className="mt-2 text-sm sm:text-base leading-6 text-slate-600">
                    Complete the required internship activities and assessment
                    to receive your completion certificate.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  [
                    "College",
                    "Submit your internship documentation",
                    "Use your offer letter and completion certificate as part of your college internship documentation.",
                    ORANGE,
                  ],
                  [
                    "Resume",
                    "Add your internship experience",
                    "Include the internship, technical skills and project work in your resume and portfolio.",
                    BLUE,
                  ],
                  [
                    "LinkedIn",
                    "Showcase your achievement",
                    "Add the internship and certificate to your LinkedIn profile to document your technical learning journey.",
                    ORANGE,
                  ],
                ].map(([label, title, text, color]) => (
                  <div key={label}>
                    <p
                      className="text-xs font-mono uppercase tracking-[0.16em]"
                      style={{ color }}
                    >
                      {label}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            07. HOW IT WORKS
        ========================================================== */}
        <section
          id="how-it-works"
          className="bg-white py-16 lg:py-24 border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="max-w-3xl">
              <SectionLabel>How It Works</SectionLabel>

              <SectionHeading
                black="Get certified"
                blue="in 6 steps."
              />

              <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600 max-w-2xl">
                A simple path from enrollment to certification, combining
                structured learning, practical work and assessment.
              </p>
            </div>

            <div className="mt-14">
              {/* Desktop: circles and content share the exact same 6-column grid. */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div
                    className="absolute top-6 h-px border-t-2 border-dashed border-[#2DBE7F]"
                    style={{ left: "8.333%", right: "8.333%" }}
                  />

                  <div className="grid grid-cols-6">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div key={step} className="flex justify-center relative z-10">
                        <div className="h-12 w-12 rounded-full bg-[#0B4F3A] border-2 border-[#2DBE7F] flex items-center justify-center text-white font-bold">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-6 gap-5 mt-7">
                    {[
                      [
                        "Register",
                        "Submit your details and choose the internship program.",
                      ],
                      [
                        "Enroll & Pay",
                        "Complete your enrollment and secure your internship slot.",
                      ],
                      [
                        "Get Offer Letter",
                        "Receive your internship offer letter as part of your enrollment documentation.",
                      ],
                      [
                        "Learn & Build",
                        "Follow the 4-week learning path, complete exercises and work on practical projects.",
                      ],
                      [
                        "Submit Assessment",
                        "Complete the required assessment and submit your project work for evaluation.",
                      ],
                      [
                        "Get Certified",
                        "Successfully complete the evaluation and receive your internship completion certificate.",
                      ],
                    ].map(([title, description]) => (
                      <div key={title} className="text-center">
                        <h3 className="text-lg font-bold text-slate-900">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile / tablet */}
              <div className="lg:hidden grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  [
                    1,
                    "Register",
                    "Submit your details and choose the internship program.",
                  ],
                  [
                    2,
                    "Enroll & Pay",
                    "Complete your enrollment and secure your internship slot.",
                  ],
                  [
                    3,
                    "Get Offer Letter",
                    "Receive your internship offer letter as part of your enrollment documentation.",
                  ],
                  [
                    4,
                    "Learn & Build",
                    "Follow the 4-week learning path, complete exercises and work on practical projects.",
                  ],
                  [
                    5,
                    "Submit Assessment",
                    "Complete the required assessment and submit your project work for evaluation.",
                  ],
                  [
                    6,
                    "Get Certified",
                    "Successfully complete the evaluation and receive your internship completion certificate.",
                  ],
                ].map(([step, title, description]) => (
                  <div key={step}>
                    <div className="h-12 w-12 rounded-full bg-[#0B4F3A] border-2 border-[#2DBE7F] flex items-center justify-center text-white font-bold">
                      {step}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            08. FEE
        ========================================================== */}
        <section id="fee" className={`bg-[${OFFWHITE}] py-16 lg:py-24`}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionLabel accent="#0B4F3A">Fee</SectionLabel>

            <SectionHeading
              black="One payment."
              blue="Everything included."
            />

            <div className="mt-10 rounded-3xl bg-[#0B2119] px-7 py-8 sm:px-10 lg:px-12 lg:py-10">
              <div className="grid lg:grid-cols-[1fr_1.5fr_auto] gap-8 lg:gap-10 items-center">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl sm:text-6xl font-bold text-[#5BE3A5]">
                      ₹1,499
                    </span>
                    <span className="text-base font-mono text-slate-200">
                      one-time
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "4 weeks of structured internship content",
                    "Weekly live doubt-clearing sessions",
                    "STM32CubeIDE + QEMU + Proteus workflow",
                    "20+ practical exercises and project work",
                    "Internship offer letter",
                    "Internship completion certificate",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#2DBE7F] mt-0.5">✓</span>
                      <span className="text-sm sm:text-base text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="lg:text-right">
                  <button
                    onClick={openEnrollment}
                    className="rounded-lg bg-[#D9A441] px-7 py-3.5 text-sm font-semibold text-slate-950 hover:bg-[#E4B65A] transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            09. REFER & EARN
        ========================================================== */}
        <section id="refer" className="bg-white py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-5 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#D3A13D] to-[#E5BD68] px-7 py-8 sm:px-10 lg:px-11 lg:py-10">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#4A3507]" />
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#4A3507]">
                      Refer &amp; Earn
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
                    Get ₹200,{" "}
                    <span className="text-slate-800">your friend gets ₹200</span>
                  </h2>

                  <p className="mt-3 max-w-xl text-sm sm:text-base leading-6 text-slate-900">
                    Share your referral code with a friend. When your friend
                    enrolls and completes the payment using your referral code,
                    both of you receive ₹200 as per the referral program.
                  </p>
                </div>

                <div className="flex items-center justify-center lg:justify-end gap-4 sm:gap-6 whitespace-nowrap">
                  <span className="text-3xl sm:text-4xl font-bold text-slate-950">
                    ₹200
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold text-slate-950">
                    +
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-950">
                    ₹200
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            10. MENTOR
        ========================================================== */}
        <section
          id="mentor"
          className={`bg-[${OFFWHITE}] border-t border-slate-200`}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-24">
            <SectionLabel>Meet Your Mentor</SectionLabel>

            <SectionHeading
              black="Learn from real-world"
              blue="embedded systems experience."
              className="max-w-4xl"
            />

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center mt-14">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white">
                  <img
                    src="/assets/mentor.png"
                    alt="Omkar Bhagat - Founder of Make IoT"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>

                <div className="absolute -bottom-5 -right-3 lg:right-[-18px] bg-[#0055FF] text-white rounded-2xl px-5 py-4 shadow-lg">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs tracking-wide">Students trained</div>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] font-mono text-[#0055FF] mb-3">
                  Omkar Bhagat
                </p>

                <h3 className="text-3xl lg:text-4xl font-bold text-[#0b1328]">
                  Founder, Make IoT
                </h3>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  An embedded systems engineer and educator with 5+ years of
                  industry experience across automotive embedded systems and
                  consumer electronics.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Omkar has worked across low-level embedded development,
                  AUTOSAR, Edge AI and IoT, with experience at organizations
                  including KPIT and Schaeffler. He currently works with FRANKE
                  while building Make IoT to help engineering students develop
                  practical technical skills.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  He has trained 10,000+ students through technical workshops
                  and learning programs and also mentors innovators at AIC-ADT
                  Baramati.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Embedded Systems",
                    "STM32",
                    "ARM Cortex-M",
                    "Embedded C",
                    "AUTOSAR",
                    "Edge AI",
                    "IoT",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-slate-300 bg-white text-sm font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-9 pt-7 border-t border-slate-200">
                  <p className="text-sm uppercase tracking-[0.18em] font-mono text-slate-500 mb-3">
                    Education
                  </p>
                  <p className="text-base text-slate-700">
                    Bachelor's in Electronics &amp; Telecommunication Engineering
                  </p>
                  <p className="text-base text-slate-700 mt-1">
                    Master's in Digital Systems
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href="https://www.linkedin.com/in/omkar-bhagat-816908187/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0055FF] font-semibold hover:underline"
                  >
                    View LinkedIn Profile →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            11. FAQ
        ========================================================== */}
        <section id="faq" className="bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 py-20 lg:py-24">
            <SectionLabel>Frequently Asked Questions</SectionLabel>

            <SectionHeading
              black="Everything you need to know"
              blue="before you enroll."
            />

            <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-8">
              Find answers about the STM32 internship, curriculum, practical
              work, tools, certificate, offer letter, eligibility and
              enrollment process.
            </p>

            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-slate-200 rounded-2xl bg-white px-6 py-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6 text-lg font-semibold text-[#0b1328]">
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-2xl text-[#0055FF] transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 pr-8 text-base leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnrollmentModal
        open={enrollOpen}
        initialProgram="stm32-embedded"
        initialRef=""
        onClose={() => setEnrollOpen(false)}
      />
    </div>
  );
}
