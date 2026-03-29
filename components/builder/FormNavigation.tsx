"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  onGenerate: () => void;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  loading,
  onBack,
  onNext,
  onGenerate
}: FormNavigationProps) {
  const isLast = currentStep === totalSteps;

  return (
    <div className="sticky bottom-0 z-30 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(15,15,26,0.85)] p-3 backdrop-blur-xl">
      <div className="min-w-[110px]">
        {currentStep > 1 ? (
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        ) : null}
      </div>
      <p className="text-sm text-slate-300">Step {currentStep} of 8</p>
      <div className="min-w-[210px] text-right">
        {!isLast ? (
          <Button onClick={onNext}>Next →</Button>
        ) : (
          <Button variant="gradient" size="lg" onClick={onGenerate} disabled={loading} className="animate-pulse-glow">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "🎉 Generate Resume PDF"}
          </Button>
        )}
      </div>
    </div>
  );
}
