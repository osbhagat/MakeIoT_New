import React from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/*
  WORKSHOP CONTENT MODEL
  ----------------------
  Add one object per college.

  Image paths:
  /assets/workshops/sinhgad-Pune/group.jpg
  /assets/workshops/sinhgad-Pune/student_learning.jpg
  /assets/workshops/sinhgad-Pune/student-building-projects.jpg
  /assets/workshops/sinhgad-Pune/doubt-solving.jpg
  /assets/workshops/sinhgad-Pune/arduino-explianed.jpg
*/

const workshops = [
  {
    id: "sinhgad-Pune",

    college: "Sinhgad College of Engineering, Pune",

    location: "Pune, Maharashtra",

    date: "2nd and 3rd November 2023",

    branch: "Electronics & Telecommunication",

    students: "90+",

    title:
      "IoT with Arduino & ESP32: Hands-On Embedded Systems Workshop",

    description:
      "A hands-on IoT and embedded systems workshop conducted for 2nd and 3rd year Electronics & Telecommunication engineering students at Sinhgad College of Engineering, Pune. The workshop introduced students to Arduino and ESP32 development through a combination of simulation-based learning, live demonstrations, programming exercises, and practical work using real hardware kits. Students explored microcontroller fundamentals, Arduino programming, ESP32 development, sensor interfacing, and the basics of building IoT-based projects. The workshop was designed to help beginners build a strong practical foundation and take their first step toward learning embedded systems and IoT development.",

    topics: [
      "Arduino",
      "ESP32",
      "IoT Fundamentals",
      "Microcontrollers",
      "Embedded Systems",
      "Arduino Programming",
      "IoT Projects",
      "Simulation & Hardware",
      "Embedded Programming",
    ],

    images: [
      {
        src: "/assets/workshops/sinhgad-Pune/group.jpg",
        alt:
          "IoT and embedded systems workshop students at Sinhgad College of Engineering Pune",
        caption:
          "Engineering students participating in the hands-on IoT and embedded systems workshop.",
      },

      {
        src: "/assets/workshops/sinhgad-Pune/student_learning.jpg",
        alt:
          "Students learning Arduino and ESP32 development during an IoT workshop at Sinhgad College of Engineering Pune",
        caption:
          "Students following a live demonstration of Arduino and ESP32 development.",
      },

      {
        src: "/assets/workshops/sinhgad-Pune/student-building-projects.jpg",
        alt:
          "Engineering students building IoT projects using Arduino and ESP32 hardware",
        caption:
          "Students applying IoT concepts through hands-on hardware activities.",
      },

      {
        src: "/assets/workshops/sinhgad-Pune/doubt-solving.jpg",
        alt:
          "Students discussing Arduino and ESP32 programming during an IoT workshop",
        caption:
          "Interactive doubt-solving and technical discussion with workshop participants.",
      },

        {
          src: "/assets/workshops/sinhgad-Pune/hands-on-circuit.jpg",
          alt: "Engineering students working on Arduino and circuit hardware during a hands-on workshop at Sinhgad College of Engineering Pune",
          caption: "Students developing and testing circuits with laptops and hands-on hardware kits."
        },
        {
          src: "/assets/workshops/sinhgad-Pune/Arduino-hardware.jpg",
          alt: "Engineering students working with Arduino hardware and electronic components during an IoT workshop in Pune",
          caption: "Students experimenting with Arduino hardware and electronic components as part of the practical IoT session."
        },
        {
          src: "/assets/workshops/sinhgad-Pune/student-teamwork.jpg",
          alt: "Engineering students collaborating on Arduino and IoT projects during a practical workshop at Sinhgad College of Engineering",
          caption: "Students collaborating on IoT projects and applying concepts through practical hardware-based learning."
        },
      
        {
        src: "/assets/workshops/sinhgad-Pune/teaching.jpg",
        alt:
          "Arduino simulation explained and help to build projects for electronics students during an IoT workshop in Pune",
        caption:
          "Arduino simulation and project development with TinkerCAD simulation in IoT.",
      },

        {
        src: "/assets/workshops/sinhgad-Pune/student-hands-on-arduino.jpg",
        alt: "Engineering students building an Arduino IoT circuit during a hands-on workshop at Sinhgad College of Engineering Pune",
        caption: "Students building and testing an Arduino-based circuit using electronic components and jumper wires."
      }

    ],

    feedback: [],

    video: "",
  },
  
  {
  id: "kbp-satara",

  college: "Karmaveer Bhaurao Patil College of Engineering, Satara",

  location: "Satara, Maharashtra",

  date: "20th and 21st October 2024",

  branch: "Electronics and Electrical Engineering",

  students: "120+",

  title:
    "Arduino & IoT Workshop: Hands-On Embedded Systems and ESP32 Development",

  description:
    "A two-day hands-on Arduino and IoT workshop conducted for engineering students at Karmaveer Bhaurao Patil College of Engineering, Satara. The workshop focused on building a strong practical foundation in Arduino, ESP32, embedded systems, and IoT technologies. Students were introduced to microcontroller programming, Arduino development, ESP32, networking fundamentals, TCP/IP concepts, and circuit simulation using Tinkercad and Wokwi. Through guided demonstrations, programming exercises, simulation-based activities, and practical problem-solving, students learned how hardware and software work together to build embedded and IoT applications. Participants also developed and tested their own projects in a simulated environment, gaining hands-on experience in designing and understanding basic embedded systems.",

  topics: [
    "Arduino",
    "ESP32",
    "IoT Fundamentals",
    "Embedded Systems",
    "Microcontrollers",
    "Arduino Programming",
    "ESP32 Development",
    "Computer Networking",
    "TCP/IP",
    "Circuit Simulation",
    "Wokwi Simulation",
    "Tinkercad",
    "IoT Projects",
    "Embedded Programming",
    "Project Development",
  ],

  images: [
    {
      src: "/assets/workshops/kbp-satara/group.jpg",
      alt:
        "120 plus engineering students participating in an Arduino and IoT workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Engineering students and faculty participating in the two-day Arduino and IoT workshop at Karmaveer Bhaurao Patil College of Engineering, Satara.",
    },

    {
      src: "/assets/workshops/kbp-satara/workshop-session.jpg",
      alt:
        "Engineering students attending an Arduino and IoT workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Students attending an interactive workshop session covering Arduino, ESP32, IoT, and embedded systems.",
    },

    {
      src: "/assets/workshops/kbp-satara/arduino-circuit.jpg",
      alt:
        "Arduino circuit simulation demonstrated during an embedded systems workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Students learning Arduino programming and circuit interfacing through practical demonstrations.",
    },

    {
      src: "/assets/workshops/kbp-satara/student-project.jpg",
      alt:
        "Students working on Arduino simulation projects during an IoT workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Students developing and testing Arduino-based projects using simulation tools.",
    },

    {
      src: "/assets/workshops/kbp-satara/arduino-programming.jpg",
      alt:
        "Arduino programming and circuit simulation session at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Students exploring Arduino programming, circuit design, and input-output interfacing through simulation.",
    },

    {
        src: "/assets/workshops/kbp-satara/student-interaction.jpg",
        alt:
          "Engineering students interacting and engaging during an Arduino and IoT workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
        caption:
          "Students interacting with the instructor and engaging in an interactive learning session during the Arduino and IoT workshop.",

    },

    {
      src: "/assets/workshops/kbp-satara/networking-session.jpg",
      alt:
        "Students learning networking and TCP IP concepts during an IoT workshop in Satara",
      caption:
        "Students learning the fundamentals of computer networking and TCP/IP communication for IoT applications.",
    },

    {
      src: "/assets/workshops/kbp-satara/presentation.jpg",
      alt:
        "Arduino simulation and IoT concepts presentation during a workshop at Karmaveer Bhaurao Patil College of Engineering Satara",
      caption:
        "Interactive technical session covering Arduino simulation, IoT concepts, and embedded system development.",
    },
  ],
},

{
  id: "VPKBIT",

  college:
    "Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology",

  location: "Baramati, Maharashtra",

  date: "28th and 29th December 2024",

  branch: "Electronics & Telecommunication",

  students: "60+",

  title:
    "Embedded System Design with STM32 & ARM Cortex-M4: Hands-On Workshop",

  description:
    "A hands-on embedded systems workshop conducted for engineering students at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology, Baramati. The workshop focused on embedded system design using STM32 microcontrollers and the ARM Cortex-M4 architecture, combining theoretical concepts with practical implementation. Students worked with STM32F1 Blue Pill development boards, Proteus simulation, STM32CubeIDE, and Embedded C programming. The sessions covered both register-level programming and STM32 HAL-based development, helping students understand how microcontroller peripherals and hardware resources are configured and controlled at different programming levels. Through live demonstrations, programming exercises, Proteus simulation, and hands-on hardware activities, students gained practical exposure to STM32 development and embedded system design.",

  topics: [
    "Embedded Systems",
    "STM32 Microcontrollers",
    "ARM Cortex-M4",
    "STM32F1 Blue Pill",
    "STM32CubeIDE",
    "Embedded C Programming",
    "Register-Level Programming",
    "STM32 HAL Programming",
    "GPIO Programming",
    "Timers",
    "Microcontroller Peripherals",
    "Proteus Simulation",
    "Hardware Interfacing",
    "STM32 Development Workflow",
    "Embedded System Design",
  ],

  images: [

        {
      src: "/assets/workshops/VPKBIT/student-team.jpg",
      alt:
        "Students working together on STM32 embedded system programming during a workshop",
      caption:
        "Students collaborating on STM32 programming tasks and practical embedded system experiments.",
    },


    {
      src: "/assets/workshops/VPKBIT/hands-on-programming.jpg",
      alt:
        "Engineering students performing hands-on STM32 programming using laptops and electronic hardware",
      caption:
        "Students implementing and testing STM32 programs using development boards and laptops.",
    },

    {
      src: "/assets/workshops/VPKBIT/classroom-session.jpg",
      alt:
        "Engineering students attending an embedded systems practical session at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology",
      caption:
        "Students participating in the practical embedded systems session with live demonstrations and programming activities.",
    },

    {
      src: "/assets/workshops/VPKBIT/student-hardware-work.jpg",
      alt:
        "Students working with STM32 hardware and laptops during a practical embedded systems workshop",
      caption:
        "Students working with STM32 hardware, electronic components, and embedded programming tools.",
    },

    {
      src: "/assets/workshops/VPKBIT/arm-cortex-m4-session.jpg",
      alt:
        "Instructor explaining ARM Cortex-M4 architecture during an embedded systems workshop",
      caption:
        "An interactive session explaining the ARM Cortex-M4 processor architecture and its internal components.",
    },

    {
      src: "/assets/workshops/VPKBIT/stm32-development-board.jpg",
      alt:
        "STM32 development board presentation during an embedded systems workshop at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology",
      caption:
        "Introduction to STM32 development boards and their features as part of the embedded systems workshop.",
    },

    {
      src: "/assets/workshops/VPKBIT/workshop-session.jpg",
      alt:
        "Students attending an ARM Cortex-M4 and STM32 embedded systems workshop at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology",
      caption:
        "Students attending the technical session on ARM Cortex-M4 and STM32-based embedded system design.",
    },

        {
      src: "/assets/workshops/VPKBIT/stm32-bluepill.jpg",
      alt:
        "STM32F1 Blue Pill development board connected to electronic hardware during an embedded systems workshop",
      caption:
        "STM32F1 Blue Pill development board used for hands-on embedded system programming and hardware experimentation.",
    },
  ],
},

{
  id: "SCOE",

  college:
    "Sanjivani College of Engineering, Kopargaon",

  location: "Kopargaon, Maharashtra",

  date: "10th March 2025",

  branch: "Electronics & Electrical",

  students: "100+",

  title:
    "Career in Embedded Systems and IoT",

  description:
    "A detailed career guidance and technical interaction session conducted for Electronics and Electrical Engineering students at Sanjivani College of Engineering, Kopargaon. The session focused on career opportunities in Embedded Systems and IoT, providing students with practical insights into the industry, available career paths, required technical skills, and preparation strategies for embedded engineering roles. The discussion covered Embedded C programming, microcontrollers and controller-based systems, important technical concepts for embedded interviews, interview preparation, project development, and job readiness. Students also participated in an interactive doubt-solving session covering technical concepts, career planning, interview preparation, and industry expectations. The session aimed to help students understand the gap between academic learning and industry requirements and provided guidance on building the technical skills and practical experience needed for careers in Embedded Systems, IoT, Electronics, and related domains.",

  topics: [
    "Embedded Systems",
    "IoT",
    "Embedded Systems Industry",
    "Career Opportunities in Embedded Systems",
    "Career Path in Embedded Systems",
    "Embedded C Programming",
    "Microcontrollers",
    "Controller Programming",
    "Embedded Hardware",
    "Technical Interview Preparation",
    "Embedded Interview Topics",
    "Industry Requirements",
    "Project Development",
    "Technical Doubt Solving",
    "Job Preparation",
    "Core Electronics Careers",
    "Resume Preparation",
    "Practical Skill Development",
  ],

  images: [
    {
      src: "/assets/workshops/SCOE/career-session.jpg",
      alt:
        "Students attending a career guidance session on Embedded Systems and IoT at Sanjivani College of Engineering, Kopargaon",
      caption:
        "Students attending an interactive career guidance session focused on Embedded Systems and IoT opportunities.",
    },

    {
      src: "/assets/workshops/SCOE/technical-session.jpg",
      alt:
        "Engineering students participating in a technical session on Embedded Systems and IoT",
      caption:
        "Students participating in technical discussions covering embedded systems, programming, and industry requirements.",
    },

    {
      src: "/assets/workshops/SCOE/classroom-discussion.jpg",
      alt:
        "Electronics and Electrical Engineering students attending an embedded systems career session",
      caption:
        "Interactive classroom discussion on embedded engineering careers, technical skills, and interview preparation.",
    },

    {
      src: "/assets/workshops/SCOE/student-discussion.jpg",
      alt:
        "Engineering students discussing technical topics during an Embedded Systems and IoT session",
      caption:
        "Students engaging in technical discussions and gaining practical guidance for embedded engineering careers.",
    },

    {
      src: "/assets/workshops/SCOE/job-preparation.jpg",
      alt:
        "Students preparing for embedded systems technical interviews and job opportunities",
      caption:
        "Students learning about technical interview preparation, job readiness, and industry expectations.",
    },

    {
      src: "/assets/workshops/SCOE/interactive-session.jpg",
      alt:
        "Interactive Embedded Systems and IoT career guidance session with engineering students",
      caption:
        "Interactive session covering career paths, Embedded C, controllers, interview topics, and job preparation.",
    },
  ],
},

{
  id: "SVPMCOE",

  college:
    "SVPM's College of Engineering, Malegaon",

  location: "Malegaon, Maharashtra",

  date: "6th and 7th July 2025",

  branch: "Electronics & Telecommunication",

  students: "60+",

  title:
    "ARM Cortex-M4 Based STM32 Controller: Hands-On Embedded Systems Workshop",

  description:
    "A hands-on embedded systems workshop conducted for 60+ engineering students at SVPM's College of Engineering, Malegaon. The workshop focused on ARM Cortex-M4 based STM32 microcontrollers and provided students with a practical introduction to modern embedded system development. The sessions covered STM32 controller architecture, ARM Cortex-M4 processor architecture, clock configuration, GPIO programming, UART communication, and the fundamentals of microcontroller-based system design. Students were introduced to STM32 Discovery development boards and explored the STM32 development environment through demonstrations, programming activities, and practical examples. The workshop also included an introduction to QEMU emulation, helping students understand how embedded systems and controller-based applications can be explored and tested in a simulated environment. Along with technical concepts, the sessions connected embedded systems knowledge with industry-oriented learning, including internship opportunities, relevant embedded systems courses, and interview preparation. The workshop was designed to bridge the gap between academic concepts and practical embedded engineering skills, giving students a clearer understanding of ARM-based STM32 development and potential career pathways in embedded systems.",

  topics: [
    "Embedded Systems",
    "ARM Cortex-M4",
    "STM32 Microcontrollers",
    "STM32 Controller Architecture",
    "ARM Processor Architecture",
    "STM32 Discovery Board",
    "QEMU Emulation",
    "Microcontroller Fundamentals",
    "Clock Configuration",
    "Clock System",
    "GPIO Programming",
    "UART Communication",
    "Serial Communication",
    "Microcontroller Peripherals",
    "Embedded C Programming",
    "STM32 Development",
    "Hardware-Based Embedded Development",
    "Embedded System Design",
    "Internship Opportunities",
    "Embedded Systems Courses",
    "Industry-Oriented Skills",
    "Interview Preparation",
    "Embedded Systems Career Opportunities",
  ],

  images: [

    {
      src: "/assets/workshops/SVPMCOE/student-workshop-session.jpg",
      alt:
        "Engineering students attending an ARM Cortex-M4 and STM32 embedded systems workshop at SVPM's College of Engineering",
      caption:
        "Engineering students participating in an interactive STM32 and ARM Cortex-M4 embedded systems session.",
    },

    {
      src: "/assets/workshops/SVPMCOE/stm32-classroom-session.jpg",
      alt:
        "Students attending a practical STM32 controller session with laptops and classroom demonstrations",
      caption:
        "Students following practical demonstrations on STM32 controllers, ARM Cortex-M4 architecture, and embedded development.",
    },

    {
      src: "/assets/workshops/SVPMCOE/embedded-systems-session.jpg",
      alt:
        "Engineering students attending an embedded systems lecture and practical demonstration",
      caption:
        "Students learning embedded system concepts through live explanations, demonstrations, and programming examples.",
    },

    {
      src: "/assets/workshops/SVPMCOE/arm-cortex-session.jpg",
      alt:
        "Students learning ARM Cortex-M4 architecture and STM32 controller concepts during a workshop",
      caption:
        "An interactive session covering ARM Cortex-M4 architecture, STM32 controllers, and microcontroller fundamentals.",
    },

    {
      src: "/assets/workshops/SVPMCOE/stm32-programming-session.jpg",
      alt:
        "Engineering students working on laptops during an STM32 programming workshop",
      caption:
        "Students working with laptops while exploring STM32 development and embedded programming concepts.",
    },

    {
      src: "/assets/workshops/SVPMCOE/technical-demonstration.jpg",
      alt:
        "Instructor explaining STM32 development concepts to engineering students using a projected presentation",
      caption:
        "Live technical demonstration covering STM32 development, ARM architecture, and embedded system concepts.",
    },

    {
      src: "/assets/workshops/SVPMCOE/faculty-interaction.jpg",
      alt:
        "Faculty members and workshop instructor during the STM32 embedded systems workshop",
      caption:
        "Faculty interaction and felicitation during the embedded systems workshop at SVPM's College of Engineering.",
    },

    {
      src: "/assets/workshops/SVPMCOE/student-learning-session.jpg",
      alt:
        "Engineering students participating in an instructor-led STM32 and ARM Cortex-M4 learning session",
      caption:
        "Students actively participating in the instructor-led technical session on ARM Cortex-M4 and STM32 development.",
    },

  ],
},

{
  id: "ZealCOE",
  college: "Zeal College of Engineering & Research",
  location: "Pune, Maharashtra",
  date: "19th July 2025",
  branch: "Electrical Engineering",
  students: "80+",
  title: "Introduction to Embedded Systems & Career in Embedded Systems",
  description:
    "An interactive embedded systems session conducted for 80+ Electrical Engineering students at Zeal College of Engineering & Research, Pune. The session introduced students to embedded systems, IoT, Arduino, STM32, automotive embedded systems, embedded programming, industry requirements, internships, and career opportunities in Pune and Bengaluru.",
  topics: [
    "Introduction to Embedded Systems",
    "Embedded Systems Fundamentals",
    "Arduino and IoT Applications",
    "STM32 Microcontrollers",
    "Embedded C and Programming",
    "Automotive Embedded Systems",
    "Embedded Systems Jobs and Industry Opportunities",
    "Embedded Internships and Career Paths",
    "Embedded Career Opportunities in Pune and Bengaluru",
    "Skills Required for an Embedded Engineer"
  ],
  images: [
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-embedded-internship-session.jpg",
      alt: "Embedded systems internship session for Electrical Engineering students at Zeal College Pune",
      caption: "Embedded systems internship and career session for Electrical Engineering students at Zeal College of Engineering & Research, Pune"
    },
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-arduino-iot-session.jpg",
      alt: "Arduino and IoT embedded systems training session at Zeal College Pune",
      caption: "Introduction to Arduino, IoT and embedded systems during the MakeIoT Institute session in Pune"
    },
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-embedded-career-session.jpg",
      alt: "Embedded career opportunities and embedded jobs presentation in Pune",
      caption: "Discussion on embedded career opportunities, embedded jobs and industry skills for students in Pune"
    },
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-stm32-embedded-session.jpg",
      alt: "STM32 microcontroller and embedded systems career session for engineering students",
      caption: "Exploring STM32, microcontrollers and industry-relevant embedded engineering skills"
    },
    {
      src: "/assets/workshops/ZealCOE/makeiot-institute-pune-embedded-career-workshop.jpg",
      alt: "MakeIoT Institute Pune embedded systems career workshop for engineering students",
      caption: "MakeIoT Institute Pune conducting an embedded systems and career awareness workshop"
    },
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-automotive-embedded-career.jpg",
      alt: "Automotive embedded systems career opportunities for Electrical Engineering students",
      caption: "Understanding automotive embedded systems and career opportunities in the embedded industry"
    },
    {
      src: "/assets/workshops/ZealCOE/zeal-coe-pune-bangalore-embedded-jobs.jpg",
      alt: "Embedded jobs in Pune and Bengaluru discussed with engineering students",
      caption: "Career discussion covering embedded jobs and opportunities in Pune and Bengaluru"
    }
  ]
},

];

export default function Workshops() {
  const [activeImage, setActiveImage] = React.useState(null);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,85,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,0.055)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0055FF]" />

              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-slate-600">
                Campus Workshops
              </span>
            </div>

            <h1 className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-950 leading-[1.05]">
              Real classrooms.
              <br />
              <span className="text-[#0055FF]">
                Real hands-on learning.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-8 text-slate-600">
              Explore Make IoT workshops conducted at engineering colleges and
              universities. See the classrooms, practical activities, student
              interactions and learning experiences behind each session.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#workshops"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0055FF] px-5 py-3 font-semibold text-white transition hover:bg-[#0044CC]"
              >
                Explore workshops
                <ArrowRight size={17} />
              </a>

              <Link
                to="/#programs"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-[#0055FF] hover:text-[#0055FF]"
              >
                View programs
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              ["Campus sessions", "Hands-on workshops"],
              ["Engineering students", "Practical learning"],
              ["Embedded + IoT", "Technical focus"],
              ["Real documentation", "Photos & videos"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
              >
                <div className="font-display font-bold text-lg sm:text-xl text-slate-950">
                  {value}
                </div>

                <div className="mt-1 text-xs sm:text-sm text-slate-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* =========================================================
          WORKSHOPS
      ========================================================= */}
      <main id="workshops" className="bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {workshops.map((workshop, index) => (
            <WorkshopSection
              key={workshop.id}
              workshop={workshop}
              index={index}
              onImageClick={setActiveImage}
            />
          ))}

          {/* =====================================================
              END CTA
          ===================================================== */}
          <section className="py-16 lg:py-24">
            <div className="overflow-hidden rounded-3xl bg-[#0A0F1C] px-7 py-10 sm:px-10 lg:px-14 lg:py-12 text-white relative">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0055FF]/20 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#5EE6A8]">
                    Bring practical learning to campus
                  </p>

                  <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-tight">
                    Want a Make IoT workshop at your college?
                  </h2>

                  <p className="mt-4 text-slate-300 leading-7">
                    Connect with the Make IoT team to discuss a technical
                    workshop, hands-on training session or embedded systems
                    activity for your students.
                  </p>
                </div>

                <Link
                  to="/#contact"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 py-3.5 font-semibold text-white hover:bg-[#EA6B00] transition"
                >
                  Request a workshop
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* =========================================================
          IMAGE LIGHTBOX
      ========================================================= */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <div
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[78vh] w-full object-contain rounded-xl"
            />

            <p className="mt-4 text-center text-sm text-slate-300">
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


/* ===============================================================
   WORKSHOP SECTION
=============================================================== */

function WorkshopSection({
  workshop,
  index,
  onImageClick,
}) {
  const [start, setStart] = React.useState(0);

  const visibleCount = 3;

  const canPrev = start > 0;

  const canNext =
    start + visibleCount < workshop.images.length;

  const move = (direction) => {
    setStart((current) => {
      const next = current + direction;

      return Math.max(
        0,
        Math.min(
          next,
          Math.max(0, workshop.images.length - visibleCount)
        )
      );
    });
  };

  return (
    <section className="py-16 lg:py-24 border-b border-slate-200 last:border-b-0">

      {/* =========================================================
          WORKSHOP HEADER
          College + workshop title now get full width.
      ========================================================= */}
      <div>

        {/* Workshop number + location */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#0055FF]">
            Workshop {String(index + 1).padStart(2, "0")}
          </span>

          <span className="text-slate-300">
            •
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <MapPin size={13} />
            {workshop.location}
          </span>
        </div>

        {/* =====================================================
            COLLEGE NAME
            Full width so it does not unnecessarily wrap.
        ===================================================== */}
        <h2 className="mt-3 max-w-6xl text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-950 leading-[1.08]">
          {workshop.college}
        </h2>

        {/* =====================================================
            WORKSHOP NAME
        ===================================================== */}
        <p className="mt-3 max-w-5xl text-lg sm:text-xl font-semibold leading-7 text-slate-700">
          {workshop.title}
        </p>

        {/* =====================================================
            META + TOPICS
            Metadata on left, topic tags use available space.
        ===================================================== */}
        <div className="mt-5">

          {/* Date / branch / students */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500">
            <span>
              <strong className="text-slate-700">
                Date:
              </strong>{" "}
              {workshop.date}
            </span>

            <span>
              <strong className="text-slate-700">
                Branch:
              </strong>{" "}
              {workshop.branch}
            </span>

            <span>
              <strong className="text-slate-700">
                Students:
              </strong>{" "}
              {workshop.students}
            </span>
          </div>

          {/* Topic tags - full width and aligned from the left */}
          <div className="mt-3 flex flex-wrap gap-2">
            {workshop.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-[#0055FF]"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* =========================================================
          DESCRIPTION + GROUP IMAGE
          
          IMPORTANT:
          The old black "Workshop Snapshot" box has been removed.
          The FIRST IMAGE (group.jpg) is now displayed here.
      ========================================================= */}
      <div className="mt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-stretch">

        {/* Description */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">

          <p className="text-base sm:text-lg leading-8 text-slate-600">
            {workshop.description}
          </p>

        </div>


        {/* =====================================================
            GROUP PHOTO
        ===================================================== */}
        <button
          type="button"
          onClick={() => onImageClick(workshop.images[0])}
          className="group relative overflow-hidden rounded-3xl bg-slate-950 text-left min-h-[320px] lg:min-h-full"
        >
          <img
            src={workshop.images[0].src}
            alt={workshop.images[0].alt}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Image label */}
          <div className="absolute left-6 top-6">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm">
              Workshop Snapshot
            </span>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
              The workshop in action
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-200">
              {workshop.images[0].caption}
            </p>
          </div>
        </button>
      </div>


      {/* =========================================================
          PHOTO STRIP
      ========================================================= */}
      <div className="mt-10">

        <div className="flex items-center justify-between gap-4 mb-4">

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
              Workshop moments
            </p>

            <h3 className="mt-1 text-xl sm:text-2xl font-bold">
              See the session in action
            </h3>
          </div>


          {/* Gallery controls */}
          <div className="hidden sm:flex gap-2">

            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canPrev}
              aria-label="Previous workshop images"
              className="rounded-full border border-slate-300 bg-white p-2 disabled:opacity-30 hover:border-[#0055FF]"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canNext}
              aria-label="Next workshop images"
              className="rounded-full border border-slate-300 bg-white p-2 disabled:opacity-30 hover:border-[#0055FF]"
            >
              <ChevronRight size={19} />
            </button>

          </div>
        </div>


        <div className="overflow-hidden">

          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                start * (100 / visibleCount)
              }%)`,
            }}
          >

            {workshop.images.slice(1).map((image) => (
              <button
                type="button"
                key={image.src}
                onClick={() => onImageClick(image)}
                className="group shrink-0 w-[82%] sm:w-[48%] lg:w-[32%] text-left"
              >

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {image.caption}
                </p>

              </button>
            ))}

          </div>
        </div>
      </div>


      {/* =========================================================
          FEEDBACK
      ========================================================= */}
      {workshop.feedback?.length > 0 && (
        <div className="mt-10">

          <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
            Student feedback
          </p>

          <div className="mt-4 grid md:grid-cols-3 gap-4">

            {workshop.feedback.map((item) => (
              <blockquote
                key={item.quote}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <p className="text-sm leading-6 text-slate-700">
                  “{item.quote}”
                </p>

                <footer className="mt-4 text-xs font-medium text-[#0055FF]">
                  {item.name} · {item.branch}
                </footer>

              </blockquote>
            ))}

          </div>
        </div>
      )}


      {/* =========================================================
          VIDEO
      ========================================================= */}
      {workshop.video && (
        <div className="mt-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-7 items-center rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">

          <div className="overflow-hidden rounded-2xl bg-slate-950 aspect-video">

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${workshop.video}`}
              title={`Student testimonial from ${workshop.college}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

          </div>

          <div>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#FF7A00]">
              <Play size={14} />
              Student testimonial
            </div>

            <h3 className="mt-3 text-2xl font-bold">
              Hear the experience from the students
            </h3>

            <p className="mt-3 text-slate-600 leading-7">
              Add a short, accurate transcript or summary of the student's
              comments here.
            </p>

          </div>
        </div>
      )}
    </section>
  );
}