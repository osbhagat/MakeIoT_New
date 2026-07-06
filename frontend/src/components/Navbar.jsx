import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ onEnrollClick }) {
  const [open, setOpen] = React.useState(false);
  const links = [
    { id: "programs", label: "Programs" },
    { id: "curriculum", label: "Curriculum" },
    { id: "colleges", label: "Colleges" },
    { id: "success", label: "Success" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-8 h-24">
        <Link to="/" data-testid="nav-logo" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Make IoT"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
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

        <div className="flex items-center gap-2">
          <button
            data-testid="nav-enroll-btn"
            onClick={onEnrollClick}
            className="btn-primary !py-2.5 !px-4 text-sm"
          >
            Enroll Now
          </button>
          <button
            data-testid="nav-mobile-toggle"
            className="ml-1 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-mobile-link-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="text-left py-2 text-sm font-medium text-slate-700"
              >
                {l.label}
              </button>
            ))}
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
