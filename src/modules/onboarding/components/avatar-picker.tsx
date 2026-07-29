"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Avatar, ImageFromDevice } from "@/shared/components";
import { cn, shuffleArray } from "@/shared/utils";

interface AvatarPickerProps {
  url: string;
  onImageSelect: (url: string) => void;
  className?: string;
}

export const AvatarPicker = ({ url, onImageSelect, className }: AvatarPickerProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(url || "");
  const [avatars, setAvatars] = useState<string[]>([]);
  const t = useTranslations("onboarding.avatar_picker");

  const onAvatarSelect = (url: string) => {
    setSelectedImage(url);
    onImageSelect(url);
  };

  useEffect(() => {
    const isMemojiAvatar = url?.startsWith("https://d2u8k2ocievbld.cloudfront.net/memojis/");
    const indices = shuffleArray(Array.from({ length: 20 }, (_, i) => i + 1));

    const generated = indices.slice(0, 6).map((index) => {
      const gender = Math.random() < 0.5 ? "male" : "female";
      return `https://d2u8k2ocievbld.cloudfront.net/memojis/${gender}/${index}.png`;
    });

    setAvatars(isMemojiAvatar ? generated.map((a) => (a === url ? url : a)) : generated);
  }, []);

  useEffect(() => {
    if (url) setSelectedImage(url);
  }, [url]);

  return (
    <div className={cn("relative mt-3 flex flex-row items-center gap-3", className)}>
      <ImageFromDevice imageUrl={onAvatarSelect}>
        <Avatar url={selectedImage} size="lg" ring />
      </ImageFromDevice>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full flex-col">
          <p className="text-3xs text-foreground">{t("title")}</p>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 p-1">
          {avatars.map((url) => {
            const isSelected = selectedImage === url;
            return (
              <img
                key={url}
                src={url}
                className={cn(
                  "size-9 cursor-pointer rounded-full object-cover",
                  isSelected && "dark:ring-offset-background ring-1 ring-blue-600 ring-offset-2"
                )}
                onClick={() => {
                  setSelectedImage(url);
                  onImageSelect(url);
                }}
              />
            );
          })}
        </div>
        <p className="text-4xs text-muted-foreground">{t("upload_from_device")}</p>
      </div>
    </div>
  );
};
