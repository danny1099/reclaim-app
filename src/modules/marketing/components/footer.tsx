import { getTranslations } from "next-intl/server";
import { Logo, Navlink, P } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

const productAnchors = [
  { key: "how_it_works", href: "#how-it-works" },
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export const Footer = async () => {
  const t = await getTranslations("marketing.footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-3">
            <Logo showBrand />
            <P className="max-w-xs text-2xs leading-relaxed">{t("tagline")}</P>
          </div>

          <nav aria-label={t("columns.product.title")} className="flex flex-col items-start gap-2.5">
            <span className="text-2xs font-semibold">{t("columns.product.title")}</span>
            {productAnchors.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="text-2xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(`columns.product.links.${anchor.key}`)}
              </a>
            ))}
          </nav>

          <nav aria-label={t("columns.access.title")} className="flex flex-col items-start gap-2.5">
            <span className="text-2xs font-semibold">{t("columns.access.title")}</span>
            <Navlink
              href={getPublicRoute("sign_in")}
              variant="link"
              className="text-2xs text-muted-foreground h-auto p-0"
            >
              {t("columns.access.links.sign_in")}
            </Navlink>
            <Navlink
              href={getPublicRoute("get_started")}
              variant="link"
              className="text-2xs text-muted-foreground h-auto p-0"
            >
              {t("columns.access.links.get_started")}
            </Navlink>
          </nav>
        </div>

        <div className="text-3xs text-muted-foreground border-border/60 flex flex-col items-center justify-between gap-2 border-t pt-6 md:flex-row">
          <span>{t("rights", { year })}</span>
          <span>{t("made_for")}</span>
        </div>
      </div>
    </footer>
  );
};
