"use client";

import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  ProjectEntry,
  ResumeState,
  Skills
} from "@/types/resume";

export const generateId = () => {
  const partA = Math.random().toString(16).slice(2, 8);
  const partB = Math.random().toString(16).slice(2, 10);
  return `${partA}-${partB}`;
};

const initialPersonal: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: ""
};

const emptyEducation = (): EducationEntry => ({
  id: generateId(),
  institution: "",
  degree: "",
  location: "",
  startDate: "",
  endDate: "",
  gpa: "",
  additionalInfo: ""
});

const emptyExperience = (): ExperienceEntry => ({
  id: generateId(),
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  bullets: ""
});

const emptyProject = (): ProjectEntry => ({
  id: generateId(),
  title: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  startDate: "",
  endDate: "",
  bullets: ""
});

const emptyCertification = (): CertificationEntry => ({
  id: generateId(),
  title: "",
  organization: "",
  date: "",
  url: ""
});

const initialSkills: Skills = {
  languages: "",
  frameworks: "",
  tools: "",
  databases: "",
  cloud: "",
  softSkills: ""
};

const shallowEqual = <T extends object>(a: T, b: T) => {
  const keys = Object.keys(a) as Array<keyof T>;
  if (keys.length !== Object.keys(b).length) {
    return false;
  }
  return keys.every((key) => a[key] === b[key]);
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingValue = "";

const debouncedStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") {
      return null;
    }
    const raw = window.localStorage.getItem(name);
    if (raw === null) {
      return null;
    }
    try {
      JSON.parse(raw);
      return raw;
    } catch {
      window.localStorage.removeItem(name);
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") {
      return;
    }
    pendingValue = value;
    if (saveTimer) {
      clearTimeout(saveTimer);
    }
    saveTimer = setTimeout(() => {
      window.localStorage.setItem(name, pendingValue);
    }, 2000);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.removeItem(name);
  }
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      currentStep: 1,
      personal: initialPersonal,
      education: [emptyEducation()],
      summary: "",
      hasExperience: true,
      experience: [emptyExperience()],
      projects: [emptyProject()],
      skills: initialSkills,
      hasCertifications: true,
      certifications: [emptyCertification()],
      hasExtras: false,
      extras: "",
      setCurrentStep: (step) =>
        set((state) => {
          const nextStep = Math.min(Math.max(step, 1), 8);
          return state.currentStep === nextStep ? state : { currentStep: nextStep };
        }),
      updatePersonal: (data) =>
        set((state) => {
          const nextPersonal = { ...state.personal, ...data };
          return shallowEqual(state.personal, nextPersonal) ? state : { personal: nextPersonal };
        }),
      updateEducation: (entries) =>
        set((state) => (state.education === entries ? state : { education: [...entries] })),
      setSummary: (s) => set((state) => (state.summary === s ? state : { summary: s })),
      setHasExperience: (v) => set((state) => (state.hasExperience === v ? state : { hasExperience: v })),
      updateExperience: (entries) =>
        set((state) => (state.experience === entries ? state : { experience: [...entries] })),
      updateProjects: (entries) =>
        set((state) => (state.projects === entries ? state : { projects: [...entries] })),
      updateSkills: (data) =>
        set((state) => {
          const nextSkills = { ...state.skills, ...data };
          return shallowEqual(state.skills, nextSkills) ? state : { skills: nextSkills };
        }),
      setHasCertifications: (v) =>
        set((state) => (state.hasCertifications === v ? state : { hasCertifications: v })),
      updateCertifications: (entries) =>
        set((state) => (state.certifications === entries ? state : { certifications: [...entries] })),
      setHasExtras: (v) => set((state) => (state.hasExtras === v ? state : { hasExtras: v })),
      setExtras: (s) => set((state) => (state.extras === s ? state : { extras: s })),
      resetAll: () =>
        set({
          currentStep: 1,
          personal: initialPersonal,
          education: [emptyEducation()],
          summary: "",
          hasExperience: true,
          experience: [emptyExperience()],
          projects: [emptyProject()],
          skills: initialSkills,
          hasCertifications: true,
          certifications: [emptyCertification()],
          hasExtras: false,
          extras: ""
        })
    }),
    {
      name: "resume-builder-v1",
      storage: createJSONStorage(() => debouncedStorage),
      onRehydrateStorage: () => {
        const hasSavedData =
          typeof window !== "undefined" &&
          window.localStorage.getItem("resume-builder-v1") !== null;
        return (_, error) => {
          if (!error && hasSavedData) {
            toast.success("📂 Previous session restored!");
          }
        };
      }
    }
  )
);
