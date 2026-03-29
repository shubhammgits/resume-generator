"use client";

import { motion } from "framer-motion";
import { Eye, RotateCcw } from "lucide-react";
import { STEPS } from "@/constants/steps";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentStep: number;
  onOpenReset: () => void;
  onOpenMobilePreview: () => void;
}

export default function Navbar({ currentStep, onOpenReset, onOpenMobilePreview }: NavbarProps) {
  const step = STEPS[currentStep - 1];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-[rgba(108,99,255,0.2)] bg-[rgba(15,15,26,0.8)] px-4 py-3 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7 [perspective:600px]">
            <div className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-md border border-accent/70 bg-gradient-to-br from-accent/20 to-cyan-400/30 shadow-[0_0_12px_rgba(108,99,255,0.4)]" />
          </div>
          <p className="text-lg font-bold tracking-wide gradient-text">ResumeForge</p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-accent/30 bg-black/30 px-3 py-1 text-sm text-slate-200 md:flex">
          <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-white">Step {currentStep}</span>
          <span>{step?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onOpenReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onOpenMobilePreview}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
