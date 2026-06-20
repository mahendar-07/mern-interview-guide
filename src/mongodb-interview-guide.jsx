import { useState } from "react";

const sections = [
  {
    id: "intro",
    label: "01 — What is MongoDB?",
    color: "#16a34a",
    topics: [
      {
        title: "What is MongoDB?",
        level: "Basic",
        answer:
          "MongoDB is an open-source NoSQL database that stores data as documents (JSON-like objects) instead of rows and columns like traditional SQL databases. It is flexible, fast, and scales easily. MongoDB is the 'M' in the MERN stack.",
        tip: "One-liner for interviews: MongoDB is a document-based NoSQL database that stores data in flexible JSON-like format called BSON.",
      },
      {
        title: "What is NoSQL?",
        level: "Basic",
        answer:
          "NoSQL stands for 'Not Only SQL'. It is a type of database that does not use fixed tables and rows. Instead it stores data in formats like documents, key-value pairs, or graphs. MongoDB is a document-based NoSQL database.",
        tip: "NoSQL is not a replacement for SQL — it is an alternative that works better for flexible, fast-changing data.",
      },
      {
        title: "Why MongoDB over SQL?",
        level: "Basic",
        table: {
          headers: ["SQL Database", "MongoDB"],
          rows: [
            ["Fixed table structure", "Flexible document structure"],
            ["Data stored in rows and columns", "Data stored as JSON-like documents"],
            ["Schema must be defined upfront", "Schema can change anytime"],
            ["Harder to scale horizontally", "Easy horizontal scaling"],
            ["MySQL, PostgreSQL", "MongoDB, CouchDB"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "What is BSON?",
        level: "Basic",
        code: `// You write JSON like this:
{
  "name": "Mahendar",
  "age": 22
}

// MongoDB stores it internally as BSON (Binary JSON)
// BSON supports extra types like Date, ObjectId, etc.`,
        answer:
          "BSON stands for Binary JSON. MongoDB stores documents internally in BSON format, which is a binary version of JSON. It supports more data types than JSON (like Date and ObjectId) and is faster to read and write.",
        tip: "You write JSON — MongoDB stores BSON. You don't need to handle BSON manually.",
      },
      {
        title: "MongoDB vs SQL — Terminology",
        level: "Basic",
        table: {
          headers: ["SQL Term", "MongoDB Term", "Meaning"],
          rows: [
            ["Database", "Database", "Container for all data"],
            ["Table", "Collection", "Group of related documents"],
            ["Row", "Document", "Single record"],
            ["Column", "Field", "A property inside a document"],
            ["JOIN", "Embedded Doc / Reference", "Combining related data"],
          ],
        },
        answer: null,
        tip: "Most interviewers ask this comparison table directly.",
      },
    ],
  },
  {
    id: "architecture",
    label: "02 — Architecture",
    color: "#0284c7",
    topics: [
      {
        title: "What is a Database in MongoDB?",
        level: "Basic",
        answer:
          "A database is a container that holds collections. One MongoDB server can have multiple databases. For example, an e-commerce app might have one database called ShopDB that holds all its collections.",
        tip: null,
      },
      {
        title: "What is a Collection?",
        level: "Basic",
        answer:
          "A collection is a group of related documents inside a database. It is the MongoDB equivalent of a SQL table. For example, a users collection holds all user documents.",
        tip: null,
      },
      {
        title: "What is a Document?",
        level: "Basic",
        code: `// A single document (like a row in SQL)
{
  "_id": "64abc123",
  "name": "Mahendar",
  "email": "mahendar@gmail.com",
  "age": 22
}`,
        answer:
          "A document is a single record stored in a collection. It is a JSON-like object made up of key-value pairs called fields. Each document has a unique _id field that MongoDB generates automatically.",
        tip: "_id is like the primary key in SQL — it uniquely identifies each document.",
      },
      {
        title: "MongoDB Structure — Overview",
        level: "Basic",
        code: `MongoDB Server
   └── Database (ShopDB)
         ├── Collection (users)
         │     ├── Document { name: "Mahendar" }
         │     └── Document { name: "John" }
         └── Collection (products)
               └── Document { name: "Laptop" }`,
        answer:
          "MongoDB is organized as: Server → Database → Collection → Document → Fields. This is the complete hierarchy to understand before any interview.",
        tip: null,
      },
    ],
  },
  {
    id: "crud",
    label: "03 — CRUD Operations",
    color: "#7c3aed",
    topics: [
      {
        title: "What are CRUD Operations?",
        level: "Basic",
        table: {
          headers: ["Operation", "MongoDB Method", "What it does"],
          rows: [
            ["Create", "insertOne / insertMany", "Add new documents"],
            ["Read", "find / findOne", "Fetch documents"],
            ["Update", "updateOne / updateMany", "Modify documents"],
            ["Delete", "deleteOne / deleteMany", "Remove documents"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "Create — insertOne and insertMany",
        level: "Basic",
        code: `// Insert a single document
db.users.insertOne({
  name: "Mahendar",
  age: 22,
  email: "mahendar@gmail.com"
});

// Insert multiple documents at once
db.users.insertMany([
  { name: "John", age: 25 },
  { name: "David", age: 30 }
]);`,
        answer:
          "insertOne() adds a single document to a collection. insertMany() adds multiple documents in one operation. MongoDB automatically adds an _id field to each document.",
        tip: null,
      },
      {
        title: "Read — find and findOne",
        level: "Basic",
        code: `// Get all documents
db.users.find();

// Get all users aged 22
db.users.find({ age: 22 });

// Get only the first matching document
db.users.findOne({ name: "Mahendar" });`,
        answer:
          "find() returns all documents that match the filter. findOne() returns only the first matching document. Passing an empty filter {} or no filter returns all documents.",
        tip: null,
      },
      {
        title: "Update — updateOne and updateMany",
        level: "Basic",
        code: `// Update one document — $set changes specific fields
db.users.updateOne(
  { name: "Mahendar" },   // filter: which document
  { $set: { age: 23 } }   // update: what to change
);

// Update all matching documents
db.users.updateMany(
  { status: "active" },
  { $set: { verified: true } }
);`,
        answer:
          "updateOne() updates the first matching document. updateMany() updates all matching documents. Always use the $set operator — without it, MongoDB replaces the entire document with just the new fields.",
        tip: "Always use $set when updating. Without it you will lose all other fields in the document.",
      },
      {
        title: "Delete — deleteOne and deleteMany",
        level: "Basic",
        code: `// Delete one document
db.users.deleteOne({ name: "Mahendar" });

// Delete all inactive users
db.users.deleteMany({ status: "inactive" });`,
        answer:
          "deleteOne() removes the first matching document. deleteMany() removes all matching documents. Always pass a filter — deleteMany({}) with empty filter deletes everything in the collection.",
        tip: null,
      },
    ],
  },
  {
    id: "operators",
    label: "04 — Query Operators",
    color: "#c026d3",
    topics: [
      {
        title: "What are Query Operators?",
        level: "Basic",
        answer:
          "Query operators are special keywords that start with $ used inside MongoDB queries to filter, compare, or logically combine conditions. They help you find documents based on more complex conditions than simple equality.",
        tip: null,
      },
      {
        title: "Comparison Operators",
        level: "Basic",
        code: `// $gt  → greater than
db.users.find({ age: { $gt: 18 } });

// $lt  → less than
db.users.find({ age: { $lt: 30 } });

// $gte → greater than or equal
db.users.find({ age: { $gte: 18 } });

// $lte → less than or equal
db.users.find({ age: { $lte: 60 } });

// $ne  → not equal
db.users.find({ role: { $ne: "admin" } });

// $in  → matches any value in array
db.users.find({ city: { $in: ["Hyderabad", "Bangalore"] } });`,
        table: {
          headers: ["Operator", "Meaning"],
          rows: [
            ["$gt", "Greater than"],
            ["$lt", "Less than"],
            ["$gte", "Greater than or equal"],
            ["$lte", "Less than or equal"],
            ["$ne", "Not equal"],
            ["$in", "Matches any value in an array"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "Logical Operators",
        level: "Basic",
        code: `// $and → both conditions must match
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { city: "Hyderabad" }
  ]
});

// $or → at least one condition must match
db.users.find({
  $or: [
    { city: "Hyderabad" },
    { city: "Bangalore" }
  ]
});

// $not → opposite of condition
db.users.find({
  age: { $not: { $gt: 30 } }
});`,
        answer:
          "$and requires all conditions to be true. $or requires at least one to be true. $not negates a condition. These can be combined to build powerful filters.",
        tip: null,
      },
      {
        title: "Sorting and Limiting",
        level: "Basic",
        code: `// Sort ascending (1) by age
db.users.find().sort({ age: 1 });

// Sort descending (-1) by age
db.users.find().sort({ age: -1 });

// Limit to 5 results
db.users.find().limit(5);

// Pagination — skip first 10, get next 10
db.users.find().skip(10).limit(10);`,
        answer:
          "sort(1) sorts ascending (A-Z, 0-9). sort(-1) sorts descending. limit() restricts the number of results. skip() skips a number of documents — used with limit() for pagination.",
        tip: null,
      },
    ],
  },
  {
    id: "indexing",
    label: "05 — Indexing",
    color: "#d97706",
    topics: [
      {
        title: "What is an Index?",
        level: "Basic",
        answer:
          "An index is a special data structure that MongoDB builds to speed up queries. Without an index, MongoDB scans every single document to find matches (called a collection scan). With an index, it jumps directly to the matching documents — much faster.",
        tip: "Think of an index like a book's index page — instead of reading every page to find a topic, you go straight to the right page number.",
      },
      {
        title: "Creating and Using Indexes",
        level: "Basic",
        code: `// Create a single field index on email
db.users.createIndex({ email: 1 });

// Create a unique index — no duplicate emails allowed
db.users.createIndex({ email: 1 }, { unique: true });

// Compound index — index on multiple fields
db.users.createIndex({ name: 1, age: -1 });

// View all indexes on a collection
db.users.getIndexes();

// Remove an index
db.users.dropIndex({ email: 1 });`,
        answer:
          "createIndex() builds an index on the specified field. 1 means ascending order, -1 means descending. A unique index prevents duplicate values. A compound index covers queries that filter on multiple fields together.",
        tip: null,
      },
      {
        title: "Index Types",
        level: "Intermediate",
        table: {
          headers: ["Index Type", "Purpose"],
          rows: [
            ["Single Field", "Speed up queries on one field"],
            ["Compound", "Speed up queries on multiple fields together"],
            ["Unique", "Prevent duplicate values (e.g. email)"],
            ["Text", "Enable full-text search on string fields"],
            ["TTL (Time To Live)", "Automatically delete documents after a set time (e.g. OTPs, sessions)"],
          ],
        },
        answer: null,
        tip: "TTL index is a common interview question — it automatically expires documents after a duration you set.",
      },
    ],
  },
  {
    id: "aggregation",
    label: "06 — Aggregation",
    color: "#059669",
    topics: [
      {
        title: "What is Aggregation?",
        level: "Basic",
        answer:
          "Aggregation is used to process and analyze documents in a collection — grouping them, counting them, summing values, filtering, and transforming data. It works like a pipeline where documents pass through multiple stages and are transformed at each step.",
        tip: "Think of aggregation like an assembly line — documents enter at one end, pass through each stage, and come out transformed.",
      },
      {
        title: "Aggregation Pipeline — Common Stages",
        level: "Intermediate",
        code: `db.orders.aggregate([

  // Stage 1 — $match: filter documents (like find)
  { $match: { status: "completed" } },

  // Stage 2 — $group: group by category, sum the amount
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  },

  // Stage 3 — $sort: sort by totalSales descending
  { $sort: { totalSales: -1 } },

  // Stage 4 — $limit: return top 5
  { $limit: 5 }

]);`,
        table: {
          headers: ["Stage", "What it does"],
          rows: [
            ["$match", "Filter documents — like a WHERE clause in SQL"],
            ["$group", "Group documents by a field and run calculations"],
            ["$sort", "Sort the results"],
            ["$limit", "Return only N documents"],
            ["$project", "Choose which fields to include or exclude"],
            ["$lookup", "Join data from another collection"],
            ["$unwind", "Flatten an array field into separate documents"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "replication",
    label: "07 — Replication & Sharding",
    color: "#e11d48",
    topics: [
      {
        title: "What is Replication?",
        level: "Basic",
        answer:
          "Replication means keeping multiple copies of the same data on different servers (called a Replica Set). If the primary server goes down, one of the secondary servers automatically takes over. This ensures the application stays available even during server failures.",
        tip: "Replication = high availability. Sharding = horizontal scaling for large data.",
      },
      {
        title: "What is Sharding?",
        level: "Basic",
        answer:
          "Sharding is the process of splitting a large dataset across multiple servers (called shards). Instead of storing all data on one server, each shard holds a portion of the data. This allows MongoDB to handle much larger datasets and higher traffic.",
        tip: null,
      },
      {
        title: "Replication vs Sharding",
        level: "Basic",
        table: {
          headers: ["Replication", "Sharding"],
          rows: [
            ["Copies data to multiple servers", "Splits data across multiple servers"],
            ["Ensures high availability and backup", "Ensures scalability for large datasets"],
            ["Uses Replica Sets", "Uses Shard Clusters"],
            ["All servers have the same data", "Each server has a different portion of data"],
          ],
        },
        answer: null,
        tip: null,
      },
    ],
  },
  {
    id: "mongoose",
    label: "08 — Mongoose Basics",
    color: "#6366f1",
    topics: [
      {
        title: "What is Mongoose?",
        level: "Basic",
        answer:
          "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It adds structure to MongoDB by letting you define schemas (blueprints) for your data, validates input before saving, and provides clean methods to interact with MongoDB.",
        tip: "Without Mongoose, MongoDB accepts any data with no validation. Mongoose adds rules and structure.",
      },
      {
        title: "Why use Mongoose over plain MongoDB driver?",
        level: "Basic",
        code: `// Without Mongoose — no validation, anything goes
db.users.insertOne({ name: 12345, age: "twenty" }); // no error!

// With Mongoose — validation enforced
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age:  { type: Number, required: true },
});
// Now inserting wrong types throws a validation error`,
        answer:
          "Mongoose gives you schema definition, automatic validation, middleware (hooks), relationship handling with populate(), and cleaner query methods. The plain MongoDB driver has none of this.",
        tip: null,
      },
      {
        title: "Connecting to MongoDB with Mongoose",
        level: "Basic",
        code: `const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Connection Failed:", err.message);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;

// In index.js — call before starting the server
connectDB();
app.listen(5000);`,
        answer:
          "Always put the connection logic in a separate config/db.js file. Use process.exit(1) if connection fails — there's no point running the server without a database. Read the connection string from .env, never hardcode it.",
        tip: null,
      },
    ],
  },
  {
    id: "schema-model",
    label: "09 — Schema & Model",
    color: "#0e7490",
    topics: [
      {
        title: "What is a Schema?",
        level: "Basic",
        code: `const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:     { type: String,  required: true },
  email:    { type: String,  required: true, unique: true },
  password: { type: String,  required: true },
  age:      { type: Number,  min: 18 },
  role:     { type: String,  enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true }); // adds createdAt and updatedAt automatically`,
        answer:
          "A Schema is a blueprint that defines the structure of documents in a collection. It specifies field names, data types, validation rules, and default values. Every document saved through Mongoose must follow the schema.",
        tip: "timestamps: true automatically adds createdAt and updatedAt to every document — always use it.",
      },
      {
        title: "What is a Model?",
        level: "Basic",
        code: `// Create a Model from the Schema
const User = mongoose.model("User", userSchema);

// Mongoose automatically creates a collection named "users" (lowercased + pluralized)

module.exports = User;`,
        answer:
          "A Model is a JavaScript class created from a Schema. It gives you all the methods to interact with the collection — find(), create(), update(), delete(), etc. The model name 'User' maps to the 'users' collection in MongoDB.",
        tip: null,
      },
      {
        title: "Schema vs Model",
        level: "Basic",
        table: {
          headers: ["Schema", "Model"],
          rows: [
            ["Defines the structure and rules", "Provides methods to interact with DB"],
            ["Like a blueprint or template", "Like a class created from the blueprint"],
            ["new mongoose.Schema({})", "mongoose.model('Name', schema)"],
            ["No DB access on its own", "Used to create, read, update, delete"],
          ],
        },
        answer: null,
        tip: null,
      },
      {
        title: "Common Mongoose CRUD Operations",
        level: "Basic",
        code: `// CREATE
const user = await User.create({ name, email, password });

// READ — all
const users = await User.find();

// READ — with filter
const admins = await User.find({ role: "admin" });

// READ — by ID
const user = await User.findById(req.params.id);

// UPDATE — { new: true } returns updated doc, not old
const updated = await User.findByIdAndUpdate(
  id, { age: 25 }, { new: true }
);

// DELETE
await User.findByIdAndDelete(id);

// Hide password from results
const users = await User.find().select("-password");`,
        answer:
          "These are the most commonly used Mongoose methods. findByIdAndUpdate with { new: true } is a very common interview question — without it, the method returns the old document before the update.",
        tip: "Always use .select('-password') when returning user data — never expose passwords in API responses.",
      },
    ],
  },
  {
    id: "validations",
    label: "10 — Validations & Middleware",
    color: "#b45309",
    topics: [
      {
        title: "Schema Validations",
        level: "Basic",
        code: `const userSchema = new mongoose.Schema({

  name: {
    type:      String,
    required:  [true, "Name is required"],   // required with custom message
    trim:      true,                          // removes leading/trailing spaces
    maxlength: 50
  },

  email: {
    type:   String,
    required: true,
    unique: true,   // no two users can have same email
    lowercase: true // always store as lowercase
  },

  password: {
    type:      String,
    required:  true,
    minlength: 6
  },

  role: {
    type:    String,
    enum:    ["user", "admin"],  // only these two values allowed
    default: "user"
  },

  age: {
    type: Number,
    min: 18,
    max: 100
  }

});`,
        answer:
          "Mongoose validates data before saving to the database. required prevents empty values. unique prevents duplicates. enum restricts values to a specific list. min/max validate number ranges. minlength/maxlength validate string length.",
        tip: null,
      },
      {
        title: "What is Mongoose Middleware (Hooks)?",
        level: "Intermediate",
        answer:
          "Mongoose middleware (also called hooks) are functions that run automatically before or after certain database operations like save, find, update, or delete. Pre hooks run before the operation. Post hooks run after.",
        tip: null,
      },
      {
        title: "Pre Save Hook — Password Hashing",
        level: "Intermediate",
        code: `const bcrypt = require("bcryptjs");

// This runs automatically BEFORE every .save()
userSchema.pre("save", async function (next) {

  // Only hash if password field was changed
  if (!this.isModified("password")) return next();

  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 10);

  next();
});`,
        answer:
          "The pre('save') hook runs before every document save. Using this.isModified('password') checks if the password actually changed — so it doesn't re-hash an already hashed password on profile updates. This is the standard, clean way to hash passwords in Mongoose.",
        tip: "This is one of the most commonly asked Mongoose interview questions. Know it well.",
      },
    ],
  },
  {
    id: "relationships",
    label: "11 — Populate & Relationships",
    color: "#7c3aed",
    topics: [
      {
        title: "Embedding vs Referencing",
        level: "Intermediate",
        code: `// EMBEDDING — store address inside user document
{
  "name": "Mahendar",
  "address": {
    "city": "Hyderabad",
    "pincode": "500001"
  }
}

// REFERENCING — store only the ID, fetch separately
// User document
{ "_id": "123", "name": "Mahendar" }

// Post document — stores user's _id
{ "title": "MongoDB Guide", "userId": "123" }`,
        table: {
          headers: ["Embedding", "Referencing"],
          rows: [
            ["Data stored inside the same document", "Only the ID is stored, data is in another collection"],
            ["Faster reads — one query", "Requires populate() to fetch related data"],
            ["Good for small, related data", "Good for large or frequently reused data"],
            ["E.g. address inside user", "E.g. posts linked to users by userId"],
          ],
        },
        answer: null,
        tip: "Use embedding when you always access the data together. Use referencing when data is large or shared across multiple collections.",
      },
      {
        title: "What is populate()?",
        level: "Intermediate",
        code: `// Schema — post references a user by ObjectId
const postSchema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // tells Mongoose which model to reference
  }
});

// Without populate — returns just the userId
const post = await Post.findById(id);
// { title: "MongoDB", user: "64abc123" }

// With populate — replaces userId with actual user data
const post = await Post.findById(id).populate("user");
// { title: "MongoDB", user: { name: "Mahendar", email: "..." } }`,
        answer:
          "populate() replaces a referenced ObjectId with the actual document data from the related collection. It is Mongoose's way of doing a JOIN — linking two collections together. The ref field in the schema tells Mongoose which Model to look up.",
        tip: "populate() is asked in almost every MERN interview. Understand what it does and when to use it.",
      },
    ],
  },
  {
    id: "advanced",
    label: "12 — Advanced MongoDB",
    color: "#dc2626",
    topics: [
      {
        title: "Pagination with skip and limit",
        level: "Intermediate",
        code: `// GET /api/users?page=2&limit=10
const page  = Number(req.query.page)  || 1;
const limit = Number(req.query.limit) || 10;
const skip  = (page - 1) * limit;

const total = await User.countDocuments();
const users = await User.find().skip(skip).limit(limit);

res.json({
  data: users,
  total,
  page,
  pages: Math.ceil(total / limit)
});`,
        answer:
          "Pagination avoids loading thousands of records at once. skip() jumps past already-seen documents. limit() controls how many to return. Always return total and total pages so the frontend can render navigation controls.",
        tip: null,
      },
      {
        title: "lean() — Performance Optimization",
        level: "Advanced",
        code: `// Normal query — returns full Mongoose documents (heavy)
const users = await User.find();

// lean() — returns plain JavaScript objects (lighter, faster)
const users = await User.find().lean();`,
        answer:
          "By default, Mongoose wraps results in Mongoose Document objects which include methods like .save() and .validate(). lean() returns plain JavaScript objects instead — much lighter and faster. Use lean() when you only need to read data and don't need Mongoose document methods.",
        tip: null,
      },
      {
        title: "Transactions",
        level: "Advanced",
        code: `// Use when multiple operations must all succeed or all fail
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.findByIdAndUpdate(fromId, { $inc: { balance: -500 } }, { session });
  await Account.findByIdAndUpdate(toId,   { $inc: { balance: +500 } }, { session });

  await session.commitTransaction(); // both succeeded — save
} catch (err) {
  await session.abortTransaction();  // one failed — undo everything
} finally {
  session.endSession();
}`,
        answer:
          "Transactions ensure multiple database operations either all succeed or all fail together. Without transactions, if transferring money between accounts fails halfway, one account loses money but the other doesn't receive it. Transactions prevent this inconsistency.",
        tip: "Transactions require MongoDB replica sets — they don't work on standalone instances.",
      },
      {
        title: "Virtuals",
        level: "Advanced",
        code: `userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Now you can access user.fullName
// But it is NOT stored in the database — computed on the fly`,
        answer:
          "Virtuals are computed properties on Mongoose documents that are not stored in MongoDB. They are calculated from existing fields when accessed. Useful for things like combining firstName and lastName into fullName without storing a duplicate field.",
        tip: null,
      },
      {
        title: "What is MongoDB Atlas?",
        level: "Basic",
        answer:
          "MongoDB Atlas is MongoDB's official cloud database service. Instead of installing and managing MongoDB on your own server, Atlas hosts it for you with automatic backups, scaling, and monitoring. It has a free tier — perfect for learning and small projects. In MERN projects, the MONGO_URI in .env points to an Atlas cluster.",
        tip: null,
      },
    ],
  },
  {
    id: "mern",
    label: "13 — MongoDB in MERN",
    color: "#16a34a",
    topics: [
      {
        title: "Why MongoDB in the MERN Stack?",
        level: "Basic",
        answer:
          "MongoDB fits naturally into the MERN stack because all layers use JavaScript and JSON. React sends JSON from the frontend. Express and Node handle JSON on the backend. MongoDB stores JSON-like documents. There is no data format conversion needed at any layer — making development faster and more consistent.",
        tip: null,
      },
      {
        title: "Complete MERN Data Flow",
        level: "Basic",
        code: `React Form (user input as JSON)
        ↓
Axios Request (POST /api/users)
        ↓
Express Route (/api/users)
        ↓
Middleware (express.json, auth)
        ↓
Controller (business logic)
        ↓
Mongoose Model (User.create())
        ↓
MongoDB (stores the document)
        ↓
Response sent back to React
        ↓
React updates the UI`,
        answer:
          "This is the complete request flow in a MERN application. Understanding this end-to-end flow is one of the most commonly asked MERN interview questions — know every step.",
        tip: "Interviewers often ask: 'Walk me through what happens when a user submits a login form.' This flow is your answer.",
      },
      {
        title: "Top 14 MongoDB Fresher Interview Questions",
        level: "Basic",
        table: {
          headers: ["#", "Question"],
          rows: [
            ["1", "What is MongoDB?"],
            ["2", "Difference between SQL and MongoDB?"],
            ["3", "What is NoSQL?"],
            ["4", "What is a Collection vs a Document?"],
            ["5", "What is BSON?"],
            ["6", "What are CRUD operations?"],
            ["7", "What is Mongoose?"],
            ["8", "What is the difference between Schema and Model?"],
            ["9", "What is populate()?"],
            ["10", "What is indexing and why is it used?"],
            ["11", "What is aggregation?"],
            ["12", "Embedding vs Referencing — when to use each?"],
            ["13", "What are Mongoose validations?"],
            ["14", "Why use MongoDB in the MERN stack?"],
          ],
        },
        answer: null,
        tip: "If you can confidently answer these 14 questions with examples, you are well prepared for most fresher MongoDB interview rounds.",
      },
    ],
  },
];

const levelColors = {
  Basic:        { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#dbeafe", text: "#1e40af" },
  Advanced:     { bg: "#fce7f3", text: "#9d174d" },
};

export default function MongoDBGuide({ searchQuery: searchQueryProp = "", darkMode = true }) {
  const [activeSection, setActiveSection] = useState(0);
  const [openTopics, setOpenTopics] = useState({});
  const searchQuery = searchQueryProp;

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
  const currentSection = searchQuery ? null : sections[activeSection];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: darkMode ? "#0f172a" : "#ffffff", minHeight: "100vh", color: darkMode ? "#e2e8f0" : "#1e293b", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "2rem 1.5rem 1.5rem", borderBottom: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 99, letterSpacing: "0.1em", textTransform: "uppercase" }}>Interview Prep</span>
            <span style={{ color: darkMode ? "#475569" : "#64748b", fontSize: "0.85rem" }}>Basic → Advanced</span>
          </div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, margin: 0, color: darkMode ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.02em" }}>MongoDB Interview Guide</h1>
          <p style={{ margin: "0.4rem 0 1.2rem", color: darkMode ? "#64748b" : "#64748b", fontSize: "0.9rem" }}>
            {sections.length} topics · {sections.reduce((a, s) => a + s.topics.length, 0)} questions — fresher to 2-year experience
          </p>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: "100%", maxWidth: 400, padding: "0.55rem 1rem", borderRadius: 8, border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0", background: darkMode ? "#1e293b" : "#f1f5f9", color: darkMode ? "#e2e8f0" : "#1e293b", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "1.5rem" }}>
        {!searchQuery && (
          <nav style={{ width: 210, flexShrink: 0, marginRight: "1.5rem" }}>
            {sections.map((s, i) => (
              <button key={s.id} onClick={() => setActiveSection(i)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "0.6rem 0.9rem",
                marginBottom: "0.3rem", borderRadius: 8, border: "none",
                background: activeSection === i ? s.color + "22" : "transparent",
                borderLeft: activeSection === i ? `3px solid ${s.color}` : "3px solid transparent",
                color: activeSection === i ? "#f1f5f9" : "#64748b",
                fontSize: "0.82rem", fontWeight: activeSection === i ? 600 : 400,
                cursor: "pointer", transition: "all 0.15s", lineHeight: 1.4,
              }}>{s.label}</button>
            ))}
          </nav>
        )}

        <main style={{ flex: 1, minWidth: 0 }}>
          {searchQuery ? (
            displaySections.map(s => (
              <div key={s.id} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: s.color, marginBottom: "0.75rem" }}>{s.label}</h2>
                <TopicList topics={s.topics} sectionId={s.id} sectionColor={s.color} openTopics={openTopics} toggleTopic={toggleTopic}   darkMode={darkMode}/>
              </div>
            ))
          ) : currentSection ? (
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: currentSection.color, marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${currentSection.color}33` }}>
                {currentSection.label}
              </h2>
              <TopicList topics={currentSection.topics} sectionId={currentSection.id} sectionColor={currentSection.color} openTopics={openTopics} toggleTopic={toggleTopic}   darkMode={darkMode}/>
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
          <div key={i} style={{ background: darkMode ? "#1e293b" : "#f1f5f9", borderRadius: 10, border: `1px solid ${isOpen ? sectionColor + "55" : "#334155"}`, overflow: "hidden" }}>
            <button onClick={() => toggleTopic(sectionId, i)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.85rem 1.1rem", background: "transparent", border: "none",
              color: darkMode ? "#f1f5f9" : "#0f172a", cursor: "pointer", textAlign: "left", gap: "1rem",
            }}>
              <span style={{ fontWeight: 600, fontSize: "0.92rem", flex: 1 }}>{topic.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                <span style={{ background: lc.bg, color: lc.text, fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: 99 }}>{topic.level}</span>
                <span style={{ color: darkMode ? "#64748b" : "#64748b", fontSize: "1rem" }}>{isOpen ? "▲" : "▼"}</span>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: "0 1.1rem 1.1rem", borderTop: "1px solid #334155" }}>
                {topic.answer && (
                  <p style={{ margin: "0.9rem 0 0", color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.7 }}>{topic.answer}</p>
                )}
                {topic.code && (
                  <pre style={{ background: darkMode ? "#0f172a" : "#ffffff", border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0", borderRadius: 8, padding: "0.9rem 1rem", fontSize: "0.78rem", lineHeight: 1.65, overflowX: "auto", color: "#93c5fd", marginTop: "0.9rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    <code>{topic.code}</code>
                  </pre>
                )}
                {topic.table && (
                  <div style={{ overflowX: "auto", marginTop: "0.9rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                      <thead>
                        <tr>
                          {topic.table.headers.map((h, hi) => (
                            <th key={hi} style={{ background: darkMode ? "#0f172a" : "#ffffff", color: darkMode ? "#94a3b8" : "#475569", padding: "0.55rem 0.85rem", textAlign: "left", fontWeight: 600, fontSize: "0.78rem", borderBottom: darkMode ? "1px solid #334155" : "1px solid #e2e8f0" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {topic.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderBottom: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0" }}>
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
                  <div style={{ marginTop: "0.9rem", padding: "0.65rem 0.9rem", background: darkMode ? "#0f172a" : "#ffffff", border: `1px solid ${sectionColor}44`, borderLeft: `3px solid ${sectionColor}`, borderRadius: 6, fontSize: "0.82rem", color: darkMode ? "#94a3b8" : "#475569", lineHeight: 1.6 }}>
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
