import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalFooter, LegalLayout, LegalList } from "@/modules/legal/components";
import { LegalArticle, LegalNav, LegalNote, LegalPageHeader, LegalSection } from "@/modules/legal/components";
import { Reveal } from "@/shared/components";
import type { TocSection } from "@/shared/components";

export default async function PrivacyPage() {
  const t = await getTranslations("legal");

  const sections = t.raw("privacy.sections") as TocSection[];
  const sectionById = new Map(sections.map((s) => [s.id, s]));

  return (
    <div className="flex min-h-dvh flex-col">
      <LegalNav />
      <main className="flex-1">
        <Reveal>
          <LegalPageHeader
            eyebrow={t("privacy.eyebrow")}
            title={t("privacy.title")}
            subtitle={t("privacy.subtitle")}
            lastUpdatedLabel={t("common.last_updated_label")}
            lastUpdatedValue={t("common.last_updated_value")}
            effectiveDateLabel={t("common.effective_label")}
            effectiveDateValue={t("common.effective_value")}
            version={t("common.version")}
          />
        </Reveal>

        <LegalLayout toc={sections} tocLabel={t("common.toc_label_privacy")} onThisPageLabel={t("common.on_this_page")}>
          <Reveal>
            <section className="border-border/60 bg-card mb-12 rounded-2xl border p-6">
              <h2 className="text-foreground/90 text-2xs mb-3 font-semibold tracking-widest uppercase">
                {t("privacy.short_version.title")}
              </h2>
              <LegalList items={t.raw("privacy.short_version.items") as string[]} variant="check" />
            </section>
          </Reveal>
          <Reveal>
            <LegalSection id="scope" number={sectionById.get("scope")!.number} title={sectionById.get("scope")!.label}>
              <p>{t("privacy.content.scope.intro")}</p>
              <p className="text-foreground/70 text-2xs mt-2">{t("privacy.content.scope.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="data-we-collect"
              number={sectionById.get("data-we-collect")!.number}
              title={sectionById.get("data-we-collect")!.label}
            >
              <p>{t("privacy.content.data-we-collect.intro")}</p>
              <LegalArticle title={t("privacy.content.data-we-collect.categories.title")}>
                <LegalList items={t.raw("privacy.content.data-we-collect.categories.items") as string[]} variant="disc" />
              </LegalArticle>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="how-we-use"
              number={sectionById.get("how-we-use")!.number}
              title={sectionById.get("how-we-use")!.label}
            >
              <p>{t("privacy.content.how-we-use.intro")}</p>
              <LegalList items={t.raw("privacy.content.how-we-use.items") as string[]} variant="disc" />
              <LegalArticle title={t("privacy.content.how-we-use.legal_basis.title")}>
                <p>{t("privacy.content.how-we-use.legal_basis.body")}</p>
              </LegalArticle>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="subscribers"
              number={sectionById.get("subscribers")!.number}
              title={sectionById.get("subscribers")!.label}
            >
              <p>{t("privacy.content.subscribers.intro")}</p>
              <LegalArticle title={t("privacy.content.subscribers.controller.title")}>
                <p>{t("privacy.content.subscribers.controller.body")}</p>
                <LegalList items={t.raw("privacy.content.subscribers.controller.items") as string[]} variant="disc" />
              </LegalArticle>
              <LegalArticle title={t("privacy.content.subscribers.obligations.title")}>
                <p>{t("privacy.content.subscribers.obligations.body")}</p>
                <LegalList items={t.raw("privacy.content.subscribers.obligations.items") as string[]} variant="disc" />
              </LegalArticle>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="ai-and-automation"
              number={sectionById.get("ai-and-automation")!.number}
              title={sectionById.get("ai-and-automation")!.label}
            >
              <p>{t("privacy.content.ai-and-automation.intro")}</p>
              <LegalList items={t.raw("privacy.content.ai-and-automation.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="sharing" number={sectionById.get("sharing")!.number} title={sectionById.get("sharing")!.label}>
              <p>{t("privacy.content.sharing.intro")}</p>
              <LegalList items={t.raw("privacy.content.sharing.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="subprocessors"
              number={sectionById.get("subprocessors")!.number}
              title={sectionById.get("subprocessors")!.label}
            >
              <p>{t("privacy.content.subprocessors.intro")}</p>
              <LegalList items={t.raw("privacy.content.subprocessors.items") as string[]} variant="disc" />
              <p className="text-foreground/70 text-2xs mt-2">{t("privacy.content.subprocessors.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="international"
              number={sectionById.get("international")!.number}
              title={sectionById.get("international")!.label}
            >
              <p>{t("privacy.content.international.intro")}</p>
              <p className="text-foreground/70 text-2xs mt-2">{t("privacy.content.international.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="retention"
              number={sectionById.get("retention")!.number}
              title={sectionById.get("retention")!.label}
            >
              <p>{t("privacy.content.retention.intro")}</p>
              <LegalList items={t.raw("privacy.content.retention.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="security"
              number={sectionById.get("security")!.number}
              title={sectionById.get("security")!.label}
            >
              <p>{t("privacy.content.security.intro")}</p>
              <LegalList items={t.raw("privacy.content.security.items") as string[]} variant="check" />
              <LegalNote>{t("privacy.content.security.footer")}</LegalNote>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="your-rights"
              number={sectionById.get("your-rights")!.number}
              title={sectionById.get("your-rights")!.label}
            >
              <p>{t("privacy.content.your-rights.intro")}</p>
              <LegalList items={t.raw("privacy.content.your-rights.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection
              id="children"
              number={sectionById.get("children")!.number}
              title={sectionById.get("children")!.label}
            >
              <p>{t("privacy.content.children.intro")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="changes" number={sectionById.get("changes")!.number} title={sectionById.get("changes")!.label}>
              <p>{t("privacy.content.changes.intro")}</p>
              <p className="text-foreground/70 text-2xs mt-2">{t("privacy.content.changes.footer")}</p>
            </LegalSection>
          </Reveal>
          <Reveal>
            <LegalSection id="contact" number={sectionById.get("contact")!.number} title={sectionById.get("contact")!.label}>
              <p>{t("privacy.content.contact.intro")}</p>
              <LegalList items={t.raw("privacy.content.contact.items") as string[]} variant="disc" />
            </LegalSection>
          </Reveal>
        </LegalLayout>
      </main>
      <LegalFooter />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: t("privacy.metadata.title"),
    description: t("privacy.metadata.description"),
  };
}
