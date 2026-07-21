"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatedContent, Button } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";
import { FormCode, FormEmail, FormReset, StepsIndicator } from "@/modules/auth/components";
import { useResetPasswordStore } from "@/modules/auth/store";

/* prettier-ignore */
export const ResetPasswordSteps = () => {
  const t = useTranslations("forgot_password");
  const redirectTo = getPublicRoute("sign_in");
  const router = useRouter();

  /* get current step from store */
  const store = useResetPasswordStore((state) => state);

  const handleGoBack = () => {
    if (store.currentStep === 1) {
      router.push(redirectTo, { scroll: false });
    } else {
      store.reset();
    }
  };

  return (
    <section className="flex size-full flex-col items-center justify-center py-6">
      <article className="bg-background mt-10 flex size-full flex-col items-center">
        <StepsIndicator />
        <AnimatedContent className="flex h-fit w-full items-center justify-center">
          {store.currentStep === 1 && <FormEmail />}
          {store.currentStep === 2 && <FormCode />}
          {store.currentStep === 3 && <FormReset />}
        </AnimatedContent>
        <Button variant="ghost" icon="refresh" placement="start" onClick={handleGoBack} className="text-muted-foreground text-2xs mt-2 hover:underline">
          {t("navigate")}
        </Button>
      </article>
    </section>
  );
};
