import { routes } from "@/routes/config";
import { PublicRoute, PrivateRoute, Routes, RouteConfig, RouteParams, PrivateRoutePaths } from "@/routes/types";
import { memoize } from "@/shared/utils";

const flattenRoutes = memoize(
  (routeObj: Record<string, string | RouteConfig>, parentPrefix: string = ""): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(routeObj)) {
      if (typeof value === "string") {
        const fullPath = parentPrefix + value;
        result[key] = fullPath === "//" ? "/" : fullPath;
      } else if (value && typeof value === "object" && "routes" in value) {
        const newPrefix = parentPrefix + value.prefix;
        const nested = flattenRoutes(value.routes, newPrefix);
        Object.assign(result, nested);
      }
    }

    return result;
  }
);

export const isRouteMatch = memoize((template: string, pathname: string): boolean => {
  const templateSegments = template.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  if (templateSegments.length !== pathSegments.length) return false;

  for (let i = 0; i < templateSegments.length; i++) {
    const tSeg = templateSegments[i];
    const pSeg = pathSegments[i];

    if (tSeg.startsWith("[") && tSeg.endsWith("]")) continue;
    if (tSeg !== pSeg) return false;
  }

  return true;
});

/* function to get all routes and their paths */
export const PUBLIC_ROUTES = routes.public;
export const PRIVATE_ROUTES = routes.private;

export const ROUTES = flattenRoutes(routes) as Record<Routes, string>;
export const ROUTES_PUBLIC = flattenRoutes(PUBLIC_ROUTES.routes, PUBLIC_ROUTES.prefix) as Record<Routes, string>;
export const ROUTES_PRIVATE = flattenRoutes(PRIVATE_ROUTES.routes, PRIVATE_ROUTES.prefix) as Record<Routes, string>;

/* function to get public and private specific route */
export const getPublicRoute = memoize((route: PublicRoute) => ROUTES_PUBLIC[route]);

export const getPrivateRoute = <R extends PrivateRoute>(route: R, ...args: RouteParams<PrivateRoutePaths[R]>) => {
  const params = args[0] as Record<string, string> | undefined;
  if (!params) return ROUTES_PRIVATE[route];
  return (ROUTES_PRIVATE[route] as string).replace(/\[(\w+)\]/g, (_, key: string) => params[key] ?? `[${key}]`);
};
