"use client";
import { I18nMessage, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { getPublicRoute } from "@/routes/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, InputPassword } from "@/shared/components";
import { resetPassword, type ResetPassword } from "@/modules/auth/schema";
import { useResetPasswordStore } from "@/modules/auth/store";
import { auth } from "@/modules/auth/client";

export const FormReset = () => {
  const toast = useToast();
  const router = useRouter();
  const t = useTranslations("forgot_password");

  /* use api services to reset password and navigate to sign in */
  const redirectTo = getPublicRoute("sign_in");

  /* use store for get email and otp provided and navigate to next step */
  const store = useResetPasswordStore((state) => state);

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      email: store.email,
      otp_code: store.otp_code,
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: ResetPassword) => {
    if (values.password !== values.confirm_password) {
      toast({ message: "password_mismatch", type: "error" });
      return;
    }

    const { data, error } = await tryCatch(
      auth.emailOtp.resetPassword({
        email: values.email,
        otp: values.otp_code,
        password: values.password,
      })
    );

    if (error || data?.error) {
      const message = (data?.error?.code?.toLowerCase() as I18nMessage) || "unknown_error";
      toast({ message, type: "error", details: data?.error?.message });
      return;
    }

    /* reset store state and navigate to sign in */
    toast({ message: "password_changed", type: "success" });
    store.reset();
    router.push(redirectTo, { scroll: false });
  };

  return (
    <div className="mt-10 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.password.label")}</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      type="text"
                      placeholder={t("form.password.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["password"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.confirm-password.label")}</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      type="text"
                      placeholder={t("form.confirm-password.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["confirm_password"] && <FormMessage />}
                </FormItem>
              )}
            />
            <Button type="submit" icon="arrow_right" isLoading={form.formState.isSubmitting} className="mt-4 w-full">
              {t("form.reset-button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
