import { procedure, router } from "@/trpc/init";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
});

export type AppRouter = typeof appRouter;
