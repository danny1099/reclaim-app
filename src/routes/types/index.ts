import { routes } from "@/routes/config";

export type RouteConfig = {
  prefix: string;
  routes: Record<string, string | RouteConfig>;
};

export type RouteKeys<T> = T extends { routes: infer R }
  ? R extends Record<string, any>
    ? {
        [K in keyof R]: R[K] extends string ? K : R[K] extends { routes: any } ? RouteKeys<R[K]> : never;
      }[keyof R]
    : never
  : never;

export type RoutePathMap<T, Prefix extends string = ""> = T extends {
  prefix: infer P extends string;
  routes: infer R extends Record<string, any>;
}
  ? {
      [K in keyof R]: R[K] extends string
        ? { [key in K]: `${Prefix}${P}${R[K]}` }
        : RoutePathMap<R[K], `${Prefix}${P}`>;
    }[keyof R]
  : never;

export type FlatRoutePathMap<T> =
  RoutePathMap<T> extends infer U
    ? { [K in keyof (U extends any ? U : never)]: (U extends any ? U : never)[K] }[keyof (U extends any
        ? U
        : never)] extends infer V
      ? V
      : never
    : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
type UnionToMap<U> = UnionToIntersection<U>;

export type ExtractParams<T extends string> = T extends `${infer _}[${infer Param}]${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

export type RouteParams<T extends string> =
  ExtractParams<T> extends never ? [] : [params: Record<ExtractParams<T>, string>];

export type PrivateRoutePaths = UnionToMap<RoutePathMap<typeof routes.private>>;
export type Routes = RouteKeys<typeof routes.public> | RouteKeys<typeof routes.private>;
export type PublicRoute = RouteKeys<typeof routes.public>;
export type PrivateRoute = RouteKeys<typeof routes.private>;
