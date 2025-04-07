import { Router } from "express";
import {
  getCategoryById,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { CategorySchema } from "../schemas/CategorySchema.js";
import validateCategory from "../middleware/validateCategory.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(getCategories)
  .post(validateCategory(CategorySchema), createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
