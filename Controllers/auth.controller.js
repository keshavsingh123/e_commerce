import { Error } from "mongoose";
import { userModel } from "../Models/user.model.js";
import { comparePassword, hashPassword } from "../Utils/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      res.send({ success: false, message: "please provide name" });
    }
    if (!email) {
      res.send({ success: false, message: "please provide email" });
    }
    if (!password) {
      res.send({ success: false, message: "please provide password" });
    }
    if (!phone || !address) {
      res.send({ success: false, message: "please provide phone no." });
    }
    if (!address) {
      res.send({ success: false, message: "please provide address" });
    }
    if (!answer) {
      res.send({ success: false, message: "please provide answer" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "already registered pls login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    return res.status(200).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.send({ success: false, message: "email not found" });
    }
    if (!password) {
      res.send({ success: false, message: "password not found" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JSON_SECRET, {
      expiresIn: "7h",
    });
    return res.status(200).send({
      success: true,
      message: "login successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in login",
      err,
    });
  }
};

//forgetPasswordController
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      res.status(404).send({
        success: false,
        message: "email not found",
      });
    }
    if (!answer || !newPassword) {
      res.status(404).send({
        success: false,
        message: "answer not found",
      });
    }
    if (!newPassword) {
      res.status(404).send({
        success: false,
        message: "password not found",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(400).send({ success: false, message: "user not found" });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findOneAndUpdate({ id: user._id, password: hashed });
    res.status(200).send({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in password updation",
      err,
    });
  }
};
