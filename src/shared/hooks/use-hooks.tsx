import { useMediaQuery, useIsClient as useIsClientHook } from "usehooks-ts";

export const useIsMobile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile;
};

export const useIsClient = () => {
  const useIsClient = useIsClientHook();
  return useIsClient;
};
