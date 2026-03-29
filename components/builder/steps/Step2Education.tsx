"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore, generateId } from "@/store/resumeStore";

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step2Education({ externalErrors = {}, shake = false }: StepProps) {
  const education = useResumeStore((state) => state.education);
  const updateEducation = useResumeStore((state) => state.updateEducation);

  const updateEntry = (index: number, field: string, value: string) => {
    const next = education.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry));
    updateEducation(next);
  };

  const addEntry = () => {
    if (education.length >= 3) return;
    updateEducation([
      ...education,
      {
        id: generateId(),
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
        additionalInfo: ""
      }
    ]);
  };

  const removeEntry = (index: number) => {
    if (education.length <= 1) return;
    updateEducation(education.filter((_, i) => i !== index));
  };

  const getError = (index: number, field: string) => externalErrors[`${index}.${field}`] || "";

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-6 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <GraduationCap className="h-5 w-5 text-accent" />
        Education
      </h2>

      <AnimatePresence initial={false}>
        {education.map((entry, index) => (
          <motion.div
            key={entry.id}
            className="relative mb-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">Education #{index + 1}</p>
              {education.length > 1 ? (
                <button onClick={() => removeEntry(index)} className="rounded-md p-1 text-red-300 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="md:col-span-2" data-field={`education.${index}.institution`}>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Institution*</label>
                <Input value={entry.institution} onChange={(e) => updateEntry(index, "institution", e.target.value)} />
                {getError(index, "institution") ? <p className="field-error">{getError(index, "institution")}</p> : null}
              </div>
              <div className="md:col-span-2" data-field={`education.${index}.degree`}>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Degree*</label>
                <Input value={entry.degree} onChange={(e) => updateEntry(index, "degree", e.target.value)} />
                {getError(index, "degree") ? <p className="field-error">{getError(index, "degree")}</p> : null}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Location</label>
                <Input value={entry.location} onChange={(e) => updateEntry(index, "location", e.target.value)} />
              </div>
              <div data-field={`education.${index}.startDate`}>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Start Date*</label>
                <Input value={entry.startDate} onChange={(e) => updateEntry(index, "startDate", e.target.value)} />
                {getError(index, "startDate") ? <p className="field-error">{getError(index, "startDate")}</p> : null}
              </div>
              <div data-field={`education.${index}.endDate`}>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">End Date*</label>
                <Input value={entry.endDate} onChange={(e) => updateEntry(index, "endDate", e.target.value)} />
                {getError(index, "endDate") ? <p className="field-error">{getError(index, "endDate")}</p> : null}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">GPA</label>
                <Input value={entry.gpa} onChange={(e) => updateEntry(index, "gpa", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Additional Info</label>
                <Textarea
                  rows={3}
                  value={entry.additionalInfo}
                  onChange={(e) => updateEntry(index, "additionalInfo", e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full border-dashed border-accent/60 text-accent hover:bg-accent/10"
        disabled={education.length >= 3}
        onClick={addEntry}
      >
        <Plus className="h-4 w-4" /> Add Another Education
      </Button>
    </motion.div>
  );
}
