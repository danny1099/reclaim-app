"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Input, Button } from "@/shared/components";
import { emailSchema, type EmailSchema } from "@/modules/auth/schema";
import { useResetPasswordStore } from "@/modules/auth/store";
import { auth } from "@/modules/auth/client";

export const FormEmail = () => {
  const toast = useToast();
  const t = useTranslations("forgot_password");

  /* use store for set email provided and navigate to next step */
  const store = useResetPasswordStore((state) => state);

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: EmailSchema) => {
    const { error, data } = await tryCatch(
      auth.forgetPassword.emailOtp({
        email: values.email,
      })
    );

    if (error || data?.error) {
      const message = (data?.error?.code?.toLowerCase() as I18nMessage) || "unknown_error";
      toast({ message, type: "error" });
      return;
    }

    /* set email and navigate to next step */
    store.setEmail(values.email);
    store.nextStep();
  };

  return (
    <div className="mt-10 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.email.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="email"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["email"] && <FormMessage />}
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" icon="arrow_right" isLoading={form.formState.isSubmitting}>
              {t("form.submit-button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
