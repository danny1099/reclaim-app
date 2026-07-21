import type { Metadata } from "next";
import { ViewTransition } from "react";
import { globalFont } from "@/config/fonts";
import { ThemeProvider, I18nProvider, TrpcProvider, ModalProvider } from "@/lib/providers";
import { Toaster, TooltipProvider } from "@/shared/components";
import "@/globals.css";

interface RootLayoutProps extends Children {
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${globalFont.className} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <I18nProvider>
          <ThemeProvider>
            <TooltipProvider>
              <TrpcProvider>
                <ModalProvider>
                  <ViewTransition>{children}</ViewTransition>
                </ModalProvider>
              </TrpcProvider>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Reclaim | AI-native revenue platform",
    template: "%s | Reclaim",
  },
  description:
    "It's a SaaS solution for recovering failed payments, designed for Spanish-speaking content creators. Keep subscriptions active without manual follow-ups",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/app-logo.svg",
        href: "/images/app-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/app-logo-dark.svg",
        href: "/images/app-logo-dark.svg",
      },
    ],
  },
};
