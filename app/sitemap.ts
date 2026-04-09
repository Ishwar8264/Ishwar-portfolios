import type { MetadataRoute } from "next";
import { featuredProjects } from "@/content/projects";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const images = [
    absoluteUrl(siteConfig.profileImage.path),
    absoluteUrl(siteConfig.logo.path),
    ...featuredProjects.map((project) => absoluteUrl(project.imageSrc)),
  ];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images,
    },
  ];
}
