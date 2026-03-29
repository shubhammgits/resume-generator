"use client";

import { useResumeStore } from "@/store/resumeStore";

export function useResumeData() {
  return useResumeStore((state) => ({
    currentStep: state.currentStep,
    personal: state.personal,
    education: state.education,
    summary: state.summary,
    hasExperience: state.hasExperience,
    experience: state.experience,
    projects: state.projects,
    skills: state.skills,
    hasCertifications: state.hasCertifications,
    certifications: state.certifications,
    hasExtras: state.hasExtras,
    extras: state.extras
  }));
}
