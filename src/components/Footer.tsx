import Link from "next/link";
import { companyInfo, contactEmail, footerGroups, type NavLink } from "@/app/site-config";

const COPYRIGHT_YEAR = 2026;

function FooterLink({ link }: { readonly link: NavLink }) {
  const className = "transition-colors hover:text-white";
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

const GROUP_LABEL: Record<string, string> = { 제품: "PRODUCTS", 회사: "COMPANY", 문의: "CONTACT" };

export default function Footer() {
  return (
    <footer className="bg-[#0a0d14] text-white">
      <div className="container-x py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <span className="text-xl font-semibold tracking-tight">Moonklabs</span>
            <p className="mt-6 text-[1.75rem] font-semibold leading-snug tracking-tight">
              일은 에이전트에게,
              <br />
              결정은 사람에게
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium tracking-[0.12em] text-[#8fb4ff]">{GROUP_LABEL[group.title] ?? group.title}</p>
                <ul className="mt-5 space-y-3.5 text-white/85">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 space-y-1.5 border-t border-white/15 pt-8 text-sm text-white/55">
          <p>
            {companyInfo.legalName} · 대표 {companyInfo.ceo} · 사업자등록번호 {companyInfo.businessNumber}
          </p>
          <p>{companyInfo.address}</p>
          <p>
            <a href={`mailto:${contactEmail}`} className="hover:text-white">
              {contactEmail}
            </a>
          </p>
          <p className="pt-2">© {COPYRIGHT_YEAR} Moonklabs Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
