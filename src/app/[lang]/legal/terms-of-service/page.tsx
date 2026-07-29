import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalArticle, LegalLayout, LegalList } from "@/modules/legal/components";
import { LegalNote, LegalPageHeader, LegalSection } from "@/modules/legal/components";
import type { TocSection } from "@/shared/components";
import { Reveal } from "@/shared/components";

export default async function TermsPage() {
  const t = await getTranslations("legal");
  const sections = t.raw("terms.sections") as TocSection[];
  const sectionById = new Map(sections.map((s) => [s.id, s]));

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Reveal>
          <LegalPageHeader
            eyebrow={t("terms.eyebrow")}
            title={t("terms.title")}
            subtitle={t("terms.subtitle")}
            lastUpdatedLabel={t("common.last_updated_label")}
            lastUpdatedValue={t("common.last_updated_value")}
            effectiveDateLabel={t("common.effective_label")}
            effectiveDateValue={t("common.effective_value")}
            version={t("common.version")}
          />
        </Reveal>
        <LegalLayout toc={sections} tocLabel={t("common.toc_label_terms")} onThisPageLabel={t("common.on_this_page")}>
          <Reveal>
            <p className="border-border/60 text-foreground/80 mb-10 border-l-2 pl-4 text-xs leading-[1.7] italic">
              {t("terms.preamble")}
            </p>
          </Reveal>
          <Reveal>
            <LegalSection
              id="definitions"
              number={sectionById.get("definitions")!.number}
              title={sectionById.get("definitions")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.definitions.intro")}</p>
              <LegalList items={t.raw("terms.content.definitions.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="eligibility"
              number={sectionById.get("eligibility")!.number}
              title={sectionById.get("eligibility")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.eligibility.intro")}</p>
              <LegalArticle title={t("terms.content.eligibility.account.title")}>
                <p className="text-foreground/80 text-xs">{t("terms.content.eligibility.account.body")}</p>
              </LegalArticle>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="service" number={sectionById.get("service")!.number} title={sectionById.get("service")!.label}>
              <p className="text-foreground/80 text-xs">{t("terms.content.service.intro")}</p>
              <LegalList items={t.raw("terms.content.service.items") as string[]} variant="check" />
              <LegalNote>{t("terms.content.service.note")}</LegalNote>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="subscriptions"
              number={sectionById.get("subscriptions")!.number}
              title={sectionById.get("subscriptions")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.subscriptions.intro")}</p>
              <LegalList items={t.raw("terms.content.subscriptions.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="acceptable-use"
              number={sectionById.get("acceptable-use")!.number}
              title={sectionById.get("acceptable-use")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.acceptable-use.intro")}</p>
              <LegalList items={t.raw("terms.content.acceptable-use.items") as string[]} variant="disc" />
              <p className="text-foreground/80 mt-2 text-xs">{t("terms.content.acceptable-use.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="intellectual-property"
              number={sectionById.get("intellectual-property")!.number}
              title={sectionById.get("intellectual-property")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.intellectual-property.intro")}</p>
              <LegalArticle title={t("terms.content.intellectual-property.your_content.title")}>
                <p className="text-foreground/80 text-xs">{t("terms.content.intellectual-property.your_content.body")}</p>
              </LegalArticle>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="third-party"
              number={sectionById.get("third-party")!.number}
              title={sectionById.get("third-party")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.third-party.intro")}</p>
              <p className="text-foreground/80 mt-2 text-xs">{t("terms.content.third-party.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="data-and-privacy"
              number={sectionById.get("data-and-privacy")!.number}
              title={sectionById.get("data-and-privacy")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.data-and-privacy.intro")}</p>
              <LegalList items={t.raw("terms.content.data-and-privacy.items") as string[]} variant="check" />
              <LegalNote>{t("terms.content.data-and-privacy.note")}</LegalNote>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="ai-features"
              number={sectionById.get("ai-features")!.number}
              title={sectionById.get("ai-features")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.ai-features.intro")}</p>
              <LegalList items={t.raw("terms.content.ai-features.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="termination"
              number={sectionById.get("termination")!.number}
              title={sectionById.get("termination")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.termination.intro")}</p>
              <LegalList items={t.raw("terms.content.termination.items") as string[]} variant="disc" />
              <p className="text-foreground/80 mt-2 text-xs">{t("terms.content.termination.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="liability"
              number={sectionById.get("liability")!.number}
              title={sectionById.get("liability")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.liability.intro")}</p>
              <LegalList items={t.raw("terms.content.liability.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="indemnification"
              number={sectionById.get("indemnification")!.number}
              title={sectionById.get("indemnification")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.indemnification.intro")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="disputes"
              number={sectionById.get("disputes")!.number}
              title={sectionById.get("disputes")!.label}
            >
              <p className="text-foreground/80 text-xs">{t("terms.content.disputes.intro")}</p>
              <LegalList items={t.raw("terms.content.disputes.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="changes" number={sectionById.get("changes")!.number} title={sectionById.get("changes")!.label}>
              <p className="text-foreground/80 text-xs">{t("terms.content.changes.intro")}</p>
              <p className="text-foreground/80 mt-2 text-xs">{t("terms.content.changes.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="contact" number={sectionById.get("contact")!.number} title={sectionById.get("contact")!.label}>
              <p className="text-foreground/80 text-xs">{t("terms.content.contact.intro")}</p>
              <LegalList items={t.raw("terms.content.contact.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
        </LegalLayout>
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("terms.metadata.title"),
    description: t("terms.metadata.description"),
  };
}
