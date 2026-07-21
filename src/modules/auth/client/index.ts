import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import { lastLoginMethodClient } from "better-auth/client/plugins";
import type { auth as authConfig } from "@/modules/auth/config";

export const auth = createAuthClient({
  plugins: [emailOTPClient(), lastLoginMethodClient(), inferAdditionalFields<typeof authConfig>()],
});
