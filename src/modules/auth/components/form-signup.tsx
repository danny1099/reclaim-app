"use client";
import { I18nMessage, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { getPublicRoute } from "@/routes/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Input, Button, InputPassword } from "@/shared/components";
import { AuthWithOauth, FormNavigate } from "@/modules/auth/components";
import { signUpSchema, type SignUpSchema } from "@/modules/auth/schema";
import { auth } from "@/modules/auth/client";

export const FormRegister = () => {
  const redirectToSignIn = getPublicRoute("sign_in");
  const t = useTranslations("sign_up");
  const toast = useToast();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: SignUpSchema) => {
    const { error, data } = await tryCatch(auth.signUp.email({ email, password, name: "" }));

    if (error || data?.error) {
      const message = (data?.error?.code?.toLowerCase() as I18nMessage) || "unknown_error";
      toast({ message, type: "error" });
      return;
    }

    form.reset();
    toast({ message: "account_created", type: "success" });
  };

  return (
    <article className="mt-5 flex size-full flex-col px-4 md:w-1/3">
      <AuthWithOauth />
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
            <Button type="submit" className="mt-4 w-full" icon="arrow_right" isLoading={form.formState.isSubmitting}>
              {t("form.continue-button")}
            </Button>
          </div>
          <FormNavigate redirectTo={redirectToSignIn} text={t("navigate.text")} link={t("navigate.link")} />
        </form>
      </Form>
    </article>
  );
};
