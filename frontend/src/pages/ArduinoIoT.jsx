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
    title: "Arduino Fundamentals",
    tag: "Fundamentals",
    color: BLUE,
    rows: [
      ["1.1", "Introduction to Arduino", "Understand Arduino, its types, applications and role in embedded and IoT systems."],
      ["1.2", "Arduino Hardware", "Explore Arduino board hardware, pins and the basic development workflow."],
      ["1.3", "Arduino Software", "Set up the Arduino software environment and understand the sketch development workflow."],
      ["1.4", "Programming Basics", "Learn the programming basics required to create Arduino applications."],
      ["1.5", "Simulation Tools", "Use simulation tools to test Arduino circuits and Arduino code before hardware implementation."],
      ["1.6", "Compile & Download", "Compile Arduino sketches and understand the process of downloading code to the board."],
    ],
  },
  {
    number: "02",
    title: "Mastering Arduino",
    tag: "Programming + Interfacing",
    color: ORANGE,
    rows: [
      ["2.1", "Digital Input", "Read digital signals and understand how Arduino handles digital inputs."],
      ["2.2", "Digital Output", "Control LEDs and other digital outputs using Arduino GPIO."],
      ["2.3", "Switch Interfacing", "Interface switches and understand reliable digital input handling."],
      ["2.4", "Pull-Up & Pull-Down", "Understand pull-up and pull-down topology for stable switch inputs."],
      ["2.5", "Analog Input & Output", "Work with analog input/output concepts and analog signals."],
      ["2.6", "Serial Monitor", "Use the serial monitor for debugging, monitoring and communicating with Arduino applications."],
      ["2.7", "LCD Interfacing", "Interface an LCD to display application data."],
      ["2.8", "Ultrasonic Sensor", "Interface an ultrasonic sensor and use distance measurements in an Arduino application."],
      ["2.9", "Servo Motor", "Control a servo motor using Arduino."],
    ],
  },
  {
    number: "03",
    title: "IoT Fundamentals",
    tag: "Connected Systems",
    color: BLUE,
    rows: [
      ["3.1", "Introduction to IoT", "Understand the Internet of Things and the role of connected devices."],
      ["3.2", "IoT Layered Architecture", "Learn the layered architecture used to describe IoT systems."],
      ["3.3", "Applications of IoT", "Explore practical applications of IoT across connected systems."],
      ["3.4", "ESP8266 Hardware", "Understand ESP8266 hardware and its role in Wi-Fi-enabled IoT applications."],
      ["3.5", "Software Setup", "Set up the software environment for ESP8266-based IoT development."],
      ["3.6", "Simulation with Wokwi", "Simulate Arduino and IoT circuits and Arduino code using Wokwi."],
      ["3.7", "Input & Output", "Work with inputs and outputs in an ESP8266/NodeMCU IoT application."],
      ["3.8", "Sensors with NodeMCU", "Connect sensors to NodeMCU and process sensor data."],
    ],
  },
  {
    number: "04",
    title: "Advanced IoT",
    tag: "Networking + Cloud",
    color: ORANGE,
    rows: [
      ["4.1", "Wi-Fi Basics", "Understand the fundamentals of Wi-Fi communication for IoT devices."],
      ["4.2", "Station & Access Point", "Learn station and access-point modes for ESP8266 connectivity."],
      ["4.3", "TCP/IP Stack", "Understand the networking concepts that allow IoT devices to communicate over IP networks."],
      ["4.4", "ESP8266 as Web Server", "Build a web server using ESP8266 and interact with the device over a network."],
      ["4.5", "HTTP Protocol", "Understand HTTP and its role in web-based IoT communication."],
      ["4.6", "Arduino IoT Cloud", "Connect devices to Arduino IoT Cloud and work with connected data."],
      ["4.7", "ThingSpeak Cloud", "Send and visualise IoT data using ThingSpeak Cloud."],
      ["4.8", "Blynk IoT Cloud", "Build connected IoT applications using Blynk IoT Cloud."],
    ],
  },
  {
    number: "05",
    title: "Labs & Project Work",
    tag: "Build + Apply",
    color: BLUE,
    rows: [
      ["5.1", "Hands-on Labs", "Apply Arduino, sensor, actuator and IoT concepts through practical laboratory activities."],
      ["5.2", "Real-Time Projects", "Build practical Arduino and IoT applications using the concepts covered in the internship."],
      ["5.3", "ESP8266 Projects", "Access ESP8266 project examples and source code for continued practice."],
      ["5.4", "Learning Resources", "Use exclusive PDFs and cheat sheets to revise and reference the internship content."],
    ],
  },
];

const faqs = [
  {
    question: "What is the Arduino and IoT internship?",
    answer:
      "This is a structured 4-week hands-on internship focused on Arduino and Internet of Things systems. The program progresses from Arduino fundamentals and programming to sensors, actuators, ESP8266, IoT architecture, Wi-Fi, web servers, HTTP and IoT cloud platforms.",
  },
  {
    question: "Who is this Arduino and IoT internship for?",
    answer:
      "The internship is designed for engineering students and learners who want practical exposure to Arduino, embedded programming and connected IoT systems. It is suitable for beginners as well as learners who want to strengthen their hands-on IoT fundamentals.",
  },
  {
    question: "Do I need prior Arduino experience?",
    answer:
      "No. The curriculum starts with an introduction to Arduino, hardware, software and programming basics before progressing into peripheral interfacing and IoT development.",
  },
  {
    question: "Do I need an Arduino or ESP8266 board?",
    answer:
      "The internship includes simulation-based learning with Wokwi, so you can practise the covered concepts using a software-based environment. Physical hardware can be useful for additional hands-on practice, but the syllabus itself includes simulation as part of the learning path.",
  },
  {
    question: "What will I learn during the Arduino part?",
    answer:
      "You will learn Arduino fundamentals, different Arduino types and applications, hardware and software setup, programming basics, simulation, compiling and downloading code, digital input/output, switch interfacing, pull-up and pull-down topology, analog input/output, serial monitor, LCD interfacing, ultrasonic sensors and servo motors.",
  },
  {
    question: "What will I learn in the IoT part?",
    answer:
      "You will learn IoT fundamentals and layered architecture, IoT applications, ESP8266 hardware and software setup, Wokwi simulation, NodeMCU sensor interfacing, Wi-Fi basics, station and access-point modes, TCP/IP, ESP8266 web servers and HTTP.",
  },
  {
    question: "Which IoT cloud platforms are covered?",
    answer:
      "The internship covers Arduino IoT Cloud, ThingSpeak Cloud and Blynk IoT Cloud.",
  },
  {
    question: "What is Wokwi?",
    answer:
      "Wokwi is used in the internship as a simulation environment for practising Arduino and IoT circuits and Arduino code without depending entirely on physical hardware.",
  },
  {
    question: "How much practical work is included?",
    answer:
      "The syllabus specifically includes hands-on labs and real-time projects, along with access to ESP8266 projects and source codes for continued practice.",
  },
  {
    question: "Is the internship online?",
    answer:
      "The Arduino and IoT program is offered online. The syllabus also indicates online and offline modes as part of the program offering, so the applicable mode depends on the batch or enrollment option.",
  },
  {
    question: "How long is the internship?",
    answer:
      "The internship is structured as a 4-week hands-on program.",
  },
  {
    question: "Will I receive an internship offer letter?",
    answer:
      "An internship offer letter is part of the program's internship documentation process.",
  },
  {
    question: "Will I receive an internship completion certificate?",
    answer:
      "After completing the applicable internship requirements and evaluation process, you receive an internship completion certificate according to the program process.",
  },
  {
    question: "Can I submit the internship certificate to my college?",
    answer:
      "The internship documentation is intended to help students document their internship participation and completion. Final acceptance depends on your college or university's internship requirements, so students should confirm any specific documentation requirements with their institution.",
  },
  {
    question: "Can I add this internship to my resume and LinkedIn profile?",
    answer:
      "Yes. You can accurately include the internship, skills developed and projects completed on your resume and LinkedIn profile.",
  },
  {
    question: "What do I receive during the internship?",
    answer:
      "The syllabus includes structured Arduino and IoT learning, hands-on labs and real-time projects, exclusive PDFs and cheat sheets, and access to ESP8266 projects and source codes.",
  },
  {
    question: "What is the fee for the Arduino and IoT internship?",
    answer:
      "The online Arduino and IoT internship is ₹999 as a one-time payment.",
  },
  {
    question: "When can I start the internship?",
    answer:
      "You can begin the internship according to the enrollment and batch process after successfully completing registration and payment.",
  },
  {
    question: "Is this an internship or a course?",
    answer:
      "It is structured as an internship program that combines technical learning, hands-on laboratory work, real-time projects and internship documentation.",
  },
  {
    question: "How do I enroll in the Arduino and IoT internship?",
    answer:
      "Click the Enroll Now button, complete your enrollment details and proceed with the payment. The enrollment flow will open the Make IoT internship registration process.",
  },
  {
    question: "Is there a referral benefit?",
    answer:
      "Yes. Make IoT has a referral program where an eligible referral can provide a benefit to both the existing participant and the referred student after the referred student's enrollment is successfully confirmed.",
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

export default function ArduinoIOT() {
  const [enrollOpen, setEnrollOpen] = React.useState(false);

  const openEnrollment = () => setEnrollOpen(true);

  React.useEffect(() => {
    const title =
      "Arduino & IoT Internship | Make IoT";

    const description =
      "Join Make IoT's 4-week Arduino & IoT Internship. Learn Arduino programming, sensors, actuators, ESP8266, Wi-Fi, networking, web servers, HTTP and IoT cloud platforms through hands-on projects.";

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
      "Arduino IoT Internship, Arduino Internship, IoT Internship, ESP8266, NodeMCU, Wokwi, Arduino IoT Cloud, ThingSpeak, Blynk, Arduino and IoT systems, Make IoT"
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
          name: "Arduino & IoT Internship",
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
            price: "999",
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

    let schema = document.getElementById("arduino-iot-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "arduino-iot-schema";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);

    return () => {
      const currentSchema = document.getElementById("arduino-iot-schema");
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
                  Hands-on
                </div>

                <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-slate-900">
                  Arduino &amp; IoT
                  <br />
                  <span className="text-[#0055FF]">
                    Internship
                  </span>
                  <br />
                  for Connected Systems
                </h1>

                <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-slate-600">
                  Build practical Arduino and IoT skills through a structured 4-week internship covering programming, sensors, ESP8266, Wi-Fi, networking and cloud-connected applications.
                </p>

                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-display font-bold text-4xl lg:text-5xl text-slate-900">
                    ₹999
                  </span>
                  <span className="text-sm text-slate-500">one-time</span>
                </div>

                <div className="mt-7 flex flex-wrap gap-4">
                  <button
                    onClick={openEnrollment}
                    className="inline-flex items-center justify-center rounded-xl bg-[#0055FF] px-7 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#0044CC] transition"
                  >
                    Enroll for ₹999
                  </button>

                  <a
                    href="/assets/Arduino and IoT Internship.pdf"
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
                    ["Hands-on", "Labs & projects"],
                    ["ESP8266", "IoT development"],
                    ["₹999", "One-time fee"],
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
                    src="/assets/arduino-iot-training.png"
                    alt="Students learning Arduino and IoT at Make IoT"
                    className="w-full h-[430px] sm:h-[500px] lg:h-[540px] object-cover object-[45%_55%]"
                  />

                  <div className="grid grid-cols-3 bg-[#0A0F1C] text-white">
                    {[
                      ["Arduino", "Practical learning"],
                      ["ESP8266", "IoT connectivity"],
                      ["Real Projects", "Build & apply"],
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
                    Practical Arduino and IoT training with sensors, ESP8266 and project-based learning.
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
                A structured four-week internship that starts with Arduino fundamentals and progresses to ESP8266, IoT networking, web servers and cloud platforms through practical learning.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["4 Weeks", "Structured internship"],
                ["Hands-on", "Labs & projects"],
                ["ESP8266", "IoT development"],
                ["₹999", "One-time fee"],
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
                A structured 4-week internship covering Arduino Programming, Arduino
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
                  black="From Arduino."
                  blue="Into connected IoT."
                  className="max-w-xl"
                />

                <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600 max-w-xl">
                  Learn the development workflow from writing Arduino sketches
                  to simulating circuits, connecting an ESP8266 and sending
                  data to IoT platforms.
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    [
                      "Arduino IDE",
                      "Write Arduino sketches, compile your code and understand the basic Arduino development workflow.",
                    ],
                    [
                      "Wokwi Simulation",
                      "Simulate Arduino and IoT circuits and firmware before working with physical hardware.",
                    ],
                    [
                      "ESP8266 / NodeMCU",
                      "Move from basic Arduino applications to Wi-Fi-enabled IoT systems using ESP8266 and NodeMCU.",
                    ],
                    [
                      "IoT Cloud Platforms",
                      "Work with Arduino IoT Cloud, ThingSpeak Cloud and Blynk IoT Cloud to connect and visualise IoT data.",
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
                      esp8266_iot.ino
                    </span>
                  </div>

                  <pre className="p-5 sm:p-6 overflow-x-auto text-sm sm:text-base leading-7 font-mono">
                    <code>
                      <span className="text-slate-500">
                        {"// ESP8266 Wi-Fi connection\n"}
                        {"// Device → Network → IoT platform\n\n"}
                      </span>

                      <span className="text-[#5EE6A8]">
                        {"WiFi.begin(SSID, PASSWORD);"}
                      </span>

                      <span className="text-slate-500">
                        {"  // connect to Wi-Fi\n\n"}
                      </span>

                      <span className="text-[#FFB347]">
                        {"while (WiFi.status() != WL_CONNECTED) {\n"}
                      </span>

                      <span className="text-white">
                        {"  delay(500);\n"}
                      </span>

                      <span className="text-[#FFB347]">
                        {"}\n\n"}
                      </span>

                      <span className="text-slate-500">
                        {"// Read sensor data\n"}
                      </span>

                      <span className="text-[#5EE6A8]">
                        {"int value = analogRead(A0);\n"}
                      </span>

                      <span className="text-slate-500">
                        {"// Send data to an IoT cloud platform"}
                      </span>
                    </code>
                  </pre>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#0055FF]">
                      Arduino
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Start with programming, GPIO, sensors, actuators and
                      serial monitoring.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#FF7A00]">
                      IoT
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Continue into Wi-Fi, TCP/IP, HTTP, web servers and
                      cloud-connected applications.
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
                <div className="flex items-center justify-between gap-4 mb-6">
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

                {/* Fixed-size display stage keeps both documents visually balanced.
                    Each image keeps its original aspect ratio. */}
                <a
                  href="/assets/iot-offer-letter.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Internship Offer Letter in full size"
                  className="group block"
                >
                  <div className="h-[360px] sm:h-[420px] lg:h-[440px] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/iot-offer-letter.png"
                      alt="Make IoT Internship Offer Letter"
                      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Official internship document
                    </span>

                    <span className="text-xs font-semibold text-[#0055FF] group-hover:underline">
                      View full document ↗
                    </span>
                  </div>
                </a>

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

              {/* COMPLETION CERTIFICATE */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
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

                {/* Fixed-size display stage keeps both documents visually balanced.
                    Each image keeps its original aspect ratio. */}
                <a
                  href="/assets/iot-completion-certificate.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Internship Completion Certificate in full size"
                  className="group block"
                >
                  <div className="h-[360px] sm:h-[420px] lg:h-[440px] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/iot-completion-certificate.png"
                      alt="Make IoT Internship Completion Certificate"
                      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Official internship document
                    </span>

                    <span className="text-xs font-semibold text-[#FF7A00] group-hover:underline">
                      View full document ↗
                    </span>
                  </div>
                </a>

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

            {/* DOCUMENT USAGE */}
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
                black="Complete your internship"
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
                      ₹999
                    </span>
                    <span className="text-base font-mono text-slate-200">
                      one-time
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "4-week hands-on internship",
                    "Arduino fundamentals & programming",
                    "GPIO, sensors & actuators",
                    "ESP8266 & NodeMCU",
                    "Wi-Fi, TCP/IP & HTTP",
                    "Arduino IoT Cloud, ThingSpeak & Blynk",
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
              blue="embedded systems & IoT experience."
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
                    "Arduino",
                    "ESP8266",
                    "IoT",
                    "AUTOSAR",
                    "Edge AI",
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
              Find answers about the Arduino internship, curriculum, practical
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
        initialProgram="arduino-iot"
        initialRef=""
        onClose={() => setEnrollOpen(false)}
      />
    </div>
  );
}
