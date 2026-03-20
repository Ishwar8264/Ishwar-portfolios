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

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <HomeSection profile={profileData} contact={contactData} />
      <AboutSection profile={profileData} githubUrl={contactData.github} />
      <ExperienceSection experiences={experienceData} />
      <SkillsSection groups={skillGroups} />
      <ProjectsSection projects={featuredProjects} />
      <ContactSection contact={contactData} />
    </main>
  );
}
