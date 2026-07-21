import { Resend } from "resend";
import { tryCatch } from "@/shared/utils";
import { VerifyEmail, ResetPassword } from "@/modules/auth/emails";
import { env } from "@/config/env";

/* initialize resend client with api key */
export const emailProvider = new Resend(env.RESEND_API_KEY);

interface SendEmailProps {
  email: string;
  token: string;
}

export const sendEmailVerification = async ({ email, token }: SendEmailProps) => {
  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: "Reclaim <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Reclaim — Your recovery platform is ready",
      react: VerifyEmail({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};

export const sendEmailResetPassword = async ({ email, token }: SendEmailProps) => {
  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: "Reclaim <onboarding@resend.dev>",
      to: email,
      subject: "Your verification code is ready",
      react: ResetPassword({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};
