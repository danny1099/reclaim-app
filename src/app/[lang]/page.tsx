import { getTranslations } from "next-intl/server";
import { Navbar, P, Title, Navlink } from "@/shared/components";

export default async function Home() {
  const t = await getTranslations("marketing");

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <main className="flex size-full flex-col items-center justify-center text-center">
        <Title className="font-bold">{t("title")}</Title>
        <P>{t("description")}</P>

        <div className="mt-5 flex flex-row items-center gap-2">
          <Navlink href="/auth/sign-in" variant="outline">
            Sign In
          </Navlink>
          <Navlink href="/auth/get-started">Get Started</Navlink>
        </div>
      </main>
    </div>
  );
}
