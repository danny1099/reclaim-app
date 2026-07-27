import { getTranslations } from "next-intl/server";
import { Divider, LangToggle, Logo, Navlink, ThemeToggle } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

const anchors = [
  { key: "how_it_works", href: "#how-it-works" },
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export const MarketingNav = async () => {
  const t = await getTranslations("marketing.nav");

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" aria-label="Reclaim" className="shrink-0">
          <Logo showBrand />
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label={t("sections")}>
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="text-2xs text-muted-foreground hover:text-foreground rounded-md px-3 py-2 font-medium transition-colors"
            >
              {t(anchor.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <Divider type="vertical" className="hidden h-6 md:block" />
          <Navlink href={getPublicRoute("sign_in")} variant="ghost" className="hidden md:inline-flex">
            {t("sign_in")}
          </Navlink>
          <Navlink
            href={getPublicRoute("get_started")}
            className="rounded-full px-4 transition-transform active:scale-[0.97]"
          >
            {t("get_started")}
          </Navlink>
        </div>
      </div>
    </header>
  );
};
