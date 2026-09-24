import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Robots.txt — explicitly allows all major crawlers including AI/LLM bots.
 *
 * By default, well-behaved AI bots (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, Bytespider, CCBot, FacebookBot) respect robots.txt.
 * We explicitly `Allow: /` for each so they index this portfolio for
 * generative search answers (GEO / LLM SEO).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const aiBots = [
    "GPTBot",        // OpenAI / ChatGPT
    "ClaudeBot",     // Anthropic / Claude
    "Claude-Web",    // Anthropic (legacy)
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "Google-Extended", // Google Gemini / AI Overviews
    "CCBot",         // Common Crawl (used by many open LLMs)
    "FacebookBot",   // Meta AI
    "Bytespider",    // ByteDance / Doubao
    "Applebot",
    "Applebot-Extended",
    "Amazonbot",
    "OAI-SearchBot", // OpenAI Search
    "cohere-ai",
    "Diffbot",
  ];

  return {
    rules: [
      // Allow all general-purpose bots full access.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/internal/"],
      },
      // Explicit allow for each AI/LLM crawler (some ignore `*`).
      ...aiBots.map((ua) => ({
        userAgent: ua,
        allow: "/",
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
