import { getTranslations } from "next-intl/server";
import { P, Heading, Logo } from "@/shared/components";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <section className="bg-background flex h-dvh flex-row items-center justify-center gap-2 opacity-85">
      <Logo className="size-7 shrink-0 animate-pulse duration-1000 ease-in" />
      <div className="flex flex-col">
        <Heading type="h6" className="text-foreground text-sm font-medium">
          {t("title")}
        </Heading>
        <P className="text-2xs -mt-0.5">{t("description")}</P>
      </div>
    </section>
  );
}
