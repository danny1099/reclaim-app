import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";
import { connectionRouter } from "@/modules/connection/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
  connection: connectionRouter,
});

export type AppRouter = typeof appRouter;
