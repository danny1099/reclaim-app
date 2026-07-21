import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, lastLoginMethod } from "better-auth/plugins";
import { sendEmailResetPassword, sendEmailVerification } from "@/modules/auth/emails";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/config/env";

export const auth = betterAuth({
  baseURL: env.APP_URL,
  secret: env.AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  account: { accountLinking: { enabled: true } },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      overrideUserInfoOnSignIn: true,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          image: profile.picture,
        };
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => await sendEmailVerification({ email: user.email, token: url }),
  },
  user: {
    additionalFields: {
      withOnboarding: { type: "boolean", input: false, defaultValue: false },
      role: { type: "string", input: false, defaultValue: null },
      activeBrandId: { type: "string", input: false, defaultValue: null },
    },
  },
  plugins: [
    emailOTP({
      expiresIn: 5 * 60,
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type === "forget-password") await sendEmailResetPassword({ email, token: otp });
      },
    }),
    lastLoginMethod(),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
