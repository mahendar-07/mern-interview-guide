import { useState, useCallback } from "react";
import guides from "./guides.js";
import { darkTheme, lightTheme } from "./theme.js";
import { useSearch } from "./hooks/useSearch.js";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SectionView from "./components/SectionView.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Dock from "./components/Dock.jsx";

export default function App() {
  const [activeGuide,   setActiveGuide]   = useState("react");
  const [activeSection, setActiveSection] = useState(0);
  const [darkMode,      setDarkMode]      = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [sidebarOpen,   setSidebarOpen]   = useState(true);  // desktop
  const [drawerOpen,    setDrawerOpen]    = useState(false); // mobile

  const theme = darkMode ? darkTheme : lightTheme;

  const currentGuide    = guides.find(g => g.id === activeGuide);
  const currentSections = currentGuide?.sections ?? [];
  const currentSection  = currentSections[activeSection];

  const searchResults = useSearch(searchQuery);

  const handleGuideChange = useCallback((id) => {
    setActiveGuide(id);
    setActiveSection(0);
    setSearchQuery("");
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(o => !o);
    setDrawerOpen(o => !o);
  };

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: theme.bg,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: theme.text,
      transition: "background-color 0.3s ease, color 0.3s ease",
    }}>
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        theme={theme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={handleMenuClick}
        totalQuestions={guides.reduce((s, g) => s + g.sections.reduce((s2, sec) => s2 + sec.topics.length, 0), 0)}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        <Sidebar
          currentGuide={currentGuide}
          currentSections={currentSections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeGuide={activeGuide}
          onGuideChange={handleGuideChange}
          darkMode={darkMode}
          theme={theme}
          sidebarOpen={sidebarOpen}
          drawerOpen={drawerOpen}
          onDrawerClose={() => setDrawerOpen(false)}
        />

        <main style={{ flex: 1, overflowY: "auto", padding: "2rem 1.75rem 6rem", minWidth: 0 }}>
          {searchQuery ? (
            <SearchResults
              results={searchResults}
              searchQuery={searchQuery}
              darkMode={darkMode}
              theme={theme}
            />
          ) : (
            <SectionView
              section={currentSection}
              sections={currentSections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              darkMode={darkMode}
              theme={theme}
              guide={currentGuide}
            />
          )}
        </main>
      </div>

      <Dock
        activeGuide={activeGuide}
        onGuideChange={handleGuideChange}
        darkMode={darkMode}
        theme={theme}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: ${theme.textDim}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}; border-radius: 9999px; }
        nav::-webkit-scrollbar { display: none; }
        .desktop-sidebar { display: block; }
        .mobile-drawer   { display: none !important; }
        .mobile-overlay  { display: none !important; }
        @media (max-width: 640px) {
          .desktop-sidebar { display: none !important; }
          .mobile-drawer   { display: block !important; }
          .mobile-overlay  { display: block !important; }
          .logo-text { display: none; }
          .hero-text { font-size: 32px !important; }
        }
      `}</style>
    </div>
  );
}
