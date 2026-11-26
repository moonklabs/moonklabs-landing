import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface FeatureCardProps {
  readonly title: string;
  readonly text: string;
  readonly children: ReactNode;
  /** A short label or a brand logo shown above the title. */
  readonly eyebrow?: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

/** A warm-gray card: copy on top, a product visual that bleeds off the bottom. */
export default function FeatureCard({ title, text, children, eyebrow, className = "", delay = 0 }: FeatureCardProps) {
  return (
    <Reveal delay={delay} className={`h-full min-w-0 ${className}`}>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card px-6 pt-8 md:px-10 md:pt-10">
        {eyebrow ? <div className="mb-4 flex items-center gap-2.5 text-sm text-mute">{eyebrow}</div> : null}
        <h3 className="text-xl font-medium tracking-tight md:text-2xl">{title}</h3>
        <p className="mt-2 max-w-xl leading-relaxed md:text-[17px]">{text}</p>
        <div className="mt-8 flex min-w-0 flex-1 items-end md:mt-10">{children}</div>
      </article>
    </Reveal>
  );
}
