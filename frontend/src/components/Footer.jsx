import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Make IoT" className="h-14 w-auto object-contain" />
        </div>
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} MakeIoT. Crafted for engineers, by engineers.
        </div>
      </div>
    </footer>
  );
}
