export const siteConfig = {
  name: "Ishwar Sahani",
  shortName: "Ishwar",
  title:
    "Frontend Developer in Gurugram | React & Next.js | Ishwar Sahani",
  description:
    "Ishwar Sahani is a Frontend Developer in Gurugram, India building responsive, SEO-friendly websites with Next.js, React.js, Tailwind CSS, and API integration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishwar8264.github.io",
  locale: "en_IN",
  profileImage: {
    path: "/images/profile/img-2.jpeg",
    width: 899,
    height: 1599,
    alt: "Portrait of Ishwar Sahani",
  },
  logo: {
    path: "/icon-512.png",
    width: 512,
    height: 512,
    alt: "Ishwar Sahani logo",
  },
  keywords: [
    "Ishwar Sahani",
    "Frontend Developer in Gurugram",
    "Frontend Developer Gurugram",
    "Frontend Developer India",
    "React Developer India",
    "Next.js Developer India",
    "JavaScript Developer Gurugram",
    "Responsive Web Developer India",
    "Tailwind CSS Developer",
    "API Integration Developer",
    "Web Developer India",
  ],
  social: {
    linkedIn: "https://www.linkedin.com/in/ishwarsahani/",
    github: "https://github.com/Ishwar8264",
  },
} as const;

export function getSiteUrl() {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
