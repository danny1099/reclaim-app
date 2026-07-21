import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({ requestConfig: "./src/lib/i18n/config/request.ts" });
const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@/shared/**/*", "@/modules/**/*"],
  },
};

export default withNextIntl(nextConfig);
