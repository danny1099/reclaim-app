import { ZodError, z } from "zod";
import { initTRPC } from "@trpc/server";
import { createTRPCContext } from "@/trpc/context";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const createCaller = t.createCallerFactory;
export const middleware = t.middleware;
export const param = z.object({ param: z.string() });

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

export const procedure = t.procedure;
export const authedProcedure = t.procedure.use(isAuthed);
