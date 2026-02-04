import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server started at localhost:5001");
  });
});
