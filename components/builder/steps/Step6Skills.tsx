"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Code2, Database, Hammer, Layers, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { removeCommaValue, splitCommaValues } from "@/lib/utils";
import { useResumeStore } from "@/store/resumeStore";

interface StepProps {
  shake?: boolean;
}

const fields = [
  { key: "languages", label: "Languages", icon: Code2, color: "bg-purple-500/20 border-purple-400/40" },
  { key: "frameworks", label: "Frameworks", icon: Layers, color: "bg-blue-500/20 border-blue-400/40" },
  { key: "tools", label: "Tools", icon: Hammer, color: "bg-green-500/20 border-green-400/40" },
  { key: "databases", label: "Databases", icon: Database, color: "bg-orange-500/20 border-orange-400/40" },
  { key: "cloud", label: "Cloud", icon: Cloud, color: "bg-cyan-500/20 border-cyan-400/40" },
  { key: "softSkills", label: "Soft Skills", icon: Brain, color: "bg-pink-500/20 border-pink-400/40" }
] as const;

export default function Step6Skills({ shake = false }: StepProps) {
  const skills = useResumeStore((state) => state.skills);
  const updateSkills = useResumeStore((state) => state.updateSkills);

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-6 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <Code2 className="h-5 w-5 text-accent" />
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const value = skills[field.key];
          const chips = splitCommaValues(value);
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">{field.label}</label>
              <div className="input-shell">
                <Icon className="h-4 w-4" />
                <Input
                  className="pl-9"
                  value={value}
                  onChange={(e) => updateSkills({ [field.key]: e.target.value })}
                  placeholder={`Add ${field.label.toLowerCase()} separated by comma`}
                />
              </div>
              {chips.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Badge key={`${field.key}-${chip}`} className={`gap-1 border ${field.color} text-white`}>
                      {chip}
                      <button
                        onClick={() => updateSkills({ [field.key]: removeCommaValue(value, chip) })}
                        className="inline-flex"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
