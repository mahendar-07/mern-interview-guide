import { sections as reactSections }   from "./data/react.js";
import { sections as expressSections } from "./data/express.js";
import { sections as mongoSections }   from "./data/mongodb.js";
import { sections as nodeSections }    from "./data/nodejs.js";

const guides = [
  { id: "react",   label: "React",   mark: "⚛", sections: reactSections },
  { id: "express", label: "Express", mark: "▹", sections: expressSections },
  { id: "mongo",   label: "MongoDB", mark: "◇", sections: mongoSections },
  { id: "node",    label: "Node.js", mark: "▸", sections: nodeSections },
];

export default guides;
