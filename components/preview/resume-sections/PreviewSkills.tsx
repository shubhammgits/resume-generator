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

export default function PreviewSkills({ data }: ResumeSectionProps) {
  const rows = [
    ["Languages", data.skills.languages],
    ["Frameworks", data.skills.frameworks],
    ["Tools", data.skills.tools],
    ["Databases", data.skills.databases],
    ["Cloud", data.skills.cloud],
    ["Soft Skills", data.skills.softSkills]
  ].filter((item) => item[1]);

  if (rows.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: "10px" }}>
      {sectionTitle("SKILLS SUMMARY")}
      <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "12px" }}>
        {rows.map(([label, value]) => (
          <li key={label} style={{ marginBottom: "2px" }}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
