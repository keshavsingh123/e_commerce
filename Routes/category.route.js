import {
  categoryController,
  updateController,
  allCatController,
  deleteController,
  getSingleCat,
} from "../Controllers/category.controller.js";
import { isAdmin, requireSignIn } from "../Middlewares/auth.middleware.js";
import express from "express";
const catRoute = express.Router();

catRoute.post("/create-category", requireSignIn, isAdmin, categoryController);
catRoute.put("/update-category/:id", requireSignIn, isAdmin, updateController);
catRoute.get("/categories", allCatController);
catRoute.delete("/remove-cat/:id", requireSignIn, isAdmin, deleteController);
catRoute.get("/single-cat/:slug", getSingleCat);

export default catRoute;
