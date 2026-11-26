import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { milestones } from "@/content/press";

export default function PressMilestones() {
  return (
    <section aria-label="주요 성과" className="container-x pb-16 md:pb-24">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((item, i) => (
          <li key={item.label} className="list-none">
            <Reveal delay={i * 0.05} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl bg-card p-7 transition-colors hover:bg-pill"
              >
                <span className="text-sm tabular-nums text-mute">{item.date}</span>
                <span className="mt-6 text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-none tracking-tight text-accent">{item.stat}</span>
                <span className="mt-4 flex-1 leading-snug">{item.label}</span>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-mute group-hover:text-fg">
                  기사 보기 <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
