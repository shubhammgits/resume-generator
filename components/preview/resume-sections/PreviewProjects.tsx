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

export default function PreviewProjects({ data }: ResumeSectionProps) {
  const entries = data.projects.filter((item) => item.title || item.bullets);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: "10px" }}>
      {sectionTitle("PROJECTS")}
      {entries.map((item) => {
        const bullets = toBullets(item.bullets);
        return (
          <div key={item.id} style={{ marginBottom: "8px", fontSize: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>
                {item.title}
                {item.githubUrl ? (
                  <>
                    {" | "}
                    <a href={item.githubUrl} style={{ color: "#1155CC", textDecoration: "none" }}>
                      LINK
                    </a>
                  </>
                ) : null}
              </span>
              <span>
                {item.startDate}
                {item.startDate && item.endDate ? " - " : ""}
                {item.endDate}
              </span>
            </div>
            {item.techStack ? <div style={{ fontStyle: "italic" }}>{item.techStack}</div> : null}
            <ul style={{ margin: "4px 0 0", paddingLeft: "18px" }}>
              {bullets.map((line, index) => (
                <li key={`${item.id}-${index}`} style={{ listStyleType: "circle", marginBottom: "2px" }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
