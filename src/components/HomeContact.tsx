import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/Eyebrow";
import { contactEmail } from "@/app/site-config";

export default function HomeContact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-card py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-title" className="mt-5 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-tight tracking-tight">
            궁금한 점이 있다면
            <br />
            무엇이든 물어보세요
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">
            귀사의 업무에 맞는 에이전트를 함께 설계합니다. 도입·제휴 문의 모두 보통 1영업일 이내 회신드립니다.
          </p>
          <div className="mt-10 border-t border-line-strong pt-6">
            <p className="text-sm text-mute">이메일로 바로 문의하기</p>
            <a href={`mailto:${contactEmail}`} className="mt-2 inline-block border-b-2 border-line-strong pb-0.5 text-2xl font-semibold tracking-tight">
              {contactEmail}
            </a>
          </div>
        </div>
        <Suspense fallback={null}>
          <ContactForm className="bg-ink shadow-[var(--shadow-float)]" />
        </Suspense>
      </div>
    </section>
  );
}
