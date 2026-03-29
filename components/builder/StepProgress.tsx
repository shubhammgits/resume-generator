"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STEPS } from "@/constants/steps";

interface StepProgressProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export default function StepProgress({ currentStep, onSelectStep }: StepProgressProps) {
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="sticky top-[60px] z-20 w-full border-b border-white/10 bg-[rgba(15,15,26,0.9)] px-4 pb-3 pt-1 backdrop-blur-lg">
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const active = step.id === currentStep;
          const completed = step.id < currentStep;
          const clickable = completed;

          return (
            <motion.button
              key={step.id}
              layout
              onClick={() => clickable && onSelectStep(step.id)}
              className={`relative inline-flex min-w-max items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                active
                  ? "border-accent/80 bg-accent/25 text-white shadow-[0_0_14px_rgba(108,99,255,0.45)]"
                  : completed
                    ? "border-accent/30 bg-accent/10 text-slate-200"
                    : "border-white/10 bg-black/30 text-slate-400"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/30 text-[10px]">
                {completed ? <Check className="h-3 w-3" /> : step.id}
              </span>
              <Icon className="h-3.5 w-3.5" />
              <span>{step.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
