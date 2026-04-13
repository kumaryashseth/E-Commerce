import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoute from './routes/authRoute.js'
import cors from "cors"


dotenv.config();

db();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/api",authRoute)


app.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});