import { useState, useMemo, useCallback } from "react";
import ReactGuide   from "./react-interview-guide.jsx";
import ExpressGuide from "./express-interview-guide.jsx";
import MongoGuide   from "./mongodb-interview-guide.jsx";
import NodeGuide    from "./nodejs-interview-guide.jsx";

const tabs = [
  { id: "react",   label: "React",    icon: "⚛", color: "#6366f1" },
  { id: "express", label: "Express",  icon: "🚀", color: "#10b981" },
  { id: "mongo",   label: "MongoDB",  icon: "🍃", color: "#16a34a" },
  { id: "node",    label: "Node.js",  icon: "N", color: "#f59e0b" },
];

// Sun icon SVG
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

// Moon icon SVG
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// Search icon
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export default function App() {
  const [active, setActive] = useState("react");
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = darkMode ? {
    bg: "#0f172a",
    headerBg: "#0a0f1e",
    border: "#1e293b",
    text: "#94a3b8",
    textBright: "#e2e8f0",
    inputBg: "#1e293b",
    footerBg: "#0a0f1e",
    toggleBg: "#1e293b",
    toggleColor: "#f59e0b",
    mobileMenuBg: "#0a0f1e",
  } : {
    bg: "#f8fafc",
    headerBg: "#ffffff",
    border: "#e2e8f0",
    text: "#64748b",
    textBright: "#1e293b",
    inputBg: "#f1f5f9",
    footerBg: "#f1f5f9",
    toggleBg: "#e2e8f0",
    toggleColor: "#334155",
    mobileMenuBg: "#ffffff",
  };

  const handleTabChange = useCallback((id) => {
    setActive(id);
    setSearchQuery("");
    setMobileMenuOpen(false);
  }, []);

  const activeTab = tabs.find(t => t.id === active);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: theme.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ─── HEADER ─── */}
      <header style={{
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: darkMode ? "0 1px 16px rgba(0,0,0,0.4)" : "0 1px 8px rgba(0,0,0,0.08)",
      }}>
        {/* Top row: Logo + Search + Theme toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.25rem",
          flexWrap: "wrap",
        }}>
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #10b981)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", fontWeight: 800, color: "#fff",
            }}>G</div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: theme.textBright, display: "flex", alignItems: "center", gap: "0.35rem" }}>
              Interview <span style={{ color: "#6366f1" }}>Guide</span>
            </span>
          </div>

          {/* Search bar — grows to fill space */}
          <div style={{ flex: 1, minWidth: 160, position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "0.65rem", color: theme.text, pointerEvents: "none", display: "flex" }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder={`Search ${activeTab?.label || "all"} topics…`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.45rem 0.85rem 0.45rem 2.2rem",
                background: theme.inputBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                color: theme.textBright,
                fontSize: "0.85rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = activeTab?.color || "#6366f1"}
              onBlur={e => e.target.style.borderColor = theme.border}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: "0.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: theme.text, fontSize: "1rem", padding: "0 0.25rem",
                }}
              >×</button>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: theme.toggleBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              padding: "0.4rem 0.55rem",
              cursor: "pointer",
              color: theme.toggleColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              color: theme.textBright, fontSize: "1.4rem", padding: "0 0.2rem",
              flexShrink: 0,
            }}
            className="hamburger-btn"
            title="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Tab bar */}
        <nav style={{
          display: "flex",
          gap: "0.15rem",
          padding: "0 1.25rem",
          overflowX: "auto",
          scrollbarWidth: "none",
        }} className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                padding: "0.55rem 1.1rem",
                borderRadius: "8px 8px 0 0",
                border: "none",
                background: active === tab.id ? theme.bg : "transparent",
                color: active === tab.id ? tab.color : theme.text,
                fontWeight: active === tab.id ? 700 : 400,
                fontSize: "0.87rem",
                cursor: "pointer",
                borderBottom: active === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span style={{ fontSize: "0.95rem" }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ flex: 1 }}>
        {active === "react"   && <ReactGuide   searchQuery={searchQuery} darkMode={darkMode} />}
        {active === "express" && <ExpressGuide searchQuery={searchQuery} darkMode={darkMode} />}
        {active === "mongo"   && <MongoGuide   searchQuery={searchQuery} darkMode={darkMode} />}
        {active === "node"    && <NodeGuide    searchQuery={searchQuery} darkMode={darkMode} />}
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: theme.footerBg,
        borderTop: `1px solid ${theme.border}`,
        padding: "1.5rem 1.5rem",
        marginTop: "auto",
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>
          <div>
            <div style={{ fontWeight: 700, color: theme.textBright, marginBottom: "0.25rem" }}>
              Interview <span style={{ color: "#6366f1" }}>Guide</span>
            </div>
            <div style={{ fontSize: "0.82rem", color: theme.text }}>
              Covering React, Express, MongoDB & Node.js
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: active === tab.id ? tab.color : theme.text,
                  fontSize: "0.83rem", fontWeight: active === tab.id ? 600 : 400,
                  padding: 0, textDecoration: active === tab.id ? "underline" : "none",
                  textUnderlineOffset: "3px",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: "0.78rem", color: theme.text }}>
            Built with React + Vite
          </div>
        </div>

        {/* Contact / query section */}
        <div style={{
          maxWidth: 900,
          margin: "1.25rem auto 0",
          padding: "1rem 1.25rem",
          background: darkMode ? "#0f172a" : "#fff",
          border: `1px solid ${theme.border}`,
          borderRadius: 10,
        }}>
          <div style={{ fontSize: "0.88rem", fontWeight: 600, color: theme.textBright, marginBottom: "0.35rem" }}>
            📬 Suggest a correction or topic
          </div>
          <p style={{ fontSize: "0.8rem", color: theme.text, marginBottom: "0.75rem", lineHeight: 1.6 }}>
            Found a mistake, outdated info, or want a topic added? Reach out below — all feedback welcome.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Your query or suggestion…"
              style={{
                flex: 1, minWidth: 200,
                padding: "0.5rem 0.75rem",
                background: theme.inputBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 7,
                color: theme.textBright,
                fontSize: "0.83rem",
                outline: "none",
              }}
            />
            <button style={{
              padding: "0.5rem 1.1rem",
              background: "#6366f1",
              border: "none",
              borderRadius: 7,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.83rem",
              cursor: "pointer",
            }}>
              Send
            </button>
          </div>
        </div>
      </footer>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 600px) {
          .hamburger-btn { display: flex !important; }
          .tab-nav { display: none !important; }
        }
        input::placeholder { color: #64748b; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>
    </div>
  );
}
