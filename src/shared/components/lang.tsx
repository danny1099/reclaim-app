"use client";
import { useLocale, useTranslations } from "next-intl";
import { type Locale, usePathname, useRouter } from "@/lib/i18n/core/routing";
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/shared/components";
import { Button, Tooltip, DropdownMenu, DropdownMenuTrigger } from "@/shared/components";

export const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();

  /* get all locales available and its translations */
  const t = useTranslations("lang");
  const currentLocale = useLocale();

  const allLocales = [
    {
      locale: "en",
      name: t("locales.en"),
    },
  ];

  const handleChangeLang = (newLang: string) => {
    if (currentLocale === newLang) return;
    router.push(pathname, { locale: newLang as Locale, scroll: false });
  };

  return (
    <DropdownMenu>
      <Tooltip text={t("tooltip")}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" icon="globe" placement="start" className="hover:bg-accent h-7 w-fit">
            {t(`locales.${currentLocale}`)}
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleChangeLang}>
          {allLocales.map(({ locale, name }) => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              <div className="text-2xs flex flex-row items-center gap-2 p-1">
                <p className="text-2xs text-foreground font-medium">{name}</p>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
