import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { milestones } from "@/content/press";

export default function PressMilestones() {
  return (
    <section aria-label="주요 성과" className="container-x pb-16 md:pb-24">
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {milestones.map((item, i) => (
          <li key={item.label} className="list-none">
            <Reveal delay={i * 0.05} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl bg-card p-5 transition-colors md:p-7 hover:bg-pill"
              >
                <span className="text-sm tabular-nums text-mute">{item.date}</span>
                <span className="mt-4 text-[clamp(1.6rem,3.4vw,2.75rem)] md:mt-6 font-semibold leading-none tracking-tight text-accent">{item.stat}</span>
                <span className="mt-3 flex-1 text-[15px] leading-snug md:mt-4 md:text-base">{item.label}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm md:mt-6 text-mute group-hover:text-fg">
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
