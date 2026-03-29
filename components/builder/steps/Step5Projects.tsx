"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderGit2, Info, Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AIProjectModal from "@/components/modals/AIProjectModal";
import { removeCommaValue, splitCommaValues } from "@/lib/utils";
import { generateId, useResumeStore } from "@/store/resumeStore";

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step5Projects({ externalErrors = {}, shake = false }: StepProps) {
  const [openModal, setOpenModal] = useState(false);
  const projects = useResumeStore((state) => state.projects);
  const updateProjects = useResumeStore((state) => state.updateProjects);

  const updateEntry = (index: number, field: string, value: string) => {
    updateProjects(projects.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addEntry = () => {
    updateProjects([
      ...projects,
      {
        id: generateId(),
        title: "",
        techStack: "",
        githubUrl: "",
        liveUrl: "",
        startDate: "",
        endDate: "",
        bullets: ""
      }
    ]);
  };

  const removeEntry = (index: number) => {
    if (projects.length <= 1) return;
    updateProjects(projects.filter((_, i) => i !== index));
  };

  const getError = (index: number, field: string) => externalErrors[`${index}.${field}`] || "";

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-bold gradient-text">
          <FolderGit2 className="h-5 w-5 text-accent" />
          Projects
        </h2>
        <button onClick={() => setOpenModal(true)} className="rounded-full p-2 text-slate-300 hover:bg-white/10">
          <Info className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {projects.map((entry, index) => {
          const chips = splitCommaValues(entry.techStack);
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-100">Project #{index + 1}</p>
                {projects.length > 1 ? (
                  <button onClick={() => removeEntry(index)} className="rounded-md p-1 text-red-300 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="md:col-span-2" data-field={`projects.${index}.title`}>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Title*</label>
                  <Input value={entry.title} onChange={(e) => updateEntry(index, "title", e.target.value)} />
                  {getError(index, "title") ? <p className="field-error">{getError(index, "title")}</p> : null}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Tech Stack (comma-separated)</label>
                  <Input value={entry.techStack} onChange={(e) => updateEntry(index, "techStack", e.target.value)} />
                  {chips.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {chips.map((chip) => (
                        <Badge key={chip} variant="secondary" className="gap-1 bg-accent/25 text-white">
                          {chip}
                          <button
                            onClick={() => updateEntry(index, "techStack", removeCommaValue(entry.techStack, chip))}
                            className="inline-flex"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">GitHub URL</label>
                  <Input value={entry.githubUrl} onChange={(e) => updateEntry(index, "githubUrl", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Live URL</label>
                  <Input value={entry.liveUrl} onChange={(e) => updateEntry(index, "liveUrl", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Start Date</label>
                  <Input value={entry.startDate} onChange={(e) => updateEntry(index, "startDate", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">End Date</label>
                  <Input value={entry.endDate} onChange={(e) => updateEntry(index, "endDate", e.target.value)} />
                </div>

                <div className="md:col-span-2" data-field={`projects.${index}.bullets`}>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">Bullets*</label>
                  <Textarea
                    rows={4}
                    value={entry.bullets}
                    onChange={(e) => updateEntry(index, "bullets", e.target.value)}
                  />
                  {getError(index, "bullets") ? <p className="field-error">{getError(index, "bullets")}</p> : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <Button variant="outline" className="w-full border-dashed border-accent/60 text-accent hover:bg-accent/10" onClick={addEntry}>
        <Plus className="h-4 w-4" /> Add Another Project
      </Button>

      <AIProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </motion.div>
  );
}
