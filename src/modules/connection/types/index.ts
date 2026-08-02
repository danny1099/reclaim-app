import { Gateway, GatewayConnection as PrismaGatewayConnection } from "@prisma/client";

export interface GatewayConnection extends PrismaGatewayConnection {}

export interface GatewayStatus {
  gateway: Gateway;
  isConnected: boolean;
}
