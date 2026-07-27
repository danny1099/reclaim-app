"use client";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components";
import { SectionHeader } from "@/modules/marketing/components/section-header";

interface FaqItem {
  q: string;
  a: string;
}

export const Faq = () => {
  const t = useTranslations("marketing.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="border-border/60 bg-muted/30 scroll-mt-20 border-y py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 md:px-6">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <Accordion type="single" collapsible className="bg-card border-border">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-2xs text-muted-foreground leading-relaxed">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
