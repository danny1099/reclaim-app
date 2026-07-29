import { getTranslations } from "next-intl/server";
import { Logo, Navlink, P } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

export const LegalFooter = async () => {
  const t = await getTranslations("legal.footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-2.5">
            <Logo showBrand />
            <P className="text-3xs max-w-xs leading-relaxed">{t("tagline")}</P>
          </div>

          <nav aria-label={t("columns.legal.title")} className="flex flex-col items-start gap-2">
            <span className="text-2xs font-semibold tracking-widest uppercase">{t("columns.legal.title")}</span>
            <Navlink href={getPublicRoute("terms")} variant="link" className="text-2xs text-muted-foreground h-auto p-0">
              {t("columns.legal.links.terms")}
            </Navlink>
            <Navlink href={getPublicRoute("privacy")} variant="link" className="text-2xs text-muted-foreground h-auto p-0">
              {t("columns.legal.links.privacy")}
            </Navlink>
          </nav>
          <nav aria-label={t("columns.access.title")} className="flex flex-col items-start gap-2">
            <span className="text-2xs font-semibold tracking-widest uppercase">{t("columns.access.title")}</span>
            <Navlink href={getPublicRoute("home")} variant="link" className="text-2xs text-muted-foreground h-auto p-0">
              {t("columns.access.links.home")}
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
          <span className="font-mono tabular-nums">{t("contact_email")}</span>
        </div>
      </div>
    </footer>
  );
};
