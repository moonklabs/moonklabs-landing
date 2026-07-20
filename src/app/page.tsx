import { contactEmail, faqItems, productHighlights, serviceList, siteDescription, siteName, siteUrl } from "@/app/site-config";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Marquee from "@/components/Marquee";
import TrustBar from "@/components/TrustBar";
import AudienceSection from "@/components/AudienceSection";
import JangsawangSection from "@/components/JangsawangSection";
import SprintableSection from "@/components/SprintableSection";
import ProcessSection from "@/components/ProcessSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import FAQSection from "@/components/FAQSection";
import InsightsSection from "@/components/InsightsSection";
import LeadFormSection from "@/components/LeadFormSection";
import { latestNews, sortedPosts } from "@/content/posts";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  email: contactEmail,
  description: siteDescription,
  areaServed: "KR",
  serviceType: [...serviceList],
  knowsAbout: [
    "AI Agent automation",
    "Enterprise workflow automation",
    "Sprintable",
    "Sellerking ad agent",
    "Sellerking inventory agent",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moonklabs Agent Products",
    itemListElement: productHighlights.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: product.name,
        description: product.summary,
      },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-black text-white px-3 py-1 text-xs">
        본문 바로가기
      </a>
      <main id="main" className="min-h-screen" style={{ background: "#FAF9F6" }}>
        <Navigation />
        <Hero
          announcement={(() => {
            const news = latestNews();
            return news ? { label: news.title, href: `/blog/${news.slug}` } : undefined;
          })()}
        />
        <Marquee />
        <TrustBar />
        <AudienceSection />
        <SprintableSection />
        <JangsawangSection />
        <ProcessSection />
        <EnterpriseSection />
        <InsightsSection
          posts={(["소식", "운영 사례", "도입 가이드", "엔지니어링"] as const)
            .map((category) => sortedPosts().find((p) => p.category === category))
            .filter((p): p is NonNullable<typeof p> => Boolean(p))}
        />
        <FAQSection />
        <LeadFormSection />
        <Footer />
      </main>
    </>
  );
}
