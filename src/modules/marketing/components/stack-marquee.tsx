import { getTranslations } from "next-intl/server";
import { P } from "@/shared/components";

const pills = ["webhooks", "oauth", "multicurrency", "react_email", "resend", "detection"] as const;

type T = Awaited<ReturnType<typeof getTranslations>>;

const MarqueeGroup = ({ t, hidden }: { t: T; hidden?: boolean }) => {
  return (
    <div aria-hidden={hidden} className="flex items-center gap-10 pr-10">
      <img
        src="/images/logo-stripe.svg"
        alt="Stripe"
        className="h-5 w-auto opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 dark:invert"
        loading="lazy"
      />
      <img
        src="/images/logo-mercadopago.svg"
        alt="MercadoPago"
        className="h-5 w-auto opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 dark:invert"
        loading="lazy"
      />
      {pills.map((pill) => (
        <span
          key={pill}
          className="text-2xs text-muted-foreground ring-border rounded-full px-3 py-1 font-medium whitespace-nowrap ring-1"
        >
          {t(`pills.${pill}`)}
        </span>
      ))}
    </div>
  );
};

export const StackMarquee = async () => {
  const t = await getTranslations("marketing.marquee");

  return (
    <section className="border-border/60 bg-muted/30 border-y py-10">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <P className="text-3xs text-center font-semibold tracking-[0.2em] uppercase">{t("label")}</P>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max items-center">
            <MarqueeGroup t={t} />
            <MarqueeGroup t={t} hidden />
          </div>
        </div>
      </div>
    </section>
  );
};
