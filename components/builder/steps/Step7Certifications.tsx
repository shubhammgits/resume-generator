"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generateId, useResumeStore } from "@/store/resumeStore";

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step7Certifications({ externalErrors = {}, shake = false }: StepProps) {
  const hasCertifications = useResumeStore((state) => state.hasCertifications);
  const setHasCertifications = useResumeStore((state) => state.setHasCertifications);
  const certifications = useResumeStore((state) => state.certifications);
  const updateCertifications = useResumeStore((state) => state.updateCertifications);

  const updateEntry = (index: number, field: string, value: string) => {
    updateCertifications(certifications.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addEntry = () => {
    updateCertifications([...certifications, { id: generateId(), title: "", organization: "", date: "", url: "" }]);
  };

  const removeEntry = (index: number) => {
    if (certifications.length <= 1) return;
    updateCertifications(certifications.filter((_, i) => i !== index));
  };

  const getError = (index: number, field: string) => externalErrors[`${index}.${field}`] || "";

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-4 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <Award className="h-5 w-5 text-accent" />
        Certifications
      </h2>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <Switch checked={hasCertifications} onCheckedChange={setHasCertifications} />
        <p className="text-sm text-slate-200">I have certifications to add</p>
      </div>

      <AnimatePresence mode="wait">
        {hasCertifications ? (
          <motion.div key="entries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnimatePresence initial={false}>
              {certifications.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-100">Certification #{index + 1}</p>
                    {certifications.length > 1 ? (
                      <button onClick={() => removeEntry(index)} className="rounded-md p-1 text-red-300 hover:bg-red-500/20">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="md:col-span-2" data-field={`certifications.${index}.title`}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Title*</label>
                      <Input value={entry.title} onChange={(e) => updateEntry(index, "title", e.target.value)} />
                      {getError(index, "title") ? <p className="field-error">{getError(index, "title")}</p> : null}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Organization</label>
                      <Input value={entry.organization} onChange={(e) => updateEntry(index, "organization", e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Date</label>
                      <Input value={entry.date} onChange={(e) => updateEntry(index, "date", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Certificate URL</label>
                      <Input value={entry.url} onChange={(e) => updateEntry(index, "url", e.target.value)} />
                      {entry.url ? (
                        <a href={entry.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-cyan-300">
                          🔗 Preview
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button variant="outline" className="w-full border-dashed border-accent/60 text-accent hover:bg-accent/10" onClick={addEntry}>
              <Plus className="h-4 w-4" /> Add Another Certification
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="skip"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-slate-400"
          >
            Certification section disabled.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
