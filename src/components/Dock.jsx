import guides from "../guides.js";

export default function Dock({ activeGuide, onGuideChange, darkMode, theme }) {
  return (
    <div style={{
      position: "fixed", left: "50%", bottom: "1.25rem",
      transform: "translateX(-50%)", zIndex: 400,
      display: "flex", alignItems: "center", gap: "0.3rem",
      padding: "0.45rem", borderRadius: 999,
      background: darkMode ? "rgba(18,18,20,0.55)" : "rgba(255,255,255,0.55)",
      border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"}`,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      boxShadow: darkMode
        ? "0 8px 32px rgba(0,0,0,0.5)"
        : "0 8px 32px rgba(0,0,0,0.12)",
      maxWidth: "calc(100vw - 2rem)",
      overflowX: "auto",
    }}>
      {guides.map(g => {
        const active = activeGuide === g.id;
        return (
          <button
            key={g.id}
            onClick={() => onGuideChange(g.id)}
            title={g.label}
            style={{
              border: "none", cursor: "pointer",
              padding: "0.45rem 0.85rem",
              borderRadius: 999,
              background: active ? theme.accent : "transparent",
              color: active ? "#ffffff" : theme.textDim,
              fontSize: "0.76rem", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "0.4rem",
              transition: "background 0.18s ease, color 0.18s ease, transform 0.18s ease",
              transform: active ? "translateY(-1px)" : "none",
              whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = theme.textBright; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = theme.textDim; }}
          >
            <span style={{ fontSize: "0.85rem" }}>{g.mark}</span>
            {g.label}
          </button>
        );
      })}
    </div>
  );
}
