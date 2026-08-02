import { getTranslations } from "next-intl/server";
import { Badge, Card, CardContent, CardHeader, Title, Icon, P } from "@/shared/components";
import { StripeConnectionButton } from "@/modules/connection/components";

interface StripeConnectionCardProps {
  status: boolean;
}

export const StripeConnectionCard = async ({ status }: StripeConnectionCardProps) => {
  const t = await getTranslations("connections");

  return (
    <Card className="h-full min-h-96 w-full rounded-lg">
      <CardHeader className="flex w-full flex-col py-2">
        <div className="flex w-full flex-row items-center justify-between">
          <Badge variant="outline" className="text-2xs -ml-0.5 px-2 py-1">
            <Icon name="trophy" className="size-4" />
            {t("card.stripe.outstanding")}
          </Badge>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="text-muted-foreground flex w-full flex-row items-center gap-2">
            <Title className="text-foreground text-lg">{t("card.stripe.name")}</Title>
            <Badge variant={status ? "accent" : "ghost"} className="text-3xs flex flex-row items-center gap-1">
              <Icon name="node" className="size-3 shrink-0" />
              {status ? t("card.stripe.connected") : t("card.stripe.disconnected")}
            </Badge>
          </div>
          <P className="text-2xs mt-1">{t("card.stripe.description")}</P>
        </div>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col py-2">
        <ul className="flex flex-col gap-2">
          {["1", "2", "3"].map((benefit, index) => (
            <li key={index} className="text-2xs text-muted-foreground flex flex-row items-center gap-x-2 font-medium">
              <Icon name="dot" className="text-foreground size-4" />
              {/* @ts-ignore */}
              {t(`card.stripe.benefits.${benefit}`)}
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-3 flex h-fit w-full flex-col items-center gap-5">
          <StripeConnectionButton text={t("cta-button", { gateway: "Stripe" })} status={status} />
          <div className="mx-auto flex flex-row items-center gap-1">
            <p className="text-muted-foreground text-3xs">{t("card.stripe.powered-by")}</p>
            <img src="/images/logo-stripe.svg" alt="Stripe logo" className="size-8 object-contain" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
