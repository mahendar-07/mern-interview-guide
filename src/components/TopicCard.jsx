import { useState, useEffect } from "react";
import { levelColors } from "../theme.js";
import { ChevronDown, ChevronUp, CodeIcon } from "./Icons.jsx";

function highlight(text, query, theme) {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: theme.eyebrowTint, color: theme.eyebrow, borderRadius: 3, padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function TopicCard({ topic, index = 0, darkMode, theme, searchQuery = "", sourceName = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const lc = levelColors[topic.level] || levelColors.Basic;

  useEffect(() => {
    setIsOpen(!!searchQuery);
  }, [searchQuery]);

  const copyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(topic.code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div style={{
      background: theme.surface,
      borderRadius: 16,
      border: `1px solid ${isOpen ? theme.borderStrong : theme.border}`,
      boxShadow: isOpen ? `0 0 0 4px ${theme.accentTint}` : "none",
      overflow: "hidden",
      transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.3s",
    }}>
      {/* Trigger row */}
      <div
        onClick={() => setIsOpen(o => !o)}
        style={{
          padding: "1.05rem 1.15rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none", gap: "0.85rem",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: theme.textDim, fontWeight: 600 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{
              fontSize: "0.62rem", fontWeight: 700, padding: "0.16rem 0.55rem",
              borderRadius: 999, background: lc.bg, color: lc.text, textTransform: "uppercase", letterSpacing: "0.02em",
            }}>
              {topic.level}
            </span>
            {sourceName && (
              <span style={{
                fontSize: "0.62rem", fontWeight: 600, color: theme.textDim,
                background: darkMode ? theme.bg : "#f0f0f2", borderRadius: 999, padding: "0.16rem 0.55rem",
                maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {sourceName}
              </span>
            )}
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.98rem", fontWeight: 700, color: theme.textBright,
            margin: 0, letterSpacing: "-0.005em", lineHeight: 1.4,
          }}>
            {highlight(topic.title, searchQuery, theme)}
          </h3>
        </div>

        <div style={{
          padding: "0.35rem", borderRadius: 999,
          background: darkMode ? theme.bg : "#f0f0f2",
          color: theme.textDim, display: "flex", flexShrink: 0,
        }}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div style={{
          borderTop: `1px solid ${theme.border}`,
          padding: "1rem 1.15rem 1.15rem",
          background: theme.surfaceMuted,
          display: "flex", flexDirection: "column", gap: "0.9rem",
        }}>
          {topic.answer && (
            <div>
              <div style={{
                fontSize: "0.62rem", fontWeight: 700, color: theme.textDim,
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.35rem",
              }}>
                Official explanation
              </div>
              <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: theme.text }}>
                {highlight(topic.answer, searchQuery, theme)}
              </p>
            </div>
          )}

          {topic.code && (
            <div style={{ borderRadius: 12, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
              <div style={{
                background: darkMode ? theme.bg : "#f0f0f2",
                padding: "0.5rem 0.8rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: `1px solid ${theme.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: theme.textDim }}>
                  <CodeIcon />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 500 }}>
                    Playground
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  style={{
                    fontSize: "0.65rem", color: theme.text, background: theme.surface,
                    border: `1px solid ${theme.border}`, borderRadius: 6,
                    padding: "0.15rem 0.5rem", cursor: "pointer",
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre style={{
                background: theme.surface, margin: 0, padding: "0.85rem",
                overflowX: "auto", fontSize: "0.74rem", lineHeight: 1.65,
                fontFamily: "'JetBrains Mono', monospace", color: theme.textBright,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                <code>{topic.code}</code>
              </pre>
            </div>
          )}

          {topic.table && (
            <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${theme.border}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", minWidth: 280 }}>
                <thead>
                  <tr>
                    {topic.table.headers.map((h, i) => (
                      <th key={i} style={{
                        background: darkMode ? theme.bg : "#f0f0f2",
                        color: theme.textDim,
                        padding: "0.5rem 0.75rem", textAlign: "left",
                        fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.03em",
                        borderBottom: `1px solid ${theme.border}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: "0.5rem 0.75rem",
                          color: theme.text,
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
              background: darkMode ? "#0f1f15" : "#FAFDF9",
              border: `1px solid ${darkMode ? "#1c3326" : "#d1fae5"}`,
              borderRadius: 12, padding: "0.75rem 0.9rem",
              display: "flex", gap: "0.6rem", alignItems: "flex-start",
            }}>
              <span style={{ color: theme.success }}>＋</span>
              <p style={{ margin: 0, fontSize: "0.79rem", lineHeight: 1.6, color: darkMode ? "#86efac" : "#047857" }}>
                {topic.tip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
