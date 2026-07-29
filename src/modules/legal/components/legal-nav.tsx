import { getTranslations } from "next-intl/server";
import { Divider, LangToggle, Logo, Navlink, ThemeToggle } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

export const LegalNav = async () => {
  const t = await getTranslations("legal.nav");

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" aria-label="Reclaim" className="shrink-0">
          <Logo showBrand />
        </a>
        <div className="flex items-center gap-2">
          <nav className="hidden justify-end gap-1 md:flex">
            <Navlink
              href={getPublicRoute("terms")}
              variant="ghost"
              className="text-2xs h-7 rounded-full px-2.5 font-medium hover:underline"
            >
              {t("terms")}
            </Navlink>
            <Navlink
              href={getPublicRoute("privacy")}
              variant="ghost"
              className="text-2xs h-7 rounded-full px-2.5 font-medium hover:underline"
            >
              {t("privacy")}
            </Navlink>
          </nav>
          <Navlink href={getPublicRoute("sign_in")} className="text-2xs h-7 rounded-full px-3.5 font-medium">
            {t("sign_in")}
          </Navlink>
          <Divider type="vertical" className="hidden h-5 md:block" />
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
