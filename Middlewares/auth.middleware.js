import jwt from "jsonwebtoken";
import { userModel } from "../Models/user.model.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ success: false, message: "Token missing" });
    }
    const decode = jwt.verify(token, process.env.JSON_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in signin",
      err,
    });
  }
};
//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(500).send({
        success: false,
        message: "unauthorized access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in admin auth",
      err,
    });
  }
};
