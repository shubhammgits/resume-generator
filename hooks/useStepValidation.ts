"use client";

import { useMemo } from "react";
import { z } from "zod";
import {
  certificationEntrySchema,
  educationEntrySchema,
  extrasSchema,
  experienceEntrySchema,
  personalInfoSchema,
  projectEntrySchema,
  skillsSchema,
  summarySchema
} from "@/lib/validation";
import type { ResumeState } from "@/types/resume";

export interface ValidationResult {
  valid: boolean;
  firstErrorPath: string | null;
  errorMap: Record<string, string>;
}

export function useStepValidation(data: ResumeState) {
  return useMemo(() => {
    const validateStep = (step: number): ValidationResult => {
      let parseResult: z.SafeParseReturnType<unknown, unknown> | undefined;

      if (step === 1) {
        parseResult = personalInfoSchema.safeParse(data.personal);
      }

      if (step === 2) {
        parseResult = educationEntrySchema.array().min(1).max(3).safeParse(data.education);
      }

      if (step === 3) {
        parseResult = summarySchema.safeParse({ summary: data.summary });
      }

      if (step === 4) {
        parseResult = data.hasExperience
          ? experienceEntrySchema.array().min(1).safeParse(data.experience)
          : { success: true, data: [] };
      }

      if (step === 5) {
        parseResult = projectEntrySchema.array().min(1).safeParse(data.projects);
      }

      if (step === 6) {
        parseResult = skillsSchema.safeParse(data.skills);
      }

      if (step === 7) {
        parseResult = data.hasCertifications
          ? certificationEntrySchema.array().min(1).safeParse(data.certifications)
          : { success: true, data: [] };
      }

      if (step === 8) {
        parseResult = data.hasExtras
          ? extrasSchema.safeParse({ extras: data.extras })
          : { success: true, data: { extras: "" } };
      }

      if (!parseResult || parseResult.success) {
        return { valid: true, firstErrorPath: null, errorMap: {} };
      }

      const flattened = parseResult.error.issues.reduce<Record<string, string>>((acc, issue) => {
        const path = issue.path.join(".") || "root";
        if (!acc[path]) {
          acc[path] = issue.message;
        }
        return acc;
      }, {});

      const firstErrorPath = Object.keys(flattened)[0] ?? null;

      return {
        valid: false,
        firstErrorPath,
        errorMap: flattened
      };
    };

    return { validateStep };
  }, [data]);
}
