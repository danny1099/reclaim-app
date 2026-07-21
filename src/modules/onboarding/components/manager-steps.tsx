"use client";
import { useTranslations } from "next-intl";
import { AnimatedContent, IconName, P, Heading } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { FormInfo } from "@/modules/onboarding/components";

/* prettier-ignore */
export const OnboardingWizard = () => {
  const t = useTranslations("onboarding");
  const store = useOnboardingStore((state) => state);

  const steps = {
    step_1: {
      title: t("steps.account.title"),
      subtitle: t("steps.account.subtitle"),
      icon: "person" as IconName,
    },
    step_2: {
      title: t("steps.brand.title"),
      subtitle: t("steps.brand.subtitle"),
      icon: "building" as IconName,
    }
  };

  const baseStep = `step_${store.currentStep}` as keyof typeof steps;
  const currentStep = steps[baseStep];

  return (
    <section className="bg-background flex size-full flex-col items-center">
      <div className="mt-5 flex flex-col justify-center">
        <Heading type="h1" className="text-2xl">
          {currentStep.title}
        </Heading>
        <P>{currentStep.subtitle}</P>
      </div>
      
      <AnimatedContent className="flex h-fit w-full items-center justify-center">
        {store.currentStep === 1 && <FormInfo />}
      </AnimatedContent>
    </section>
  );
};
