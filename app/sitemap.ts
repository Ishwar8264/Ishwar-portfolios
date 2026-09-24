import type { MetadataRoute } from "next";
import { featuredProjects } from "@/content/projects";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Sitemap — covers the homepage plus every major in-page section as
 * a separate URL. While hash-based URLs are technically the same page,
 * declaring them helps Bing and AI crawlers discover the deep content
 * (experience, projects, skills, etc.) explicitly.
 *
 * Each section entry carries its own image set and last-modified timestamp
 * so search consoles can re-crawl selectively when content changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const profileImageUrl = absoluteUrl(siteConfig.profileImage.path);
  const logoUrl = absoluteUrl(siteConfig.logo.path);
  const resumeUrl = absoluteUrl("/resume/resume_ishwar_sahani.pdf");

  const sectionEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [profileImageUrl, logoUrl],
    },
    {
      url: `${siteUrl}/#experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: featuredProjects.map((project) => absoluteUrl(project.imageSrc)),
    },
    {
      url: `${siteUrl}/#skills`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#certifications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resumeUrl,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

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
    ...sectionEntries,
  ];
}
