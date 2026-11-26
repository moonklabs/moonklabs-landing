import { contactEmail, faqItems, productHighlights, serviceList, siteDescription, siteName, siteUrl } from "@/app/site-config";
import HomeContact from "@/components/HomeContact";
import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import ProductRows from "@/components/ProductRows";
import SiteShell from "@/components/SiteShell";
import NewsSection from "@/components/NewsSection";
import FAQSection from "@/components/FAQSection";

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
    "AI agents for work",
    "MKbot.ai",
    "Browser automation bot",
    "Agent commerce",
    "E-commerce net profit automation",
    "Multi-channel settlement management",
    "Sellerking",
    "Sprintable AI Agent OS",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moonklabs AI Agent Products",
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
      <SiteShell>
        <Hero />
        <PhilosophySection />
        <ProductRows />
        <NewsSection />
        <FAQSection />
        <HomeContact />
      </SiteShell>
    </>
  );
}
