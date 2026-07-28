import { getTranslations } from "next-intl/server";
import { Icon, P, Reveal } from "@/shared/components";
import type { IconName } from "@/shared/components";
import { SectionHeader } from "@/modules/marketing/components/section-header";

interface Step {
  key: "s1" | "s2" | "s3";
  icon: IconName;
  index: string;
}

/* Numbered because the content IS a sequence — order carries meaning here */
const steps: ReadonlyArray<Step> = [
  { key: "s1", icon: "refresh", index: "01" },
  { key: "s2", icon: "bell", index: "02" },
  { key: "s3", icon: "check", index: "03" },
];

export const HowItWorks = async () => {
  const t = await getTranslations("marketing.how");

  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-6">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.08} className="h-full">
              <article className="group bg-card ring-foreground/10 dark:hover:ring-foreground/25 relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 ring-1 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-none">
                <span
                  aria-hidden
                  className="text-foreground/6 group-hover:text-tertiary/15 absolute top-2 right-4 text-6xl font-bold tracking-tight transition-colors duration-300"
                >
                  {step.index}
                </span>
                <span className="bg-tertiary/20 text-tertiary ring-tertiary/20 flex size-10 items-center justify-center rounded-full ring-1">
                  <Icon name={step.icon} className="size-4" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">{t(`steps.${step.key}.title`)}</h3>
                <P className="text-2xs leading-relaxed">{t(`steps.${step.key}.desc`)}</P>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
