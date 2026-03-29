"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobilePreviewOverlayProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  children: React.ReactNode;
}

export default function MobilePreviewOverlay({
  open,
  onClose,
  onDownload,
  children
}: MobilePreviewOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.72)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 top-10 rounded-t-2xl border border-white/10 bg-[#0d0d19] p-3"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Mobile Resume Preview</p>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[calc(100%-110px)] overflow-auto rounded-xl border border-white/10 bg-white p-2">
              {children}
            </div>
            <div className="mt-3">
              <Button variant="gradient" className="w-full" onClick={onDownload}>
                Download PDF
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
