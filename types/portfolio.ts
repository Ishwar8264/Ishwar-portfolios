export type ProfileData = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  summary: string;
  codingHours: string;
  focus: string[];
};

export type ContactData = {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectData = {
  title: string;
  description: string;
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  status: string;
};

export type ExperienceData = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  projectName?: string;
  projectUrl?: string;
  highlights: string[];
};
