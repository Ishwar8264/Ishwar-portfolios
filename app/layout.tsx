import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navigation";
import ThemeProvider from "@/components/theme/theme-provider.client";
import ThemeScript from "@/components/theme/theme-script";
import InstallPrompt from "@/components/pwa/install-prompt.client";
import ServiceWorkerRegistration from "@/components/pwa/service-worker-registration.client";
import ReadingProgress from "@/components/ui/reading-progress.client";
import ScrollToTop from "@/components/ui/scroll-to-top.client";
import { navbarConfig } from "@/content/navigation";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    firstName: "Ishwar",
    lastName: "Sahani",
    username: "Ishwar8264",
    gender: "male",
    images: [
      {
        url: absoluteUrl(siteConfig.profileImage.path),
        width: siteConfig.profileImage.width,
        height: siteConfig.profileImage.height,
        alt: siteConfig.profileImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@Ishwar8264",
    site: "@Ishwar8264",
    images: [
      {
        url: absoluteUrl(siteConfig.profileImage.path),
        width: siteConfig.profileImage.width,
        height: siteConfig.profileImage.height,
        alt: siteConfig.profileImage.alt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  classification: "Frontend Development, Web Development, Software Engineering",
  manifest: "/manifest.webmanifest",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
  other: {
    // Author identity for AI engines — explicit alternate names so
    // queries for "Ishwar Kumar" or "Ishwar" resolve to the same entity.
    "profile:first_name": "Ishwar",
    "profile:last_name": "Sahani",
    "profile:username": "Ishwar8264",
    "profile:full_name": siteConfig.name,
    "profile:alternate_name": siteConfig.alternateName,
    // Geo tags — local SEO for Gurugram.
    "geo.region": siteConfig.geo.region,
    "geo.placename": siteConfig.geo.placename,
    "geo.position": siteConfig.geo.position,
    ICBM: siteConfig.geo.icbm,
    // Language / region hints.
    "language": "en-IN",
    "revisit-after": "7 days",
    "distribution": "global",
    "rating": "general",
    // AI crawler hints — explicit allow (mirrors robots.txt).
    "ai-bot-allow": "GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot",
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      {
        url: siteConfig.logo.path,
        type: "image/png",
        sizes: `${siteConfig.logo.width}x${siteConfig.logo.height}`,
      },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" data-theme="light" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider />
        <ReadingProgress />
        <ServiceWorkerRegistration />
        <Navbar config={navbarConfig} />
        <div id="main-content">{children}</div>
        <ScrollToTop />
        <InstallPrompt />
      </body>
    </html>
  );
}
