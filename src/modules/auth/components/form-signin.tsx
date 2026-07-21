"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { I18nMessage, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tryCatch } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { getPrivateRoute, getPublicRoute } from "@/routes/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Input, Button, InputPassword, Badge } from "@/shared/components";
import { AuthWithOauth, FormNavigate } from "@/modules/auth/components";
import { signInSchema, type SignInSchema } from "@/modules/auth/schema";
import { auth } from "@/modules/auth/client";

export const FormSignIn = () => {
  const [lastMethod, setLastMethod] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations("sign_in");

  useEffect(() => {
    setLastMethod(auth.getLastUsedLoginMethod());
  }, []);

  /* get routes to navigate and redirect */
  const redirectToSignUp = getPublicRoute("get_started");
  const redirectToForgotPassword = getPublicRoute("forgot_password");
  const redirectTo = getPrivateRoute("overview");

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: SignInSchema) => {
    const { error, data } = await tryCatch(
      auth.signIn.email({
        email,
        password,
      })
    );

    if (error || data?.error) {
      const message = (data?.error?.code?.toLowerCase() as I18nMessage) || "unknown_error";
      toast({ message, type: "error" });
      return;
    }

    form.reset();
    router.push(redirectTo, { scroll: false });
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
            <div className="-mt-2 flex h-auto w-full items-center">
              <Link href={redirectToForgotPassword} className="text-2xs text-muted-foreground ml-auto p-0">
                {t("forgot-password")}
              </Link>
            </div>
            <div className="relative">
              <Button type="submit" className="mt-4 w-full" icon="arrow_right" isLoading={form.formState.isSubmitting}>
                {t("form.continue-button")}
                {lastMethod === "email" && (
                  <Badge className="bg-muted/5 dark:bg-tertiary/70 text-accent text-4xs absolute right-2 dark:text-white/80">
                    {t("last_method")}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          <FormNavigate redirectTo={redirectToSignUp} text={t("navigate.text")} link={t("navigate.link")} />
        </form>
      </Form>
    </article>
  );
};
