import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ error: "Not found" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
