import { faqItems } from "@/app/site-config";
import Reveal from "@/components/Reveal";

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-28 sm:py-36 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 id="faq-heading" className="section-title text-black">
            에이전트 커머스,
            <br />
            자주 묻는 질문
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-3xl bg-[#F4F4F5] open:bg-[#EFE6F6] transition-colors">
              <summary className="list-none cursor-pointer px-7 py-6 flex items-center justify-between gap-6">
                <h3 className="text-black text-[17px] font-semibold leading-relaxed">{item.question}</h3>
                <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-lg leading-none text-zinc-600 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-7 pb-7 -mt-1">
                <p className="text-[15px] text-zinc-600 leading-7">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
