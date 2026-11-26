"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contactHref, navLinks, type NavLink } from "@/app/site-config";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-[4.25rem]">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="뭉클랩 홈" onClick={close} className="text-xl font-semibold tracking-tight">
            Moonklabs
          </Link>
          <nav aria-label="주요 메뉴" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <MenuLink key={link.href} link={link} pathname={pathname} className="text-[15px]" />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href={contactHref} onClick={close} className="btn-primary">
            도입 문의
          </Link>
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
                <MenuLink link={link} pathname={pathname} onNavigate={close} className="py-3 text-lg" />
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

interface MenuLinkProps {
  readonly link: NavLink;
  readonly pathname: string;
  readonly className: string;
  readonly onNavigate?: () => void;
}

function MenuLink({ link, pathname, className, onNavigate }: MenuLinkProps) {
  const base = `inline-flex items-center gap-1.5 transition-opacity hover:opacity-60 ${className}`;
  const badge = link.badge ? <NavBadge label={link.badge} /> : null;

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={base}>
        {link.label}
        <ArrowUpRight className="size-3.5 text-mute" aria-hidden />
      </a>
    );
  }
  const current = pathname.startsWith(link.href);
  return (
    <Link href={link.href} onClick={onNavigate} aria-current={current ? "page" : undefined} className={`${base} ${current ? "font-semibold" : ""}`}>
      {link.label}
      {badge}
    </Link>
  );
}

function NavBadge({ label }: { readonly label: string }) {
  return <span className="rounded-full bg-fg px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink">{label}</span>;
}
