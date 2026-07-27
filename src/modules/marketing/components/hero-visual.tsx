"use client";
import { useTranslations } from "next-intl";
import { Icon } from "@/shared/components";

const satelliteShadow = "shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_32px_-12px_rgba(0,0,0,0.18)] dark:shadow-none";

const nodes = [
  { key: "d1", animation: "animate-seq-node-1" },
  { key: "d3", animation: "animate-seq-node-2" },
  { key: "d7", animation: "animate-seq-node-3" },
] as const;

const subjects = [
  { key: "d1", animation: "animate-seq-subject-1" },
  { key: "d3", animation: "animate-seq-subject-2" },
  { key: "d7", animation: "animate-seq-subject-3" },
] as const;

export const HeroVisual = () => {
  const t = useTranslations("marketing.hero.visual");

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        aria-hidden
        className={`animate-float bg-card ring-foreground/10 absolute top-2 -left-40 hidden w-52 -rotate-6 flex-col gap-1.5 rounded-xl p-3 text-left ring-1 lg:flex ${satelliteShadow}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="bg-destructive size-1.5 rounded-full" />
          <span className="text-3xs text-muted-foreground font-mono">{t("webhook_title")}</span>
        </div>
        <span className="text-2xs font-mono font-medium">invoice.payment_failed</span>
        <span className="text-3xs font-mono text-emerald-600 dark:text-emerald-400">{t("webhook_status")}</span>
      </div>

      <div
        aria-hidden
        className={`animate-float-delayed bg-card ring-foreground/10 absolute -right-40 bottom-14 hidden w-44 rotate-3 flex-col items-start gap-2 rounded-xl p-3 ring-1 lg:flex ${satelliteShadow}`}
      >
        <span className="text-3xs text-muted-foreground font-medium">{t("gateways_title")}</span>
        <div className="flex items-center gap-2.5 grayscale dark:invert">
          <img src="/images/logo-stripe.svg" alt="" className="h-4 w-auto" loading="lazy" />
          <span className="text-border">·</span>
          <img src="/images/logo-mercadopago.svg" alt="" className="h-4 w-auto" loading="lazy" />
        </div>
      </div>

      <div className="bg-card ring-foreground/10 relative rounded-2xl p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-24px_rgba(0,0,0,0.18)] ring-1 md:p-7 dark:shadow-none">
        <div className="animate-seq-recovered text-3xs md:text-2xs absolute -top-4 right-6 z-20 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 font-semibold text-white opacity-0 shadow-lg shadow-emerald-500/25">
          <Icon name="check" className="size-3" />
          {t("recovered")}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="animate-seq-failed bg-destructive/10 flex size-6 shrink-0 items-center justify-center rounded-full">
              <span className="bg-destructive size-1.5 rounded-full" />
            </span>
            <span className="text-2xs text-muted-foreground truncate font-mono">
              {t("failed_event")}
              <span className="hidden sm:inline"> · {t("failed_amount")}</span>
            </span>
          </div>
          <span className="text-3xs flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
            {t("live")}
          </span>
        </div>

        <div className="relative mt-9 px-4">
          <div aria-hidden className="bg-border absolute inset-x-4 top-4.5 h-px" />
          <div aria-hidden className="animate-seq-dot pointer-events-none absolute inset-x-4 top-0 h-9">
            <span className="bg-tertiary shadow-tertiary/60 absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px]" />
          </div>

          <div className="relative flex items-start justify-between">
            <div className="relative z-10 flex w-0 flex-col items-center gap-2">
              <span className="relative flex size-9 items-center justify-center">
                <span aria-hidden className="bg-card absolute inset-0 rounded-full" />
                <span className="animate-seq-failed bg-destructive/20 text-destructive ring-destructive/30 relative flex size-full items-center justify-center rounded-full ring-1">
                  <Icon name="alert" className="size-3.5" />
                </span>
              </span>
              <span className="text-3xs text-muted-foreground w-fit font-medium">{t("failed_label")}</span>
            </div>

            {nodes.map((node) => (
              <div key={node.key} className="relative z-10 flex w-0 flex-col items-center gap-2">
                <span className="relative flex size-9 items-center justify-center">
                  <span aria-hidden className="bg-card absolute inset-0 rounded-full" />
                  <span
                    className={`bg-muted text-muted-foreground ring-border relative flex size-full items-center justify-center rounded-full ring-1 ${node.animation}`}
                  >
                    <Icon name="email_send" className="size-3.5" />
                  </span>
                </span>
                <span className="text-3xs text-muted-foreground font-medium whitespace-nowrap">{t(`days.${node.key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 ring-border mt-8 rounded-xl p-4 text-left ring-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-3xs text-tertiary flex items-center gap-1.5 font-semibold tracking-widest uppercase">
              <Icon name="ia" className="size-3" />
              {t("email_badge")}
            </span>
            <span className="text-3xs text-muted-foreground">{t("ai_note")}</span>
          </div>
          <div className="relative mt-3 h-5">
            {subjects.map((subject) => (
              <span
                key={subject.key}
                className={`text-2xs absolute inset-0 truncate font-medium opacity-0 md:text-xs ${subject.animation}`}
              >
                {t(`subjects.${subject.key}`)}
              </span>
            ))}
          </div>
          <div className="mt-3 space-y-1.5" aria-hidden>
            <div className="bg-border/80 h-1.5 w-11/12 rounded-full" />
            <div className="bg-border/80 h-1.5 w-2/3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
