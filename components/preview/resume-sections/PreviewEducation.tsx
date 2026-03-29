import type { ResumeState } from "@/types/resume";

interface ResumeSectionProps {
  data: ResumeState;
}

function sectionTitle(title: string) {
  return (
    <>
      <hr style={{ borderColor: "#000", margin: "10px 0 4px" }} />
      <h2
        style={{
          margin: 0,
          fontSize: "13px",
          textAlign: "center",
          letterSpacing: "0.6px",
          fontWeight: 700
        }}
      >
        {title}
      </h2>
      <hr style={{ borderColor: "#000", margin: "4px 0 8px" }} />
    </>
  );
}

export default function PreviewEducation({ data }: ResumeSectionProps) {
  const entries = data.education.filter((item) => item.institution || item.degree || item.startDate || item.endDate);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: "10px" }}>
      {sectionTitle("EDUCATION")}
      {entries.map((item) => (
        <div key={item.id} style={{ marginBottom: "8px", fontSize: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
            <span>{item.institution}</span>
            <span>{item.location}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {item.degree}
              {item.gpa ? `; GPA: ${item.gpa}` : ""}
            </span>
            <span style={{ fontWeight: 700 }}>
              {item.startDate}
              {item.startDate && item.endDate ? " - " : ""}
              {item.endDate}
            </span>
          </div>
          {item.additionalInfo ? <div>{item.additionalInfo}</div> : null}
        </div>
      ))}
    </section>
  );
}
