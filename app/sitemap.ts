import { featuredProjects } from "@/content/projects";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const profileImageUrl = absoluteUrl(siteConfig.profileImage.path);
  const logoUrl = absoluteUrl(siteConfig.logo.path);
  const resumeUrl = absoluteUrl("/resume/resume_ishwar_sahani.pdf");

  return [
    {
      url: siteUrl,
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
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
