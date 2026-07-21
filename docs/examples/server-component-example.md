# Server Component Example

- This is an example of server component using trpc server prefetch and hydraclient

```tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { P, Loader, Title } from "@/shared/components";
import { OrganizationList } from "@/modules/organization/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Organizations() {
  const t = await getTranslations("organization");
  await trpc.organization.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <OrganizationList />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Organizations",
  description: "Your organizations will be listed here. You can create new ones or join existing ones.",
};
```

- This is another example for server components using client components and redirect

```tsx
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { P, Navbar, Title } from "@/shared/components";
import { isAuthenticated } from "@/modules/auth/session";
import { OnboardingSteps } from "@/modules/onboarding/components";

export default async function Onboarding() {
  const { hasOnboarding, organization } = await isAuthenticated();
  const t = await getTranslations("onboarding");

  /* if user has onboarding redirect to overview inmediately */
  const redirectTo = getPrivateRoute("overview", { organization: organization as string });
  if (hasOnboarding) redirect(redirectTo);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="bg-background flex size-full flex-col items-center gap-2 px-4 py-6 md:px-24">
        <div className="mt-10 flex h-fit w-full flex-col text-center">
          <Title>{t("title")}</Title>
          <P className="line-clamp-2">{t("description")}</P>
        </div>
        <OnboardingSteps />
      </main>
    </div>
  );
}

export const metadata = {
  title: "Onboarding",
  description: "Welcome to your onboarding, let’s get started by creating your key account.",
};
```
