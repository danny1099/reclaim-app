import { getTranslations } from "next-intl/server";
import { Badge, Divider, Icon, P, Reveal, type IconName } from "@/shared/components";
import { SectionHeader } from "@/modules/marketing/components";
import { cn } from "@/shared/utils";

const cardClass =
  "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-foreground/10 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] dark:hover:shadow-none dark:hover:ring-foreground/25";

const iconChipClass =
  "flex size-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary ring-1 ring-tertiary/20";

const currencies = ["ARS", "MXN", "COP", "CLP", "USD"] as const;

interface SmallCard {
  key: "realtime" | "portal" | "gateways" | "brands";
  icon: IconName;
  span: string;
}

const smallCards: ReadonlyArray<SmallCard> = [
  { key: "realtime", icon: "bell", span: "md:col-span-2" },
  { key: "portal", icon: "password", span: "md:col-span-2" },
  { key: "gateways", icon: "globe", span: "md:col-span-2" },
  { key: "brands", icon: "persons", span: "md:col-span-2 md:col-start-2" },
];

type T = Awaited<ReturnType<typeof getTranslations>>;

/* Visual footer of each small bento card — a tiny product truth, not decoration */
const CardVisual = ({ card, t }: { card: SmallCard; t: T }) => {
  switch (card.key) {
    case "realtime":
      return (
        <div className="bg-foreground/3 text-3xs ring-border dark:bg-foreground/6 mt-auto rounded-lg p-3 font-mono ring-1">
          <div className="text-muted-foreground flex items-center gap-1.5">
            <span className="bg-destructive size-1.5 animate-pulse rounded-full" />
            invoice.payment_failed
          </div>
          <div className="mt-1 text-emerald-600 dark:text-emerald-400">→ recovery_sequence.created</div>
        </div>
      );
    case "portal":
      return (
        <div className="bg-muted/60 ring-border mt-auto flex items-center justify-between rounded-xl p-3 ring-1">
          <span className="text-2xs font-mono tracking-widest">•••• 4242</span>
          <span className="bg-tertiary text-tertiary-foreground text-3xs rounded-full px-2.5 py-1 font-semibold">
            {t("cards.portal.cta")}
          </span>
        </div>
      );
    case "gateways":
      return (
        <div className="bg-muted/60 ring-border mt-auto flex items-center gap-3 rounded-xl p-3 ring-1">
          <img src="/images/logo-stripe.svg" alt="Stripe" className="h-5 w-auto grayscale dark:invert" loading="lazy" />
          <Divider type="vertical" className="h-5" />
          <img
            src="/images/logo-mercadopago.svg"
            alt="MercadoPago"
            className="h-5 w-auto grayscale dark:invert"
            loading="lazy"
          />
        </div>
      );
    case "brands":
      return (
        <div className="mt-auto flex flex-wrap gap-1.5">
          {currencies.map((currency) => (
            <span
              key={currency}
              className="bg-muted text-muted-foreground text-3xs ring-border rounded-full px-2 py-0.5 font-mono ring-1"
            >
              {currency}
            </span>
          ))}
        </div>
      );
  }
};

export const Features = async () => {
  const t = await getTranslations("marketing.features");

  return (
    <section id="features" className="border-border/60 bg-muted/30 scroll-mt-20 border-y py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-6">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="h-full md:col-span-6 lg:col-span-4">
            <article className={cn(cardClass, "lg:flex-row lg:items-stretch lg:gap-8")}>
              <div className="flex flex-col gap-3 lg:w-2/5">
                <Badge variant="tertiary" className="w-fit">
                  <Icon name="ia" className="size-3" />
                  {t("cards.ai.badge")}
                </Badge>
                <h3 className="text-lg font-semibold tracking-tight">{t("cards.ai.title")}</h3>
                <P className="text-2xs leading-relaxed">{t("cards.ai.desc")}</P>
              </div>

              <div className="bg-muted/60 ring-border flex flex-1 flex-col gap-2 rounded-xl p-4 ring-1">
                <div className="text-3xs text-muted-foreground flex items-center justify-between gap-2">
                  <span className="truncate">{t("cards.ai.from")}</span>
                  <span className="shrink-0 font-mono">D+1</span>
                </div>
                <p className="text-2xs font-semibold">{t("cards.ai.subject")}</p>
                <p className="text-2xs text-muted-foreground line-clamp-2 leading-relaxed">{t("cards.ai.body")}</p>
                <span className="bg-action text-action-foreground text-3xs mt-1 w-fit rounded-full px-3 py-1.5 font-medium">
                  {t("cards.ai.cta")}
                </span>
                <div className="text-3xs text-muted-foreground border-border mt-1 flex items-center gap-1 border-t pt-2">
                  <Icon name="ia" className="text-tertiary size-3" />
                  {t("cards.ai.note")}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="h-full md:col-span-6 lg:col-span-2">
            <article className={cardClass}>
              <span className={iconChipClass}>
                <Icon name="shield" className="size-4" />
              </span>
              <h3 className="text-base font-semibold tracking-tight">{t("cards.safe.title")}</h3>
              <P className="text-2xs leading-relaxed">{t("cards.safe.desc")}</P>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {(["oauth", "encrypted", "readonly"] as const).map((chip) => (
                  <span
                    key={chip}
                    className="bg-muted text-muted-foreground text-3xs ring-border flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ring-1"
                  >
                    <Icon name="check" className="size-2.5 text-emerald-500" />
                    {t(`cards.safe.chips.${chip}`)}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          {smallCards.map((card, i) => (
            <Reveal key={card.key} delay={0.08 + i * 0.06} className={cn("h-full", card.span)}>
              <article className={cardClass}>
                <span className={iconChipClass}>
                  <Icon name={card.icon} className="size-4" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">{t(`cards.${card.key}.title`)}</h3>
                <P className="text-2xs leading-relaxed">{t(`cards.${card.key}.desc`)}</P>
                <CardVisual card={card} t={t} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
