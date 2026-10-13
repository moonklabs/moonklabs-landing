import { contactEmail, githubUrl, navLinks, sellerkingUrl, sprintableUrl } from "@/app/site-config";

const productLinks = [
  { label: "장사왕", href: sellerkingUrl },
  { label: "Sprintable", href: sprintableUrl },
  { label: "GitHub", href: githubUrl },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-8 pb-10 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-2 text-zinc-300">
            <span className="text-white">뭉클랩</span>
            <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
              {contactEmail}
            </a>
            <span className="text-white">대표 윤도선</span>
            <span className="text-zinc-500">사람과 AI 에이전트가 하나의 팀으로 일하는 커머스</span>
          </div>
          <div className="flex gap-14 text-zinc-300">
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="mt-20 font-extrabold tracking-[-0.06em] leading-[0.85] text-[clamp(3rem,13vw,11.5rem)] whitespace-nowrap">
          Moonklabs<span className="font-normal tracking-[-0.04em]">, inc.</span>
        </div>
        <p className="mt-8 text-sm text-zinc-500">© 2026 Moonklabs. All rights reserved.</p>
      </div>
    </footer>
  );
}
