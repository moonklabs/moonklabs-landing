import { Plus } from "lucide-react";
import { faqItems } from "@/app/site-config";

/** Details that share a name close each other: opening one closes the rest. */
const FAQ_GROUP = "faq";

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 id="faq-title" className="display-md">
          자주 묻는 질문
        </h2>
        <div className="border-t border-line">
          {faqItems.map((item, i) => (
            <details key={item.question} name={FAQ_GROUP} className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg [&::-webkit-details-marker]:hidden">
                <h3 className="font-normal">{item.question}</h3>
                <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="pb-7 pr-10 leading-relaxed text-mute">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
