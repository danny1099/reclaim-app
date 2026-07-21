import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Title, P } from "@/shared/components";
import { FormRegister } from "@/modules/auth/components";

export default async function GetStarted() {
  const t = await getTranslations("sign_up");

  return (
    <section className="flex size-full flex-col items-center">
      <div className="flex h-fit flex-col px-4 pt-10 md:w-1/3">
        <Title>{t("title")}</Title>
        <P className="truncate text-pretty">{t("description")}</P>
      </div>
      <FormRegister />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sign_up.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
