import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPublicRoute } from "@/routes/utils";
import { auth } from "@/modules/auth/config";

export const getAuthSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);

/* async function to check if user is authenticated and redirect to unauthorized page */
export const isAuthenticated = cache(async () => {
  const authenticated = await getAuthSession();
  const redirectTo = getPublicRoute("sign_in");

  /* if user is not authenticated redirect to login page */
  if (!authenticated) redirect(redirectTo);

  return authenticated;
});
