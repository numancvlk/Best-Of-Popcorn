import express from "express";
import connectDB from "./config/db";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  console.log("API ÇALISIYOR");
});

connectDB();

app.listen(PORT, () => {
  console.log(`${PORT} dinlemede`);
});
