import TopicCard from "./TopicCard.jsx";
import { HelpIcon } from "./Icons.jsx";

export default function SearchResults({ results, searchQuery, darkMode, theme }) {
  const count = results?.length ?? 0;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{
        background: theme.eyebrowTint, border: `1px solid ${theme.eyebrow}33`,
        color: theme.eyebrow, fontSize: "0.8rem", padding: "0.6rem 0.9rem",
        borderRadius: 12, marginBottom: "1.4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
      }}>
        <span>Searching globally for <strong>"{searchQuery}"</strong> — {count} match{count === 1 ? "" : "es"}</span>
      </div>

      {count === 0 ? (
        <div style={{
          background: theme.surfaceMuted, border: `1px solid ${theme.border}`,
          borderRadius: 16, padding: "3rem 1rem", textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", color: theme.textDim, marginBottom: "0.6rem" }}>
            <HelpIcon />
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1rem", color: theme.textBright, marginBottom: "0.3rem" }}>
            No questions found
          </div>
          <div style={{ fontSize: "0.82rem", color: theme.textDim, maxWidth: 320, margin: "0 auto" }}>
            Adjust your search query or browse sections in the sidebar instead.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {results.map(({ topic, section, guide }, idx) => (
            <TopicCard
              key={idx}
              topic={topic}
              index={idx}
              darkMode={darkMode}
              theme={theme}
              searchQuery={searchQuery}
              sourceName={`${guide.label} · ${section.label.replace(/^\d+\s*—\s*/, "")}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
