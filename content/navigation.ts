import type { NavbarConfig } from "@/types/navigation";

export const navbarConfig: NavbarConfig = {
  brand: {
    name: "Ishwar Sahani",
    shortName: "Ishwar",
    href: "#home",
  },
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  cta: {
    label: "Hire Me",
    href: "#contact",
  },
};
