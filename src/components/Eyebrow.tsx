import type { ReactNode } from "react";

/** Small accent label with a leading rule, e.g. "OUR PRODUCTS". */
export default function Eyebrow({ children, className = "" }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.12em] text-accent ${className}`}>
      <span className="h-px w-7 bg-accent" aria-hidden />
      {children}
    </p>
  );
}
