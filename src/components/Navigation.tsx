"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "솔루션", href: "/#solutions" },
  { label: "제품", href: "/#products" },
  { label: "도입 프로세스", href: "/#process" },
  { label: "블로그", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className="max-w-5xl mx-auto flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(28,27,23,0.08)",
          boxShadow: scrolled ? "0 8px 30px rgba(28,27,23,0.08)" : "none",
        }}
      >
        <div className="flex items-center gap-7">
          <a href="/" className="text-ink font-bold text-sm tracking-tight" style={{ color: "#1C1B17" }}>
            뭉클랩
          </a>
          <div className="hidden md:flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-500 hover:text-black text-[13px] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <a
          href="/#contact"
          className="text-[13px] px-4 py-2 rounded-full text-white font-medium hover:opacity-85 transition-opacity"
          style={{ background: "#1C1B17" }}
        >
          도입 상담 →
        </a>
      </div>
    </nav>
  );
}
