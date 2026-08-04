import { Gateway } from "@prisma/client";

export interface GatewayStatus {
  gateway: Gateway;
  isActive: boolean;
  paymentAccountId: string | null;
}
