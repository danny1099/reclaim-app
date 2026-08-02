import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ConfirmationProcess } from "@/modules/connection/components";
import { getPrivateRoute } from "@/routes/utils";

interface ConnectionPageProps {
  params: Promise<{ gateway: string }>;
}

export default async function Connection({ params }: ConnectionPageProps) {
  const { gateway } = await params;

  if (!gateway) {
    redirect(getPrivateRoute("connections"));
  }

  return <ConfirmationProcess gateway={gateway} />;
}

export async function generateMetadata({ params }: ConnectionPageProps): Promise<Metadata> {
  const t = await getTranslations("connections.connect_state");
  const { gateway } = await params;
  return {
    title: t("title", { gateway: gateway }),
    description: t("description"),
  };
}
