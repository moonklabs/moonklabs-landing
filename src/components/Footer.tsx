export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-8" style={{ background: "#191714" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <span className="font-display text-white font-bold text-lg">뭉클랩</span>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              기업의 실제 업무 체계 안에 AI Agent 자동화를 안전하게 도입하는 B2B 파트너.
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-xs text-zinc-500 tracking-widest">바로가기</span>
            <div className="flex flex-col gap-2">
              {[
                { label: "솔루션", href: "/#solutions" },
                { label: "제품", href: "/#products" },
                { label: "도입 프로세스", href: "/#process" },
                { label: "블로그", href: "/blog" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-xs text-zinc-500 tracking-widest">문의</span>
            <div className="flex flex-col gap-2">
              <a href="/#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                도입 상담 신청
              </a>
              <a href="mailto:hello@moonklabs.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                hello@moonklabs.com
              </a>
              <a
                href="https://github.com/moonklabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xs text-zinc-500">© 2026 MoonkLabs. All rights reserved.</span>
          <span className="text-xs text-zinc-600">보통 1영업일 이내 회신드립니다</span>
        </div>
      </div>
    </footer>
  );
}
