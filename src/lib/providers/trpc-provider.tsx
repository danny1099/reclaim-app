"use client";
import SuperJSON from "superjson";
import { useState } from "react";
import { httpBatchStreamLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { trpc as TRPC, createQueryClient } from "@/trpc/client";
import { type AppRouter } from "@/trpc/router";
import { absoluteUrl } from "@/shared/utils";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const baseUrl = absoluteUrl("/api/trpc");

  const [trpcClient] = useState(() =>
    TRPC.createClient({
      links: [
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: baseUrl as string,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPC.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </TRPC.Provider>
    </QueryClientProvider>
  );
};
