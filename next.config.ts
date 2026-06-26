import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/articles.html",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/article-seo.html",
        destination: "/articles/seo",
        permanent: true,
      },
      {
        source: "/article-speed.html",
        destination: "/articles/speed-performance",
        permanent: true,
      },
      {
        source: "/article-design.html",
        destination: "/articles/web-design-2025",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
