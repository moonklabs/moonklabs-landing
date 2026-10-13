"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/app/site-config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-[19px] font-extrabold tracking-[-0.04em] text-black">
          Moonklabs<span className="font-medium">, inc.</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[15px] font-medium text-zinc-700 hover:text-black transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-[14px] font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors"
          >
            도입 문의
          </a>
        </div>
      </div>
    </nav>
  );
}
