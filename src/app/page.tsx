import { contactEmail, faqItems, productHighlights, serviceList, siteDescription, siteName, siteUrl } from "@/app/site-config";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Marquee from "@/components/Marquee";
import ApproachSection from "@/components/ApproachSection";
import ProductsSection from "@/components/ProductsSection";
import NumbersSection from "@/components/NumbersSection";
import StorySection from "@/components/StorySection";
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
    "Agent commerce",
    "E-commerce net profit automation",
    "Multi-channel settlement management",
    "Sellerking",
    "Sprintable AI Agent OS",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moonklabs Agent Commerce Products",
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
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-white text-black px-3 py-1 text-xs">
        본문 바로가기
      </a>
      <main id="main" className="bg-white min-h-screen">
        <Navigation />
        <Hero />
        <Marquee />
        <ApproachSection />
        <ProductsSection />
        <NumbersSection />
        <StorySection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
