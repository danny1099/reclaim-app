"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components";
import { I18nMessage } from "next-intl";
import { useToast } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { env } from "@/config/env";

interface StripeConnectionButtonProps {
  text: string;
  status?: boolean;
  className?: string;
}

export const StripeConnectionButton = ({ text, status, className }: StripeConnectionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const popupPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const toast = useToast();

  const params = new URLSearchParams({
    client_id: env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID,
    response_type: "code",
    scope: "read_write",
  });

  useEffect(() => {
    const connectStripeEvent = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "connect-gateway-response") {
        if (popupPollRef.current) {
          clearInterval(popupPollRef.current);
          popupPollRef.current = null;
        }

        const { status, message } = event.data;
        const formattedMessage = message || ("unknown_error" as I18nMessage);

        if (status === "error") {
          toast({ message: formattedMessage, type: "error", details: formattedMessage as string });
          setLoading(false);
          return;
        }

        /* reload the page to show the new connection */
        router.refresh();
        toast({ message: formattedMessage, type: "success" });
        setLoading(false);
      }
    };

    window.addEventListener("message", connectStripeEvent);
    return () => window.removeEventListener("message", connectStripeEvent);
  }, []);

  const handleConnectClick = async () => {
    setLoading(true);

    const urlRedirect = `https://connect.stripe.com/oauth/authorize?${params}`;
    const ancho = 650,
      alto = 700;
    const left = window.screenX + (window.outerWidth - ancho) / 2;
    const top = window.screenY + (window.outerHeight - alto) / 2;

    const popup = window.open(
      urlRedirect,
      "StripeConnectPopup",
      `width=${ancho},height=${alto},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      setLoading(false);
      return;
    }

    popupPollRef.current = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupPollRef.current!);
        popupPollRef.current = null;
        setLoading(false);
      }
    }, 500);
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
