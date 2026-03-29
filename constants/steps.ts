import {
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Layers,
  Sparkles,
  User,
  Wrench
} from "lucide-react";
import type { ComponentType } from "react";

export interface StepMeta {
  id: number;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export const STEPS: StepMeta[] = [
  {
    id: 1,
    name: "Personal Info",
    description: "Basic contact and profile details",
    icon: User
  },
  {
    id: 2,
    name: "Education",
    description: "Academic background and achievements",
    icon: GraduationCap
  },
  {
    id: 3,
    name: "Summary",
    description: "Professional objective and highlights",
    icon: FileText
  },
  {
    id: 4,
    name: "Experience",
    description: "Work and internship contributions",
    icon: Briefcase
  },
  {
    id: 5,
    name: "Projects",
    description: "Hands-on technical showcases",
    icon: Layers
  },
  {
    id: 6,
    name: "Skills",
    description: "Technical and soft skill matrix",
    icon: Wrench
  },
  {
    id: 7,
    name: "Certifications",
    description: "Proof of learning and specialization",
    icon: Award
  },
  {
    id: 8,
    name: "Extras",
    description: "Clubs, achievements, and activities",
    icon: Sparkles
  }
];
