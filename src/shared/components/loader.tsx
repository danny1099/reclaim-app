import { useTranslations } from "next-intl";
import { Title, P } from "@/shared/components";

export const Loader = () => {
  const t = useTranslations("loading");

  return (
    <div className="flex size-full flex-row items-center justify-center gap-3">
      <div className="border-t-primary text-primary flex size-7 animate-spin items-center justify-center rounded-full border-2 border-transparent text-4xl">
        <div className="flex size-6 animate-spin items-center justify-center rounded-full border border-transparent border-t-gray-500 text-2xl text-gray-500" />
      </div>
      <span className="flex flex-col justify-center">
        <Title type="h3" className="text-sm">
          {t("title")}
        </Title>
        <P>{t("description")}</P>
      </span>
    </div>
  );
};
