import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

interface SiteShellProps {
  readonly children: ReactNode;
}

/** The chrome shared by every page: skip link, top menu, content, footer. */
export default function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <a href="#main" className="sr-only fixed left-2 top-2 z-[100] rounded-full bg-fg px-3 py-1 text-xs text-ink focus:not-sr-only">
        본문 바로가기
      </a>
      <Navigation />
      <main id="main" className="min-h-screen bg-ink">
        {children}
      </main>
      <Footer />
    </>
  );
}
