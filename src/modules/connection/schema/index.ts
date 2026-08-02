import { z } from "zod";

export const connectionSchema = z.object({
  gateway: z.enum(["STRIPE", "MERCADOPAGO"]),
  paymentAccountId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});
