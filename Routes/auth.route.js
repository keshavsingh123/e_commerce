import express from "express";
import {
  registerController,
  loginController,
} from "../Controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.get("/user-auth", (req, res) => {
  res.status(200).send({ ok: true });
});

export default authRoute;
