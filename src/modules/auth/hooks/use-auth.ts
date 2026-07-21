import { auth } from "@/modules/auth/client";

export const useAuth = () => {
  const { data, isPending, refetch } = auth.useSession();

  if (isPending || !data) {
    return {
      user: null,
      session: null,
      isPending,
      refetch,
      logOut: () => auth.signOut(),
    };
  }

  return {
    user: data?.user,
    session: data?.session,
    isPending,
    refetch,
    logOut: () => auth.signOut(),
  };
};
