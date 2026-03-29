import { toBullets } from "@/lib/utils";
import type { ResumeState } from "@/types/resume";

interface ResumeSectionProps {
  data: ResumeState;
}

function sectionTitle(title: string) {
  return (
    <>
      <hr style={{ borderColor: "#000", margin: "10px 0 4px" }} />
      <h2 style={{ margin: 0, fontSize: "13px", textAlign: "center", letterSpacing: "0.6px", fontWeight: 700 }}>
        {title}
      </h2>
      <hr style={{ borderColor: "#000", margin: "4px 0 8px" }} />
    </>
  );
}

export default function PreviewExtras({ data }: ResumeSectionProps) {
  const rows = toBullets(data.extras);

  if (rows.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: "10px" }}>
      {sectionTitle("EXTRA-CURRICULAR")}
      <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "12px" }}>
        {rows.map((line, index) => (
          <li key={`${line}-${index}`} style={{ listStyleType: "circle", marginBottom: "2px" }}>
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
