import { prisma } from "@/lib/db/prisma";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const userId = "danny.mosquera";

  return {
    ...opts,
    db: prisma,
    userId: userId,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
