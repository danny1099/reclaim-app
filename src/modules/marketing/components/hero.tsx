import { getTranslations } from "next-intl/server";
import { getPublicRoute } from "@/routes/utils";
import { Badge, Icon, Navlink, P, Reveal, Title } from "@/shared/components";
import { HeroVisual } from "@/modules/marketing/components";

const microcopyKeys = ["no_card", "setup", "cancel"] as const;

export const Hero = async () => {
  const t = await getTranslations("marketing.hero");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_65%_60%_at_50%_35%,black,transparent)]" />
        <div className="bg-tertiary/15 absolute top-24 left-1/2 size-105 -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 pb-24 text-center md:px-6 md:pt-28">
        <Reveal>
          <Badge variant="outline" className="text-2xs bg-background gap-1.5 py-1 pr-3 pl-1.5 font-medium">
            <span className="bg-tertiary/15 flex size-4 items-center justify-center rounded-full">
              <span className="bg-tertiary size-1.5 animate-pulse rounded-full" />
            </span>
            {t("badge")}
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <Title className="mt-6 max-w-3xl text-5xl leading-[1.02] tracking-[-0.045em] text-balance md:text-7xl">
            {t("title_1")} <span className="text-tertiary">{t("title_highlight")}</span> {t("title_2")}
          </Title>
        </Reveal>
        <Reveal delay={0.16}>
          <P className="mt-6 max-w-xl text-sm leading-relaxed text-pretty md:text-base">{t("subtitle")}</P>
        </Reveal>
        <Reveal delay={0.24} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Navlink
            href={getPublicRoute("get_started")}
            icon="arrow_right"
            className="h-11 rounded-full px-6 text-sm transition-transform active:scale-[0.97]"
          >
            {t("cta_primary")}
          </Navlink>
          <Navlink
            href="#how-it-works"
            variant="outline"
            className="h-11 rounded-full px-6 text-sm transition-transform active:scale-[0.97]"
          >
            {t("cta_secondary")}
          </Navlink>
        </Reveal>
        <Reveal delay={0.32}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            {microcopyKeys.map((key) => (
              <li key={key} className="text-2xs text-muted-foreground flex items-center gap-1.5">
                <Icon name="check" className="text-tertiary size-3" />
                {t(`microcopy.${key}`)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.4} y={24} className="mt-16 w-full">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
};
