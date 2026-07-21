import { z } from "zod";

const emailField = z.email({ message: "invalid_email" });
const otp_code = z.string().min(6, { message: "invalid_otp" });
const password = z.string().min(1, { message: "invalid_password_required" }).min(8, { message: "invalid_password" });
const strongPassword = password.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: "invalid_password",
});

export const signUpSchema = z.object({
  email: emailField,
  password: strongPassword,
});

export const signInSchema = z.object({
  email: emailField,
  password: password,
});

export const emailSchema = z.object({
  email: emailField,
});

export const otpSchema = z.object({
  otp_code: otp_code,
});

export const resetPassword = z.object({
  email: emailField,
  otp_code: otp_code,
  password: strongPassword,
  confirm_password: strongPassword,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
export type OTPSchema = z.infer<typeof otpSchema>;
export type ResetPassword = z.infer<typeof resetPassword>;
