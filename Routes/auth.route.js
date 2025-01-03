import express from "express";
import {
  registerController,
  loginController,
  forgetPasswordController,
} from "../Controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../Middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
//Forget Password || POST
authRoute.post("/forget-password", forgetPasswordController);

authRoute.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

authRoute.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default authRoute;
