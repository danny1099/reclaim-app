"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage, Button } from "@/shared/components";
import { styleVoiceSchema, type StyleVoiceSchema } from "@/modules/onboarding/schema";
import { VoiceTypePicker } from "@/modules/onboarding/components";
import { useOnboardingStore } from "@/modules/onboarding/store";

export const FormStyleVoice = () => {
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<StyleVoiceSchema>({
    resolver: zodResolver(styleVoiceSchema),
    defaultValues: {
      style_voice: store.style_voice || "",
    },
  });

  const onSubmit = async (data: StyleVoiceSchema) => {
    store.setStyleVoice(data.style_voice);
    store.nextStep();
  };

  useEffect(() => {
    if (store.style_voice) form.setValue("style_voice", store.style_voice);
  }, []);

  return (
    <div className="mt-5 flex h-auto w-full flex-col justify-center overflow-y-auto px-4 md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="style_voice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <VoiceTypePicker value={field.value as string} onChange={field.onChange} />
                  </FormControl>
                  {form.formState.errors["style_voice"] && <FormMessage />}
                </FormItem>
              )}
            />
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
