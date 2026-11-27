import Link from "next/link";
import { contactHref } from "@/app/site-config";

/** Closing banner. The inquiry form itself lives on /contact. */
export default function CTASection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-x overflow-hidden pt-4 text-center">
      <h2 id="contact-title" className="display-md">
        일은 에이전트에게, 결정은 당신에게.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        MKbot.ai, 장사왕, Sprintable로 검증한 방식으로 귀사의 업무에 맞는 에이전트를 함께 설계합니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href={contactHref} className="btn-primary">
          우리 회사에 도입 문의
        </Link>
        <Link href="/company/" className="btn-secondary">
          회사 소개
        </Link>
      </div>

      {/* A large outlined mark that rises from the footer line. */}
      <svg aria-hidden viewBox="0 0 1000 500" className="mx-auto mt-16 block w-full max-w-5xl text-line-strong md:mt-20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 500 A498 498 0 0 1 998 500" />
        <path d="M330 500 V330 L500 440 L670 330 V500" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </section>
  );
}
