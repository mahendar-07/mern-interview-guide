import { SearchIcon, MenuIcon, SunIcon, MoonIcon } from "./Icons.jsx";

export default function Header({ darkMode, onToggleDark, theme, searchQuery, onSearchChange, onMenuClick, totalQuestions }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 300,
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      background: theme.headerBg,
      borderBottom: `1px solid ${theme.border}`,
      padding: "0.85rem 1.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      transition: "background-color 0.3s, border-color 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: theme.textDim, display: "flex", alignItems: "center", padding: "0.2rem",
          }}
        >
          <MenuIcon />
        </button>
        <div style={{
          width: 20, height: 20, borderRadius: "50%",
          background: theme.textBright,
        }} />
        <div className="logo-text">
          <h1 style={{
            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.02em",
            color: theme.textBright, textTransform: "uppercase", margin: 0,
          }}>
            Developer Interview Studio
          </h1>
          <p style={{ fontSize: "0.6rem", color: theme.textDim, fontWeight: 500, margin: 0 }}>
            {totalQuestions} questions across the MERN stack
          </p>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", width: 280, maxWidth: "32vw", flexShrink: 1 }} className="logo-text">
        <span style={{ position: "absolute", left: "0.85rem", top: "0.5rem", color: theme.textDim, display: "flex" }}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={`Search syllabus…`}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: "100%",
            background: darkMode ? theme.surface : "#f0f0f2",
            border: `1px solid ${theme.border}`,
            outline: "none",
            borderRadius: 999,
            padding: "0.42rem 0.9rem 0.42rem 2.1rem",
            fontSize: "0.78rem", color: theme.textBright,
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onFocus={e => { e.target.style.background = theme.surface; e.target.style.boxShadow = `0 0 0 3px ${theme.accentTint}`; }}
          onBlur={e => { e.target.style.background = darkMode ? theme.surface : "#f0f0f2"; e.target.style.boxShadow = "none"; }}
        />
      </div>

      <button
        onClick={onToggleDark}
        title="Toggle theme"
        style={{
          background: darkMode ? theme.surface : "#f0f0f2",
          border: `1px solid ${theme.border}`,
          borderRadius: 999,
          padding: "0.42rem",
          cursor: "pointer",
          color: theme.textDim,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
