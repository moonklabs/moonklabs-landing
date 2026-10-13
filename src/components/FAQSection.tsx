import { faqItems } from "@/app/site-config";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-28 sm:py-36 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 id="faq-heading" className="section-title text-ink">
            궁금하실 만한 것들,
            <br />
            먼저 <Emphasis>답해 둘게요</Emphasis>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-3xl bg-[#F3EBD8] open:bg-[#F8DCCB] transition-colors">
              <summary className="list-none cursor-pointer px-7 py-6 flex items-center justify-between gap-6">
                <h3 className="text-ink text-[17px] font-semibold leading-relaxed">{item.question}</h3>
                <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-lg leading-none text-zinc-600 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-7 pb-7 -mt-1">
                <p className="text-[15px] text-zinc-700 leading-7">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
