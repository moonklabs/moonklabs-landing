import Reveal from "@/components/Reveal";
import { companyStats } from "@/app/site-config";

export default function NumbersSection() {
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="container-x pb-24 md:pb-36">
      <h2 id="numbers-title" className="display-md text-center">
        숫자로 보는 뭉클랩
      </h2>
      <dl className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-6">
        {companyStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="h-full">
            <div className="flex h-full min-h-56 flex-col rounded-3xl bg-card p-8">
              <dt className="order-2 mt-auto pt-8">
                <span className="block text-[17px] font-medium">{stat.label}</span>
                <span className="mt-1 block text-sm text-mute">{stat.note}</span>
              </dt>
              <dd className="order-1 whitespace-nowrap text-5xl font-medium tracking-tight">{stat.value}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
