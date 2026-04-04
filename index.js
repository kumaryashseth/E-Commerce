import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

// connect database
db();

const app = express();

// middleware (good practice)
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

// ❌ wrong: 8000 || process.env.PORT
// ✅ correct:
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});