# tRPC Router Example

- Example of implementation router for entity in globarl routers trpc

```ts
import { procedure, router } from "@/trpc/init";
import { organizationRouter } from "@/modules/organization/router";
import { workspaceRouter } from "@/modules/workspace/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  organization: organizationRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
```
