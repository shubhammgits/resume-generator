"use client";

import type { ResumeState } from "@/types/resume";
import PreviewHeader from "@/components/preview/resume-sections/PreviewHeader";
import PreviewEducation from "@/components/preview/resume-sections/PreviewEducation";
import PreviewSkills from "@/components/preview/resume-sections/PreviewSkills";
import PreviewExperience from "@/components/preview/resume-sections/PreviewExperience";
import PreviewProjects from "@/components/preview/resume-sections/PreviewProjects";
import PreviewCertifications from "@/components/preview/resume-sections/PreviewCertifications";
import PreviewExtras from "@/components/preview/resume-sections/PreviewExtras";

interface ResumePDFRendererProps {
  data: ResumeState;
}

export default function ResumePDFRenderer({ data }: ResumePDFRendererProps) {
  return (
    <div
      id="resume-pdf-target"
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        visibility: "hidden",
        width: "794px",
        background: "#fff",
        color: "#000",
        fontFamily: "Times New Roman, serif",
        padding: "30px"
      }}
    >
      <PreviewHeader data={data} />
      <PreviewEducation data={data} />
      <PreviewSkills data={data} />
      {data.hasExperience ? <PreviewExperience data={data} /> : null}
      <PreviewProjects data={data} />
      {data.hasCertifications ? <PreviewCertifications data={data} /> : null}
      {data.hasExtras ? <PreviewExtras data={data} /> : null}
    </div>
  );
}
