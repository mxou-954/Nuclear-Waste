// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Ignore les erreurs ESLint pendant le build (temporaire)
    ignoreDuringBuilds: true,
  },
  // Si tu utilises des images distantes, décommente et adapte :
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "exemple.com" },
  //   ],
  // },
};

export default nextConfig;
