"use client";
import { useTranslations } from "next-intl";
import { useResetPasswordStore } from "@/modules/auth/store";
import { Icon, IconName, P, Heading } from "@/shared/components";

export const StepsIndicator = () => {
  const t = useTranslations("forgot_password");

  const steps = {
    step_1: {
      title: t("steps.enter-email.title"),
      subtitle: t("steps.enter-email.subtitle"),
      icon: "email_send" as IconName,
    },
    step_2: {
      title: t("steps.enter-code.title"),
      subtitle: t("steps.enter-code.subtitle"),
      icon: "inbox" as IconName,
    },
    step_3: {
      title: t("steps.reset-password.title"),
      subtitle: t("steps.reset-password.subtitle"),
      icon: "password" as IconName,
    },
  };

  const store = useResetPasswordStore();
  const baseStep = `step_${store.currentStep}` as keyof typeof steps;
  const currentStep = steps[baseStep];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="bg-accent text-accent-foreground dark:text-accent-foreground/70 flex size-18 items-center justify-center rounded-full p-5">
        <Icon name={currentStep.icon} className="size-8" />
      </div>
      <div className="flex flex-col items-center">
        <Heading type="h2" className="text-foreground mt-2 text-lg">
          {currentStep.title}
        </Heading>
        <P className="-mt-0.5 text-xs">{currentStep.subtitle}</P>
      </div>
    </div>
  );
};
