import Reveal from "@/components/Reveal";
import { companyStats } from "@/app/site-config";

const tones = ["bg-[#F6F3E6]", "bg-[#EFE6F6]", "bg-[#E6F6E6]", "bg-[#F6E6E6]"];

export default function NumbersSection() {
  return (
    <section id="numbers" className="py-28 sm:py-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center">
          <h2 className="section-title text-black">
            에이전트 커머스의 새로운 기준,
            <br />
            숫자로 증명합니다
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <div className={`h-full rounded-[28px] ${tones[i % tones.length]} p-7 flex flex-col min-h-[240px]`}>
                <span className="text-lg font-bold tracking-tight text-black">{stat.label}</span>
                <span className="text-sm text-zinc-500 mt-1">{stat.note}</span>
                <span className="mt-auto pt-8 text-right font-bold tracking-[-0.04em] leading-none text-[clamp(2.5rem,4vw,3.5rem)] whitespace-nowrap">
                  {stat.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
