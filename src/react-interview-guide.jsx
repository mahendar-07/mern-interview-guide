import { useState } from "react";

const sections = [
  {
    id: "foundations",
    label: "01 — Foundations",
    color: "#6366f1",
    topics: [
      {
        title: "What is React?",
        level: "Basic",
        answer:
          "React is an open-source JavaScript library developed by Meta (Facebook) for building fast, interactive user interfaces. It follows a component-based architecture where the UI is broken into small, reusable pieces. React uses a Virtual DOM to efficiently update only the parts of the page that actually change, making it highly performant.",
        tip: "React is a library, not a framework — it handles only the UI layer. You pair it with other tools for routing, state management, etc.",
      },
      {
        title: "Why was React created?",
        level: "Basic",
        answer:
          "Before React, large-scale UIs were difficult to manage — every data change required manually updating the DOM, which was error-prone and slow. React was created to solve this by making the UI a function of state: when data changes, the UI automatically updates in the most efficient way possible.",
        tip: null,
      },
      {
        title: "What are the core features of React?",
        level: "Basic",
        answer:
          "Component-based architecture, Virtual DOM, JSX syntax, one-way data flow, declarative UI, reusable components, and a rich ecosystem. React's declarative style means you describe what the UI should look like for a given state — React handles the how.",
        tip: null,
      },
      {
        title: "What is JSX?",
        level: "Basic",
        code: `// JSX — looks like HTML, compiles to JavaScript
const element = <h1>Hello, World!</h1>;

// Babel compiles the above to:
const element = React.createElement("h1", null, "Hello, World!");`,
        answer:
          "JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JS files. It is not valid JavaScript — a transpiler like Babel converts it into React.createElement() calls that browsers can understand. JSX makes component code easier to read and write.",
        tip: "JSX uses className instead of class, and htmlFor instead of for — because class and for are reserved JavaScript keywords.",
      },
      {
        title: "What is the Virtual DOM?",
        level: "Basic",
        answer:
          "The Virtual DOM is a lightweight, in-memory JavaScript representation of the actual browser DOM. When state or props change, React creates a new Virtual DOM tree, compares it to the previous one (a process called diffing), identifies the minimal set of changes, and applies only those changes to the real DOM. This is far more efficient than re-rendering the entire page.",
        tip: "The process of comparing old vs new Virtual DOM is called Reconciliation.",
      },
      {
        title: "Real DOM vs Virtual DOM",
        level: "Basic",
        table: {
          headers: ["Real DOM", "Virtual DOM"],
          rows: [
            ["Actual browser structure", "In-memory JS representation"],
            ["Updates the entire tree", "Updates only changed nodes"],
            ["Slow for frequent updates", "Fast — batches and minimizes changes"],
            ["Managed by the browser", "Managed by React"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is Reconciliation?",
        level: "Basic",
        answer:
          "Reconciliation is React's algorithm for comparing the previous Virtual DOM with the newly generated one. React uses a diffing strategy — it assumes elements of different types produce different trees, and elements of the same type can be reused. Keys help React efficiently reconcile list items.",
        tip: null,
      },
      {
        title: "What is Declarative vs Imperative Programming?",
        level: "Basic",
        code: `// Imperative — describe HOW to do it (vanilla JS)
const el = document.getElementById("btn");
el.textContent = "Clicked";
el.style.color = "red";

// Declarative — describe WHAT it should look like (React)
return <button style={{ color: clicked ? "red" : "black" }}>
  {clicked ? "Clicked" : "Click Me"}
</button>;`,
        answer:
          "React is declarative: you describe what the UI should look like for a given state, and React figures out how to update the DOM. Imperative programming requires manually specifying every step to manipulate the DOM. Declarative code is easier to reason about and less error-prone.",
        tip: null,
      },
      {
        title: "What is a Single Page Application (SPA)?",
        level: "Basic",
        answer:
          "A Single Page Application loads one HTML document and dynamically renders content in response to user actions — without full page reloads. Navigation between 'pages' is handled in JavaScript by swapping components. React is the most popular library for building SPAs.",
        tip: null,
      },
      {
        title: "What is ReactDOM?",
        level: "Basic",
        code: `import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);`,
        answer:
          "ReactDOM is a separate package that acts as the bridge between React's component model and the browser's actual DOM. It provides the render method that mounts your root React component into a DOM element (typically a <div id='root'> in index.html).",
        tip: null,
      },
    ],
  },
  {
    id: "components",
    label: "02 — Components",
    color: "#8b5cf6",
    topics: [
      {
        title: "What is a Component?",
        level: "Basic",
        answer:
          "A component is an independent, reusable unit of UI. It encapsulates its own structure (JSX), logic (JS), and optionally its own styling. Components can be composed together — like LEGO bricks — to build complex UIs from simple, testable pieces.",
        tip: "Think of components as custom HTML elements you define yourself.",
      },
      {
        title: "Functional vs Class Components",
        level: "Basic",
        code: `// Functional Component (modern, preferred)
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

// Class Component (legacy)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
        table: {
          headers: ["Functional Component", "Class Component"],
          rows: [
            ["Plain JavaScript function", "ES6 class extending React.Component"],
            ["Uses Hooks for state & lifecycle", "Uses lifecycle methods"],
            ["Less boilerplate, cleaner syntax", "More boilerplate"],
            ["Modern — strongly preferred", "Legacy — still works, rarely written"],
          ],
        },
        answer: null,
        tip: "All new React code should use Functional Components with Hooks.",
      },
      {
        title: "What is a Controlled Component?",
        level: "Intermediate",
        code: `function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}`,
        answer:
          "A controlled component is a form element whose value is fully managed by React state. The input's displayed value always reflects the state, and every keystroke updates the state via onChange. This gives React full control over the form data, making validation and submission straightforward.",
        tip: null,
      },
      {
        title: "What is an Uncontrolled Component?",
        level: "Intermediate",
        code: `function FileUpload() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}`,
        answer:
          "An uncontrolled component stores its own value internally in the DOM rather than in React state. You access the value via a ref. This is simpler for some cases (like file inputs) but gives React less control.",
        tip: null,
      },
      {
        title: "What is Conditional Rendering?",
        level: "Basic",
        code: `// Ternary — most common
{isLoggedIn ? <Dashboard /> : <Login />}

// Short-circuit — renders nothing when false
{hasError && <ErrorBanner />}

// Early return
if (loading) return <Spinner />;
return <Content />;`,
        answer:
          "Conditional rendering means displaying different UI based on some condition. React supports all standard JavaScript conditionals — ternary operators, logical &&, and early returns — inside JSX or component bodies.",
        tip: null,
      },
      {
        title: "What are Keys in List Rendering?",
        level: "Basic",
        code: `// Correct — unique, stable ID
users.map(user => (
  <li key={user.id}>{user.name}</li>
));

// Avoid — index as key causes bugs on reorder/delete
users.map((user, index) => (
  <li key={index}>{user.name}</li>
));`,
        answer:
          "Keys are unique identifiers you provide when rendering lists. React uses them to match elements between renders so it knows which items changed, were added, or were removed — making list updates efficient. Keys must be unique among siblings and should come from your data (e.g., database IDs), not array indices.",
        tip: "Using array index as a key causes bugs when items are reordered or deleted.",
      },
      {
        title: "What is a React Fragment?",
        level: "Basic",
        code: `// Shorthand syntax
function Card() {
  return (
    <>
      <h2>Title</h2>
      <p>Description</p>
    </>
  );
}`,
        answer:
          "A React Fragment lets you group multiple elements without adding an extra DOM node. Components must return a single root element — Fragment satisfies this without introducing a meaningless <div> wrapper that could break styling.",
        tip: null,
      },
    ],
  },
  {
    id: "props-state",
    label: "03 — Props & State",
    color: "#a855f7",
    topics: [
      {
        title: "What are Props?",
        level: "Basic",
        code: `// Parent passes data
<UserCard name="Mahendar" role="Developer" />

// Child receives and uses it
function UserCard({ name, role }) {
  return <p>{name} — {role}</p>;
}`,
        answer:
          "Props (short for properties) are the mechanism for passing data from a parent component to a child. They are read-only — a child component receives props but must never mutate them. This enforces unidirectional data flow, making the application easier to reason about.",
        tip: "If you need a child to 'change' something in the parent, pass a callback function as a prop.",
      },
      {
        title: "What is State?",
        level: "Basic",
        code: `const [count, setCount] = useState(0);

// Correct update
setCount(count + 1);

// Never do this — React won't detect the change
count = count + 1;`,
        answer:
          "State is data that belongs to a component and can change over time. When state is updated using its setter function, React schedules a re-render and updates the UI to reflect the new value. Unlike props, state is internal and fully managed by the component that owns it.",
        tip: "Never mutate state directly. Always use the setter function returned by useState.",
      },
      {
        title: "Props vs State",
        level: "Basic",
        table: {
          headers: ["Props", "State"],
          rows: [
            ["Passed in from a parent component", "Managed inside the component itself"],
            ["Read-only — immutable", "Can be updated with the setter function"],
            ["Used to configure a component", "Used for data that changes over time"],
            ["External to the component", "Internal and private"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is Prop Drilling?",
        level: "Intermediate",
        answer:
          "Prop drilling is when data must be passed through several intermediate components just to reach a deeply nested child — even though the intermediate components don't actually use that data. It makes code harder to maintain and refactor. The solution is Context API or a global state library like Redux.",
        tip: null,
      },
      {
        title: "What triggers a component re-render?",
        level: "Basic",
        answer:
          "A component re-renders when: (1) its own state changes, (2) its props change, (3) a Context value it subscribes to changes, or (4) its parent component re-renders. Changing a regular variable (not state) does not trigger a re-render.",
        tip: null,
      },
      {
        title: "What is Event Handling in React?",
        level: "Basic",
        code: `// Events are camelCase; handlers are functions, not strings
<button onClick={handleClick}>Click Me</button>

// Pass arguments with an arrow function
<button onClick={() => deleteUser(user.id)}>Delete</button>`,
        answer:
          "React wraps native browser events in a SyntheticEvent — a cross-browser wrapper with the same interface as native events. Event names are camelCase (onClick, onChange, onSubmit). You pass function references, not strings, as handlers.",
        tip: null,
      },
    ],
  },
  {
    id: "hooks",
    label: "04 — Hooks",
    color: "#c026d3",
    topics: [
      {
        title: "What are Hooks?",
        level: "Basic",
        answer:
          "Hooks are special functions — introduced in React 16.8 — that let functional components 'hook into' React features like state and lifecycle behavior. Before Hooks, these features were only available in class components. Hooks eliminated the need for class components and made logic more reusable.",
        tip: "Hooks must be called at the top level of a component — never inside loops, conditionals, or nested functions.",
      },
      {
        title: "useState — State Management",
        level: "Basic",
        code: `const [count, setCount] = useState(0);

// Functional update — safe for batched updates
setCount(prev => prev + 1);

// Storing an object
const [user, setUser] = useState({ name: "", age: 0 });

// Update one field — spread to preserve the rest
setUser(prev => ({ ...prev, name: "Mahendar" }));`,
        answer:
          "useState returns a pair: the current state value and a setter function. Calling the setter triggers a re-render with the new value. For updates that depend on the previous state (e.g., counters), use the functional form — setCount(prev => prev + 1) — to avoid stale closure bugs.",
        tip: null,
      },
      {
        title: "useEffect — Side Effects",
        level: "Basic",
        code: `// Runs once on mount (empty dependency array)
useEffect(() => {
  fetchUsers();
}, []);

// Runs when 'id' changes
useEffect(() => {
  fetchUserById(id);
}, [id]);

// Cleanup — runs on unmount
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // cleanup
}, []);`,
        answer:
          "useEffect lets you perform side effects — operations that interact with the world outside the component, like API calls, timers, and DOM manipulation. It runs after the render. The dependency array controls when it re-runs. Returning a cleanup function prevents memory leaks when the component unmounts.",
        tip: "Missing a dependency in the array is one of the most common React bugs. Use ESLint's react-hooks/exhaustive-deps rule to catch this.",
      },
      {
        title: "useRef — Mutable References",
        level: "Intermediate",
        code: `// 1. Access a DOM element directly
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // direct DOM access

// 2. Store a value without triggering re-render
const timerRef = useRef(null);
timerRef.current = setInterval(tick, 1000);`,
        answer:
          "useRef returns a mutable object with a .current property that persists across renders. Unlike state, updating a ref does not trigger a re-render. It's used for two main purposes: accessing DOM elements directly and storing mutable values (like timer IDs or previous state) that shouldn't cause re-renders when changed.",
        tip: null,
      },
      {
        title: "useMemo — Memoize Computed Values",
        level: "Intermediate",
        code: `// Recalculates only when 'items' changes
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);`,
        answer:
          "useMemo caches the result of an expensive computation and only recomputes it when its dependencies change. It prevents unnecessary re-calculations on every render. Use it for genuinely expensive operations — not simple ones, as the memoization overhead itself has a cost.",
        tip: null,
      },
      {
        title: "useCallback — Memoize Functions",
        level: "Intermediate",
        code: `// Same function reference preserved unless deps change
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // pass to React.memo'd child without triggering re-render`,
        answer:
          "useCallback returns a memoized version of a function that only changes if its dependencies change. It's primarily useful when passing callbacks to child components wrapped in React.memo — without it, a new function reference is created on every parent render, causing the child to re-render unnecessarily.",
        tip: null,
      },
      {
        title: "useMemo vs useCallback",
        level: "Intermediate",
        table: {
          headers: ["useMemo", "useCallback"],
          rows: [
            ["Memoizes a computed value", "Memoizes a function reference"],
            ["Returns the result of the function", "Returns the function itself"],
            ["Use for expensive calculations", "Use for callbacks passed to children"],
          ],
        },
        answer: null,
        tip: "One-liner: useMemo caches what a function returns. useCallback caches the function itself.",
      },
      {
        title: "What is a Custom Hook?",
        level: "Intermediate",
        code: `// Custom hook — must start with "use"
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch("/api/users");`,
        answer:
          "A Custom Hook is a regular JavaScript function whose name starts with 'use' and that calls other Hooks internally. They are used to extract and share stateful logic across components — without creating extra components or changing component hierarchy. Common examples: useFetch, useAuth, useDebounce, useLocalStorage.",
        tip: null,
      },
    ],
  },
  {
    id: "context-routing",
    label: "05 — Context & Routing",
    color: "#e11d48",
    topics: [
      {
        title: "What is the Context API?",
        level: "Intermediate",
        code: `// 1. Create context
const ThemeContext = createContext("light");

// 2. Provide it
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 3. Consume anywhere in the tree
function Navbar() {
  const theme = useContext(ThemeContext);
  return <nav className={theme}>...</nav>;
}`,
        answer:
          "Context API is React's built-in solution for sharing data across the component tree without manually passing props at every level. It eliminates prop drilling for globally needed values like the current user, theme, or locale. Create a context, wrap your tree in a Provider, and consume it with useContext.",
        tip: "Avoid putting frequently changing data in Context — every consumer re-renders when the context value changes.",
      },
      {
        title: "Context API vs Redux",
        level: "Intermediate",
        table: {
          headers: ["Context API", "Redux Toolkit"],
          rows: [
            ["Built into React — no installation", "External library (npm install)"],
            ["Simple setup, minimal boilerplate", "More structured, more setup"],
            ["Good for low-frequency updates", "Optimized for complex, frequent updates"],
            ["Best for small-to-medium apps", "Best for large, complex applications"],
            ["No built-in DevTools", "Excellent Redux DevTools support"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "React Component Lifecycle",
        level: "Intermediate",
        table: {
          headers: ["Phase", "Description", "useEffect equivalent"],
          rows: [
            ["Mounting", "Component is created and added to the DOM", "useEffect(() => {}, [])"],
            ["Updating", "State or props change, component re-renders", "useEffect(() => {}, [dep])"],
            ["Unmounting", "Component is removed from the DOM", "useEffect(() => { return () => {} }, [])"],
          ],
        },
        answer:
          "Every React component goes through three lifecycle phases: Mounting (created and inserted into the DOM), Updating (re-rendered due to state/prop changes), and Unmounting (removed from the DOM). In functional components, useEffect handles all three phases depending on how the dependency array is configured.",
        tip: null,
      },
      {
        title: "React Router — Core Concepts",
        level: "Intermediate",
        code: `<BrowserRouter>
  <Routes>
    <Route path="/"        element={<Home />} />
    <Route path="/about"   element={<About />} />
    <Route path="/user/:id" element={<UserProfile />} />
  </Routes>
</BrowserRouter>`,
        answer:
          "React Router is a library for client-side routing in SPAs. BrowserRouter uses the browser's History API to keep the URL in sync with the component displayed — without a full page reload. Routes contains your Route definitions. Each Route maps a URL path to a component.",
        tip: "Use <Link> for navigation in JSX, useNavigate for programmatic navigation in functions.",
      },
      {
        title: "useNavigate and useParams",
        level: "Intermediate",
        code: `// useNavigate — programmatic navigation
const navigate = useNavigate();
navigate("/dashboard");     // go forward
navigate(-1);               // go back

// useParams — read dynamic URL segments
// Route: /product/:id
const { id } = useParams(); // id = "101" for /product/101`,
        answer:
          "useNavigate is a Hook for navigating programmatically — useful after form submission or login. useParams reads dynamic segments from the URL (e.g., :id in /product/:id) so you can fetch the right resource.",
        tip: null,
      },
      {
        title: "What is a Protected Route?",
        level: "Intermediate",
        code: `function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />`,
        answer:
          "A Protected Route is a pattern that checks for authentication before rendering a component. If the user is not authenticated, they are redirected to the login page. This prevents unauthorized access to pages like dashboards, profiles, and settings.",
        tip: "Always verify authentication on the backend too — frontend protection alone is not secure.",
      },
    ],
  },
  {
    id: "performance",
    label: "06 — Performance",
    color: "#059669",
    topics: [
      {
        title: "What is React.memo?",
        level: "Intermediate",
        code: `// Without React.memo — re-renders every time parent renders
function UserCard({ name }) {
  return <div>{name}</div>;
}

// With React.memo — skips re-render if props haven't changed
export default React.memo(UserCard);`,
        answer:
          "React.memo is a higher-order component that wraps a functional component and memoizes it. If the component's props have not changed since the last render, React skips re-rendering it entirely. It's useful for child components that receive the same props frequently but are expensive to render.",
        tip: "React.memo does a shallow comparison of props. For objects/arrays, consider passing primitive values or using useMemo on the parent side.",
      },
      {
        title: "What is Debouncing?",
        level: "Intermediate",
        code: `// Without debounce: API called on every keystroke (bad)
// h → he → hel → hell → hello = 5 calls

// With debounce: waits until user stops typing
function SearchBar() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) fetchResults(query); // fires after 400ms of inactivity
    }, 400);
    return () => clearTimeout(timer); // cancel if user keeps typing
  }, [query]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`,
        answer:
          "Debouncing delays the execution of a function until the user has stopped performing a repetitive action for a set duration. It's critical for search inputs — without it, an API request fires on every keystroke, hammering the server and causing flickering results.",
        tip: null,
      },
      {
        title: "Lazy Loading with React.lazy and Suspense",
        level: "Intermediate",
        code: `// Without lazy loading — ALL components bundled and loaded upfront
import Dashboard from "./Dashboard";

// With lazy loading — Dashboard loaded only when navigated to
const Dashboard = React.lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}`,
        answer:
          "Lazy loading defers loading a component's code until it is actually needed. React.lazy() takes a dynamic import and returns a component. Suspense displays a fallback UI while the lazy component's code is being fetched. This reduces the initial bundle size and speeds up the first page load.",
        tip: null,
      },
      {
        title: "Handling Large Lists",
        level: "Intermediate",
        answer:
          "Rendering thousands of DOM nodes at once causes layout thrashing and slow paints. The three main approaches: Pagination (show N items per page), Infinite Scroll (load more as user scrolls), and Virtualization (render only the items currently visible in the viewport). Libraries like react-window or TanStack Virtual implement virtualization.",
        tip: null,
      },
      {
        title: "Performance Optimization — Summary",
        level: "Intermediate",
        table: {
          headers: ["Technique", "Solves"],
          rows: [
            ["React.memo", "Prevents child component re-renders when props are unchanged"],
            ["useMemo", "Prevents expensive recalculations on every render"],
            ["useCallback", "Prevents new function references from triggering child re-renders"],
            ["React.lazy + Suspense", "Reduces initial bundle size via code splitting"],
            ["Debouncing", "Reduces API calls from rapid user input"],
            ["Pagination / Virtualization", "Handles large data lists without DOM overload"],
            ["Keys in lists", "Enables efficient list reconciliation"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "auth-redux",
    label: "07 — Auth & Redux",
    color: "#d97706",
    topics: [
      {
        title: "Authentication vs Authorization",
        level: "Intermediate",
        table: {
          headers: ["Authentication", "Authorization"],
          rows: [
            ["Verifies WHO you are", "Verifies WHAT you can do"],
            ["Login — email + password check", "Access control — admin vs user"],
            ['"Are you really Mahendar?"', '"Can Mahendar delete users?"'],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is JWT?",
        level: "Intermediate",
        code: `// A JWT looks like: header.payload.signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEwMX0.abc123

// 1. Login — server returns a JWT
const { token } = await loginUser(email, password);
localStorage.setItem("token", token);

// 2. Authenticated request — send token in header
fetch("/api/profile", {
  headers: { Authorization: \`Bearer \${token}\` }
});`,
        answer:
          "JWT (JSON Web Token) is a compact, digitally signed token used for stateless authentication. It has three parts separated by dots: Header (algorithm used), Payload (user data / claims), and Signature (verifies the token hasn't been tampered with). The server never stores sessions — it simply verifies the signature on each request.",
        tip: "JWT payload is Base64-encoded, not encrypted. Never store passwords or sensitive secrets in the payload.",
      },
      {
        title: "localStorage vs sessionStorage vs Cookies",
        level: "Intermediate",
        table: {
          headers: ["Storage", "Persists", "Accessible via JS", "Recommended for JWT?"],
          rows: [
            ["localStorage", "Until manually cleared", "Yes (XSS risk)", "Acceptable for low-risk apps"],
            ["sessionStorage", "Until tab is closed", "Yes (XSS risk)", "Not ideal"],
            ["HTTP-only Cookie", "Configurable (expiry)", "No (XSS-safe)", "Best practice"],
          ],
        },
        answer: null,
        tip: "HTTP-only cookies can't be read by JavaScript, making them immune to XSS attacks — the recommended approach for production apps.",
      },
      {
        title: "What is Redux?",
        level: "Intermediate",
        answer:
          "Redux is a predictable state management library. It stores the entire application state in a single centralized object called the Store. Components read from the store using selectors and update it by dispatching actions — which are processed by reducer functions that return new state. This makes state changes traceable and debuggable.",
        tip: null,
      },
      {
        title: "Redux Toolkit — Core Concepts",
        level: "Intermediate",
        code: `// 1. Create a slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;

// 2. Configure the store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// 3. Use in a component
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(increment());`,
        answer:
          "Redux Toolkit (RTK) is the official, recommended way to write Redux. It dramatically reduces boilerplate: createSlice auto-generates action creators and reducers together, configureStore sets up the store with sensible defaults (DevTools, middleware), and useSelector / useDispatch connect components to the store.",
        tip: null,
      },
      {
        title: "Redux Flow — Step by Step",
        level: "Intermediate",
        answer:
          "1. A user action in a component calls dispatch(someAction()). 2. The action travels to the reducer. 3. The reducer processes the action and returns new state (never mutates the old state). 4. The store updates. 5. All components using useSelector that depend on the changed state re-render.",
        tip: null,
      },
    ],
  },
  {
    id: "advanced",
    label: "08 — Advanced Concepts",
    color: "#0284c7",
    topics: [
      {
        title: "Higher Order Component (HOC)",
        level: "Advanced",
        code: `// HOC — a function that takes a component and returns an enhanced component
function withAuth(Component) {
  return function AuthGuard(props) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);`,
        answer:
          "A Higher Order Component is a function that accepts a component and returns a new component with additional behavior. HOCs implement the Decorator pattern for components. Common uses: authentication guards, analytics tracking, error handling wrappers. Custom Hooks are the modern alternative for sharing stateful logic.",
        tip: null,
      },
      {
        title: "What is an Error Boundary?",
        level: "Advanced",
        code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ChildComponent />
</ErrorBoundary>`,
        answer:
          "An Error Boundary is a class component that catches JavaScript errors anywhere in its child component tree during rendering, in lifecycle methods, or in constructors. Instead of crashing the entire app, it displays a fallback UI. Errors in event handlers, async code, and server-side rendering are NOT caught by Error Boundaries.",
        tip: "Error Boundaries must still be class components — there is no Hook equivalent yet.",
      },
      {
        title: "What is React.lazy and Code Splitting?",
        level: "Advanced",
        answer:
          "By default, a React app bundles all component code into one large file. Code splitting divides this into smaller chunks that are loaded on demand. React.lazy() enables component-level code splitting via dynamic import(). This is especially valuable for large apps where users may never visit certain routes — no need to download code they'll never use.",
        tip: null,
      },
      {
        title: "API Fetching — Full Pattern",
        level: "Intermediate",
        code: `function Users() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", {
          signal: controller.signal
        });
        if (!res.ok) throw new Error("Request failed");
        setUsers(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort(); // cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return users.map(u => <p key={u.id}>{u.name}</p>);
}`,
        answer:
          "The complete API fetching pattern in React uses useEffect for the trigger, async/await for readability, try/catch/finally for error handling and loading state cleanup, and an AbortController to cancel in-flight requests when the component unmounts — preventing state updates on unmounted components.",
        tip: null,
      },
      {
        title: "Fetch vs Axios",
        level: "Intermediate",
        table: {
          headers: ["Fetch", "Axios"],
          rows: [
            ["Built into the browser — no install", "External package — npm install axios"],
            ["Must manually call .json()", "Automatically parses JSON"],
            ["Must manually check res.ok for errors", "Throws on 4xx/5xx automatically"],
            ["No request cancellation built-in", "Supports cancel tokens"],
            ["No request/response interceptors", "Interceptors for auth headers etc."],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "mern",
    label: "09 — MERN Integration",
    color: "#16a34a",
    topics: [
      {
        title: "MERN Stack Architecture",
        level: "Intermediate",
        answer:
          "MERN is a full-stack JavaScript stack: MongoDB (document database), Express.js (Node.js web framework), React (frontend UI library), Node.js (JavaScript runtime). Every layer uses JavaScript, enabling code reuse and a unified team skill set. React sends HTTP requests to the Express API, which reads/writes to MongoDB and returns JSON responses.",
        tip: null,
      },
      {
        title: "What is CORS and how do you fix it?",
        level: "Intermediate",
        code: `// Express backend — enable CORS
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // allow your React dev server
  credentials: true
}));`,
        answer:
          "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests between different origins (domain, port, or protocol). When your React app on port 3000 calls an Express API on port 5000, the browser blocks it unless the server explicitly permits it with the right response headers. Enable the cors middleware on the backend to allow it.",
        tip: null,
      },
      {
        title: "CRUD Operations with HTTP Methods",
        level: "Intermediate",
        table: {
          headers: ["Operation", "HTTP Method", "Example endpoint"],
          rows: [
            ["Create", "POST", "POST /api/users"],
            ["Read", "GET", "GET /api/users or GET /api/users/:id"],
            ["Update", "PUT / PATCH", "PUT /api/users/:id"],
            ["Delete", "DELETE", "DELETE /api/users/:id"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is Mongoose?",
        level: "Intermediate",
        code: `const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

// Save a new user
const user = new User({ name: "Mahendar", email: "m@example.com" });
await user.save();`,
        answer:
          "Mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js. It provides a schema-based approach to model your data, built-in validation, query building, and middleware (hooks). A Schema defines the shape of documents; a Model provides the methods to interact with the collection.",
        tip: null,
      },
      {
        title: "Complete MERN Auth Flow",
        level: "Intermediate",
        answer:
          "1. User submits login form in React. 2. React sends POST /api/auth/login with credentials. 3. Express validates email/password against MongoDB. 4. If valid, server generates a JWT signed with a secret key. 5. JWT sent back in the response. 6. React stores the token (localStorage or HTTP-only cookie). 7. Future requests include the token in the Authorization header. 8. Express middleware verifies the token before allowing access to protected routes.",
        tip: null,
      },
    ],
  },
  {
    id: "scenarios",
    label: "10 — Interview Scenarios",
    color: "#64748b",
    topics: [
      {
        title: "Why is my API being called repeatedly?",
        level: "Scenario",
        code: `// Problem — no dependency array: runs after every render
useEffect(() => { fetchUsers(); });

// Problem — state updated inside causes infinite loop
useEffect(() => {
  fetchUsers().then(data => setUsers(data));
}); // no [] — sets state → re-renders → fires again

// Fix
useEffect(() => { fetchUsers(); }, []); // runs once on mount`,
        answer:
          "The most common cause is a missing or incorrect dependency array in useEffect. If the effect sets state and no dependency array is provided, it creates an infinite loop. React Strict Mode in development also intentionally double-invokes effects — this is expected behavior in development only.",
        tip: null,
      },
      {
        title: "Child component re-renders even when data hasn't changed",
        level: "Scenario",
        answer:
          "Wrap the child in React.memo. If you pass callback functions as props, also wrap them in useCallback on the parent — otherwise a new function reference is created each render, and React.memo's shallow comparison sees it as a changed prop. If you pass computed objects/arrays, memoize those with useMemo.",
        tip: null,
      },
      {
        title: "How do you persist login after page refresh?",
        level: "Scenario",
        answer:
          "Store the JWT in localStorage or an HTTP-only cookie. On application startup, read the token and validate it (either by decoding to check expiry or by making a /api/auth/me request). If valid, restore the authenticated state before rendering protected routes. Without this, every page refresh logs the user out.",
        tip: null,
      },
      {
        title: "Search input hammers the API on every keystroke",
        level: "Scenario",
        answer:
          "Implement debouncing. Delay the API call until the user pauses typing (typically 300–500ms). Use useEffect with a setTimeout and clearTimeout cleanup: each keystroke cancels the previous timer and starts a new one. Only when the user stops typing does the timer expire and the API call fire.",
        tip: null,
      },
      {
        title: "How do you share user data across Navbar, Profile, and Settings?",
        level: "Scenario",
        answer:
          "For a small or medium app, use Context API — create a UserContext, provide it at the top of your app, and consume it with useContext wherever needed. For a large app with complex user-related state (roles, permissions, preferences), use Redux Toolkit which provides better DevTools, performance, and maintainability at scale.",
        tip: null,
      },
      {
        title: "Page load is slow — how do you optimize it?",
        level: "Scenario",
        answer:
          "Audit the bundle size — large bundles are the most common culprit. Apply code splitting with React.lazy and Suspense so routes load on demand. Remove unused dependencies. Optimize images. Use pagination or virtualization for large lists. Add loading states so users see feedback immediately. Profile renders with React DevTools Profiler to find expensive components.",
        tip: null,
      },
      {
        title: "A child component crashes — how do you prevent the whole app from breaking?",
        level: "Scenario",
        answer:
          "Wrap the risky component in an Error Boundary class component. When the child throws during rendering, the Error Boundary catches it, logs the error, and renders a fallback UI. The rest of the app continues working normally. Error Boundaries don't catch errors in event handlers or async code — those must use try/catch.",
        tip: null,
      },
    ],
  },
];

const levelColors = {
  Basic:        { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#dbeafe", text: "#1e40af" },
  Advanced:     { bg: "#fce7f3", text: "#9d174d" },
  Scenario:     { bg: "#fef3c7", text: "#92400e" },
};

export default function ReactInterviewGuide({ searchQuery: searchQueryProp = "", darkMode = true }) {
  const [activeSection, setActiveSection] = useState(0);
  const [openTopics, setOpenTopics] = useState({});
  const searchQuery = searchQueryProp;

  const toggleTopic = (sectionId, topicIndex) => {
    const key = `${sectionId}-${topicIndex}`;
    setOpenTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = sections.map(section => ({
    ...section,
    topics: section.topics.filter(topic =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (topic.answer && topic.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(s => s.topics.length > 0);

  const displaySections = searchQuery ? filteredSections : sections;
  const currentSection = searchQuery ? null : sections[activeSection];

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: darkMode ? "#0f172a" : "#f8fafc",
      minHeight: "100vh",
      color: darkMode ? "#e2e8f0" : "#1e293b",
      display: "flex",
      flexDirection: "column",
    }}>

      <div style={{ display: "flex", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "1.5rem" }}>
        {/* Sidebar */}
        {!searchQuery && (
          <nav style={{
            width: 210,
            flexShrink: 0,
            marginRight: "1.5rem",
          }}>
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.6rem 0.9rem",
                  marginBottom: "0.3rem",
                  borderRadius: 8,
                  border: "none",
                  background: activeSection === i ? section.color + "22" : "transparent",
                  borderLeft: activeSection === i ? `3px solid ${section.color}` : "3px solid transparent",
                  color: activeSection === i ? "#f1f5f9" : "#64748b",
                  fontSize: "0.82rem",
                  fontWeight: activeSection === i ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  lineHeight: 1.4,
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        )}

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {searchQuery ? (
            displaySections.map(section => (
              <div key={section.id} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: section.color, marginBottom: "0.75rem" }}>
                  {section.label}
                </h2>
                <TopicList
                  topics={section.topics}
                  sectionId={section.id}
                  sectionColor={section.color}
                  openTopics={openTopics}
                  toggleTopic={toggleTopic}
                  darkMode={darkMode}/>
              </div>
            ))
          ) : currentSection ? (
            <div>
              <h2 style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: currentSection.color,
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${currentSection.color}33`,
              }}>
                {currentSection.label}
              </h2>
              <TopicList
                topics={currentSection.topics}
                sectionId={currentSection.id}
                sectionColor={currentSection.color}
                openTopics={openTopics}
                toggleTopic={toggleTopic}
                darkMode={darkMode}/>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function TopicList({ topics, sectionId, sectionColor, openTopics, toggleTopic, darkMode = true }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {topics.map((topic, i) => {
        const key = `${sectionId}-${i}`;
        const isOpen = openTopics[key];
        const lc = levelColors[topic.level] || levelColors.Basic;

        return (
          <div key={i} style={{
            background: darkMode ? "#1e293b" : "#f1f5f9",
            borderRadius: 10,
            border: `1px solid ${isOpen ? sectionColor + "55" : "#334155"}`,
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}>
            <button
              onClick={() => toggleTopic(sectionId, i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1.1rem",
                background: "transparent",
                border: "none",
                color: darkMode ? "#f1f5f9" : "#0f172a",
                cursor: "pointer",
                textAlign: "left",
                gap: "1rem",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.92rem", flex: 1 }}>
                {topic.title}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                <span style={{
                  background: lc.bg,
                  color: lc.text,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.55rem",
                  borderRadius: 99,
                  letterSpacing: "0.05em",
                }}>
                  {topic.level}
                </span>
                <span style={{ color: darkMode ? "#64748b" : "#64748b", fontSize: "1rem", lineHeight: 1 }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: "0 1.1rem 1.1rem", borderTop: "1px solid #334155" }}>
                {topic.answer && (
                  <p style={{
                    margin: "0.9rem 0 0",
                    color: "#cbd5e1",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                  }}>
                    {topic.answer}
                  </p>
                )}

                {topic.code && (
                  <pre style={{
                    background: darkMode ? "#0f172a" : "#ffffff",
                    border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "0.9rem 1rem",
                    fontSize: "0.78rem",
                    lineHeight: 1.65,
                    overflowX: "auto",
                    color: "#93c5fd",
                    marginTop: "0.9rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}>
                    <code>{topic.code}</code>
                  </pre>
                )}

                {topic.table && (
                  <div style={{ overflowX: "auto", marginTop: "0.9rem" }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "0.82rem",
                    }}>
                      <thead>
                        <tr>
                          {topic.table.headers.map((h, hi) => (
                            <th key={hi} style={{
                              background: darkMode ? "#0f172a" : "#ffffff",
                              color: darkMode ? "#94a3b8" : "#475569",
                              padding: "0.55rem 0.85rem",
                              textAlign: "left",
                              fontWeight: 600,
                              fontSize: "0.78rem",
                              letterSpacing: "0.05em",
                              borderBottom: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {topic.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderBottom: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0" }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{
                                padding: "0.55rem 0.85rem",
                                color: ci === 0 ? "#e2e8f0" : "#94a3b8",
                                verticalAlign: "top",
                              }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {topic.tip && (
                  <div style={{
                    marginTop: "0.9rem",
                    padding: "0.65rem 0.9rem",
                    background: darkMode ? "#0f172a" : "#ffffff",
                    border: `1px solid ${sectionColor}44`,
                    borderLeft: `3px solid ${sectionColor}`,
                    borderRadius: 6,
                    fontSize: "0.82rem",
                    color: darkMode ? "#94a3b8" : "#475569",
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: sectionColor, fontWeight: 700 }}>Tip: </span>
                    {topic.tip}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
