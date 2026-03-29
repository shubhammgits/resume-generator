"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeState } from "@/types/resume";
import PreviewHeader from "@/components/preview/resume-sections/PreviewHeader";
import PreviewEducation from "@/components/preview/resume-sections/PreviewEducation";
import PreviewSkills from "@/components/preview/resume-sections/PreviewSkills";
import PreviewExperience from "@/components/preview/resume-sections/PreviewExperience";
import PreviewProjects from "@/components/preview/resume-sections/PreviewProjects";
import PreviewCertifications from "@/components/preview/resume-sections/PreviewCertifications";
import PreviewExtras from "@/components/preview/resume-sections/PreviewExtras";

interface ResumePreviewProps {
  data: ResumeState;
  onDownload: () => void;
}

function hasMeaningfulData(data: ResumeState) {
  return Boolean(
    data.personal.fullName ||
      data.personal.email ||
      data.personal.phone ||
      data.summary ||
      data.education.some((item) => item.institution || item.degree) ||
      data.projects.some((item) => item.title || item.bullets)
  );
}

export default function ResumePreview({ data, onDownload }: ResumePreviewProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [debouncedData, setDebouncedData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedData(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  const isEmpty = useMemo(() => !hasMeaningfulData(debouncedData), [debouncedData]);

  return (
    <aside className="h-screen overflow-y-auto border-l border-white/10 bg-[rgba(10,10,20,0.72)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <Eye className="h-4 w-4 text-accent" />
          Live Preview
        </div>
        <Button variant="ghost" size="icon" onClick={() => setRefreshKey((prev) => prev + 1)}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f6f6f6] p-2">
        <div className="h-[920px] w-[820px] origin-top-left scale-[0.7]">
          <AnimatePresence mode="wait">
            <motion.div
              key={refreshKey + JSON.stringify(debouncedData).length}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.26 }}
            >
              {isEmpty ? (
                <div
                  style={{
                    minHeight: "900px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: "#6b7280",
                    background: "#fff"
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <rect x="22" y="12" width="56" height="76" rx="6" stroke="#9ca3af" strokeWidth="3" />
                    <line x1="32" y1="34" x2="67" y2="34" stroke="#d1d5db" strokeWidth="3" />
                    <line x1="32" y1="46" x2="62" y2="46" stroke="#d1d5db" strokeWidth="3" />
                    <line x1="32" y1="58" x2="66" y2="58" stroke="#d1d5db" strokeWidth="3" />
                  </svg>
                  <p style={{ marginTop: 16, fontSize: 18, fontWeight: 600 }}>
                    Fill in the form to see your resume come to life
                  </p>
                </div>
              ) : (
                <div style={{ background: "#fff", padding: "24px 34px", minHeight: "900px" }}>
                  <PreviewHeader data={debouncedData} />
                  <PreviewEducation data={debouncedData} />
                  <PreviewSkills data={debouncedData} />
                  {debouncedData.hasExperience ? <PreviewExperience data={debouncedData} /> : null}
                  <PreviewProjects data={debouncedData} />
                  {debouncedData.hasCertifications ? <PreviewCertifications data={debouncedData} /> : null}
                  {debouncedData.hasExtras ? <PreviewExtras data={debouncedData} /> : null}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Button variant="gradient" className="mt-4 w-full" onClick={onDownload}>
        Download PDF
      </Button>
    </aside>
  );
}
