"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { brandSchema, type BrandSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { IconPicker } from "@/modules/onboarding/components";

export const FormBrand = () => {
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand: store.brand || "",
      logo: store.logoUrl || "app:black",
    },
  });

  const onSubmit = async (data: BrandSchema) => {
    store.setBrand(data.brand);
    store.setLogoUrl(data.logo || "app:black");
    store.nextStep();
  };

  useEffect(() => {
    if (store.brand) form.setValue("brand", store.brand);
    if (store.logoUrl) form.setValue("logo", store.logoUrl);
  }, []);

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IconPicker value={field.value as string} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-2">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.brand.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={t("form.brand.placeholder")}
                        value={field.value as string}
                        variant="outline"
                        className="text-foreground w-full"
                        icon="building"
                      />
                    </FormControl>
                    {form.formState.errors["brand"] && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" icon="arrow_right">
              {t("form.continue")}
            </Button>
            <Button type="reset" variant="outline" onClick={store.prevStep} className="w-full">
              {t("form.previous")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
