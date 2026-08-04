import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
import { getPrivateRoute, getPublicRoute } from "@/routes/utils";
import { getAuthSession } from "@/modules/auth/session";
import { stripePlatform } from "@/lib/payments/stripe";
import { trpc } from "@/trpc/server";

export async function GET(request: NextRequest) {
  const authenticated = await getAuthSession();
  const locale = await getLocale();
  const redirectTo = `/${locale}${getPrivateRoute("connections")}`;

  if (!authenticated) {
    return NextResponse.redirect(new URL(`/${locale}${getPublicRoute("sign_in")}`, request.url));
  }

  /* get code from url params */
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  /* check if code parameter is present */
  if (!code) {
    return NextResponse.redirect(
      new URL(
        `${redirectTo}/stripe?status=error&message=${encodeURIComponent("connection_stripe_code_missing")}`,
        request.url
      )
    );
  }

  /* define variables to store the token from the exchange request */
  let stripeAccountId: string;
  let accessToken: string;
  let refreshToken: string | null;

  const tokenResponse = await stripePlatform.oauth.token({ grant_type: "authorization_code", code });
  if (!tokenResponse.access_token || !tokenResponse.stripe_user_id) {
    return NextResponse.redirect(
      new URL(
        `${redirectTo}/stripe?status=error&message=${encodeURIComponent("connection_stripe_error_token")}`,
        request.url
      )
    );
  }

  /* store the token from the exchange request */
  stripeAccountId = tokenResponse.stripe_user_id;
  accessToken = tokenResponse.access_token;
  refreshToken = tokenResponse.refresh_token ?? null;

  const { error: connectionError } = await trpc.connection.connectGateway({
    gateway: "STRIPE",
    paymentAccountId: stripeAccountId,
    accessToken,
    refreshToken: refreshToken ?? undefined,
  });

  if (connectionError) {
    const connectionErrorMessage = connectionError.message || "connection_stripe_error_on_register";
    return NextResponse.redirect(
      new URL(`${redirectTo}/stripe?status=error&message=${encodeURIComponent(connectionErrorMessage)}`, request.url)
    );
  }

  /* redirect to the connection page with the connection status and message */
  return NextResponse.redirect(
    new URL(`${redirectTo}/stripe?status=success&message=${encodeURIComponent("connection_stripe_created")}`, request.url)
  );
}
