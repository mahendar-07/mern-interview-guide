import TopicCard from "./TopicCard.jsx";

export default function SearchResults({ results, searchQuery, darkMode, theme }) {
  const count = results?.length ?? 0;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {/* Result count */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: theme.textBright, margin: 0 }}>
          Search results
        </h2>
        <span style={{
          background: count > 0 ? "#6366f122" : "#ef444422",
          color: count > 0 ? "#818cf8" : "#f87171",
          fontSize: "0.75rem", fontWeight: 700,
          padding: "0.18rem 0.6rem", borderRadius: 99,
        }}>
          {count} found across all topics
        </span>
      </div>

      {/* Empty state */}
      {count === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: theme.text }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.6rem" }}>🔍</div>
          <div style={{ fontWeight: 600, color: theme.textBright, marginBottom: "0.3rem" }}>No results found</div>
          <div style={{ fontSize: "0.88rem" }}>Try a different keyword or browse sections in the sidebar</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {results.map(({ topic, section, guide }, idx) => (
            <TopicCard
              key={idx}
              topic={topic}
              sectionColor={guide.color}
              darkMode={darkMode}
              searchQuery={searchQuery}
              sourceName={`${guide.label} › ${section.label.replace(/^\d+ — /, "")}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
