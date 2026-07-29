"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Avatar, Button, Icon, IconName, ImageFromDevice, P } from "@/shared/components";
import { brandIcons } from "@/modules/onboarding/types";
import { baseColors, getColor, type Color } from "@/shared/helpers";
import { cn } from "@/shared/utils";

interface AvatarPickerProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

/* prettier-ignore*/
export const IconPicker = ({ value, onChange, className }: AvatarPickerProps) => {
  const [selected, setSelected] = useState({ type: "icon", value });
  const [iconActive, colorActive] = selected.value.split(":") ?? [];
  const t = useTranslations("onboarding.icons_picker");

  const onIconSelect = (value: string) => {
    setSelected({ type: "icon", value });
    onChange(value);
  };

  const onImageSelect = (value: string) => {
    setSelected({ type: "image", value });
    onChange(value);
  };

  return (
    <div className={cn("relative mt-3 flex flex-col", className)}>
      <div className="flex flex-row items-center gap-3">
        <ImageFromDevice imageUrl={onImageSelect}>
          {selected.type === "image" ? (
              <Avatar url={selected.value} size="lg" />
            ) : (
              <div className={cn("flex size-14 shrink-0 items-center justify-center rounded-full", getColor(colorActive as Color))}>
              <Icon name={iconActive as IconName} className="size-8 shrink-0" />
            </div>
          )}
        </ImageFromDevice>
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full flex-col">
            <p className="text-3xs text-foreground">{t("title")}</p>
          </div>
          <div className="flex flex-row flex-wrap items-center gap-2">
            {brandIcons.map((icon) => {
              const isSelected = iconActive === icon;
              return (
                <Button
                  key={`picker-${icon}`}
                  type="button"
                  variant="ghost"
                  size="icon"
                  icon={icon}
                  onClick={() => onIconSelect(`${icon}:${colorActive}`)}
                  className={cn("ring-offset-background shrink-0", isSelected && `ring-2 ring-offset-1`, isSelected && getColor(colorActive as Color))}/>
              );
            })}
          </div>
          <p className="text-4xs text-muted-foreground">{t("upload_from_device")}</p>
        </div>
      </div>
      <div className="mt-5 flex h-10 w-full flex-col gap-2 px-0.5">
        <P className="text-3xs">{t("icon_color")}</P>
        <div className="flex w-full flex-row gap-2">
          {Object.entries(baseColors).map(([colorName]) => {
            const isSelected = colorActive === colorName;
            const styles = baseColors[colorName as Color];
            return (
              <button
                key={colorName}
                type="button"
                onClick={() => onIconSelect(`${iconActive}:${colorName}`)}
                className={cn("ring-offset-background size-4 rounded-full", styles, isSelected && "ring-1 ring-offset-1")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
