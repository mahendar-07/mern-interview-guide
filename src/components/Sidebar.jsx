import guides from "../guides.js";

function SidebarContent({ currentGuide, currentSections, activeSection, setActiveSection, activeGuide, onGuideChange, darkMode, theme, onClose }) {
  return (
    <div style={{ padding: "1.25rem 0.85rem" }}>
      <div style={{ padding: "0 0.5rem", marginBottom: "0.6rem" }}>
        <span style={{ fontSize: "0.62rem", fontWeight: 700, color: theme.textDim, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Syllabus chapters
        </span>
      </div>

      {currentSections.map((section, i) => {
        const active = activeSection === i;
        const count = section.topics.length;
        return (
          <button
            key={section.id}
            onClick={() => { setActiveSection(i); onClose?.(); }}
            title={section.label}
            style={{
              width: "100%", textAlign: "left",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.6rem 0.75rem", marginBottom: "0.15rem",
              borderRadius: 12, border: "none",
              background: active ? theme.accent : "transparent",
              color: active ? "#ffffff" : theme.text,
              fontSize: "0.78rem", fontWeight: active ? 700 : 500,
              cursor: "pointer", transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = darkMode ? theme.surface : "#ffffff"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {section.label.replace(/^\d+\s*—\s*/, "")}
            </span>
            <span style={{
              fontSize: "0.62rem", padding: "0.1rem 0.5rem", borderRadius: 999, flexShrink: 0,
              background: active ? "rgba(255,255,255,0.2)" : (darkMode ? theme.bg : "#e8e8ea"),
              color: active ? "#ffffff" : theme.textDim,
            }}>
              {count}
            </span>
          </button>
        );
      })}

      <div style={{
        background: theme.surface, padding: "1rem", borderRadius: 14,
        border: `1px solid ${theme.border}`, marginTop: "1.1rem",
      }}>
        <span style={{ fontSize: "0.62rem", fontWeight: 700, color: theme.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Other stacks
        </span>
        <div style={{ marginTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          {guides.filter(g => g.id !== activeGuide).map(guide => (
            <button
              key={guide.id}
              onClick={() => { onGuideChange(guide.id); onClose?.(); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.55rem",
                width: "100%", textAlign: "left",
                padding: "0.4rem 0.4rem", borderRadius: 8,
                border: "none", background: "transparent", color: theme.text,
                fontSize: "0.79rem", fontWeight: 500, cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = darkMode ? theme.bg : "#f0f0f2"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: theme.textDim }}>{guide.mark}</span> {guide.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ currentGuide, currentSections, activeSection, setActiveSection, activeGuide, onGuideChange, darkMode, theme, sidebarOpen, drawerOpen, onDrawerClose }) {
  return (
    <>
      {drawerOpen && (
        <div
          onClick={onDrawerClose}
          className="mobile-overlay"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 250, display: "none" }}
        />
      )}

      <aside
        className="mobile-drawer"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
          background: theme.sidebarBg,
          borderRight: `1px solid ${theme.border}`,
          overflowY: "auto",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.24s ease",
          zIndex: 260, paddingTop: "5rem", display: "none",
        }}
      >
        <SidebarContent
          currentGuide={currentGuide} currentSections={currentSections}
          activeSection={activeSection} setActiveSection={setActiveSection}
          activeGuide={activeGuide} onGuideChange={onGuideChange}
          darkMode={darkMode} theme={theme} onClose={onDrawerClose}
        />
      </aside>

      <aside
        className="desktop-sidebar"
        style={{
          width: sidebarOpen ? 252 : 0,
          minWidth: sidebarOpen ? 252 : 0,
          background: theme.sidebarBg,
          overflowY: "auto", overflowX: "hidden",
          transition: "width 0.22s ease, min-width 0.22s ease",
          flexShrink: 0,
        }}
      >
        {sidebarOpen && (
          <div style={{ minWidth: 252 }}>
            <SidebarContent
              currentGuide={currentGuide} currentSections={currentSections}
              activeSection={activeSection} setActiveSection={setActiveSection}
              activeGuide={activeGuide} onGuideChange={onGuideChange}
              darkMode={darkMode} theme={theme}
            />
          </div>
        )}
      </aside>
    </>
  );
}
