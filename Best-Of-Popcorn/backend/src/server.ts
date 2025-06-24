import express from "express";
import dotenv from "dotenv";

//-----------SCRİPTS------------
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  console.log("API ÇALISIYOR");
  res.send("Çalısıyor");
});

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`${PORT} dinlemede`);
});
console.log("Sunucu başlatılırken kullanılan PORT değeri:", PORT);
