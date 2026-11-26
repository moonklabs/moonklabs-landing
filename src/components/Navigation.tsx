"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/app/site-config";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-ink/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-[4.25rem]">
        <div className="flex items-center gap-12">
          <a href="#top" aria-label="맨 위로" onClick={close} className="text-xl font-semibold tracking-tight">
            Moonklabs
          </a>
          <nav aria-label="주요 메뉴" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="inline-flex items-center gap-1.5 text-[15px] transition-opacity hover:opacity-60">
                {link.label}
                {link.badge ? <NavBadge label={link.badge} /> : null}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" onClick={close} className="btn-primary">
            도입 문의
          </a>
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full bg-pill lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="모바일 메뉴" className="border-t border-line lg:hidden">
          <ul className="container-x py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className="flex items-center gap-2 py-3 text-lg">
                  {link.label}
                  {link.badge ? <NavBadge label={link.badge} /> : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function NavBadge({ label }: { readonly label: string }) {
  return <span className="rounded-full bg-fg px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink">{label}</span>;
}
