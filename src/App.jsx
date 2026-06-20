import { useState } from "react";
import ReactGuide from "./react-interview-guide.jsx";
import ExpressGuide from "./express-interview-guide.jsx";

export default function App() {
  const [active, setActive] = useState("react");

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      {/* Tab Bar */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        padding: "1rem 1.5rem 0",
        borderBottom: "1px solid #1e293b",
        background: "#0a0f1e",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {[
          { id: "react",   label: "⚛️  React.js",   color: "#6366f1" },
          { id: "express", label: "🚀  Express.js",  color: "#10b981" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "0.55rem 1.4rem",
              borderRadius: "8px 8px 0 0",
              border: "none",
              background: active === tab.id ? "#0f172a" : "transparent",
              color: active === tab.id ? tab.color : "#475569",
              fontWeight: active === tab.id ? 700 : 400,
              fontSize: "0.9rem",
              cursor: "pointer",
              borderBottom: active === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guide Content */}
      <div>
        {active === "react"   && <ReactGuide />}
        {active === "express" && <ExpressGuide />}
      </div>
    </div>
  );
}
