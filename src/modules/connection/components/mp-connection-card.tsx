import { getTranslations } from "next-intl/server";
import { Badge, Button, Card, CardContent, CardHeader, Title, Icon, P } from "@/shared/components";

interface MercadoPagoConnectionCardProps {
  status: boolean;
}

export const MercadoPagoConnectionCard = async ({ status }: MercadoPagoConnectionCardProps) => {
  const t = await getTranslations("connections");

  return (
    <Card className="h-full min-h-96 w-full rounded-lg">
      <CardHeader className="flex w-full flex-col py-2">
        <div className="flex w-full flex-row items-center justify-between">
          <Badge variant="tertiary" className="text-2xs -ml-0.5 px-2 py-1">
            <Icon name="star" className="size-4" />
            {t("card.mercadopago.outstanding")}
          </Badge>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="text-muted-foreground flex w-full flex-row items-center gap-2">
            <Title className="text-foreground text-lg">{t("card.mercadopago.name")}</Title>
            <Badge variant={status ? "accent" : "ghost"} className="text-3xs -ml-1 flex flex-row items-center gap-1">
              <Icon name="node" className="size-3 shrink-0" />
              {status ? t("card.mercadopago.connected") : t("card.mercadopago.disconnected")}
            </Badge>
          </div>
          <P className="text-2xs mt-1">{t("card.mercadopago.description")}</P>
        </div>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col py-2">
        <ul className="flex flex-col gap-2">
          {["1", "2", "3"].map((benefit, index) => (
            <li key={index} className="text-2xs text-muted-foreground flex flex-row items-center gap-x-2 font-medium">
              <Icon name="dot" className="text-foreground size-4" />
              {/* @ts-ignore */}
              {t(`card.mercadopago.benefits.${benefit}`)}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex h-fit w-full flex-col items-center gap-5">
          <Button icon="manage" size="sm" className="text-2xs z-10 w-full cursor-pointer">
            {t("cta-button", { gateway: "Mercadopago" })}
          </Button>
          <div className="mx-auto -mt-3 flex flex-row items-center gap-1">
            <p className="text-muted-foreground text-3xs">{t("card.mercadopago.powered-by")}</p>
            <img src="/images/logo-mercadopago.svg" alt="Mercado Pago logo" className="size-14 object-contain" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
