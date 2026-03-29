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

export default function PreviewCertifications({ data }: ResumeSectionProps) {
  const entries = data.certifications.filter((item) => item.title || item.organization || item.date || item.url);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: "10px" }}>
      {sectionTitle("CERTIFICATIONS")}
      {entries.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", justifyContent: "space-between", gap: "8px", fontSize: "12px", marginBottom: "4px" }}
        >
          <span>
            {item.title}
            {item.url ? (
              <>
                {" | "}
                <a href={item.url} style={{ color: "#1155CC", textDecoration: "none" }}>
                  CERTIFICATE
                </a>
              </>
            ) : null}
          </span>
          <span>{item.date}</span>
        </div>
      ))}
    </section>
  );
}
