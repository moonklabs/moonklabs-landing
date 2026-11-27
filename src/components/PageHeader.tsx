import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Small uppercase label above the title, e.g. "COMPANY". */
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="container-x pb-14 pt-14 md:pb-20 md:pt-24">
      <p className="text-sm tracking-widest text-mute">{eyebrow}</p>
      <h1 className="display-xl mt-4 max-w-4xl">{title}</h1>
      {description ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{description}</p> : null}
    </header>
  );
}
