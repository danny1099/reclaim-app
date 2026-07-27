import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Features, FinalCta, Footer, Hero, HowItWorks, MarketingNav } from "@/modules/marketing/components";
import { Faq, Pricing, StackMarquee, Stats } from "@/modules/marketing/components";

export default async function Home() {
  return (
    <div id="top" className="flex min-h-dvh flex-col overflow-x-clip">
      <MarketingNav />
      <main className="flex-1">
        <Hero />
        <StackMarquee />
        <HowItWorks />
        <Features />
        <Stats />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("marketing.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
