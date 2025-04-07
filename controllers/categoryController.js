import ErrorResponse from "../utils/ErrorResponse.js";
import { Product, Category } from "../models/index.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const getCategoryById = async (req, res) => {
  //   console.log("Received GET request to/users/:id");
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id, { include: Product });
    if (!category)
      return res.status(404).json({ message: "category not found" });
    res.json({ data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createCategory = async (req, res, next) => {
  //   console.log("BODY: ", req.body);
  const { name } = req.body;

  if (!name) throw new ErrorResponse("name is required", 400);
  const found = await Category.findOne({ where: { name } });
  if (found)
    throw new ErrorResponse("Category with that name already exists", 409);
  const category = await Category.create(req.body);
  res.json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.update(
      { name },
      { where: { id }, returning: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res
      .status(200)
      .json({ message: "Category successfully updated.", data: category[1] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await Category.destroy({ where: { id } });
    res.json({ message: "Category deleted successfully ." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
