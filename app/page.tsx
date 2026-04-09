import AboutSection from "@/components/about";
import CertificationsSection from "@/components/certifications";
import ContactSection from "@/components/contact";
import ExperienceSection from "@/components/experience";
import HomeSection from "@/components/home";
import ProjectsSection from "@/components/projects";
import ServicesSection from "@/components/services";
import SkillsSection from "@/components/skills";
import { certificationsData } from "@/content/certifications";
import { profileData, contactData } from "@/content/profile";
import { experienceData } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { servicesData } from "@/content/services";
import { skillGroups } from "@/content/skills";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";

export default function Home() {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl("/");
  const profileImageUrl = absoluteUrl(siteConfig.profileImage.path);
  const logoUrl = absoluteUrl(siteConfig.logo.path);
  const createHashId = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        description: siteConfig.description,
        inLanguage: "en-IN",
        image: {
          "@id": `${siteUrl}#logo`,
        },
        publisher: {
          "@id": `${siteUrl}#person`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": `${siteUrl}#website`,
        },
        about: {
          "@id": `${siteUrl}#person`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: profileImageUrl,
          width: siteConfig.profileImage.width,
          height: siteConfig.profileImage.height,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: profileData.name,
        url: siteUrl,
        image: profileImageUrl,
        description: siteConfig.description,
        jobTitle: profileData.role,
        mainEntityOfPage: {
          "@id": `${siteUrl}#webpage`,
        },
        sameAs: [contactData.linkedin, contactData.github],
        email: `mailto:${contactData.email}`,
        telephone: contactData.phone,
        knowsAbout: profileData.focus,
        hasOccupation: {
          "@type": "Occupation",
          name: profileData.role,
          occupationLocation: {
            "@type": "City",
            name: "Gurugram",
          },
          skills: profileData.focus.join(", "),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#featured-projects`,
        name: "Featured projects by Ishwar Sahani",
        itemListElement: featuredProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.liveUrl,
            image: absoluteUrl(project.imageSrc),
            creator: {
              "@id": `${siteUrl}#person`,
            },
          },
        })),
      },
      ...servicesData.map((service) => ({
        "@type": "Service",
        "@id": `${siteUrl}#service-${createHashId(service.title)}`,
        name: service.title,
        description: service.description,
        serviceType: service.keywords.join(", "),
        provider: {
          "@id": `${siteUrl}#person`,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Gurugram",
          },
          {
            "@type": "Country",
            name: "India",
          },
        ],
      })),
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#logo`,
        url: logoUrl,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        caption: siteConfig.logo.alt,
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeSection profile={profileData} contact={contactData} />
      <AboutSection profile={profileData} githubUrl={contactData.github} />
      <ExperienceSection experiences={experienceData} />
      <CertificationsSection certifications={certificationsData} />
      <SkillsSection groups={skillGroups} />
      <ServicesSection services={servicesData} />
      <ProjectsSection projects={featuredProjects} />
      <ContactSection contact={contactData} />
    </main>
  );
}
