import express from "express";
import {
  registerController,
  loginController,
} from "../Controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

export default authRoute;
