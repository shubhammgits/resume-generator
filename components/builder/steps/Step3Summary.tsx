"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Info, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { summarySchema } from "@/lib/validation";
import { useResumeStore } from "@/store/resumeStore";
import AISummaryModal from "@/components/modals/AISummaryModal";

type FormValues = { summary: string };

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step3Summary({ externalErrors = {}, shake = false }: StepProps) {
  const summary = useResumeStore((state) => state.summary);
  const setSummary = useResumeStore((state) => state.setSummary);
  const [openModal, setOpenModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    watch,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(summarySchema),
    mode: "onChange",
    defaultValues: { summary }
  });

  useEffect(() => {
    reset({ summary });
  }, [summary, reset]);

  useEffect(() => {
    const sub = watch((value) => setSummary(value.summary ?? ""));
    return () => sub.unsubscribe();
  }, [watch, setSummary]);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.max(element.scrollHeight, 152)}px`;
  }, [summary]);

  const error = errors.summary?.message || externalErrors.summary;

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-bold gradient-text">
          <Sparkles className="h-5 w-5 text-accent" />
          Professional Summary
        </h2>
        <button onClick={() => setOpenModal(true)} className="rounded-full p-2 text-slate-300 hover:bg-white/10">
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div data-field="summary">
        <Textarea
          rows={6}
          maxLength={500}
          className="min-h-[152px] resize-none"
          {...register("summary")}
          ref={(element) => {
            register("summary").ref(element);
            textareaRef.current = element;
          }}
        />
        <div className="mt-2 text-right text-xs text-slate-400">{summary.length}/500</div>
        {error ? <p className="field-error">{error}</p> : null}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        💡 Tip: A great summary is 3-4 lines, ATS-friendly, and mentions your domain and goals.
      </p>

      <AISummaryModal open={openModal} onClose={() => setOpenModal(false)} />
    </motion.div>
  );
}
