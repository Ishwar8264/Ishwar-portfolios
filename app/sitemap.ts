import { featuredProjects } from "@/content/projects";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const profileImageUrl = absoluteUrl(siteConfig.profileImage.path);
  const logoUrl = absoluteUrl(siteConfig.logo.path);
  const resumeUrl = absoluteUrl("/resume/resume_ishwar_sahani.pdf");

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        profileImageUrl,
        logoUrl,
        ...featuredProjects.map((project) => absoluteUrl(project.imageSrc)),
      ],
    },
    {
      url: resumeUrl,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
