"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/modules/auth/hooks";
import { fallbackAvatar } from "@/shared/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { infoUserSchema, type InfoUserSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { AvatarPicker } from "@/modules/onboarding/components";

export const FormInfo = () => {
  const { user, isPending } = useAuth();
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<InfoUserSchema>({
    resolver: zodResolver(infoUserSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      avatar: user?.image || "",
    },
  });

  useEffect(() => {
    if (store.name) form.setValue("name", store.name);
    if (store.avatar) form.setValue("avatar", store.avatar);
  }, []);

  useEffect(() => {
    if (user) {
      const userName = user.name || "";
      const userAvatar = user.image || "";
      const userEmail = user.email || "";

      store.setName(userName);
      store.setAvatar(userAvatar);

      if (!form.getValues("name")) form.setValue("name", userName);
      if (!form.getValues("email")) form.setValue("email", userEmail);
      if (!form.getValues("avatar")) form.setValue("avatar", userAvatar);
    }
  }, [user, isPending, form]);

  const onSubmit = async (data: InfoUserSchema) => {
    store.setName(data.name);
    store.setAvatar(data.avatar as string);
    store.nextStep();
  };

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AvatarPicker
                      url={field.value || fallbackAvatar(user?.email as string)}
                      onImageSelect={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-3 flex h-auto w-full flex-col gap-3 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={t("form.name.placeholder")}
                        value={field.value as string}
                        variant="outline"
                        className="text-foreground w-full"
                      />
                    </FormControl>
                    {form.formState.errors["name"] && <FormMessage />}
                  </FormItem>
                )}
              />
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
                        disabled
                        placeholder={t("form.email.placeholder")}
                        value={field.value as string}
                        icon="email"
                        variant="outline"
                        className="text-foreground w-full"
                      />
                    </FormControl>
                    {form.formState.errors["email"] && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" icon="arrow_right">
              {t("form.continue")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
