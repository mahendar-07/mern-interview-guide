import { useState } from "react";

const sections = [
  {
    id: "intro",
    label: "01 — Express Introduction",
    color: "#6366f1",
    topics: [
      {
        title: "What is Express.js?",
        level: "Basic",
        answer:
          "Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of tools — routing, middleware, and HTTP utilities — on top of Node's built-in http module. Express does not dictate how you structure your app; you choose what you need. It is the most widely used Node.js framework and the 'E' in the MERN stack.",
        tip: "Express is a framework, not a library. It provides structure and conventions for building web servers and APIs.",
      },
      {
        title: "Why use Express over plain Node.js?",
        level: "Basic",
        code: `// Plain Node.js — verbose and manual
const http = require("http");
http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users: [] }));
  }
}).listen(5000);

// Express — clean, readable, maintainable
const express = require("express");
const app = express();
app.get("/users", (req, res) => {
  res.json({ users: [] });
});
app.listen(5000);`,
        answer:
          "Plain Node.js requires manually parsing URLs, methods, headers, and body — resulting in deeply nested, hard-to-maintain code. Express abstracts all of this into a clean routing and middleware system. It handles JSON parsing, URL routing, error handling, and static file serving with minimal code.",
        tip: null,
      },
      {
        title: "What is Node.js and how does it relate to Express?",
        level: "Basic",
        answer:
          "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server (outside the browser). It is the platform Express runs on. Node handles I/O, file system access, and networking. Express is a framework that sits on top of Node and makes building HTTP servers much simpler.",
        tip: null,
      },
      {
        title: "How do you install and set up Express?",
        level: "Basic",
        code: `# Initialize project
npm init -y

# Install Express
npm install express

# Install nodemon for auto-restart during development
npm install --save-dev nodemon`,
        answer:
          "Start by initializing a Node project with npm init, which creates package.json. Install Express via npm. Nodemon is a development tool that automatically restarts the server when you save changes — it replaces manually stopping and restarting Node.",
        tip: 'Add "dev": "nodemon index.js" to your package.json scripts to use nodemon.',
      },
      {
        title: "What is package.json?",
        level: "Basic",
        answer:
          "package.json is the manifest file for a Node.js project. It stores the project name, version, entry point, scripts (like start, dev), and all dependencies. When you run npm install, Node reads this file and installs everything listed under dependencies and devDependencies.",
        tip: null,
      },
    ],
  },
  {
    id: "server",
    label: "02 — Server Creation",
    color: "#8b5cf6",
    topics: [
      {
        title: "How do you create a basic Express server?",
        level: "Basic",
        code: `const express = require("express");
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
        answer:
          "Import Express, call express() to create the app instance, define at least one route, and call app.listen() with a port number. The callback in listen fires when the server is ready to accept connections. Always use process.env.PORT so the port can be configured via environment variables in production.",
        tip: null,
      },
      {
        title: "What is app.listen()?",
        level: "Basic",
        answer:
          "app.listen() starts the HTTP server and binds it to a specific port on your machine. It is a wrapper around Node's http.createServer().listen(). Once called, the server continuously listens for incoming requests on that port until the process is stopped.",
        tip: null,
      },
      {
        title: "What is an Environment Variable?",
        level: "Basic",
        code: `# .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=supersecretkey

# In your code
require("dotenv").config();
const port = process.env.PORT;`,
        answer:
          "Environment variables are configuration values stored outside your code — in a .env file or the deployment platform's settings. They keep sensitive data (database URIs, secret keys, API keys) out of your source code. The dotenv package loads .env file values into process.env at runtime.",
        tip: "Always add .env to your .gitignore — never commit secrets to version control.",
      },
      {
        title: "What is the difference between require and import?",
        level: "Basic",
        table: {
          headers: ["require (CommonJS)", "import (ES Modules)"],
          rows: [
            ["Default in Node.js", "Used in React / modern JS"],
            ['const x = require("x")', 'import x from "x"'],
            ["Synchronous", "Asynchronous"],
            ["Works out of the box in Node", 'Needs "type": "module" in package.json'],
          ],
        },
        answer:
          "Node.js uses CommonJS modules by default, so Express projects typically use require/module.exports. React uses ES Module syntax (import/export) because it's bundled by tools like Vite or Webpack.",
        tip: null,
      },
    ],
  },
  {
    id: "routing",
    label: "03 — Routing",
    color: "#a855f7",
    topics: [
      {
        title: "What is Routing in Express?",
        level: "Basic",
        answer:
          "Routing is the mechanism by which Express matches incoming HTTP requests — based on URL path and HTTP method — to the appropriate handler function. Each route definition specifies a method (GET, POST, etc.), a path, and a callback that handles the request and sends a response.",
        tip: null,
      },
      {
        title: "HTTP Methods — GET, POST, PUT, DELETE",
        level: "Basic",
        code: `app.get("/users",      (req, res) => { /* Read all users   */ });
app.post("/users",     (req, res) => { /* Create a user     */ });
app.put("/users/:id",  (req, res) => { /* Replace a user    */ });
app.patch("/users/:id",(req, res) => { /* Update part of it */ });
app.delete("/users/:id",(req, res) => { /* Delete a user    */ });`,
        table: {
          headers: ["Method", "Purpose", "Has body?"],
          rows: [
            ["GET", "Retrieve data", "No"],
            ["POST", "Create new data", "Yes"],
            ["PUT", "Replace entire resource", "Yes"],
            ["PATCH", "Partially update a resource", "Yes"],
            ["DELETE", "Remove a resource", "No"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is app.use()?",
        level: "Basic",
        code: `// Applies to ALL methods and paths
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Applies to all routes starting with /api
app.use("/api", apiRouter);`,
        answer:
          "app.use() mounts middleware or sub-routers. Unlike app.get() or app.post() which match a specific HTTP method, app.use() matches any method. It optionally accepts a path prefix — if given, only requests to that path (and sub-paths) trigger the middleware.",
        tip: null,
      },
      {
        title: "What is app.all()?",
        level: "Intermediate",
        code: `// Matches GET, POST, PUT, DELETE — any method on this path
app.all("/secret", (req, res) => {
  res.send("All methods handled here");
});`,
        answer:
          "app.all() is similar to app.use() but matches only the exact path (not sub-paths). It triggers for any HTTP method, making it useful for applying logic that should run regardless of method — like authentication checks on a specific route.",
        tip: null,
      },
      {
        title: "Route Chaining with app.route()",
        level: "Intermediate",
        code: `// Instead of repeating the path three times:
app.route("/users")
  .get((req, res)  => res.json(users))
  .post((req, res) => { /* create */ })

app.route("/users/:id")
  .get((req, res)    => { /* get one  */ })
  .put((req, res)    => { /* replace  */ })
  .delete((req, res) => { /* delete   */ });`,
        answer:
          "app.route() returns a route object for a single path, allowing you to chain multiple HTTP method handlers without repeating the path string. It reduces code duplication and keeps related route handlers grouped together.",
        tip: null,
      },
    ],
  },
  {
    id: "req-res",
    label: "04 — req & res",
    color: "#c026d3",
    topics: [
      {
        title: "What is the req object?",
        level: "Basic",
        code: `app.post("/users/:id", (req, res) => {
  console.log(req.params.id);    // URL parameter   → "101"
  console.log(req.query.sort);   // Query string    → "asc"
  console.log(req.body.name);    // Request body    → "Mahendar"
  console.log(req.headers["authorization"]); // Headers
  console.log(req.method);       // HTTP method     → "POST"
  console.log(req.url);          // Full URL path
});`,
        answer:
          "The req (request) object represents the incoming HTTP request. It contains everything the client sent: URL parameters (req.params), query strings (req.query), the request body (req.body), HTTP headers (req.headers), the HTTP method (req.method), and more.",
        tip: "req.body is undefined unless you add body-parsing middleware like express.json().",
      },
      {
        title: "What is the res object?",
        level: "Basic",
        code: `// Send plain text
res.send("Hello World");

// Send JSON (automatically sets Content-Type: application/json)
res.json({ message: "Success", data: users });

// Send a status code
res.status(201).json({ message: "Created" });
res.status(404).json({ message: "Not Found" });

// Redirect
res.redirect("/login");

// Send a file
res.sendFile(__dirname + "/index.html");`,
        answer:
          "The res (response) object is used to send a response back to the client. res.send() sends any data, res.json() sends JSON (and sets the correct Content-Type header automatically), res.status() sets the HTTP status code, and res.redirect() sends the client to a different URL.",
        tip: "Always call exactly one response method per request. Calling res.json() twice causes a 'headers already sent' error.",
      },
      {
        title: "Common HTTP Status Codes",
        level: "Basic",
        table: {
          headers: ["Code", "Meaning", "When to use"],
          rows: [
            ["200", "OK", "Successful GET, PUT, PATCH"],
            ["201", "Created", "Successful POST (resource created)"],
            ["204", "No Content", "Successful DELETE (nothing to return)"],
            ["400", "Bad Request", "Missing or invalid input from client"],
            ["401", "Unauthorized", "Not logged in / invalid token"],
            ["403", "Forbidden", "Logged in but not allowed"],
            ["404", "Not Found", "Resource doesn't exist"],
            ["500", "Internal Server Error", "Unexpected server-side error"],
          ],
        },
        answer: null,
        tip: "401 means the client is not authenticated. 403 means authenticated but not authorized. These are different.",
      },
      {
        title: "What is next()?",
        level: "Intermediate",
        code: `function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // pass control to the next middleware or route
}

// Passing an error — skips to error-handling middleware
function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    return next(new Error("Unauthorized")); // jumps to error handler
  }
  next();
}`,
        answer:
          "next() is a function that passes control to the next middleware function or route handler in the stack. If you don't call next() and don't send a response, the request hangs indefinitely. Calling next(error) with an argument skips all regular middleware and jumps to the nearest error-handling middleware.",
        tip: null,
      },
    ],
  },
  {
    id: "middleware",
    label: "05 — Middleware",
    color: "#e11d48",
    topics: [
      {
        title: "What is Middleware?",
        level: "Basic",
        code: `// Middleware signature: (req, res, next)
function myMiddleware(req, res, next) {
  console.log("Request received:", req.method);
  // Do something with req or res, then:
  next(); // pass to next middleware or route handler
}

app.use(myMiddleware);`,
        answer:
          "Middleware are functions that sit in the request-response cycle. Every middleware receives the req object, the res object, and next — a function to pass control forward. Middleware can read/modify the request, send a response early (ending the cycle), or call next() to continue. Multiple middleware functions run in the order they are defined.",
        tip: "Think of middleware as a pipeline — each function processes the request and either responds or passes it along.",
      },
      {
        title: "Types of Middleware",
        level: "Basic",
        table: {
          headers: ["Type", "Description", "Example"],
          rows: [
            ["Application-level", "Runs on every request or a specific path", "app.use(logger)"],
            ["Router-level", "Runs only within a specific router", "router.use(authCheck)"],
            ["Error-handling", "Has 4 params: (err, req, res, next)", "app.use(errorHandler)"],
            ["Built-in", "Comes with Express", "express.json(), express.static()"],
            ["Third-party", "Installed via npm", "cors, helmet, morgan"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "Middleware Execution Order",
        level: "Intermediate",
        code: `app.use(logger);       // 1st — runs for every request
app.use(express.json()); // 2nd — parse body

app.get("/users", authCheck, (req, res) => {
  // 3rd — authCheck runs, then this handler
  res.json(users);
});

// Order matters! Middleware defined after a route won't run for that route.`,
        answer:
          "Middleware runs in the exact order it is defined with app.use() or app.get(). If middleware is defined after a route, it will not run for requests to that route. This is why global middleware (logging, body parsing, CORS) should always be defined before your routes.",
        tip: null,
      },
      {
        title: "What is morgan?",
        level: "Basic",
        code: `npm install morgan

const morgan = require("morgan");
app.use(morgan("dev")); 
// Logs: GET /users 200 5.432 ms - 128`,
        answer:
          "Morgan is a popular third-party HTTP request logging middleware. It automatically logs each incoming request — method, URL, status code, and response time — to the console. The 'dev' format gives colored, concise output perfect for development.",
        tip: null,
      },
      {
        title: "What is cors middleware?",
        level: "Intermediate",
        code: `npm install cors

const cors = require("cors");

// Allow all origins (development only)
app.use(cors());

// Restrict to specific origin (production)
app.use(cors({
  origin: "https://yourfrontend.com",
  credentials: true, // allow cookies
}));`,
        answer:
          "The cors middleware adds the necessary HTTP headers to allow (or restrict) cross-origin requests. Browsers block requests from one origin (e.g., localhost:3000) to another (localhost:5000) by default. This middleware tells the browser which origins are permitted.",
        tip: "Never use cors() with no options in production — always specify allowed origins explicitly.",
      },
    ],
  },
  {
    id: "json",
    label: "06 — express.json()",
    color: "#0284c7",
    topics: [
      {
        title: "What is express.json()?",
        level: "Basic",
        code: `app.use(express.json());

// Without it — req.body is undefined
// With it — req.body contains parsed JSON

app.post("/users", (req, res) => {
  const { name, email } = req.body; // works now
  res.status(201).json({ message: "Created", name });
});`,
        answer:
          "express.json() is built-in middleware that reads the request body, parses it as JSON, and attaches the result to req.body. Without it, req.body is always undefined because Node.js does not parse the body automatically. It must be defined before any routes that need to read req.body.",
        tip: "express.json() only parses requests with Content-Type: application/json. For form data, use express.urlencoded().",
      },
      {
        title: "What is express.urlencoded()?",
        level: "Basic",
        code: `// For HTML form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
});`,
        answer:
          "express.urlencoded() parses request bodies sent as URL-encoded form data — the format used by HTML <form> elements without a multipart enctype. The extended: true option uses the qs library for richer parsing (nested objects, arrays).",
        tip: null,
      },
      {
        title: "express.json() vs express.urlencoded()",
        level: "Basic",
        table: {
          headers: ["express.json()", "express.urlencoded()"],
          rows: [
            ["Parses JSON bodies", "Parses HTML form bodies"],
            ["Content-Type: application/json", "Content-Type: application/x-www-form-urlencoded"],
            ["Used with fetch / Axios from React", "Used with HTML <form> submit"],
            ["Most common in REST APIs", "Less common in modern SPAs"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is express.static()?",
        level: "Basic",
        code: `// Serve files from the 'public' folder
app.use(express.static("public"));

// Now files are accessible:
// public/index.html  → GET /index.html
// public/logo.png    → GET /logo.png`,
        answer:
          "express.static() is built-in middleware that serves static files (HTML, CSS, JS, images) from a specified folder. When a request matches a file in that folder, Express sends it directly without you needing to write a route handler.",
        tip: null,
      },
    ],
  },
  {
    id: "params-query",
    label: "07 — Params & Query",
    color: "#059669",
    topics: [
      {
        title: "What are Route Parameters? (req.params)",
        level: "Basic",
        code: `// Define with : prefix
app.get("/users/:id", (req, res) => {
  const { id } = req.params; // "101" from /users/101
  res.json({ userId: id });
});

// Multiple params
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
});`,
        answer:
          "Route parameters are named URL segments prefixed with a colon (:). They capture dynamic values from the URL path and make them available in req.params. They are used to identify a specific resource — like a user ID, product slug, or order number.",
        tip: null,
      },
      {
        title: "What are Query Strings? (req.query)",
        level: "Basic",
        code: `// URL: /products?category=shoes&sort=price&limit=10
app.get("/products", (req, res) => {
  const { category, sort, limit } = req.query;
  // category = "shoes", sort = "price", limit = "10"
  res.json({ category, sort, limit });
});`,
        answer:
          "Query strings are key-value pairs appended to a URL after a ? mark, separated by &. They are available on req.query as an object. Query strings are used for filtering, sorting, searching, and pagination — they are optional and do not identify a specific resource.",
        tip: "All query string values come in as strings. Convert to numbers with Number() or parseInt() before using in calculations or DB queries.",
      },
      {
        title: "Params vs Query — When to use which?",
        level: "Intermediate",
        table: {
          headers: ["Route Params (req.params)", "Query Strings (req.query)"],
          rows: [
            ["Part of the URL path", "After ? in the URL"],
            ["Identifies a specific resource", "Filters or modifies results"],
            ["Required — URL won't match without it", "Optional — has sensible defaults"],
            ["/users/101 → get user 101", "/users?role=admin → filter users"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is req.body?",
        level: "Basic",
        code: `// Client sends: POST /users
// Body: { "name": "Mahendar", "email": "m@example.com" }

app.post("/users", (req, res) => {
  const { name, email } = req.body; // requires express.json() middleware
  // Save to database...
  res.status(201).json({ message: "User created", name });
});`,
        answer:
          "req.body contains the parsed request body — data the client sends in the body of a POST, PUT, or PATCH request. It requires the express.json() middleware to be populated. Unlike params and query, body data is not visible in the URL, making it appropriate for sensitive or large data.",
        tip: null,
      },
    ],
  },
  {
    id: "rest",
    label: "08 — REST APIs",
    color: "#d97706",
    topics: [
      {
        title: "What is a REST API?",
        level: "Basic",
        answer:
          "REST (Representational State Transfer) is an architectural style for designing APIs. A REST API communicates over HTTP using standard methods (GET, POST, PUT, DELETE) and treats everything as a resource identified by a URL. It is stateless — each request contains all information needed to process it; the server stores no session state.",
        tip: null,
      },
      {
        title: "REST API Design Principles",
        level: "Basic",
        table: {
          headers: ["Principle", "Description"],
          rows: [
            ["Stateless", "Each request is independent — server stores no session"],
            ["Resource-based URLs", "URLs represent nouns, not verbs (/users, not /getUsers)"],
            ["HTTP methods = actions", "GET reads, POST creates, PUT/PATCH updates, DELETE removes"],
            ["Consistent responses", "Always return JSON with a consistent structure"],
            ["Proper status codes", "201 for created, 404 for not found, 400 for bad input"],
          ],
        },
        answer: null,
        tip: "URLs should be nouns (resources), never verbs. Use /users not /getUsers.",
      },
      {
        title: "CRUD REST API — Full Example",
        level: "Intermediate",
        code: `// GET all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

// POST — create user
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// PUT — update user
app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  res.json(user);
});

// DELETE
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});`,
        answer:
          "A complete CRUD REST API maps the four data operations (Create, Read, Update, Delete) to HTTP methods (POST, GET, PUT/PATCH, DELETE). Each endpoint returns an appropriate status code and JSON response. Always handle the 'not found' case and return 404 rather than crashing.",
        tip: null,
      },
      {
        title: "What is a consistent API response structure?",
        level: "Intermediate",
        code: `// Success
res.status(200).json({
  success: true,
  data: users,
  message: "Users fetched successfully"
});

// Error
res.status(404).json({
  success: false,
  message: "User not found",
  error: err.message
});`,
        answer:
          "A consistent response structure means every API response — success or error — has the same shape. This makes it easy for the frontend to handle responses predictably without checking different formats. Common fields: success (boolean), data, message, and optionally error.",
        tip: null,
      },
    ],
  },
  {
    id: "router",
    label: "09 — Router",
    color: "#7c3aed",
    topics: [
      {
        title: "What is Express Router?",
        level: "Intermediate",
        answer:
          "Express Router is a mini-application — a self-contained module that groups related routes together. Instead of defining all routes in one file (which becomes unmanageable), you create separate router files for each resource (users, products, orders) and mount them in the main app. Each router has its own middleware and routing methods.",
        tip: null,
      },
      {
        title: "Creating and Using a Router",
        level: "Intermediate",
        code: `// routes/userRoutes.js
const express = require("express");
const router = express.Router();

router.get("/",    async (req, res) => { /* get all */ });
router.get("/:id", async (req, res) => { /* get one */ });
router.post("/",   async (req, res) => { /* create  */ });
router.put("/:id", async (req, res) => { /* update  */ });
router.delete("/:id", async (req, res) => { /* delete */ });

module.exports = router;

// index.js — mount the router
const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

// Now routes are:
// GET    /api/users
// GET    /api/users/:id
// POST   /api/users
// PUT    /api/users/:id
// DELETE /api/users/:id`,
        answer:
          "Create a router with express.Router(), define routes on it, export it, and mount it on the main app with app.use(). The prefix in app.use() is prepended to all routes in that router — so router.get('/') becomes /api/users when mounted at /api/users.",
        tip: "Each resource (users, products, orders) should have its own router file. Keep controllers in separate files too.",
      },
      {
        title: "Recommended Folder Structure",
        level: "Intermediate",
        code: `project/
├── index.js           ← Entry point, server setup
├── .env               ← Environment variables
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── authRoutes.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── models/
│   └── User.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
└── config/
    └── db.js`,
        answer:
          "A clean Express project separates concerns into dedicated folders: routes define URL-to-handler mappings, controllers contain the actual logic, models define data schemas, middleware holds reusable request processors, and config holds setup code like database connection.",
        tip: null,
      },
    ],
  },
  {
    id: "error",
    label: "10 — Error Handling",
    color: "#dc2626",
    topics: [
      {
        title: "How does Express handle errors?",
        level: "Intermediate",
        code: `// Any middleware/route can pass an error to next()
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (err) {
    next(err); // pass to error-handling middleware
  }
});

// Error-handling middleware — MUST have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});`,
        answer:
          "Express has a special error-handling middleware that is identified by having exactly four parameters: (err, req, res, next). When you call next(err) anywhere in your route or middleware, Express skips all regular middleware and jumps to this error handler. Define it after all other routes.",
        tip: "Error-handling middleware must be defined last — after all routes and middleware.",
      },
      {
        title: "Async Error Handling",
        level: "Intermediate",
        code: `// Pattern 1 — try/catch in every handler (repetitive)
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Pattern 2 — asyncHandler wrapper (clean)
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/users", asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users); // errors automatically passed to next()
}));`,
        answer:
          "Async functions require extra care — unhandled Promise rejections won't automatically trigger Express's error handler. The asyncHandler wrapper removes the need to write try/catch in every single route. It wraps the async function, catches any rejected promises, and forwards them to next().",
        tip: "The express-async-errors npm package can automatically patch Express to handle async errors without any wrapper.",
      },
      {
        title: "Custom Error Class",
        level: "Advanced",
        code: `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // expected errors
  }
}

// Usage in a route
if (!user) {
  throw new AppError("User not found", 404);
}

// Error middleware reads the custom fields
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});`,
        answer:
          "A custom error class lets you create descriptive errors with a status code attached. This keeps your error-handling middleware clean — it simply reads err.statusCode and err.message rather than figuring out the error type. Marking errors as isOperational distinguishes expected errors (404, 400) from unexpected bugs (500).",
        tip: null,
      },
      {
        title: "What is a 404 handler?",
        level: "Basic",
        code: `// Define AFTER all valid routes, BEFORE error handler
app.use((req, res, next) => {
  res.status(404).json({ message: \`Route \${req.url} not found\` });
});`,
        answer:
          "If a request doesn't match any defined route, Express falls through to the next middleware. By placing a catch-all middleware after all your routes, you can intercept these unmatched requests and return a proper 404 response instead of letting the request hang.",
        tip: null,
      },
    ],
  },
  {
    id: "mvc",
    label: "11 — MVC Pattern",
    color: "#0e7490",
    topics: [
      {
        title: "What is MVC?",
        level: "Intermediate",
        answer:
          "MVC (Model-View-Controller) is a design pattern that separates an application into three interconnected layers. Model handles data and database logic. View handles presentation (in a REST API, this is the JSON response). Controller receives requests, calls the Model, and sends back a response. This separation makes code easier to test, maintain, and scale.",
        tip: "In an Express REST API, there is no traditional View — the JSON response acts as the view. MVC becomes Model + Controller + Routes.",
      },
      {
        title: "MVC — Code Separation Example",
        level: "Intermediate",
        code: `// models/User.js — data layer
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name:  String,
  email: { type: String, unique: true },
});
module.exports = mongoose.model("User", userSchema);

// controllers/userController.js — business logic
const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) { next(err); }
};

// routes/userRoutes.js — URL mapping
const router = require("express").Router();
const { getAllUsers, createUser } = require("../controllers/userController");

router.get("/",  getAllUsers);
router.post("/", createUser);

module.exports = router;`,
        answer:
          "The Model defines the data structure. The Controller contains all business logic — it queries the Model and constructs the response. The Route simply maps URLs and HTTP methods to the appropriate Controller function. This keeps each layer focused on one responsibility.",
        tip: null,
      },
      {
        title: "Why use MVC?",
        level: "Intermediate",
        table: {
          headers: ["Without MVC", "With MVC"],
          rows: [
            ["All logic in route handlers", "Logic separated into controllers"],
            ["Hard to test individual parts", "Each layer is independently testable"],
            ["Files grow to hundreds of lines", "Each file has one clear responsibility"],
            ["Hard to onboard new developers", "Clear structure anyone can understand"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "database",
    label: "12 — Database Connection",
    color: "#16a34a",
    topics: [
      {
        title: "Connecting Express to MongoDB with Mongoose",
        level: "Intermediate",
        code: `// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1); // exit app if DB fails
  }
};

module.exports = connectDB;

// index.js
const connectDB = require("./config/db");
connectDB(); // connect before starting server
app.listen(PORT, () => console.log(\`Running on \${PORT}\`));`,
        answer:
          "Put the database connection logic in a separate config/db.js file and call it before starting the server. Use process.exit(1) if the connection fails — there's no point running the server without a database. Always read the connection string from environment variables, never hardcode it.",
        tip: null,
      },
      {
        title: "What is Mongoose Schema and Model?",
        level: "Intermediate",
        code: `const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);`,
        answer:
          "A Schema defines the structure, data types, and validation rules for documents in a MongoDB collection. A Model is created from a Schema and provides methods to interact with the collection (find, create, update, delete). Mongoose handles validation automatically before saving to the database.",
        tip: "The model name ('User') is automatically pluralized to find the collection ('users') in MongoDB.",
      },
      {
        title: "Common Mongoose Operations",
        level: "Intermediate",
        code: `// Create
const user = await User.create({ name, email, password });

// Read all
const users = await User.find();

// Read with filter
const admins = await User.find({ role: "admin" });

// Read one by ID
const user = await User.findById(req.params.id);

// Update — { new: true } returns the updated document
const updated = await User.findByIdAndUpdate(id, req.body, { new: true });

// Delete
await User.findByIdAndDelete(id);

// Select specific fields
const users = await User.find().select("name email -password");

// Pagination
const users = await User.find().skip(10).limit(10);`,
        answer:
          "Mongoose provides clean async methods for all database operations. Always await them and wrap in try/catch. findByIdAndUpdate with { new: true } returns the updated document instead of the old one. Use .select() to exclude sensitive fields like passwords from query results.",
        tip: "Never return the password field in API responses. Use .select('-password') or set select: false in the schema.",
      },
      {
        title: "What is async/await in Express routes?",
        level: "Basic",
        code: `// Async route handler
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find(); // waits for DB response
    res.json(users);
  } catch (err) {
    next(err); // forward DB errors to error handler
  }
});`,
        answer:
          "Database operations are asynchronous — they take time to complete. async/await makes asynchronous code look and behave like synchronous code. The await keyword pauses execution until the Promise resolves. Always wrap await calls in try/catch so database errors are caught and handled properly.",
        tip: null,
      },
    ],
  },
  {
    id: "jwt",
    label: "13 — JWT Authentication",
    color: "#b45309",
    topics: [
      {
        title: "Authentication Flow in Express",
        level: "Intermediate",
        code: `// 1. Register — hash password, save user
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: "Registered" });
});

// 2. Login — verify password, issue JWT
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token });
});`,
        answer:
          "Registration hashes the password with bcrypt before saving. Login finds the user, compares the submitted password to the stored hash, and if correct, generates a signed JWT. Never return the same error message for 'user not found' vs 'wrong password' — always use a generic message to prevent user enumeration attacks.",
        tip: null,
      },
      {
        title: "JWT Auth Middleware — Protecting Routes",
        level: "Intermediate",
        code: `// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;

// Use on protected routes
const protect = require("./middleware/authMiddleware");
app.get("/api/profile", protect, (req, res) => {
  res.json({ user: req.user }); // req.user set by middleware
});`,
        answer:
          "The auth middleware reads the Authorization header, extracts the Bearer token, and verifies it with jwt.verify(). If valid, it decodes the payload and attaches it to req.user so downstream route handlers know who is making the request. If invalid or missing, it returns 401 immediately.",
        tip: "jwt.verify() throws an error for expired, malformed, or tampered tokens. Always wrap it in try/catch.",
      },
      {
        title: "What is bcrypt?",
        level: "Intermediate",
        code: `const bcrypt = require("bcryptjs");

// Hash a password (saltRounds = 10 is recommended)
const hashed = await bcrypt.hash(plainPassword, 10);

// Verify — compare plain text against hash
const isMatch = await bcrypt.compare(plainPassword, hashed);
// Returns true or false`,
        answer:
          "bcrypt is a password hashing library. It applies a one-way hashing function with a 'salt' (random data added before hashing) to make brute-force attacks impractical. The saltRounds value (work factor) controls how computationally expensive the hash is — 10 is a good default. Never store plain-text passwords.",
        tip: "Use bcryptjs (pure JavaScript) instead of bcrypt for better cross-platform compatibility in Node.",
      },
      {
        title: "Role-based Authorization Middleware",
        level: "Advanced",
        code: `const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message: "Access denied — insufficient permissions"
    });
  }
  next();
};

// Usage — protect runs first (authentication), then authorize (authorization)
app.delete(
  "/api/users/:id",
  protect,
  authorize("admin"),  // only admins can delete
  deleteUser
);`,
        answer:
          "Authorization middleware checks whether the authenticated user has the required role. It runs after the protect middleware (which sets req.user). Use a 403 Forbidden status — not 401 — when the user is authenticated but lacks permission. The authorize function is a factory that accepts allowed roles and returns the middleware.",
        tip: null,
      },
    ],
  },
  {
    id: "security",
    label: "14 — Security",
    color: "#be123c",
    topics: [
      {
        title: "What is helmet?",
        level: "Intermediate",
        code: `npm install helmet

const helmet = require("helmet");
app.use(helmet());`,
        answer:
          "Helmet is a middleware collection that sets security-related HTTP response headers. It protects against common vulnerabilities: XSS (by setting Content-Security-Policy), clickjacking (X-Frame-Options), MIME-type sniffing (X-Content-Type-Options), and others. It is a one-liner that gives significant security improvements with no configuration required.",
        tip: "Helmet should be one of the first middleware you add — before routes.",
      },
      {
        title: "What is Rate Limiting?",
        level: "Intermediate",
        code: `npm install express-rate-limit

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per window
  message: { message: "Too many requests, try again later" },
});

app.use("/api", limiter); // apply to all API routes

// Stricter limit for auth routes (brute-force protection)
const authLimiter = rateLimit({ windowMs: 60000, max: 5 });
app.use("/api/auth", authLimiter);`,
        answer:
          "Rate limiting restricts how many requests a single IP can make in a given time window. Without it, an attacker can brute-force login endpoints or overwhelm your server with requests (DoS). The express-rate-limit middleware handles this with minimal setup.",
        tip: null,
      },
      {
        title: "Input Validation with express-validator",
        level: "Intermediate",
        code: `const { body, validationResult } = require("express-validator");

app.post("/api/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("name").notEmpty().trim(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with valid data
  }
);`,
        answer:
          "Input validation ensures the data sent by the client meets your requirements before it reaches your database or business logic. Without it, you risk saving bad data or being vulnerable to injection attacks. express-validator provides chainable validation rules and collects all errors at once.",
        tip: "Validate on the server always — never trust client-side validation alone.",
      },
      {
        title: "Common Security Checklist",
        level: "Intermediate",
        table: {
          headers: ["Vulnerability", "Prevention"],
          rows: [
            ["Brute-force attacks", "Rate limiting on auth routes"],
            ["XSS (Cross-Site Scripting)", "Helmet, input sanitization"],
            ["SQL/NoSQL Injection", "Validation, use parameterized queries"],
            ["Sensitive data exposure", "HTTPS, never log passwords/tokens"],
            ["Broken auth", "Use JWT correctly, short expiry, HTTPS-only cookies"],
            ["Hardcoded secrets", "Environment variables, never in source code"],
            ["Missing access control", "Protect + authorize middleware on every sensitive route"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is HTTPS and why does it matter?",
        level: "Intermediate",
        answer:
          "HTTPS encrypts traffic between the client and server using TLS. Without it, tokens, passwords, and user data sent over the network can be intercepted (man-in-the-middle attack). In development, you use HTTP on localhost. In production, always use HTTPS — managed by your hosting platform (Render, Railway, Heroku, AWS) or a reverse proxy like Nginx.",
        tip: null,
      },
    ],
  },
  {
    id: "advanced",
    label: "15 — Advanced Concepts",
    color: "#6366f1",
    topics: [
      {
        title: "What is the Express Request Lifecycle?",
        level: "Advanced",
        code: `Request arrives
    ↓
Global Middleware (helmet, cors, morgan, express.json)
    ↓
Route Middleware (protect, authorize, validate)
    ↓
Route Handler (controller logic, DB query)
    ↓
Response sent (res.json, res.status)
    ↓ (on error: next(err))
Error-handling Middleware
    ↓
Response sent with error`,
        answer:
          "Understanding the full lifecycle helps debug complex issues. A request passes through every middleware in order until one sends a response or passes an error. If no middleware responds, the request hangs. If an error is thrown or passed to next(err), execution jumps directly to the error-handling middleware.",
        tip: null,
      },
      {
        title: "What is Pagination?",
        level: "Intermediate",
        code: `// GET /api/products?page=2&limit=10
app.get("/api/products", async (req, res) => {
  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 10;
  const skip  = (page - 1) * limit;

  const total    = await Product.countDocuments();
  const products = await Product.find().skip(skip).limit(limit);

  res.json({
    data: products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});`,
        answer:
          "Pagination splits large datasets into pages to avoid sending thousands of records in one response. The client sends page and limit as query parameters. The server calculates how many documents to skip and how many to return. Always include total count and total pages in the response so the frontend can render navigation.",
        tip: null,
      },
      {
        title: "What is File Upload with Multer?",
        level: "Advanced",
        code: `npm install multer

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ file: req.file }); // req.file has file info
});`,
        answer:
          "Multer is middleware for handling multipart/form-data — the format used for file uploads. It processes uploaded files and either saves them to disk (diskStorage) or keeps them in memory (memoryStorage). After Multer runs, file info is available on req.file (single) or req.files (multiple).",
        tip: null,
      },
      {
        title: "What is express-async-errors?",
        level: "Advanced",
        code: `npm install express-async-errors

// At the very top of index.js — before any routes
require("express-async-errors");

// Now async errors automatically reach your error handler
// No need for try/catch or asyncHandler wrappers!
app.get("/users", async (req, res) => {
  const users = await User.find(); // if this throws, goes to error handler
  res.json(users);
});`,
        answer:
          "express-async-errors patches Express internally so that any error thrown from an async route handler is automatically forwarded to next(err). This eliminates the need to write try/catch in every single route. Import it once at the top and your centralized error handler catches everything.",
        tip: null,
      },
      {
        title: "What is a Reverse Proxy?",
        level: "Advanced",
        answer:
          "A reverse proxy (like Nginx) sits in front of your Express app and handles incoming traffic. It manages HTTPS/TLS termination, serves static files, load balances across multiple Node processes, and adds a layer of security. In production, you typically don't expose Node directly to the internet — Nginx forwards requests to your Express app running on a local port.",
        tip: null,
      },
      {
        title: "Interview Scenario — Scaling Express",
        level: "Advanced",
        answer:
          "A single Node.js process uses one CPU core. For production scale: (1) Use Node's cluster module or PM2 to spawn one process per CPU core. (2) Put Nginx in front as a reverse proxy and load balancer. (3) Use a managed database (MongoDB Atlas) not a local instance. (4) Add Redis for caching frequent queries. (5) Use environment-specific config (dotenv). (6) Monitor with tools like PM2, Datadog, or New Relic.",
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

export default function ExpressInterviewGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [openTopics, setOpenTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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
      background: "#0f172a",
      minHeight: "100vh",
      color: "#e2e8f0",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <header style={{
        padding: "2rem 1.5rem 1.5rem",
        borderBottom: "1px solid #1e293b",
        background: "#0f172a",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{
              background: "#10b981",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
              padding: "0.2rem 0.6rem",
              borderRadius: 99,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>Interview Prep</span>
            <span style={{ color: "#475569", fontSize: "0.85rem" }}>Basic → Advanced</span>
          </div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, margin: 0, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Express.js Interview Guide
          </h1>
          <p style={{ margin: "0.4rem 0 1.2rem", color: "#64748b", fontSize: "0.9rem" }}>
            {sections.length} topics across {sections.reduce((a, s) => a + s.topics.length, 0)} questions — structured for fresher to 2-year experience
          </p>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "0.55rem 1rem",
              borderRadius: 8,
              border: "1px solid #334155",
              background: "#1e293b",
              color: "#e2e8f0",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "1.5rem" }}>
        {/* Sidebar */}
        {!searchQuery && (
          <nav style={{ width: 210, flexShrink: 0, marginRight: "1.5rem" }}>
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
                />
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
              />
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function TopicList({ topics, sectionId, sectionColor, openTopics, toggleTopic }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {topics.map((topic, i) => {
        const key = `${sectionId}-${i}`;
        const isOpen = openTopics[key];
        const lc = levelColors[topic.level] || levelColors.Basic;

        return (
          <div key={i} style={{
            background: "#1e293b",
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
                color: "#f1f5f9",
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
                <span style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1 }}>
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
                    background: "#0f172a",
                    border: "1px solid #334155",
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
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                      <thead>
                        <tr>
                          {topic.table.headers.map((h, hi) => (
                            <th key={hi} style={{
                              background: "#0f172a",
                              color: "#94a3b8",
                              padding: "0.55rem 0.85rem",
                              textAlign: "left",
                              fontWeight: 600,
                              fontSize: "0.78rem",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #334155",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {topic.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderBottom: "1px solid #1e293b" }}>
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
                    background: "#0f172a",
                    border: `1px solid ${sectionColor}44`,
                    borderLeft: `3px solid ${sectionColor}`,
                    borderRadius: 6,
                    fontSize: "0.82rem",
                    color: "#94a3b8",
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
