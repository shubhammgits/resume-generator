"use client";

import { Loader2, PartyPopper, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
  onGenerate: () => void;
  loading: boolean;
}

export default function Step8Extras({
  externalErrors = {},
  shake = false,
  onGenerate,
  loading
}: StepProps) {
  const hasExtras = useResumeStore((state) => state.hasExtras);
  const setHasExtras = useResumeStore((state) => state.setHasExtras);
  const extras = useResumeStore((state) => state.extras);
  const setExtras = useResumeStore((state) => state.setExtras);

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-4 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <Sparkles className="h-5 w-5 text-accent" />
        Extras
      </h2>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <Switch checked={hasExtras} onCheckedChange={setHasExtras} />
        <p className="text-sm text-slate-200">Include extra-curricular section</p>
      </div>

      {hasExtras ? (
        <div data-field="extras">
          <Textarea
            rows={6}
            placeholder="One achievement or activity per line"
            value={extras}
            onChange={(e) => setExtras(e.target.value)}
          />
          {externalErrors.extras ? <p className="field-error">{externalErrors.extras}</p> : null}
          <div className="mt-3 rounded-xl border border-accent/20 bg-accent/10 p-3 text-sm text-slate-300">
            💡 Each line will be a bullet point. Include clubs, sports, leadership roles, competitions, etc.
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/20 to-cyan-400/10 p-5 text-center">
        <p className="mb-2 text-lg font-semibold text-white">✨ Resume Complete!</p>
        <Button
          variant="gradient"
          size="lg"
          onClick={onGenerate}
          disabled={loading}
          className="animate-pulse-glow text-base"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PartyPopper className="h-4 w-4" />} Generate PDF
        </Button>
      </div>
    </motion.div>
  );
}
