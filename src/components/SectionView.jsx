import TopicCard from "./TopicCard.jsx";
import { ChevronLeft, ChevronRight } from "./Icons.jsx";

export default function SectionView({ section, sections, activeSection, onSectionChange, darkMode, theme, guide }) {
  if (!section) return null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Editorial hero */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.72rem", fontWeight: 700, color: theme.eyebrow,
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.eyebrow, display: "inline-block", boxShadow: `0 0 6px ${theme.eyebrow}` }} />
          {guide?.label} syllabus
        </div>
        <h1 className="hero-text" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "40px", fontWeight: 800, lineHeight: 1.08,
          letterSpacing: "-0.01em", color: theme.textBright, margin: 0,
        }}>
          {section.label.replace(/^\d+\s*—\s*/, "")}.
          <br />
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: theme.textDim }}>
            Mastered, properly.
          </span>
        </h1>
      </div>

      {/* Dashboard card */}
      <section style={{
        background: theme.surface,
        borderRadius: 16, padding: "1rem 1.25rem",
        border: `1px solid ${theme.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem",
      }}>
        <div>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: theme.eyebrow, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Active chapter
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.05rem", fontWeight: 700, color: theme.textBright,
            margin: "0.15rem 0 0", display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            {section.label.replace(/^\d+\s*—\s*/, "")}
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem", fontWeight: 600, color: "#fff",
              background: theme.accent, borderRadius: 999, padding: "0.15rem 0.6rem",
            }}>
              {section.topics.length} questions
            </span>
          </h2>
        </div>
      </section>

      {/* Topic cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {section.topics.map((topic, i) => (
          <TopicCard
            key={i}
            topic={topic}
            index={i}
            darkMode={darkMode}
            theme={theme}
            searchQuery=""
            sourceName={null}
          />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
        {activeSection > 0 && (
          <button
            onClick={() => onSectionChange(activeSection - 1)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.6rem 1rem", borderRadius: 999,
              border: `1px solid ${theme.border}`,
              background: theme.surface, color: theme.text,
              cursor: "pointer", fontSize: "0.8rem", fontWeight: 500,
              flex: 1, justifyContent: "center",
            }}
          >
            <ChevronLeft />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {sections[activeSection - 1]?.label.replace(/^\d+\s*—\s*/, "")}
            </span>
          </button>
        )}
        {activeSection < sections.length - 1 && (
          <button
            onClick={() => onSectionChange(activeSection + 1)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.6rem 1rem", borderRadius: 999,
              border: "none",
              background: theme.accent, color: "#fff",
              cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
              flex: 1, justifyContent: "center",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {sections[activeSection + 1]?.label.replace(/^\d+\s*—\s*/, "")}
            </span>
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
