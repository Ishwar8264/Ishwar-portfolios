import type { NavbarConfig } from "@/types/navigation";
import { resumeHref } from "@/content/profile";

export const navbarConfig: NavbarConfig = {
  brand: {
    name: "Ishwar Sahani",
    shortName: "Ishwar",
    href: "#home",
  },
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ],
  cta: {
    label: "Download Resume",
    href: resumeHref,
    download: true,
  },
};
