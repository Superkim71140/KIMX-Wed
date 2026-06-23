import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIMX Web Agency",
    short_name: "KIMX Web",
    description: "รับทำเว็บไซต์ ออกแบบดีไซน์ วางระบบธุรกิจ และการตลาดออนไลน์ SEO ครบวงจร",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#38bdf8",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
