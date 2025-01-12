import fs from "fs";
import { productModel } from "../Models/product.model.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        res.status(500).send({ success: false, message: "name is required" });
      case !description:
        res
          .status(500)
          .send({ success: false, message: "description is required" });
      case !price:
        res.status(500).send({ success: false, message: "price is required" });
      case !category:
        res
          .status(500)
          .send({ success: false, message: "category is required" });
      case !quantity:
        res
          .status(500)
          .send({ success: false, message: "quantity is required" });
      case !name:
        res
          .status(500)
          .send({ success: false, message: "shipping is required" });
      case photo && photo > 100000:
        res.status(500).send({
          success: false,
          message: "photo is required and less than than 1 mb",
        });
    }
    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: " product created successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in create product controller",
      err,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(500).send({
      success: true,
      total: products.length,
      message: "All product found",
      app_products: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in getAll product controller",
      err,
    });
  }
};
export const getOneProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Produt Found Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in get One product controller",
      err,
    });
  }
};

export const removeOneProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findByIdAndDelete(pid);
    res.status(200).send({
      success: true,
      message: "Produt Removed Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in remove product controller",
      err,
    });
  }
};

export const getPhotoProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send({
        success: true,
        message: "Produt photo got Successfully",
        product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in photo product controller",
      err,
    });
  }
};
