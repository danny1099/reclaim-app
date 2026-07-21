import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(3, { message: "invalid_name" }),
  email: z.email({ message: "invalid_email" }),
  avatar: z.string().optional(),
  brand: z.string().min(1, { message: "required" }),
  logo: z.string().optional(),
  subs_ammount: z.string().min(1, { message: "required" }),
});

export const infoUserSchema = onboardingSchema.pick({
  name: true,
  avatar: true,
  email: true,
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
export type InfoUserSchema = z.infer<typeof infoUserSchema>;
