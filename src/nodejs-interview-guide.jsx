import { useState } from "react";

const sections = [
  {
    id: "intro",
    label: "01 — What is Node.js?",
    color: "#f59e0b",
    topics: [
      {
        title: "What is Node.js?",
        level: "Basic",
        realWorld: "Like a waiter who takes food orders (requests) and passes them to the kitchen (server). The waiter doesn't cook — Node.js doesn't build UIs. It handles what happens behind the scenes.",
        answer:
          "Node.js is a runtime environment that lets JavaScript run on the server (outside the browser). Before Node.js, JavaScript could only run inside browsers. Now with Node.js, the same JavaScript language can power your backend server too.",
        tip: "One-liner: Node.js lets JavaScript run on the server — not just in the browser.",
      },
      {
        title: "What is the V8 Engine?",
        level: "Basic",
        realWorld: "Think of V8 like a translator. You write English (JavaScript). V8 translates it into machine language the computer understands — very fast.",
        answer:
          "V8 is Google's JavaScript engine used inside Chrome and Node.js. It takes your JavaScript code and converts it directly into machine code so the computer can execute it. This is why Node.js is fast.",
        tip: null,
      },
      {
        title: "Is Node.js a Language or Framework?",
        level: "Basic",
        answer:
          "Neither. Node.js is a runtime environment — it is the platform that runs JavaScript code on the server. JavaScript is the language. Express.js is the framework that runs on top of Node.js.",
        table: {
          headers: ["Term", "What it is", "Example"],
          rows: [
            ["Language", "The code you write", "JavaScript"],
            ["Runtime", "The environment that runs the code", "Node.js"],
            ["Framework", "A tool built on top of the runtime", "Express.js"],
          ],
        },
        tip: null,
      },
      {
        title: "Why use Node.js for the backend?",
        level: "Basic",
        answer:
          "Same language on frontend and backend — your whole team writes JavaScript. It is fast, handles many requests at the same time without slowing down, and has a massive library ecosystem via npm. It is the standard choice for MERN stack backends.",
        tip: null,
      },
    ],
  },
  {
    id: "async",
    label: "02 — Blocking vs Non-Blocking",
    color: "#6366f1",
    topics: [
      {
        title: "What is Blocking (Synchronous)?",
        level: "Basic",
        realWorld: "Imagine a coffee shop with one cashier. One customer pays by card — the cashier waits while the card machine processes. Nobody else gets served during that wait. That is blocking.",
        code: `// Blocking — waits for each step to finish before moving on
const data = fs.readFileSync("file.txt"); // waits here...
console.log(data);                         // only runs after file is read
console.log("Done");                       // runs last`,
        answer:
          "Blocking means the code waits for one task to fully complete before moving to the next. If reading a large file takes 3 seconds, everything else is stuck for 3 seconds.",
        tip: null,
      },
      {
        title: "What is Non-Blocking (Asynchronous)?",
        level: "Basic",
        realWorld: "Same coffee shop — but now the cashier takes your order, starts your card processing, and immediately serves the next customer. When your card is done, it beeps and they come back to you. That is non-blocking.",
        code: `// Non-blocking — starts the task and moves on immediately
fs.readFile("file.txt", (data) => {
  console.log(data); // runs later when file is ready
});
console.log("Done"); // runs immediately, doesn't wait

// Output:
// Done       ← printed first
// (file data) ← printed when file finishes reading`,
        answer:
          "Non-blocking means Node.js starts a task (like reading a file or calling a database), immediately moves on to the next task, and comes back to handle the result when it is ready. This is how Node.js handles thousands of users at once.",
        tip: "This is the most important concept in Node.js — everything else builds on it.",
      },
      {
        title: "What is Single-Threaded? How does it handle many users?",
        level: "Basic",
        realWorld: "One chef in a kitchen. But instead of standing and watching the oven, the chef starts multiple dishes, sets timers, and moves between them. One person, many tasks happening at once.",
        answer:
          "Node.js runs on a single main thread — meaning it processes one thing at a time in JavaScript. But it never sits idle waiting. When it starts an async task (DB query, API call, file read), it hands it off and immediately handles the next request. When the task finishes, it comes back to it. This is why it can handle thousands of users.",
        tip: null,
      },
    ],
  },
  {
    id: "eventloop",
    label: "03 — Event Loop",
    color: "#c026d3",
    topics: [
      {
        title: "What is the Event Loop?",
        level: "Basic",
        realWorld: "Think of a restaurant manager who keeps walking around checking on tables. If food is ready, they deliver it. If a customer needs something, they handle it. They never stop — always looping and checking. That is the Event Loop.",
        code: `console.log("1 — Start");

setTimeout(() => {
  console.log("3 — Timer done");
}, 0);

console.log("2 — End");

// Output:
// 1 — Start
// 2 — End
// 3 — Timer done   ← runs AFTER, even though delay is 0ms`,
        answer:
          "The Event Loop is the engine that makes non-blocking work possible. It constantly checks: 'Is the main code done? Is any async task finished?' When an async task completes (a DB query returns, a file is read), the Event Loop picks up its callback and runs it.",
        tip: "setTimeout with 0ms still runs after synchronous code — because it goes through the Event Loop.",
      },
      {
        title: "What is the Call Stack?",
        level: "Basic",
        realWorld: "Like a stack of plates. The last plate placed on top is the first one removed. Functions are added to the top when called and removed when they finish.",
        code: `function greet() {
  console.log("Hello");  // 3. this runs
}

function start() {
  greet();               // 2. greet() added to stack
}

start();                 // 1. start() added to stack

// Call Stack order:
// start() → greet() → console.log() → done`,
        answer:
          "The Call Stack keeps track of which function is currently running. When you call a function, it gets added to the top of the stack. When it finishes, it is removed. The Event Loop only pushes a new callback when the Call Stack is empty.",
        tip: null,
      },
      {
        title: "Event Loop — Full Picture",
        level: "Intermediate",
        code: `console.log("Start");           // 1. Call Stack — runs immediately

setTimeout(() => {
  console.log("Timeout");       // 4. Macro task — runs last
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");       // 3. Micro task — runs before setTimeout
});

process.nextTick(() => {
  console.log("NextTick");      // 2. Runs before anything else async
});

console.log("End");             // Still sync — runs before all async

// Output:
// Start
// End
// NextTick    ← highest priority async
// Promise     ← micro task
// Timeout     ← macro task (lowest priority)`,
        answer:
          "Execution order: synchronous code first → process.nextTick → Promises (microtasks) → setTimeout/setInterval (macrotasks). For fresher interviews, just remember: sync code runs first, then async tasks come back through the Event Loop.",
        tip: "For fresher interviews — just know that setTimeout runs after sync code even with 0ms delay.",
      },
    ],
  },
  {
    id: "callbacks",
    label: "04 — Callbacks & Promises",
    color: "#0284c7",
    topics: [
      {
        title: "What is a Callback?",
        level: "Basic",
        realWorld: "You order a pizza and give them your phone number. They call you back when it is ready. You don't stand at the shop waiting. The callback is 'call me when done'.",
        code: `// The second argument is a callback — runs after the task
fs.readFile("users.txt", "utf8", function(err, data) {
  if (err) return console.log("Error:", err);
  console.log("File content:", data); // runs when file is ready
});

console.log("This runs first!"); // doesn't wait for file`,
        answer:
          "A callback is a function you pass into another function to run later, when a task is complete. It is the original way Node.js handled async operations.",
        tip: null,
      },
      {
        title: "What is Callback Hell?",
        level: "Basic",
        realWorld: "Imagine asking for pizza, then when it arrives, calling the drinks shop, then when drinks arrive, calling the dessert shop — each call depending on the previous one. You end up with a deeply nested mess of calls inside calls.",
        code: `// Callback Hell — also called "Pyramid of Doom"
loginUser(email, password, (user) => {
  getProfile(user.id, (profile) => {
    getOrders(profile.id, (orders) => {
      getPayment(orders[0].id, (payment) => {
        // Deeply nested, hard to read, hard to debug
      });
    });
  });
});`,
        answer:
          "Callback Hell is when multiple async operations depend on each other, creating deeply nested callbacks. The code becomes hard to read, debug, and maintain. Promises and async/await were created to solve this.",
        tip: null,
      },
      {
        title: "What is a Promise?",
        level: "Basic",
        realWorld: "You order food online. The app gives you a 'promise' — an order confirmation. It will either be Fulfilled (food arrives) or Rejected (restaurant cancels). While waiting, you can do other things.",
        code: `// A Promise has 3 states: pending → fulfilled or rejected
const fetchUser = new Promise((resolve, reject) => {
  // simulate DB call
  const user = { name: "Mahendar" };

  if (user) {
    resolve(user);         // success → .then() runs
  } else {
    reject("User not found"); // failure → .catch() runs
  }
});

// Using the Promise
fetchUser
  .then(user  => console.log(user.name))  // "Mahendar"
  .catch(err  => console.log(err));`,
        answer:
          "A Promise represents a future value — an async operation that will eventually succeed (resolve) or fail (reject). It has three states: Pending (waiting), Fulfilled (success), Rejected (failed). Promises avoid callback nesting with .then() chaining.",
        tip: null,
      },
      {
        title: "What is Async/Await?",
        level: "Basic",
        realWorld: "Instead of giving your phone number (callback) or tracking an order status (promise chain), async/await lets you write code as if you just waited at the counter — much simpler to read.",
        code: `// Without async/await — promise chain
getUser()
  .then(user => getOrders(user.id))
  .then(orders => console.log(orders))
  .catch(err => console.log(err));

// With async/await — reads like normal code
async function loadData() {
  try {
    const user   = await getUser();       // wait for user
    const orders = await getOrders(user.id); // wait for orders
    console.log(orders);
  } catch (err) {
    console.log(err); // handles any error
  }
}`,
        answer:
          "async/await is built on top of Promises but makes the code look synchronous and easy to read. The async keyword marks a function as asynchronous. The await keyword pauses inside that function until the Promise resolves. Always wrap in try/catch to handle errors.",
        tip: "For interviews: async/await is just cleaner syntax for Promises — it does not create new functionality.",
      },
      {
        title: "Callback vs Promise vs Async/Await",
        level: "Basic",
        table: {
          headers: ["Feature", "Callback", "Promise", "Async/Await"],
          rows: [
            ["Readability", "Hard (nested)", "Better (.then chain)", "Best (reads like sync)"],
            ["Error Handling", "Manual in every callback", ".catch()", "try/catch"],
            ["Nesting Problem", "Yes — callback hell", "No", "No"],
            ["Based on", "Function argument", "Promise object", "Promise (syntactic sugar)"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "modules",
    label: "05 — Modules",
    color: "#059669",
    topics: [
      {
        title: "What are Modules in Node.js?",
        level: "Basic",
        realWorld: "Like a toolbox. Instead of keeping all tools in one drawer, you organize them into separate boxes — one for electrical tools, one for plumbing, one for woodwork. In Node.js, each file is a module.",
        answer:
          "A module is a separate JavaScript file that contains reusable code. Node.js lets you split code across multiple files, export what you need, and import it elsewhere. This keeps code organized and maintainable.",
        tip: null,
      },
      {
        title: "CommonJS Modules — require and module.exports",
        level: "Basic",
        code: `// math.js — export a function
function add(a, b) {
  return a + b;
}
module.exports = add;

// app.js — import and use it
const add = require("./math");
console.log(add(2, 3)); // 5

// Exporting multiple things
module.exports = { add, subtract };

// Importing multiple things
const { add, subtract } = require("./math");`,
        answer:
          "CommonJS is Node.js's default module system. Use module.exports to export and require() to import. This works in all Node.js versions without any extra setup.",
        tip: null,
      },
      {
        title: "ES Modules — import and export",
        level: "Basic",
        code: `// math.js — ES Module syntax (same as React)
export function add(a, b) {
  return a + b;
}
export default multiply;

// app.js
import { add } from "./math.js";
import multiply from "./math.js";`,
        answer:
          "ES Modules use import/export syntax — the same syntax used in React. To use ES Modules in Node.js, add \"type\": \"module\" in package.json or use .mjs file extension.",
        tip: null,
      },
      {
        title: "CommonJS vs ES Modules",
        level: "Basic",
        table: {
          headers: ["CommonJS", "ES Modules"],
          rows: [
            ["require()", "import"],
            ["module.exports", "export / export default"],
            ["Default in Node.js", "Default in React / modern JS"],
            ["Synchronous loading", "Asynchronous loading"],
            ["Works without any config", "Needs type:module or .mjs"],
          ],
        },
        answer: null,
        tip: "In Express projects you will mostly see require(). In React projects you will see import.",
      },
    ],
  },
  {
    id: "builtins",
    label: "06 — Built-in Modules",
    color: "#dc2626",
    topics: [
      {
        title: "What are Built-in Modules?",
        level: "Basic",
        answer:
          "Built-in modules are packages that come with Node.js — you don't need to install them. Just require() them and use. The most important ones for MERN interviews are: fs, path, http, os, and events.",
        tip: null,
      },
      {
        title: "fs Module — File System",
        level: "Basic",
        realWorld: "Like a file cabinet manager. Read files, write files, delete files, create folders — all from your Node.js code.",
        code: `const fs = require("fs");

// Read a file (async — non-blocking)
fs.readFile("users.txt", "utf8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});

// Write a file (creates if not exists)
fs.writeFile("log.txt", "User logged in", (err) => {
  if (err) return console.log(err);
  console.log("File saved");
});

// Delete a file
fs.unlink("old.txt", (err) => {
  console.log("File deleted");
});`,
        answer:
          "The fs (file system) module lets you read, write, update, and delete files on your server. It is commonly used for logging, reading config files, and handling file uploads.",
        tip: null,
      },
      {
        title: "path Module",
        level: "Basic",
        code: `const path = require("path");

// Join paths safely (handles / and \\ differences)
const fullPath = path.join(__dirname, "uploads", "image.png");
// Result: /home/user/project/uploads/image.png

// Get just the filename
path.basename("/uploads/image.png"); // "image.png"

// Get just the extension
path.extname("image.png"); // ".png"`,
        answer:
          "The path module helps you work with file and folder paths safely across operating systems. Windows uses backslashes, Mac/Linux use forward slashes — path.join() handles both automatically.",
        tip: "__dirname is a Node.js variable that gives the absolute path to the current file's folder.",
      },
      {
        title: "http Module",
        level: "Basic",
        code: `const http = require("http");

// Create a basic server (this is what Express does under the hood)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});`,
        answer:
          "The http module is what makes Node.js a server. It creates HTTP servers that receive requests and send responses. Express.js is built on top of this module — it just makes the process much simpler and cleaner.",
        tip: "You rarely use http directly in MERN projects — Express handles it. But knowing it exists is important.",
      },
    ],
  },
  {
    id: "streams",
    label: "07 — Streams & Buffers",
    color: "#7c3aed",
    topics: [
      {
        title: "What is a Buffer?",
        level: "Basic",
        realWorld: "When you watch YouTube, the video loads ahead in small chunks before you watch. That temporary storage holding the chunks is a buffer.",
        answer:
          "A Buffer is a temporary storage area in memory for raw binary data (images, videos, files). Node.js uses buffers when handling data that comes in pieces — like file uploads or network packets.",
        tip: null,
      },
      {
        title: "What are Streams?",
        level: "Basic",
        realWorld: "Instead of downloading a full 2GB movie before playing it, Netflix streams it — sending you small chunks so you can start watching immediately. Streams in Node.js work the same way.",
        code: `const fs = require("fs");

// Without streams — loads ENTIRE file into memory (bad for large files)
const data = fs.readFileSync("bigfile.mp4"); // memory intensive

// With streams — reads and processes chunk by chunk (efficient)
const readStream  = fs.createReadStream("bigfile.mp4");
const writeStream = fs.createWriteStream("copy.mp4");

readStream.pipe(writeStream); // pipe: connect read to write like a water pipe`,
        answer:
          "Streams process data in chunks instead of loading everything at once. This saves memory and makes your app faster, especially for large files like videos, images, or CSV exports.",
        tip: "pipe() connects a readable stream to a writable stream — like connecting a water hose from source to destination.",
      },
      {
        title: "Types of Streams",
        level: "Intermediate",
        table: {
          headers: ["Type", "What it does", "Real Example"],
          rows: [
            ["Readable", "Read data in chunks", "Reading a large file"],
            ["Writable", "Write data in chunks", "Writing to a file or HTTP response"],
            ["Duplex", "Both read and write", "Network socket (send and receive)"],
            ["Transform", "Modify data as it flows through", "Compressing a file with gzip"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "env",
    label: "08 — Environment Variables",
    color: "#0e7490",
    topics: [
      {
        title: "What are Environment Variables?",
        level: "Basic",
        realWorld: "Like a secret notepad that only your server can read. Database passwords, API keys, and port numbers go here — not in your code that gets uploaded to GitHub.",
        code: `# .env file — never commit this to GitHub
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=mysupersecretkey123

# In your Node.js code
require("dotenv").config(); // load the .env file

const port      = process.env.PORT;       // 5000
const mongoUri  = process.env.MONGO_URI;  // your DB URL
const jwtSecret = process.env.JWT_SECRET; // your secret`,
        answer:
          "Environment variables store configuration values outside your code. This keeps secrets (passwords, API keys) safe and lets you use different values for development and production without changing code.",
        tip: "Always add .env to .gitignore — never push secrets to GitHub.",
      },
      {
        title: "What is the process object?",
        level: "Basic",
        code: `// process gives info about the running Node.js process
console.log(process.env.PORT);    // read env variables
console.log(process.env.NODE_ENV); // "development" or "production"

// Exit the process (used when DB connection fails)
process.exit(1); // 1 = error exit, 0 = success exit

// Command line arguments
// node app.js hello world
console.log(process.argv); // ["node", "app.js", "hello", "world"]`,
        answer:
          "The process object is a global Node.js object that gives information about the current running process — environment variables, command-line arguments, and control over the process itself.",
        tip: null,
      },
    ],
  },
  {
    id: "architecture",
    label: "09 — Node.js Architecture",
    color: "#16a34a",
    topics: [
      {
        title: "How does Node.js handle multiple requests?",
        level: "Intermediate",
        realWorld: "One chef, many orders. The chef doesn't cook one dish completely before starting another. They start the pasta, put it on the stove, start the salad, check the pasta, plate it — all happening in parallel with one person.",
        code: `// Request 1 — DB query (takes 100ms)
app.get("/users", async (req, res) => {
  const users = await User.find(); // Node hands this to libuv, moves on
  res.json(users);
});

// While that DB query runs, Node handles Request 2 immediately
app.get("/health", (req, res) => {
  res.json({ status: "ok" }); // instant response, no waiting
});

// Node.js handles both — no blocking`,
        answer:
          "Node.js handles multiple requests through the Event Loop. When a request needs a slow operation (DB, file, API), Node.js hands it off to the background (libuv thread pool), immediately moves on to the next request, and comes back with the result when it's ready.",
        tip: null,
      },
      {
        title: "What is the libuv Thread Pool?",
        level: "Intermediate",
        answer:
          "Node.js is single-threaded for JavaScript, but some heavy tasks (file operations, DNS lookups, cryptography like bcrypt) are handled by libuv — a C library that Node.js uses internally. libuv has a thread pool (default 4 threads) that runs these heavy operations in the background while Node.js stays free.",
        tip: "This is why bcrypt.hash() is non-blocking — it runs in the libuv thread pool, not the main JS thread.",
      },
      {
        title: "Cluster Module — Using All CPU Cores",
        level: "Advanced",
        realWorld: "Your computer has 8 CPU cores but Node.js only uses 1. Cluster module lets you run 8 Node.js processes — one per core. 8x more power for your server.",
        code: `const cluster = require("cluster");
const os      = require("os");

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length; // e.g. 8 cores

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // create a worker process for each core
  }

  cluster.on("exit", (worker) => {
    console.log(\`Worker \${worker.process.pid} died, restarting...\`);
    cluster.fork(); // restart crashed workers
  });

} else {
  // Each worker runs the Express app
  app.listen(5000);
}`,
        answer:
          "The Cluster module creates multiple Node.js processes (workers), one per CPU core. All workers share the same port. This multiplies your server's capacity. In production, PM2 does this automatically — you rarely write Cluster code manually.",
        tip: "In interviews, just say: PM2 handles clustering automatically. Cluster is the underlying concept.",
      },
    ],
  },
  {
    id: "errors",
    label: "10 — Error Handling",
    color: "#b45309",
    topics: [
      {
        title: "try/catch in Async Code",
        level: "Basic",
        code: `// Always wrap await calls in try/catch
async function getUser(id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found"); // custom error
    }

    return user;

  } catch (err) {
    console.error("Error:", err.message);
    throw err; // re-throw so the caller can handle it
  }
}`,
        answer:
          "In async/await code, errors from rejected Promises don't crash the app silently — but only if you catch them. Always wrap await in try/catch. Uncaught errors in async functions can cause 'UnhandledPromiseRejection' warnings.",
        tip: null,
      },
      {
        title: "Handling Uncaught Exceptions",
        level: "Intermediate",
        code: `// Catches synchronous errors that were never caught
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1); // restart via PM2 or Docker
});

// Catches async Promise rejections that were never caught
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});`,
        answer:
          "These are safety nets for errors that were never caught anywhere. In production, log the error and restart the process — process managers like PM2 automatically restart crashed Node.js apps.",
        tip: null,
      },
    ],
  },
  {
    id: "npm",
    label: "11 — npm & package.json",
    color: "#64748b",
    topics: [
      {
        title: "What is npm?",
        level: "Basic",
        realWorld: "npm is like an app store for Node.js code. Instead of building everything from scratch, you install packages other developers have already built — like Express, Mongoose, bcrypt, dotenv.",
        code: `npm install express          # install a package
npm install --save-dev nodemon  # dev-only package

npm uninstall express       # remove a package
npm update                  # update all packages

npx create-react-app my-app # run without installing (npx)`,
        answer:
          "npm (Node Package Manager) is the default package manager for Node.js. It lets you install, manage, and share reusable packages. Over 2 million packages are available on npmjs.com.",
        tip: null,
      },
      {
        title: "What is package.json?",
        level: "Basic",
        code: `{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",       // npm start
    "dev":   "nodemon index.js"     // npm run dev
  },
  "dependencies": {
    "express":  "^4.18.2",     // needed in production
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"        // only needed during development
  }
}`,
        answer:
          "package.json is the project's configuration file. It stores the project name, scripts you can run, and all the packages your project depends on. When someone clones your project, they run npm install — Node reads package.json and installs everything.",
        tip: "dependencies run in production. devDependencies are only for development (like nodemon, testing tools).",
      },
      {
        title: "What is package-lock.json?",
        level: "Basic",
        answer:
          "package-lock.json locks the exact version of every installed package (including nested dependencies). This ensures that every developer on your team and your production server installs the exact same versions — preventing 'works on my machine' bugs.",
        tip: "Always commit package-lock.json to Git. Never commit node_modules.",
      },
    ],
  },
  {
    id: "interview",
    label: "12 — Interview Questions",
    color: "#e11d48",
    topics: [
      {
        title: "Top 14 Node.js Fresher Interview Questions",
        level: "Basic",
        table: {
          headers: ["#", "Question", "One-line Answer"],
          rows: [
            ["1", "What is Node.js?", "JavaScript runtime that runs outside the browser"],
            ["2", "Is Node.js single-threaded?", "Yes, but handles concurrency via the Event Loop"],
            ["3", "What is the Event Loop?", "Mechanism that manages async callbacks"],
            ["4", "What is Non-Blocking I/O?", "Starts a task and moves on without waiting"],
            ["5", "What is Callback Hell?", "Deeply nested callbacks — hard to read and maintain"],
            ["6", "What are Promises?", "Object representing future success or failure"],
            ["7", "What is Async/Await?", "Cleaner syntax for Promises using await keyword"],
            ["8", "What is package.json?", "Project config file with dependencies and scripts"],
            ["9", "What is npm?", "Package manager to install and manage libraries"],
            ["10", "What are Streams?", "Process large data in chunks instead of all at once"],
            ["11", "What is a Buffer?", "Temporary memory for binary data"],
            ["12", "What is the fs module?", "Built-in module for file read/write operations"],
            ["13", "What are Environment Variables?", "Config values stored outside code (.env file)"],
            ["14", "require() vs import?", "CommonJS (Node default) vs ES Module syntax"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "Most Common Scenario Question",
        level: "Basic",
        answer:
          "Q: If Node.js is single-threaded, how does it handle thousands of users at the same time?\n\nA: Node.js uses the Event Loop and non-blocking I/O. When a request needs a slow operation like a database query, Node.js doesn't wait — it hands the task off and immediately handles the next request. When the DB query finishes, the Event Loop picks it up and sends the response. One thread, many concurrent requests.",
        tip: "This is the single most asked Node.js concept in MERN fresher interviews. Say it confidently.",
      },
      {
        title: "Complete MERN Stack Flow",
        level: "Basic",
        code: `User clicks "Get Users" button in React
            ↓
React sends GET /api/users (Axios)
            ↓
Express Route receives the request
            ↓
Auth Middleware checks JWT token
            ↓
Controller calls Mongoose
            ↓
Mongoose queries MongoDB
            ↓
Node.js Event Loop handles the async DB call
            ↓
MongoDB returns data
            ↓
Controller sends JSON response
            ↓
React updates the UI`,
        answer:
          "This is the complete picture of how Node.js fits into MERN. Node.js is the runtime that powers Express. Express handles routing and middleware. Mongoose talks to MongoDB. The Event Loop keeps everything non-blocking.",
        tip: null,
      },
    ],
  },
];

const levelColors = {
  Basic:        { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#dbeafe", text: "#1e40af" },
  Advanced:     { bg: "#fce7f3", text: "#9d174d" },
};

export default function NodeGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [openTopics, setOpenTopics]       = useState({});
  const [searchQuery, setSearchQuery]     = useState("");

  const toggleTopic = (sectionId, i) => {
    const key = `${sectionId}-${i}`;
    setOpenTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = sections.map(s => ({
    ...s,
    topics: s.topics.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.answer && t.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(s => s.topics.length > 0);

  const displaySections = searchQuery ? filteredSections : sections;
  const currentSection  = searchQuery ? null : sections[activeSection];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f172a", minHeight: "100vh", color: "#e2e8f0", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "2rem 1.5rem 1.5rem", borderBottom: "1px solid #1e293b" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#f59e0b", color: "#000", fontWeight: 700, fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 99, letterSpacing: "0.1em", textTransform: "uppercase" }}>Interview Prep</span>
            <span style={{ color: "#475569", fontSize: "0.85rem" }}>Basic → Advanced</span>
          </div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, margin: 0, color: "#f1f5f9", letterSpacing: "-0.02em" }}>Node.js Interview Guide</h1>
          <p style={{ margin: "0.4rem 0 1.2rem", color: "#64748b", fontSize: "0.9rem" }}>
            {sections.length} topics · {sections.reduce((a, s) => a + s.topics.length, 0)} questions — simple definitions + real-world examples
          </p>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: "100%", maxWidth: 400, padding: "0.55rem 1rem", borderRadius: 8, border: "1px solid #334155", background: "#1e293b", color: "#e2e8f0", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "1.5rem" }}>
        {!searchQuery && (
          <nav style={{ width: 210, flexShrink: 0, marginRight: "1.5rem" }}>
            {sections.map((s, i) => (
              <button key={s.id} onClick={() => setActiveSection(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.6rem 0.9rem", marginBottom: "0.3rem", borderRadius: 8, border: "none",
                background: activeSection === i ? s.color + "22" : "transparent",
                borderLeft: activeSection === i ? `3px solid ${s.color}` : "3px solid transparent",
                color: activeSection === i ? "#f1f5f9" : "#64748b",
                fontSize: "0.82rem", fontWeight: activeSection === i ? 600 : 400,
                cursor: "pointer", lineHeight: 1.4,
              }}>{s.label}</button>
            ))}
          </nav>
        )}

        <main style={{ flex: 1, minWidth: 0 }}>
          {searchQuery ? (
            displaySections.map(s => (
              <div key={s.id} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: s.color, marginBottom: "0.75rem" }}>{s.label}</h2>
                <TopicList topics={s.topics} sectionId={s.id} sectionColor={s.color} openTopics={openTopics} toggleTopic={toggleTopic} />
              </div>
            ))
          ) : currentSection ? (
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: currentSection.color, marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${currentSection.color}33` }}>
                {currentSection.label}
              </h2>
              <TopicList topics={currentSection.topics} sectionId={currentSection.id} sectionColor={currentSection.color} openTopics={openTopics} toggleTopic={toggleTopic} />
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
        const key    = `${sectionId}-${i}`;
        const isOpen = openTopics[key];
        const lc     = levelColors[topic.level] || levelColors.Basic;

        return (
          <div key={i} style={{ background: "#1e293b", borderRadius: 10, border: `1px solid ${isOpen ? sectionColor + "55" : "#334155"}`, overflow: "hidden" }}>
            <button onClick={() => toggleTopic(sectionId, i)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.85rem 1.1rem", background: "transparent", border: "none",
              color: "#f1f5f9", cursor: "pointer", textAlign: "left", gap: "1rem",
            }}>
              <span style={{ fontWeight: 600, fontSize: "0.92rem", flex: 1 }}>{topic.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                <span style={{ background: lc.bg, color: lc.text, fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: 99 }}>{topic.level}</span>
                <span style={{ color: "#64748b", fontSize: "1rem" }}>{isOpen ? "▲" : "▼"}</span>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: "0 1.1rem 1.1rem", borderTop: "1px solid #334155" }}>

                {/* Real World Example */}
                {topic.realWorld && (
                  <div style={{ marginTop: "0.9rem", padding: "0.65rem 0.9rem", background: "#0f1f0f", border: "1px solid #16a34a44", borderLeft: "3px solid #16a34a", borderRadius: 6, fontSize: "0.82rem", color: "#86efac", lineHeight: 1.6 }}>
                    <span style={{ color: "#4ade80", fontWeight: 700 }}>🌍 Real World: </span>{topic.realWorld}
                  </div>
                )}

                {topic.answer && (
                  <p style={{ margin: "0.9rem 0 0", color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>{topic.answer}</p>
                )}

                {topic.code && (
                  <pre style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "0.9rem 1rem", fontSize: "0.78rem", lineHeight: 1.65, overflowX: "auto", color: "#93c5fd", marginTop: "0.9rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    <code>{topic.code}</code>
                  </pre>
                )}

                {topic.table && (
                  <div style={{ overflowX: "auto", marginTop: "0.9rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                      <thead>
                        <tr>
                          {topic.table.headers.map((h, hi) => (
                            <th key={hi} style={{ background: "#0f172a", color: "#94a3b8", padding: "0.55rem 0.85rem", textAlign: "left", fontWeight: 600, fontSize: "0.78rem", borderBottom: "1px solid #334155" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {topic.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderBottom: "1px solid #1e293b" }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ padding: "0.55rem 0.85rem", color: ci === 0 ? "#e2e8f0" : "#94a3b8", verticalAlign: "top" }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {topic.tip && (
                  <div style={{ marginTop: "0.9rem", padding: "0.65rem 0.9rem", background: "#0f172a", border: `1px solid ${sectionColor}44`, borderLeft: `3px solid ${sectionColor}`, borderRadius: 6, fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6 }}>
                    <span style={{ color: sectionColor, fontWeight: 700 }}>Tip: </span>{topic.tip}
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
