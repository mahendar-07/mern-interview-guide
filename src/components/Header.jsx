import guides from "../guides.js";
import { SunIcon, MoonIcon, SearchIcon, MenuIcon } from "./Icons.jsx";

export default function Header({ activeGuide, onGuideChange, darkMode, onToggleDark, theme, searchQuery, onSearchChange, onMenuClick }) {
  const currentGuide = guides.find(g => g.id === activeGuide);

  const iconBtn = {
    background: theme.toggleBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    padding: "0.4rem 0.5rem",
    cursor: "pointer",
    color: theme.toggleColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  };

  return (
    <header style={{
      background: theme.headerBg,
      borderBottom: `1px solid ${theme.border}`,
      position: "sticky", top: 0, zIndex: 300,
      boxShadow: darkMode ? "0 1px 16px rgba(0,0,0,0.4)" : "0 1px 8px rgba(0,0,0,0.08)",
    }}>
      {/* Top row: menu + logo + search + theme */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 1rem" }}>
        <button onClick={onMenuClick} title="Toggle sidebar" style={iconBtn}>
          <MenuIcon />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #6366f1, #10b981)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.9rem", fontWeight: 800, color: "#fff",
          }}>G</div>
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
            onChange={e => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.42rem 1.8rem 0.42rem 2rem",
              background: theme.inputBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 8, color: theme.textBright,
              fontSize: "0.83rem", outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = currentGuide?.color || "#6366f1"}
            onBlur={e => e.target.style.borderColor = theme.border}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              style={{
                position: "absolute", right: "0.45rem",
                background: "none", border: "none", cursor: "pointer",
                color: theme.text, fontSize: "1rem", lineHeight: 1, padding: 0,
              }}
            >×</button>
          )}
        </div>

        <button onClick={onToggleDark} title="Toggle theme" style={iconBtn}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Guide tabs */}
      <nav style={{ display: "flex", padding: "0 0.75rem", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {guides.map(guide => (
          <button
            key={guide.id}
            onClick={() => onGuideChange(guide.id)}
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
  );
}
