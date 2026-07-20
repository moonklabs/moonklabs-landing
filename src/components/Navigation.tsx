"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "SOLUTIONS", href: "#solutions" },
  { label: "PRODUCTS", href: "#products" },
  { label: "PROCESS", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "GITHUB", href: "https://github.com/moonklabs", external: true },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-black font-bold text-sm tracking-widest">뭉클랩</span>
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-zinc-500 hover:text-black text-xs tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <a
          href="#contact"
          className="text-xs tracking-widest px-4 py-2 bg-black text-white hover:bg-zinc-800 transition-all duration-200 font-medium"
        >
          도입 상담 →
        </a>
      </div>
    </nav>
  );
}
