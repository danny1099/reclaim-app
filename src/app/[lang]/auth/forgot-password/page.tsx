import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ResetPasswordSteps } from "@/modules/auth/components";

export default async function ForgotPassword() {
  return <ResetPasswordSteps />;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("forgot_password.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}
