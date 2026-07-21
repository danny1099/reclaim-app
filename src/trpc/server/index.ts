import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { appRouter, type AppRouter } from "@/trpc/router";
import { createQueryClient } from "@/trpc/client";
import { createTRPCContext } from "@/trpc/context";
import { createCaller } from "@/trpc/init";

const createContext = cache(async () => {
  return createTRPCContext({
    headers: await headers(),
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(appRouter);
const callerFactory = caller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(callerFactory, getQueryClient);
