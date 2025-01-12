import { catModel } from "../Models/category.model.js";
import slugify from "slugify";
export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({
        success: false,
        message: " category name is Required",
      });
    }
    const existingCat = await catModel.findOne({ name });
    if (existingCat) {
      res.status(500).send({
        success: false,
        message: " category name already present",
      });
    }
    const category = await new catModel({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: " category created successfully",
      category,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in category controller",
      err,
    });
  }
};
export const updateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await catModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: " category update successfully",
      category,
    });
  } catch (err) {
    res.status(500).send({
      message: "error in category update controller",
      err,
    });
  }
};
export const allCatController = async (req, res) => {
  try {
    const allCat = await catModel.find();
    res.status(200).send({
      success: true,
      message: " All categories",
      category: allCat,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in get All category  controller",
      err,
    });
  }
};
export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    await catModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in delete category controller",
      err,
    });
  }
};

export const getSingleCat = async (req, res) => {
  try {
    const oneCategory = await catModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: " get by id category",
      category: oneCategory,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in get category controller",
      err,
    });
  }
};
