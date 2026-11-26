import type { ReactNode } from "react";

interface NumberedSectionProps {
  readonly index: string;
  readonly label: string;
  readonly en: string;
  readonly id: string;
  readonly children: ReactNode;
}

/** A row with a sticky "01 · 연혁 / HISTORY" label on the left and the content on the right. */
export default function NumberedSection({ index, label, en, id, children }: NumberedSectionProps) {
  return (
    <section aria-labelledby={id} className="container-x">
      <div className="grid gap-8 border-t border-fg py-14 md:py-20 lg:grid-cols-[1fr_3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm text-accent">{index}</p>
          <h2 id={id} className="mt-2 text-xl font-semibold tracking-tight">
            {label}
          </h2>
          <p className="mt-1 text-xs tracking-[0.12em] text-mute">{en}</p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
