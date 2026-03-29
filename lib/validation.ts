import { z } from "zod";

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required`);

export const personalInfoSchema = z.object({
  fullName: requiredText("Full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: requiredText("Phone"),
  linkedin: z.string().trim().optional(),
  github: z.string().trim().optional(),
  portfolio: z.string().trim().optional(),
  location: z.string().trim().optional()
});

export const educationEntrySchema = z.object({
  id: z.string().trim().min(1),
  institution: requiredText("Institution"),
  degree: requiredText("Degree"),
  location: z.string().trim().optional(),
  startDate: requiredText("Start date"),
  endDate: requiredText("End date"),
  gpa: z.string().trim().optional(),
  additionalInfo: z.string().trim().optional()
});

export const summarySchema = z.object({
  summary: z
    .string()
    .trim()
    .min(1, "Summary is required")
    .max(500, "Summary must be within 500 characters")
});

export const experienceEntrySchema = z.object({
  id: z.string().trim().min(1),
  role: requiredText("Role"),
  company: requiredText("Company"),
  location: z.string().trim().optional(),
  startDate: requiredText("Start date"),
  endDate: requiredText("End date"),
  bullets: requiredText("Bullet points")
});

export const projectEntrySchema = z.object({
  id: z.string().trim().min(1),
  title: requiredText("Title"),
  techStack: z.string().trim().optional(),
  githubUrl: z.string().trim().optional(),
  liveUrl: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  bullets: requiredText("Project bullets")
});

export const skillsSchema = z.object({
  languages: z.string().trim().optional(),
  frameworks: z.string().trim().optional(),
  tools: z.string().trim().optional(),
  databases: z.string().trim().optional(),
  cloud: z.string().trim().optional(),
  softSkills: z.string().trim().optional()
});

export const certificationEntrySchema = z.object({
  id: z.string().trim().min(1),
  title: requiredText("Title"),
  organization: z.string().trim().optional(),
  date: z.string().trim().optional(),
  url: z.string().trim().optional()
});

export const extrasSchema = z.object({
  extras: z.string().trim().min(1, "Extras text is required")
});
