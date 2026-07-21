"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { Badge, Button, Separator } from "@/shared/components";
import { auth } from "@/modules/auth/client";

export const AuthWithOauth = () => {
  const [lastMethod, setLastMethod] = useState<string | null>(null);
  const redirectTo = getPrivateRoute("overview");
  const t = useTranslations("sign_in");

  useEffect(() => {
    setLastMethod(auth.getLastUsedLoginMethod());
  }, []);

  return (
    <div className="relative flex h-fit w-full flex-col items-center gap-3 py-2">
      <Button
        icon="google"
        variant="accent"
        placement="start"
        className="w-full cursor-pointer"
        onClick={async () => {
          await auth.signIn.social({
            provider: "google",
            callbackURL: redirectTo,
          });
        }}
      >
        Google
        {lastMethod === "google" && (
          <Badge className="bg-muted/55 text-foreground/80 text-4xs dark:bg-muted/80 absolute right-2 dark:text-white/80">
            {t("last_method")}
          </Badge>
        )}
      </Button>
      <Separator className="my-3 w-full" text={t("or")} />
    </div>
  );
};
