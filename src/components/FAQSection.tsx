import { faqItems, lastUpdated } from "@/app/site-config";

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-5">
          <span
            className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.07)" }}
          >
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="font-display font-bold"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#1C1B17" }}
          >
            자주 묻는 질문
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed">
            뭉클랩의 제품과 엔터프라이즈 Agent 자동화 접근 방식을 빠르게 이해할 수 있도록 정리했습니다.
          </p>
          <p className="text-xs text-zinc-400 tracking-wide">LAST UPDATED · {lastUpdated}</p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group bg-white rounded-2xl transition-shadow duration-300 open:shadow-[0_12px_36px_rgba(28,27,23,0.07)]"
              style={{ border: "1px solid rgba(28,27,23,0.08)" }}
            >
              <summary className="list-none cursor-pointer px-7 py-5 flex items-center justify-between gap-6">
                <h3 className="text-[15px] font-semibold leading-relaxed" style={{ color: "#1C1B17" }}>
                  {item.question}
                </h3>
                <span
                  className="shrink-0 flex w-7 h-7 items-center justify-center rounded-full text-zinc-400 group-open:text-violet-700 group-open:rotate-45 transition-all duration-300"
                  style={{ border: "1px solid rgba(28,27,23,0.10)" }}
                >
                  +
                </span>
              </summary>
              <div className="px-7 pb-6 -mt-1">
                <p className="text-sm text-zinc-600 leading-7 max-w-2xl">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
