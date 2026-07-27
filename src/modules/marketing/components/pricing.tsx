import { getTranslations } from "next-intl/server";
import { Badge, Icon, Navlink, P, Reveal } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";
import { SectionHeader } from "@/modules/marketing/components/section-header";
import { cn } from "@/shared/utils";

/* Tiers mirror the Plan enum in prisma/schema.prisma */
interface PlanTier {
  key: "free" | "starter" | "growth" | "scale";
  price: number;
  featured?: boolean;
}

const tiers: ReadonlyArray<PlanTier> = [
  { key: "free", price: 0 },
  { key: "starter", price: 29 },
  { key: "growth", price: 79, featured: true },
  { key: "scale", price: 199 },
];

const featureIndexes = [0, 1, 2, 3] as const;

export const Pricing = async () => {
  const t = await getTranslations("marketing.pricing");

  return (
    <section id="pricing" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-6">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-4 pt-3 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 0.07} className="h-full">
              <article
                className={cn(
                  "bg-card relative flex h-full flex-col gap-5 rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1",
                  tier.featured
                    ? "ring-tertiary shadow-tertiary/25 shadow-[0_16px_48px_-16px] ring-2"
                    : "ring-foreground/10 dark:hover:ring-foreground/25 ring-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] dark:hover:shadow-none"
                )}
              >
                {tier.featured && (
                  <Badge
                    variant="tertiary"
                    className="bg-tertiary text-tertiary-foreground shadow-tertiary/25 absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-md"
                  >
                    {t("most_popular")}
                  </Badge>
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{t(`plans.${tier.key}.name`)}</h3>
                  <P className="text-2xs">{t(`plans.${tier.key}.tagline`)}</P>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight tabular-nums">${tier.price}</span>
                  <span className="text-2xs text-muted-foreground">{t("period")}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {featureIndexes.map((index) => (
                    <li key={index} className="text-2xs flex items-start gap-2">
                      <Icon name="check" className="text-tertiary mt-0.5 size-3 shrink-0" />
                      <span>{t(`plans.${tier.key}.features.${index}`)}</span>
                    </li>
                  ))}
                </ul>

                <Navlink
                  href={getPublicRoute("get_started")}
                  variant={tier.featured ? "tertiary" : "outline"}
                  className="text-2xs mt-auto h-10 rounded-full transition-transform active:scale-[0.97]"
                >
                  {t("cta")}
                </Navlink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <P className="text-2xs text-center">{t("note")}</P>
        </Reveal>
      </div>
    </section>
  );
};
