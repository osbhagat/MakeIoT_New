import React from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onEnrollClick }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Detect whether we are on one of the program pages
  const isProgramPage =
    location.pathname === "/program/embedded-stm32" ||
    location.pathname === "/program/arduino-iot";

  // Landing-page navigation
  const landingLinks = [
    { id: "programs", label: "Programs" },
    { id: "curriculum", label: "Curriculum" },
    { id: "colleges", label: "Colleges" },
    { id: "success", label: "Success" },
    { id: "contact", label: "Contact" },
  ];

  // Program-page navigation
  const programLinks = [
    { id: "curriculum", label: "Curriculum" },
    { id: "colleges", label: "Colleges" },
    { id: "mentor", label: "Meet Mentor" },
    { id: "faq", label: "FAQ" },
  ];

  const links = isProgramPage ? programLinks : landingLinks;

  const scrollTo = (id) => {
    setOpen(false);

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /*
   * Programs button behavior:
   *
   * On homepage:
   *   → scroll to #programs
   *
   * On program page:
   *   → go back to homepage
   *   → open the Programs section
   */
  const handleProgramsClick = () => {
    setOpen(false);

    if (location.pathname === "/") {
      scrollTo("programs");
      return;
    }

    window.location.href = "/#programs";
  };

  return (
    <header
      data-testid="site-navbar"
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-8 h-24">

        {/* LOGO */}
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src="/assets/logo.png"
            alt="Make IoT"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7">

          {/* Programs is handled separately because
              it must work from both homepage and program pages */}
          <button
            data-testid="nav-link-programs"
            onClick={handleProgramsClick}
            className="text-sm font-medium text-slate-700 hover:text-[#0055FF] transition"
          >
            Programs
          </button>

          {/* Remaining navigation */}
          {links
            .filter((l) => l.id !== "programs")
            .map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="text-sm font-medium text-slate-700 hover:text-[#0055FF] transition"
              >
                {l.label}
              </button>
            ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {/* ENROLL BUTTON */}
          <button
            data-testid="nav-enroll-btn"
            onClick={onEnrollClick}
            className="btn-primary !py-2.5 !px-4 text-sm rounded-xl"
          >
            Enroll Now
          </button>

          {/* MOBILE MENU */}
          <button
            data-testid="nav-mobile-toggle"
            className="ml-1 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <div className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col gap-1">

            {/* PROGRAMS */}
            <button
              data-testid="nav-mobile-link-programs"
              onClick={handleProgramsClick}
              className="text-left py-2 text-sm font-medium text-slate-700 hover:text-[#0055FF]"
            >
              Programs
            </button>

            {/* OTHER LINKS */}
            {links
              .filter((l) => l.id !== "programs")
              .map((l) => (
                <button
                  key={l.id}
                  data-testid={`nav-mobile-link-${l.id}`}
                  onClick={() => scrollTo(l.id)}
                  className="text-left py-2 text-sm font-medium text-slate-700 hover:text-[#0055FF]"
                >
                  {l.label}
                </button>
              ))}

            {/* ADMIN */}
            <Link
              to="/admin/login"
              data-testid="nav-admin-link"
              onClick={() => setOpen(false)}
              className="text-left py-2 text-sm font-medium text-slate-500 border-t border-slate-100 mt-2 pt-3"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}