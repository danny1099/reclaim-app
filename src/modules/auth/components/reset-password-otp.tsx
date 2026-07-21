"use client";
import { useState, useEffect } from "react";
import { I18nMessage, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { useResetPasswordStore } from "@/modules/auth/store";
import { otpSchema, type OTPSchema } from "@/modules/auth/schema";
import { auth } from "@/modules/auth/client";

export const FormCode = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const t = useTranslations("forgot_password");
  const toast = useToast();

  /* use store for set email provided and navigate to next step */
  const store = useResetPasswordStore((state) => state);

  const form = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp_code: "",
    },
  });

  /* effect to decrement timer */
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onSubmit = async (values: OTPSchema) => {
    const { data, error } = await tryCatch(
      auth.emailOtp.checkVerificationOtp({
        email: store.email,
        otp: values.otp_code,
        type: "forget-password",
      })
    );

    if (error || data?.error) {
      const message = (data?.error?.code?.toLowerCase() as I18nMessage) || "unknown_error";
      toast({ message, type: "error", details: data?.error?.message });
      return;
    }

    /* set opt_code and navigate to next step */
    store.setOtpCode(values.otp_code);
    store.nextStep();
  };

  const onResend = async () => {
    const { error, data } = await tryCatch(
      auth.forgetPassword.emailOtp({
        email: store.email,
      })
    );

    if (error || data?.error) {
      const message = (data?.error?.code as I18nMessage) || "unknown_error";
      toast({ message, type: "error", details: data?.error?.message });
      return;
    }

    /* set time left to 5 minutes again and show toast */
    toast({ message: "otp_resend", type: "success" });
    setTimeLeft(300);
  };

  return (
    <div className="mt-10 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="otp_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.opt_code.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("form.opt_code.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="otp"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["otp_code"] && <FormMessage />}
                </FormItem>
              )}
            />
            <div className="mt-4 flex flex-col-reverse items-center gap-3 md:flex-row md:justify-between">
              <Button type="submit" icon="arrow_right" isLoading={form.formState.isSubmitting} className="w-full">
                {t("form.submit-button")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-2xs text-muted-foreground mt-1 mb-4 flex w-full justify-center rounded-md px-4">
        {timeLeft === 0 && (
          <span className="flex items-center gap-1">
            {t("time-out")}
            <strong className="cursor-pointer underline" onClick={() => onResend()}>
              {t("resend-code")}
            </strong>
          </span>
        )}
        {timeLeft > 0 && `${t("time-left")}: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`}
      </div>
    </div>
  );
};
