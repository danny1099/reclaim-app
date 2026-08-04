"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { capitalize } from "@/shared/utils";
import { Button, Icon, P, Title } from "@/shared/components";

interface ConfirmationProcessProps {
  gateway: string;
}

export const ConfirmationProcess = ({ gateway }: ConfirmationProcessProps) => {
  const t = useTranslations("connections.connect_state");
  const redirectTo = getPrivateRoute("connections");
  const router = useRouter();

  /* get values from url params */
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  useEffect(() => {
    if (window.opener) {
      const response = {
        type: "connect-gateway-response",
        status: status === "success" ? "success" : "error",
        message: message || null,
      };

      window.opener.postMessage(response, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <section className="flex size-full flex-col items-center justify-center gap-4 px-4 py-5 md:px-14">
      <div className="dark:bg-tertiary/10 flex size-20 items-center justify-center rounded-full bg-blue-100 p-5 text-blue-600 dark:text-blue-400">
        <Icon name="plugin" className="text-tertiary size-10" />
      </div>
      <div className="flex h-fit w-full flex-col text-center">
        <Title className="text-2xl">{t("title", { gateway: capitalize(gateway) })}</Title>
        <P className="text-2xs">
          {status === "success" ? t("description-success", { gateway }) : t("description-failed", { gateway })}
        </P>
        <Button icon="arrow_left" placement="start" onClick={() => router.push(redirectTo)} className="mx-auto mt-4">
          {t("go_back_button")}
        </Button>
      </div>
    </section>
  );
};
