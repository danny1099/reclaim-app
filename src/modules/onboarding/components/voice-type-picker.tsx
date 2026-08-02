"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { P, CheckboxCard } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";

interface VoiceTypePickerProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const VoiceTypePicker = ({ value = "unique_brand_voice", onChange }: VoiceTypePickerProps) => {
  const [selected, setSelected] = useState<string>(value);
  const t = useTranslations("onboarding.steps.voice.tones");
  const store = useOnboardingStore((state) => state);

  const getName = () => {
    if (store.name) return store.name.split(" ")[0].at(0)?.toUpperCase() + store.name.split(" ")[0].slice(1);
    return "Ana";
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange!(value);
  };

  const typesTones = [
    {
      name: "close_and_warm",
      label: t("close_and_warm.label"),
      description: t("close_and_warm.desc"),
      preview: t("close_and_warm.preview", { name: getName() }),
    },
    {
      name: "professional_and_clear",
      label: t("professional_and_clear.label"),
      description: t("professional_and_clear.desc"),
      preview: t("professional_and_clear.preview", { name: getName() }),
    },
    {
      name: "direct_and_urgent",
      label: t("direct_and_urgent.label"),
      description: t("direct_and_urgent.desc"),
      preview: t("direct_and_urgent.preview", { name: getName() }),
    },
    {
      name: "unique_brand_voice",
      label: t("unique_brand_voice.label"),
      description: t("unique_brand_voice.desc"),
      preview: t("unique_brand_voice.preview"),
    },
  ];

  return (
    <div className="flex size-full flex-col gap-2">
      {typesTones.map(({ name, label, description, preview }) => (
        <CheckboxCard
          key={name}
          value={name}
          checked={selected === name}
          onCheckedChange={(checked) => {
            return checked ? handleSelect(name) : handleSelect("");
          }}
        >
          <div className="border-border bg-background flex h-fit min-h-14 w-full flex-col justify-center rounded-md border p-3 text-left">
            <span className="text-foreground text-xs font-medium">{label}</span>
            <P className="text-2xs text-foreground/80">{description}</P>
            {selected === name && (
              <div className="border-border mt-2 flex h-fit w-full flex-col border-t py-1 text-left">
                <span className="text-4xs text-tertiary font-medium">{t("preview")}</span>
                <P className="text-4xs text-muted-foreground font-medium text-pretty">"{preview}"</P>
              </div>
            )}
          </div>
        </CheckboxCard>
      ))}
    </div>
  );
};
