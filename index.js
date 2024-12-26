import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { db } from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./Routes/auth.route.js";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce");
});

app.listen(process.env.PORT, () => {
  db();
  console.log(`Server is running on port ${process.env.PORT}`.bgGreen.black);
});
