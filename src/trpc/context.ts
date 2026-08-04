import { prisma } from "@/lib/db/prisma";
import { getAuthSession } from "@/modules/auth/session";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const auth = await getAuthSession();

  return {
    ...opts,
    db: prisma,
    userId: auth?.user.id!,
    brandId: auth?.user.activeBrandId!,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
