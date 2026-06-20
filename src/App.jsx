import { useState, useCallback } from "react";
import guides from "./guides.js";
import { darkTheme, lightTheme } from "./theme.js";
import { useSearch } from "./hooks/useSearch.js";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SectionView from "./components/SectionView.jsx";
import SearchResults from "./components/SearchResults.jsx";

export default function App() {
  const [activeGuide,   setActiveGuide]   = useState("react");
  const [activeSection, setActiveSection] = useState(0);
  const [darkMode,      setDarkMode]      = useState(true);
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
    }}>
      <Header
        activeGuide={activeGuide}
        onGuideChange={handleGuideChange}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        theme={theme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={handleMenuClick}
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

        <main style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem", minWidth: 0 }}>
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
            />
          )}
        </main>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: #64748b; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        nav::-webkit-scrollbar { display: none; }
        .desktop-sidebar { display: block; }
        .mobile-drawer   { display: none !important; }
        .mobile-overlay  { display: none !important; }
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
