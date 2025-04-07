import ErrorResponse from "../utils/ErrorResponse.js";
import Product from "../models/Product.js";

// GET /products ALL
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// GET /products/:id
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// POST /products
const createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    if (!name || !price || !description || !categoryId)
      throw new ErrorResponse(
        "Name, Price, Description, and CategoryId are required.",
        400
      );
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
