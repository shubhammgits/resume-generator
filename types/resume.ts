export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  additionalInfo: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  startDate: string;
  endDate: string;
  bullets: string;
}

export interface Skills {
  languages: string;
  frameworks: string;
  tools: string;
  databases: string;
  cloud: string;
  softSkills: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  organization: string;
  date: string;
  url: string;
}

export interface ResumeState {
  currentStep: number;
  personal: PersonalInfo;
  education: EducationEntry[];
  summary: string;
  hasExperience: boolean;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: Skills;
  hasCertifications: boolean;
  certifications: CertificationEntry[];
  hasExtras: boolean;
  extras: string;
  setCurrentStep: (step: number) => void;
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  updateEducation: (entries: EducationEntry[]) => void;
  setSummary: (s: string) => void;
  setHasExperience: (v: boolean) => void;
  updateExperience: (entries: ExperienceEntry[]) => void;
  updateProjects: (entries: ProjectEntry[]) => void;
  updateSkills: (data: Partial<Skills>) => void;
  setHasCertifications: (v: boolean) => void;
  updateCertifications: (entries: CertificationEntry[]) => void;
  setHasExtras: (v: boolean) => void;
  setExtras: (s: string) => void;
  resetAll: () => void;
}
