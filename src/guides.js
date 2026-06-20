import { sections as reactSections }   from "./data/react.js";
import { sections as expressSections } from "./data/express.js";
import { sections as mongoSections }   from "./data/mongodb.js";
import { sections as nodeSections }    from "./data/nodejs.js";

const guides = [
  { id: "react",   label: "React",   icon: "⚛",  color: "#6366f1", sections: reactSections },
  { id: "express", label: "Express", icon: "🚀", color: "#10b981", sections: expressSections },
  { id: "mongo",   label: "MongoDB", icon: "🍃", color: "#16a34a", sections: mongoSections },
  { id: "node",    label: "Node.js", icon: "N",  color: "#f59e0b", sections: nodeSections },
];

export default guides;
