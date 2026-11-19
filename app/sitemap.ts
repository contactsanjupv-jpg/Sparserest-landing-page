
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sparserest.com/",
      priority: 1,
    },
    {
      url: "https://sparserest.com/about",
      priority: 0.8,
    },
    {
      url: "https://sparserest.com/privacy",
      priority: 0.3,
    },
    {
      url: "https://sparserest.com/terms",
      priority: 0.3,
    },
  ];
}
