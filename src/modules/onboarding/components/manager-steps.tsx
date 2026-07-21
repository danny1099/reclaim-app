"use client";
import { useTranslations } from "next-intl";
import { AnimatedContent, P, Title } from "@/shared/components";

/* prettier-ignore */
export const OnboardingWizard = () => {
  const t = useTranslations("onboarding");

  return (
    <section className="bg-background mt-5 flex size-full flex-col items-center">
      <div className="mt-5 flex flex-col items-center justify-center">
        <Title type="h1" className="text-3xl">
          {t("title")}
        </Title>
        <P>{t("description")}</P>
      </div>
      <AnimatedContent className="flex h-fit w-full items-center justify-center">
        <span></span>
      </AnimatedContent>
    </section>
  );
};
