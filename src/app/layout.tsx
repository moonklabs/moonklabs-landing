import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import {
  contactEmail,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/app/site-config";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const socialImage = `${siteUrl}/opengraph-image`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: "Moonklabs",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  email: contactEmail,
  sameAs: ["https://github.com/moonklabs", "https://sellerking.io", "https://sprintable.ai"],
  description: siteDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "Moonklabs",
  url: siteUrl,
  description: siteDescription,
  inLanguage: "ko-KR",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — 뭉클랩",
  },
  description: siteDescription,
  applicationName: siteName,
  category: "technology",
  creator: siteName,
  publisher: siteName,
  keywords: [
    "에이전트 커머스",
    "Agent Commerce",
    "커머스 AI 에이전트",
    "셀러킹",
    "장사왕",
    "Sellerking",
    "Sprintable",
    "스프린터블",
    "이커머스 순이익 자동화",
    "멀티채널 정산 관리",
    "뭉클랩",
    "Moonklabs",
  ],
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
