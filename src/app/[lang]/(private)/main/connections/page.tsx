import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { P, Title } from "@/shared/components";
import { MercadoPagoConnectionCard, StripeConnectionCard } from "@/modules/connection/components";

export default async function Connections() {
  const t = await getTranslations("connections");

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs w-full truncate text-pretty md:w-xl">{t("description")}</P>
      </div>
      <article className="bg-background mx-auto grid h-full w-full max-w-5xl grid-cols-1 gap-3 py-2 md:grid-cols-2 lg:grid-cols-3">
        <MercadoPagoConnectionCard status={false} />
        <StripeConnectionCard status={false} />
      </article>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("connections.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
