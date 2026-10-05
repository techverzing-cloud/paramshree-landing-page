import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The supplied project photographs are at most 1080px wide, so nothing on the
    // site is ever rendered larger. Capping the candidate widths stops the
    // optimizer from generating upscaled variants of them.
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
  },
};

export default nextConfig;
