"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateId, useResumeStore } from "@/store/resumeStore";

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step4Experience({ externalErrors = {}, shake = false }: StepProps) {
  const hasExperience = useResumeStore((state) => state.hasExperience);
  const setHasExperience = useResumeStore((state) => state.setHasExperience);
  const experience = useResumeStore((state) => state.experience);
  const updateExperience = useResumeStore((state) => state.updateExperience);

  const updateEntry = (index: number, field: string, value: string) => {
    updateExperience(experience.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addEntry = () => {
    updateExperience([
      ...experience,
      { id: generateId(), role: "", company: "", location: "", startDate: "", endDate: "", bullets: "" }
    ]);
  };

  const removeEntry = (index: number) => {
    if (experience.length <= 1) return;
    updateExperience(experience.filter((_, i) => i !== index));
  };

  const getError = (index: number, field: string) => externalErrors[`${index}.${field}`] || "";

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-4 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <Briefcase className="h-5 w-5 text-accent" />
        Work Experience
      </h2>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <Switch checked={hasExperience} onCheckedChange={setHasExperience} />
        <p className="text-sm text-slate-200">I have work experience</p>
      </div>

      <AnimatePresence mode="wait">
        {!hasExperience ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-slate-400"
          >
            <p className="text-base">No worries, this section will be skipped.</p>
            <p className="mt-1">You can still build a strong resume with projects, skills, and certifications.</p>
          </motion.div>
        ) : (
          <motion.div key="entries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnimatePresence initial={false}>
              {experience.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-100">Experience #{index + 1}</p>
                    {experience.length > 1 ? (
                      <button onClick={() => removeEntry(index)} className="rounded-md p-1 text-red-300 hover:bg-red-500/20">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div data-field={`experience.${index}.role`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Role*</label>
                      <Input value={entry.role} onChange={(e) => updateEntry(index, "role", e.target.value)} />
                      {getError(index, "role") ? <p className="field-error">{getError(index, "role")}</p> : null}
                    </div>
                    <div data-field={`experience.${index}.company`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Company*</label>
                      <Input value={entry.company} onChange={(e) => updateEntry(index, "company", e.target.value)} />
                      {getError(index, "company") ? <p className="field-error">{getError(index, "company")}</p> : null}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Location</label>
                      <Input value={entry.location} onChange={(e) => updateEntry(index, "location", e.target.value)} />
                    </div>
                    <div data-field={`experience.${index}.startDate`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Start Date*</label>
                      <Input value={entry.startDate} onChange={(e) => updateEntry(index, "startDate", e.target.value)} />
                      {getError(index, "startDate") ? <p className="field-error">{getError(index, "startDate")}</p> : null}
                    </div>
                    <div data-field={`experience.${index}.endDate`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">End Date*</label>
                      <Input value={entry.endDate} onChange={(e) => updateEntry(index, "endDate", e.target.value)} />
                      {getError(index, "endDate") ? <p className="field-error">{getError(index, "endDate")}</p> : null}
                    </div>
                    <div className="md:col-span-2" data-field={`experience.${index}.bullets`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Bullet Points*</label>
                      <Textarea
                        rows={5}
                        value={entry.bullets}
                        onChange={(e) => updateEntry(index, "bullets", e.target.value)}
                        placeholder={"Each new line becomes a bullet point in your resume\n• Built REST API using FastAPI\n• Improved accuracy by 15% using ensemble methods"}
                      />
                      {getError(index, "bullets") ? <p className="field-error">{getError(index, "bullets")}</p> : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button variant="outline" className="w-full border-dashed border-accent/60 text-accent hover:bg-accent/10" onClick={addEntry}>
              <Plus className="h-4 w-4" /> Add Another Experience
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
