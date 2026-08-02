"use client";
import { useTranslations } from "next-intl";
import { AnimatedContent, IconName, P, Heading } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { FormInfo, FormBrand, FormStyleVoice } from "@/modules/onboarding/components";

export const OnboardingWizard = () => {
  const t = useTranslations("onboarding");
  const store = useOnboardingStore((state) => state);

  const steps = {
    step_1: {
      title: t("steps.account.title"),
      subtitle: t("steps.account.subtitle"),
    },
    step_2: {
      title: t("steps.brand.title"),
      subtitle: t("steps.brand.subtitle"),
    },
    step_3: {
      title: t("steps.voice.title"),
      subtitle: t("steps.voice.subtitle"),
    },
  };

  const baseStep = `step_${store.currentStep}` as keyof typeof steps;
  const currentStep = steps[baseStep];

  return (
    <section className="bg-background flex size-full flex-col">
      <div className="mx-auto mt-10 flex w-full flex-col max-sm:px-4 md:w-110">
        <Heading type="h1" className="text-2xl">
          {currentStep.title}
        </Heading>
        <P className="text-pretty">{currentStep.subtitle}</P>
      </div>
      <AnimatedContent className="flex h-fit w-full items-center justify-center">
        {store.currentStep === 1 && <FormInfo />}
        {store.currentStep === 2 && <FormBrand />}
        {store.currentStep === 3 && <FormStyleVoice />}
      </AnimatedContent>
    </section>
  );
};
