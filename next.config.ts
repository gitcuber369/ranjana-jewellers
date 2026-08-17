import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }, { hostname: "fbvyvejldrqzuviyruzn.supabase.co" }],
  },
};

export default nextConfig;
