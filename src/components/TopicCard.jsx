import { useState, useEffect } from "react";
import { levelColors } from "../theme.js";

function highlight(text, query) {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#fbbf24", color: "#0f172a", borderRadius: 2, padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function TopicCard({ topic, sectionColor, darkMode, searchQuery = "", sourceName = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const lc = levelColors[topic.level] || levelColors.Basic;

  // Auto-expand cards when a search is active
  useEffect(() => {
    setIsOpen(!!searchQuery);
  }, [searchQuery]);

  return (
    <div style={{
      background: darkMode ? "#1e293b" : "#ffffff",
      borderRadius: 10,
      border: `1px solid ${isOpen ? sectionColor + "66" : darkMode ? "#334155" : "#e2e8f0"}`,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      {/* ── Question row (always visible) ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "0.85rem 1rem",
          background: "transparent", border: "none",
          color: darkMode ? "#f1f5f9" : "#0f172a",
          cursor: "pointer", textAlign: "left", gap: "0.75rem",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.9rem", flex: 1, lineHeight: 1.45, wordBreak: "break-word" }}>
          {highlight(topic.title, searchQuery)}
        </span>

        <div style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          flexShrink: 0, paddingTop: "0.1rem",
          flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "45%",
        }}>
          {sourceName && (
            <span style={{
              fontSize: "0.6rem", fontWeight: 700,
              padding: "0.1rem 0.4rem", borderRadius: 99,
              background: sectionColor + "22", color: sectionColor,
              letterSpacing: "0.02em", whiteSpace: "nowrap",
              maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {sourceName}
            </span>
          )}
          <span style={{
            background: lc.bg, color: lc.text,
            fontSize: "0.65rem", fontWeight: 700,
            padding: "0.12rem 0.45rem", borderRadius: 99,
            letterSpacing: "0.05em", whiteSpace: "nowrap",
          }}>
            {topic.level}
          </span>
          <span style={{ color: darkMode ? "#64748b" : "#94a3b8", fontSize: "0.8rem", lineHeight: 1, flexShrink: 0 }}>
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* ── Answer panel ── */}
      {isOpen && (
        <div style={{ padding: "0 1rem 1rem", borderTop: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}` }}>
          {topic.answer && (
            <p style={{ margin: "0.85rem 0 0", color: darkMode ? "#cbd5e1" : "#475569", fontSize: "0.87rem", lineHeight: 1.7 }}>
              {highlight(topic.answer, searchQuery)}
            </p>
          )}

          {topic.code && (
            <pre style={{
              background: darkMode ? "#0f172a" : "#f8fafc",
              border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
              borderRadius: 8, padding: "0.85rem",
              fontSize: "0.76rem", lineHeight: 1.65,
              overflowX: "auto", color: "#93c5fd",
              marginTop: "0.85rem", whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              <code>{topic.code}</code>
            </pre>
          )}

          {topic.table && (
            <div style={{ overflowX: "auto", marginTop: "0.85rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", minWidth: 280 }}>
                <thead>
                  <tr>
                    {topic.table.headers.map((h, i) => (
                      <th key={i} style={{
                        background: darkMode ? "#0f172a" : "#f1f5f9",
                        color: darkMode ? "#94a3b8" : "#475569",
                        padding: "0.5rem 0.75rem", textAlign: "left",
                        fontWeight: 600, fontSize: "0.76rem",
                        borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: `1px solid ${darkMode ? "#1e293b" : "#f1f5f9"}` }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: "0.45rem 0.75rem",
                          color: darkMode ? "#cbd5e1" : "#334155",
                          fontSize: "0.8rem", verticalAlign: "top",
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {topic.tip && (
            <div style={{
              marginTop: "0.85rem", padding: "0.6rem 0.85rem",
              background: darkMode ? "#0f172a" : "#f0fdf4",
              border: `1px solid ${sectionColor}44`,
              borderRadius: 7, fontSize: "0.81rem",
              color: darkMode ? "#86efac" : "#166534", lineHeight: 1.6,
            }}>
              💡 {topic.tip}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
