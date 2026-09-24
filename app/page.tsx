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
import { buildJsonLdGraph } from "@/lib/seo";

export default function Home() {
  const jsonLd = buildJsonLdGraph();

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/*
       * Screen-reader-only factual descriptor for AI crawlers that strip
       * CSS but read semantic HTML (Perplexity, ChatGPT Browse, etc.).
       * Keep this concise, fact-first, and free of marketing-speak.
       */}
      <p className="sr-only">
        Ishwar Sahani (also known as Ishwar Kumar) is a Frontend Developer
        based in Gurugram, India, specializing in Next.js, React, Node.js,
        TypeScript, and full-stack MERN and PERN development. He works
        full-time as a Frontend Developer at Klakar (an artist network
        startup) and previously at Dizivizi (a video-location platform).
        Available for selective freelance frontend projects worldwide.
      </p>
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
