import ProductSchema from "../schemas/ProductSchema.js";
import validateProduct from "../middleware/validateProduct.js";
import { Router } from "express";

import {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(validateProduct(ProductSchema), createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default productRouter;
