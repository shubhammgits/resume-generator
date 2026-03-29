"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onDownloadAgain: () => void;
}

const confettiColors = ["#6c63ff", "#38bdf8", "#a78bfa", "#4caf90", "#f59e0b", "#ec4899"];

export default function SuccessModal({ open, onClose, onDownloadAgain }: SuccessModalProps) {
  const [countdown, setCountdown] = useState(5);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2.4 + Math.random() * 2,
        color: confettiColors[index % confettiColors.length]
      })),
    []
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, onClose]);

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
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-accent/40 bg-[rgba(20,20,35,0.95)] p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0">
              {confettiPieces.map((piece) => (
                <span
                  key={piece.id}
                  style={{
                    position: "absolute",
                    left: `${piece.left}%`,
                    top: "-10%",
                    width: "7px",
                    height: "12px",
                    background: piece.color,
                    borderRadius: "2px",
                    animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s infinite`
                  }}
                />
              ))}
            </div>

            <svg width="88" height="88" viewBox="0 0 120 120" className="mx-auto mb-3">
              <circle
                cx="60"
                cy="60"
                r="44"
                stroke="#4caf90"
                strokeWidth="6"
                fill="none"
                strokeDasharray="300"
                strokeDashoffset="0"
                style={{ animation: "float 2.4s ease-in-out infinite" }}
              />
              <path d="M38 63 L54 77 L84 45" stroke="#4caf90" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>

            <h3 className="text-2xl font-bold text-white">Your Resume is Ready! 🎉</h3>
            <p className="mt-2 text-sm text-slate-300">
              PDF downloaded successfully. Go get that internship! 🚀
            </p>
            <p className="mt-1 text-xs text-slate-400">Auto closing in {countdown}s</p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Edit Resume
              </Button>
              <Button variant="gradient" onClick={onDownloadAgain}>
                Download Again
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
