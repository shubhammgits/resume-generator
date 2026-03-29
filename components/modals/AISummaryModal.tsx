"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AISummaryModalProps {
  open: boolean;
  onClose: () => void;
}

const promptText =
  "I am a [year e.g. 3rd] year B.Tech [your branch e.g. Computer Science] student at [your college name]. My key technical skills include [list your top 5 skills]. I have built projects like [briefly mention 1-2 projects]. I am actively looking for [internship / full-time] opportunities in [your target domain e.g. AI/ML, Full Stack, Data Science]. Write a concise, ATS-friendly, 3-4 line professional resume summary for me that highlights my technical skills, project experience, and career goals. Make it impactful and suitable for a B.Tech student resume.";

export default function AISummaryModal({ open, onClose }: AISummaryModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    toast.success("✅ Copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl border border-[rgba(108,99,255,0.4)] bg-[rgba(16,16,30,0.9)] p-5 backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="flex items-center gap-2 text-xl font-bold gradient-text">
              <Sparkles className="h-5 w-5" />
              ✨ Let AI Write Your Summary
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Copy this prompt and paste it into your favorite AI tool to generate a clean, ATS-friendly summary.
            </p>

            <Textarea className="mt-4 min-h-[180px] font-mono text-xs" value={promptText} readOnly />

            <div className="mt-4 flex justify-end">
              <Button variant="gradient" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
                {copied ? "✅ Copied!" : "📋 Copy"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
