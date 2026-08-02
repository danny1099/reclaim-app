"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components";
import { I18nMessage } from "next-intl";
import { useToast } from "@/shared/hooks";
import { cn } from "@/shared/utils";

interface StripeConnectionButtonProps {
  text: string;
  status?: boolean;
  className?: string;
}

export const StripeConnectionButton = ({ text, status, className }: StripeConnectionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const connectStripeEvent = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "stripe-connect-success") {
        const { status, message } = event.data;
        const formattedMessage = message || ("unknown_error" as I18nMessage);

        if (status === "error") {
          toast({ message: formattedMessage, type: "error", details: formattedMessage as string });
          setLoading(false);
          return;
        }

        /* reload the page to show the new connection */
        setLoading(false);
        router.refresh();
        toast({ message: formattedMessage, type: "success" });
      }
    };

    window.addEventListener("message", connectStripeEvent);
    return () => window.removeEventListener("message", connectStripeEvent);
  }, []);

  const handleConnectClick = async () => {
    setLoading(true);

    /* fetch the stripe connect url */
    const response = await fetch("/api/integrations/stripe/connect");
    const data = await response.json();

    if (data.url) {
      const ancho = 550;
      const alto = 700;
      const left = window.screenX + (window.outerWidth - ancho) / 2;
      const top = window.screenY + (window.outerHeight - alto) / 2;

      /* open in a new window */
      window.open(
        data.url,
        "StripeConnectPopup",
        `width=${ancho},height=${alto},top=${top},left=${left},padding=20px,scrollbars=yes,resizable=yes`
      );
    }
  };

  return (
    <Button
      icon="manage"
      size="sm"
      onClick={handleConnectClick}
      isLoading={loading}
      disabled={status}
      className={cn("text-2xs z-10 w-full cursor-pointer", className)}
    >
      {text}
    </Button>
  );
};
