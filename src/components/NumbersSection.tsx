import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";
import { companyStats } from "@/app/site-config";

const tones = ["bg-[#F3EBD8]", "bg-[#F8DCCB]", "bg-[#E6DDF5]", "bg-[#DCEBD3]"];

const stories = [
  "숫자 하나하나가 매일 장사왕으로 정산을 확인하는 사장님입니다.",
  "채널마다 다른 정산을 한곳에 모으는 문제를 풀며 얻은 기술입니다.",
  "오래 함께한 만큼, 서로의 일하는 방식을 잘 압니다.",
  "돈이 움직이는 결정은 언제나 사람이 승인합니다.",
];

export default function NumbersSection() {
  return (
    <section id="numbers" className="py-28 sm:py-36 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center">
          <h2 className="section-title text-ink">
            말보다 먼저,
            <br />
            <Emphasis>숫자</Emphasis>로 보여드립니다
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <div className={`h-full rounded-[28px] ${tones[i % tones.length]} p-7 flex flex-col min-h-[300px]`}>
                <span className="text-lg font-bold tracking-tight text-ink">{stat.label}</span>
                <span className="text-sm text-zinc-500 mt-1">{stat.note}</span>
                <span className="mt-auto pt-8 font-serif font-bold tracking-[-0.04em] leading-none text-[clamp(2.5rem,4vw,3.5rem)] whitespace-nowrap text-ink">
                  {stat.value}
                </span>
                <p className="mt-4 text-[14px] leading-relaxed text-zinc-700">{stories[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
