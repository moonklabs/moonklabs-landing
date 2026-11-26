import { SellerkingLogo, SprintableLogo } from "@/components/BrandLogo";
import { contactEmail, githubUrl, mkbotUrl, navLinks, sellerkingUrl, siteSlogan, sprintableUrl } from "@/app/site-config";

const productLinks = [
  { label: "MKbot.ai", href: mkbotUrl },
  { label: "장사왕", href: sellerkingUrl },
  { label: "Sprintable", href: sprintableUrl },
  { label: "GitHub", href: githubUrl },
] as const;

const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <span className="text-xl font-semibold tracking-tight">Moonklabs</span>
            <p className="mt-3 max-w-xs text-mute">{siteSlogan}</p>
            <div className="mt-8 flex items-center gap-6">
              <a href={sellerkingUrl} target="_blank" rel="noopener noreferrer" aria-label="장사왕 바로가기" className="transition-opacity hover:opacity-70">
                <SellerkingLogo className="h-5" />
              </a>
              <a href={sprintableUrl} target="_blank" rel="noopener noreferrer" aria-label="Sprintable 바로가기" className="transition-opacity hover:opacity-70">
                <SprintableLogo className="h-5" />
              </a>
            </div>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-sm text-mute">제품</p>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-mute">바로가기</p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-opacity hover:opacity-60">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 text-sm text-mute">
          <p>
            뭉클랩 · 대표 윤도선 ·{" "}
            <a href={`mailto:${contactEmail}`} className="hover:text-fg">
              {contactEmail}
            </a>
          </p>
          <p>© {COPYRIGHT_YEAR} Moonklabs Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
