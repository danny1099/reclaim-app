import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({ requestConfig: "./src/lib/i18n/core/request.ts" });
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@/shared/**/*", "@/modules/**/*"],
  },
};

export default withNextIntl(nextConfig);
