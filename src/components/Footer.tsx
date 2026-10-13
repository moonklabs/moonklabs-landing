import AgentMascot from "@/components/AgentMascot";
import { contactEmail, githubUrl, navLinks, sellerkingUrl, sprintableUrl } from "@/app/site-config";

const productLinks = [
  { label: "장사왕", href: sellerkingUrl },
  { label: "Sprintable", href: sprintableUrl },
  { label: "GitHub", href: githubUrl },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 bg-[#1E1814] text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-2 content-start text-zinc-300">
            <span className="text-cream">뭉클랩</span>
            <a href={`mailto:${contactEmail}`} className="hover:text-cream transition-colors">
              {contactEmail}
            </a>
            <span className="text-cream">대표 윤도선</span>
            <span className="text-zinc-500">사람과 AI 에이전트가 하나의 팀으로 일하는 커머스</span>
          </div>
          <div className="flex gap-14 text-zinc-300">
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-cream transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="relative mt-24">
          <AgentMascot className="absolute right-[6%] -top-[3.4rem] w-14 sm:-top-20 sm:w-20 lg:-top-24 lg:w-24" />
          <div className="font-extrabold tracking-[-0.06em] leading-[0.85] text-[clamp(3.5rem,16.5vw,13.5rem)] whitespace-nowrap bg-gradient-to-b from-cream to-peach bg-clip-text text-transparent pb-[0.08em]">
            Moonklabs
          </div>
        </div>
        <p className="mt-8 text-sm text-zinc-500">© 2026 Moonklabs Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
