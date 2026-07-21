import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { Navbar } from "@/shared/components";
import { isAuthenticated } from "@/modules/auth/session";
import { OnboardingWizard } from "@/modules/onboarding/components";

export default async function Onboarding() {
  const { user } = await isAuthenticated();

  if (user.withOnboarding) redirect(getPrivateRoute("overview"));

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar options={{ logo: true, brand: false }} />
      <main className="bg-background flex size-full flex-col items-center gap-2 px-4 py-6 md:px-24">
        <OnboardingWizard />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("onboarding.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
