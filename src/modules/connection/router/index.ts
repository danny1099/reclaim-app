import { Gateway } from "@prisma/client";
import { authedProcedure, param, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import type { GatewayStatus } from "@/modules/connection/types";
import { connectionSchema } from "@/modules/connection/schema";
import { encrypt } from "@/shared/crypto";

export const connectionRouter = router({
  getGatewayStatus: authedProcedure.input(param).query<APIResult<GatewayStatus>>(async ({ ctx, input }) => {
    const { param: gateway } = input;

    const { data, error } = await tryCatch(
      ctx.db.gatewayConnection.findFirst({
        where: { userId: ctx.userId, AND: { gateway: gateway as Gateway, isActive: true } },
        select: { gateway: true, isActive: true, paymentAccountId: true },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: null,
      code: 200,
    };
  }),
  connectGateway: authedProcedure.input(connectionSchema).mutation<APIResult<null>>(async ({ ctx, input }) => {
    const { gateway, paymentAccountId, accessToken, refreshToken } = input;

    if (!ctx.userId || !ctx.brandId) {
      return {
        data: null,
        status: "error",
        message: "unauthorized",
        code: 401,
      };
    }

    /* check if a connection already exists for this payment account and gateway */
    const existingConnection = await ctx.db.gatewayConnection.findUnique({
      where: { paymentAccountId, gateway: gateway as Gateway },
    });
    if (existingConnection && existingConnection.userId !== ctx.userId) {
      return {
        data: null,
        status: "error",
        message: "connection_already_exists",
        code: 400,
      };
    }

    const { error: gatewayError } = await tryCatch(
      ctx.db.gatewayConnection.upsert({
        where: {
          paymentAccountId,
          gateway: gateway as Gateway,
          userId: ctx.userId,
        },
        update: {
          accessToken: encrypt(accessToken),
          refreshToken: refreshToken ? encrypt(refreshToken) : undefined,
          isActive: true,
          disconnectedAt: null,
        },
        create: {
          userId: ctx.userId,
          brandId: ctx.brandId,
          gateway: gateway as Gateway,
          paymentAccountId,
          accessToken: encrypt(accessToken),
          refreshToken: refreshToken ? encrypt(refreshToken) : undefined,
          isActive: true,
          disconnectedAt: null,
        },
      })
    );

    if (gatewayError) {
      return {
        data: null,
        status: "error",
        message: "connection_error_on_register",
        errorMessage: gatewayError?.message,
        code: 500,
      };
    }

    return {
      data: null,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
