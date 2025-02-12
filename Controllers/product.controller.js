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
      case !shipping:
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
    const allProducts = await productModel
      .find({})
      .select("-photo") // deselecting photo here - minus
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: allProducts.length,
      message: "All product found",
      allProducts,
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
      message: "Product Found Successfully",
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
    console.log("Product ID:", pid);
    await productModel.findByIdAndDelete(pid);
    res.status(200).send({
      success: true,
      message: "Produt Removed Successfully",
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
        productPhoto: product,
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

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    const { pid } = req.params;
    const product = await productModel.findByIdAndUpdate(
      pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: " product updated successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in update product controller",
      err,
    });
  }
};

export const filterProduct = async (req, res) => {
  try {
    const { radio, checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = { $in: checked }; // Filters products that match any selected category;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(201).send({
      success: true,
      message: "filtered succesfully",
      products,
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "something went wrong in filter",
    });
  }
};

export const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(201).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "something went wrong in count",
    });
  }
};
export const productListPage = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? parseInt(req.params.page, 4) : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "something went wrong in listPage",
    });
  }
};
