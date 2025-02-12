import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { db } from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./Routes/auth.route.js";
import catRoute from "./Routes/category.route.js";
import prodRoute from "./Routes/product.route.js";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catRoute);
app.use("/api/v1/product", prodRoute);

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce");
});

app.listen(process.env.PORT, () => {
  db();
  console.log(`Server is running on port ${process.env.PORT}`.bgGreen.black);
});
