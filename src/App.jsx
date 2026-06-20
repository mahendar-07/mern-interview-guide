import { useState, useMemo, useCallback, useEffect } from "react";
import { sections as reactSections } from "./react-interview-guide.jsx";
import { sections as expressSections } from "./express-interview-guide.jsx";
import { sections as mongoSections } from "./mongodb-interview-guide.jsx";
import { sections as nodeSections } from "./nodejs-interview-guide.jsx";

const guides = [
  { id: "react",   label: "React",   icon: "⚛",  color: "#6366f1", sections: reactSections },
  { id: "express", label: "Express", icon: "🚀", color: "#10b981", sections: expressSections },
  { id: "mongo",   label: "MongoDB", icon: "🍃", color: "#16a34a", sections: mongoSections },
  { id: "node",    label: "Node.js", icon: "N",  color: "#f59e0b", sections: nodeSections },
];

const levelColors = {
  Basic:        { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#dbeafe", text: "#1e40af" },
  Advanced:     { bg: "#fce7f3", text: "#9d174d" },
  Scenario:     { bg: "#fef3c7", text: "#92400e" },
};

/* ─── icons ─── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

/* ─── TopicCard ─── */
function TopicCard({ topic, sectionColor, darkMode, searchQuery, sourceName }) {
  const [isOpen, setIsOpen] = useState(false);
  const lc = levelColors[topic.level] || levelColors.Basic;

  useEffect(() => {
    setIsOpen(!!searchQuery);
  }, [searchQuery]);

  const highlight = (text) => {
    if (!searchQuery || !text) return text;
    const idx = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "#fbbf24", color: "#0f172a", borderRadius: 2, padding: "0 2px" }}>
          {text.slice(idx, idx + searchQuery.length)}
        </mark>
        {text.slice(idx + searchQuery.length)}
      </>
    );
  };

  return (
    <div style={{
      background: darkMode ? "#1e293b" : "#ffffff",
      borderRadius: 10,
      border: `1px solid ${isOpen ? sectionColor + "66" : darkMode ? "#334155" : "#e2e8f0"}`,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
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
          {highlight(topic.title)}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, paddingTop: "0.1rem", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "45%" }}>
          {sourceName && (
            <span style={{
              fontSize: "0.6rem", fontWeight: 700,
              padding: "0.1rem 0.4rem", borderRadius: 99,
              background: sectionColor + "22", color: sectionColor,
              letterSpacing: "0.02em", whiteSpace: "nowrap",
              maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis",
            }}>{sourceName}</span>
          )}
          <span style={{
            background: lc.bg, color: lc.text,
            fontSize: "0.65rem", fontWeight: 700,
            padding: "0.12rem 0.45rem", borderRadius: 99,
            letterSpacing: "0.05em", whiteSpace: "nowrap",
          }}>{topic.level}</span>
          <span style={{ color: darkMode ? "#64748b" : "#94a3b8", fontSize: "0.8rem", lineHeight: 1, flexShrink: 0 }}>
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 1rem 1rem", borderTop: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}` }}>
          {topic.answer && (
            <p style={{ margin: "0.85rem 0 0", color: darkMode ? "#cbd5e1" : "#475569", fontSize: "0.87rem", lineHeight: 1.7 }}>
              {highlight(topic.answer)}
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
                    {topic.table.headers.map((h, hi) => (
                      <th key={hi} style={{
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

/* ─── SidebarContent (shared between desktop + mobile drawer) ─── */
function SidebarContent({ currentGuide, currentSections, activeSection, setActiveSection, activeGuide, handleGuideChange, darkMode, theme, onClose }) {
  return (
    <div style={{ padding: "0.75rem" }}>
      {/* Current guide label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{currentGuide?.icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: currentGuide?.color }}>{currentGuide?.label}</span>
      </div>

      {/* Sections */}
      {currentSections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => { setActiveSection(i); onClose?.(); }}
          style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "0.55rem 0.85rem", marginBottom: "0.15rem",
            borderRadius: 8, border: "none",
            background: activeSection === i ? section.color + "22" : "transparent",
            borderLeft: activeSection === i ? `3px solid ${section.color}` : "3px solid transparent",
            color: activeSection === i ? theme.textBright : theme.text,
            fontSize: "0.81rem", fontWeight: activeSection === i ? 600 : 400,
            cursor: "pointer", transition: "all 0.15s", lineHeight: 1.4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}
          title={section.label}
        >
          {section.label}
        </button>
      ))}

      {/* Other guides */}
      <div style={{ marginTop: "1.1rem", paddingTop: "0.75rem", borderTop: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: "0.67rem", fontWeight: 700, color: theme.text, letterSpacing: "0.08em", padding: "0 0.75rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>
          Other Guides
        </div>
        {guides.filter(g => g.id !== activeGuide).map(guide => (
          <button
            key={guide.id}
            onClick={() => { handleGuideChange(guide.id); onClose?.(); }}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              width: "100%", textAlign: "left",
              padding: "0.5rem 0.85rem", marginBottom: "0.15rem",
              borderRadius: 8, border: "none",
              background: "transparent", color: theme.text,
              fontSize: "0.81rem", cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = darkMode ? "#1e293b" : "#e2e8f0"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span>{guide.icon}</span> {guide.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [activeGuide, setActiveGuide] = useState("react");
  const [activeSection, setActiveSection] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);   // desktop
  const [drawerOpen, setDrawerOpen]   = useState(false);  // mobile

  const theme = darkMode ? {
    bg: "#0f172a", headerBg: "#0a0f1e", sidebarBg: "#0d1526",
    border: "#1e293b", text: "#94a3b8", textBright: "#e2e8f0",
    inputBg: "#1e293b", toggleBg: "#1e293b", toggleColor: "#f59e0b",
  } : {
    bg: "#f8fafc", headerBg: "#ffffff", sidebarBg: "#f1f5f9",
    border: "#e2e8f0", text: "#64748b", textBright: "#1e293b",
    inputBg: "#f1f5f9", toggleBg: "#e2e8f0", toggleColor: "#334155",
  };

  const currentGuide   = guides.find(g => g.id === activeGuide);
  const currentSections = currentGuide?.sections || [];
  const currentSection  = currentSections[activeSection];

  const handleGuideChange = useCallback((id) => {
    setActiveGuide(id);
    setActiveSection(0);
    setSearchQuery("");
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const out = [];
    for (const guide of guides)
      for (const section of guide.sections)
        for (const topic of section.topics)
          if (
            topic.title.toLowerCase().includes(q) ||
            (topic.answer && topic.answer.toLowerCase().includes(q)) ||
            (topic.tip   && topic.tip.toLowerCase().includes(q))
          )
            out.push({ topic, section, guide });
    return out;
  }, [searchQuery]);

  const iconBtn = {
    background: theme.toggleBg, border: `1px solid ${theme.border}`,
    borderRadius: 8, padding: "0.4rem 0.5rem",
    cursor: "pointer", color: theme.toggleColor,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "all 0.2s",
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: theme.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ═══ HEADER ═══ */}
      <header style={{
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        position: "sticky", top: 0, zIndex: 300,
        boxShadow: darkMode ? "0 1px 16px rgba(0,0,0,0.4)" : "0 1px 8px rgba(0,0,0,0.08)",
      }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 1rem" }}>

          {/* Hamburger — desktop: toggle aside width | mobile: open drawer */}
          <button
            onClick={() => { setSidebarOpen(o => !o); setDrawerOpen(o => !o); }}
            title="Toggle sidebar"
            style={iconBtn}
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #6366f1, #10b981)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.9rem", fontWeight: 800, color: "#fff",
            }}>G</div>
            {/* Hide label text on very small screens via CSS class */}
            <span className="logo-text" style={{ fontWeight: 700, fontSize: "0.95rem", color: theme.textBright, whiteSpace: "nowrap" }}>
              Interview <span style={{ color: "#6366f1" }}>Guide</span>
            </span>
          </div>

          {/* Search */}
          <div style={{ flex: 1, minWidth: 0, position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "0.6rem", color: theme.text, pointerEvents: "none", display: "flex" }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search all topics…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.42rem 1.8rem 0.42rem 2rem",
                background: theme.inputBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 8, color: theme.textBright,
                fontSize: "0.83rem", outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = currentGuide?.color || "#6366f1"}
              onBlur={e => e.target.style.borderColor = theme.border}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: "0.45rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: theme.text, fontSize: "1rem", lineHeight: 1, padding: 0,
                }}
              >×</button>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setDarkMode(d => !d)} title="Toggle theme" style={iconBtn}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Guide tabs row — always scrollable */}
        <nav style={{
          display: "flex", gap: 0, padding: "0 0.75rem",
          overflowX: "auto", scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}>
          {guides.map(guide => (
            <button
              key={guide.id}
              onClick={() => handleGuideChange(guide.id)}
              style={{
                padding: "0.5rem 0.85rem",
                borderRadius: "7px 7px 0 0",
                border: "none", flexShrink: 0,
                background: activeGuide === guide.id ? theme.bg : "transparent",
                color: activeGuide === guide.id ? guide.color : theme.text,
                fontWeight: activeGuide === guide.id ? 700 : 400,
                fontSize: "0.83rem", cursor: "pointer",
                borderBottom: activeGuide === guide.id ? `2px solid ${guide.color}` : "2px solid transparent",
                transition: "all 0.15s", whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{guide.icon}</span>
              {guide.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ═══ BODY ═══ */}
      <div style={{ display: "flex", flex: 1, position: "relative", overflow: "hidden" }}>

        {/* ── Mobile drawer overlay ── */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 250,
            }}
            className="mobile-overlay"
          />
        )}

        {/* ── Mobile drawer ── */}
        <aside
          className="mobile-drawer"
          style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 270,
            background: theme.sidebarBg,
            borderRight: `1px solid ${theme.border}`,
            overflowY: "auto",
            transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.26s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 260,
            paddingTop: "5rem",    /* clear the sticky header */
            display: "none",       /* shown via CSS media query */
          }}
        >
          <SidebarContent
            currentGuide={currentGuide}
            currentSections={currentSections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeGuide={activeGuide}
            handleGuideChange={handleGuideChange}
            darkMode={darkMode}
            theme={theme}
            onClose={() => setDrawerOpen(false)}
          />
        </aside>

        {/* ── Desktop sidebar ── */}
        <aside
          className="desktop-sidebar"
          style={{
            width: sidebarOpen ? 238 : 0,
            minWidth: sidebarOpen ? 238 : 0,
            background: theme.sidebarBg,
            borderRight: `1px solid ${theme.border}`,
            overflowY: "auto", overflowX: "hidden",
            transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
            flexShrink: 0, scrollbarWidth: "thin",
            /* hidden on mobile via CSS */
          }}
        >
          {sidebarOpen && (
            <div style={{ minWidth: 238 }}>
              <SidebarContent
                currentGuide={currentGuide}
                currentSections={currentSections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                activeGuide={activeGuide}
                handleGuideChange={handleGuideChange}
                darkMode={darkMode}
                theme={theme}
              />
            </div>
          )}
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem", minWidth: 0 }}>
          {searchQuery ? (
            /* ── Search results ── */
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: theme.textBright, margin: 0 }}>Search results</h2>
                <span style={{
                  background: (searchResults?.length ?? 0) > 0 ? "#6366f122" : "#ef444422",
                  color: (searchResults?.length ?? 0) > 0 ? "#818cf8" : "#f87171",
                  fontSize: "0.75rem", fontWeight: 700, padding: "0.18rem 0.6rem", borderRadius: 99,
                }}>
                  {searchResults?.length ?? 0} found across all topics
                </span>
              </div>

              {searchResults?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", color: theme.text }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.6rem" }}>🔍</div>
                  <div style={{ fontWeight: 600, color: theme.textBright, marginBottom: "0.3rem" }}>No results found</div>
                  <div style={{ fontSize: "0.88rem" }}>Try a different keyword or browse sections in the sidebar</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {searchResults.map(({ topic, section, guide }, idx) => (
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
          ) : currentSection ? (
            /* ── Section topics ── */
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                marginBottom: "1.1rem", paddingBottom: "0.8rem",
                borderBottom: `1px solid ${currentSection.color}33`,
                flexWrap: "wrap",
              }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: currentSection.color, margin: 0 }}>
                  {currentSection.label}
                </h2>
                <span style={{
                  background: currentSection.color + "22", color: currentSection.color,
                  fontSize: "0.7rem", fontWeight: 700, padding: "0.12rem 0.55rem", borderRadius: 99,
                }}>
                  {currentSection.topics.length} questions
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {currentSection.topics.map((topic, i) => (
                  <TopicCard
                    key={i}
                    topic={topic}
                    sectionColor={currentSection.color}
                    darkMode={darkMode}
                    searchQuery=""
                    sourceName={null}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
                {activeSection > 0 && (
                  <button
                    onClick={() => setActiveSection(s => s - 1)}
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
                      {currentSections[activeSection - 1]?.label}
                    </span>
                  </button>
                )}
                {activeSection < currentSections.length - 1 && (
                  <button
                    onClick={() => setActiveSection(s => s + 1)}
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
                      {currentSections[activeSection + 1]?.label}
                    </span>
                    <ChevronRight />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>

      {/* ═══ Global CSS ═══ */}
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: #64748b; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        nav::-webkit-scrollbar { display: none; }

        /* ── Desktop: show sidebar-desktop, hide drawer ── */
        .desktop-sidebar { display: block; }
        .mobile-drawer   { display: none !important; }
        .mobile-overlay  { display: none !important; }

        /* ── Mobile (≤ 640px) ── */
        @media (max-width: 640px) {
          .desktop-sidebar { display: none !important; }
          .mobile-drawer   { display: block !important; }
          .mobile-overlay  { display: block !important; }
          .logo-text { display: none; }
        }
      `}</style>
    </div>
  );
}
