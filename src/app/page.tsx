import { contactEmail, faqItems, productHighlights, serviceList, siteDescription, siteName, siteUrl } from "@/app/site-config";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import IntroSection from "@/components/IntroSection";
import FilmSection from "@/components/FilmSection";
import JobsSection from "@/components/JobsSection";
import ProductsSection from "@/components/ProductsSection";
import MkbotSection from "@/components/MkbotSection";
import NumbersSection from "@/components/NumbersSection";
import StorySection from "@/components/StorySection";
import NewsSection from "@/components/NewsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

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
      <a href="#main" className="sr-only fixed left-2 top-2 z-[100] rounded-full bg-fg px-3 py-1 text-xs text-ink focus:not-sr-only">
        본문 바로가기
      </a>
      <main id="main" className="min-h-screen bg-ink">
        <Navigation />
        <Hero />
        <IntroSection />
        <FilmSection />
        <MkbotSection />
        <ProductsSection />
        <JobsSection />
        <NumbersSection />
        <StorySection />
        <NewsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
