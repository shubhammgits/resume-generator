import type { ResumeState } from "@/types/resume";

interface ResumeSectionProps {
  data: ResumeState;
}

export default function PreviewHeader({ data }: ResumeSectionProps) {
  const { personal, summary } = data;

  return (
    <section style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "20px", margin: 0, fontWeight: 700 }}>{personal.fullName || "Your Name"}</h1>
          <div style={{ marginTop: "6px", display: "flex", gap: "8px", flexWrap: "wrap", fontSize: "12px" }}>
            {personal.linkedin ? (
              <a href={personal.linkedin} style={{ color: "#1155CC", textDecoration: "none" }}>
                LinkedIn
              </a>
            ) : null}
            {personal.github ? (
              <a href={personal.github} style={{ color: "#1155CC", textDecoration: "none" }}>
                GitHub
              </a>
            ) : null}
            {personal.portfolio ? (
              <a href={personal.portfolio} style={{ color: "#1155CC", textDecoration: "none" }}>
                Portfolio
              </a>
            ) : null}
          </div>
        </div>
        <div style={{ fontSize: "12px", textAlign: "right", lineHeight: 1.45 }}>
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
        </div>
      </div>
      {summary ? <p style={{ marginTop: "10px", marginBottom: "8px", fontSize: "12px" }}>{summary}</p> : null}
      <hr style={{ borderColor: "#000", margin: "8px 0 0" }} />
    </section>
  );
}
