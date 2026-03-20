import AboutSection from "@/components/about";
import ContactSection from "@/components/contact";
import ExperienceSection from "@/components/experience";
import HomeSection from "@/components/home";
import ProjectsSection from "@/components/projects";
import SkillsSection from "@/components/skills";
import { profileData, contactData } from "@/content/profile";
import { experienceData } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { getSiteUrl } from "@/lib/seo";

export default function Home() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Ishwar Sahani Portfolio",
        description:
          "Portfolio website of Ishwar Sahani, frontend software engineer focused on performant and scalable UI systems.",
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: profileData.name,
        url: siteUrl,
        image: `${siteUrl}/icon.png`,
        jobTitle: profileData.role,
        worksFor: {
          "@type": "Organization",
          name: profileData.currentCompany,
        },
        sameAs: [contactData.linkedin, contactData.github],
        knowsAbout: profileData.focus,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurgaon",
          addressCountry: "IN",
        },
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
      <SkillsSection groups={skillGroups} />
      <ProjectsSection projects={featuredProjects} />
      <ContactSection contact={contactData} />
    </main>
  );
}
