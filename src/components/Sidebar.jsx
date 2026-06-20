import guides from "../guides.js";

function SidebarContent({ currentGuide, currentSections, activeSection, setActiveSection, activeGuide, onGuideChange, darkMode, theme, onClose }) {
  return (
    <div style={{ padding: "0.75rem" }}>
      {/* Current guide label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{currentGuide?.icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: currentGuide?.color }}>
          {currentGuide?.label}
        </span>
      </div>

      {/* Section list */}
      {currentSections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => { setActiveSection(i); onClose?.(); }}
          title={section.label}
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
        >
          {section.label}
        </button>
      ))}

      {/* Other guides quick-jump */}
      <div style={{ marginTop: "1.1rem", paddingTop: "0.75rem", borderTop: `1px solid ${theme.border}` }}>
        <div style={{
          fontSize: "0.67rem", fontWeight: 700, color: theme.text,
          letterSpacing: "0.08em", padding: "0 0.75rem",
          marginBottom: "0.4rem", textTransform: "uppercase",
        }}>
          Other Guides
        </div>
        {guides.filter(g => g.id !== activeGuide).map(guide => (
          <button
            key={guide.id}
            onClick={() => { onGuideChange(guide.id); onClose?.(); }}
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

export default function Sidebar({ currentGuide, currentSections, activeSection, setActiveSection, activeGuide, onGuideChange, darkMode, theme, sidebarOpen, drawerOpen, onDrawerClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {drawerOpen && (
        <div
          onClick={onDrawerClose}
          className="mobile-overlay"
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 250, display: "none",
          }}
        />
      )}

      {/* Mobile drawer */}
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
          paddingTop: "5rem",
          display: "none",
        }}
      >
        <SidebarContent
          currentGuide={currentGuide}
          currentSections={currentSections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeGuide={activeGuide}
          onGuideChange={onGuideChange}
          darkMode={darkMode}
          theme={theme}
          onClose={onDrawerClose}
        />
      </aside>

      {/* Desktop sidebar */}
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
              onGuideChange={onGuideChange}
              darkMode={darkMode}
              theme={theme}
            />
          </div>
        )}
      </aside>
    </>
  );
}
