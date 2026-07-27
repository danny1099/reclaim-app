import { getTranslations } from "next-intl/server";
import { Heading, Navlink, Reveal } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

export const FinalCta = async () => {
  const t = await getTranslations("marketing.cta");

  return (
    <section className="px-4 pb-24 md:px-6">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="bg-foreground text-background relative overflow-hidden rounded-3xl px-6 py-16 text-center md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_80%_at_50%_50%,black,transparent)] bg-size-[56px_56px]" />
            <div className="bg-tertiary/40 absolute -top-24 left-1/2 size-105 -translate-x-1/2 rounded-full blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <Heading className="max-w-2xl text-3xl tracking-[-0.03em] text-balance md:text-5xl">{t("title")}</Heading>
            <p className="text-background/70 max-w-md text-sm leading-relaxed text-pretty">{t("subtitle")}</p>
            <Navlink
              href={getPublicRoute("get_started")}
              variant="ghost"
              icon="arrow_right"
              className="bg-background text-foreground h-10 rounded-full px-6 text-sm transition-transform active:scale-[0.97]"
            >
              {t("button")}
            </Navlink>
            <p className="text-3xs text-background/60">{t("microcopy")}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
