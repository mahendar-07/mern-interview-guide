import TopicCard from "./TopicCard.jsx";
import { ChevronLeft, ChevronRight } from "./Icons.jsx";

export default function SectionView({ section, sections, activeSection, onSectionChange, darkMode, theme }) {
  if (!section) return null;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {/* Section heading */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.65rem",
        marginBottom: "1.1rem", paddingBottom: "0.8rem",
        borderBottom: `1px solid ${section.color}33`,
        flexWrap: "wrap",
      }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: section.color, margin: 0 }}>
          {section.label}
        </h2>
        <span style={{
          background: section.color + "22", color: section.color,
          fontSize: "0.7rem", fontWeight: 700,
          padding: "0.12rem 0.55rem", borderRadius: 99,
        }}>
          {section.topics.length} questions
        </span>
      </div>

      {/* Topic cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {section.topics.map((topic, i) => (
          <TopicCard
            key={i}
            topic={topic}
            sectionColor={section.color}
            darkMode={darkMode}
            searchQuery=""
            sourceName={null}
          />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
        {activeSection > 0 && (
          <button
            onClick={() => onSectionChange(activeSection - 1)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.55rem 0.9rem", borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: "transparent", color: theme.text,
              cursor: "pointer", fontSize: "0.81rem",
              flex: 1, justifyContent: "center",
            }}
          >
            <ChevronLeft />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {sections[activeSection - 1]?.label}
            </span>
          </button>
        )}
        {activeSection < sections.length - 1 && (
          <button
            onClick={() => onSectionChange(activeSection + 1)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.55rem 0.9rem", borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: "transparent", color: theme.text,
              cursor: "pointer", fontSize: "0.81rem",
              flex: 1, justifyContent: "center",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {sections[activeSection + 1]?.label}
            </span>
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
