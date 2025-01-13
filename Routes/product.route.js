import ExpressFormidable from "express-formidable"; //for image upload
import {
  createProduct,
  getProductController,
  getOneProductController,
  removeOneProductController,
  getPhotoProductController,
  updateProduct,
} from "../Controllers/product.controller.js";
import { isAdmin, requireSignIn } from "../Middlewares/auth.middleware.js";
import express from "express";
const prodRoute = express.Router();

prodRoute.post(
  "/create_product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProduct
);
prodRoute.put(
  "/update_product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProduct
);
prodRoute.get("/get_products", getProductController);
prodRoute.get("/get_product/:slug", getOneProductController);
prodRoute.get("/get_product_photo/:pid", getPhotoProductController);

prodRoute.delete("/delete_product/:pid", removeOneProductController);

export default prodRoute;
