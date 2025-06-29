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

// CREATE new product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, imageURL, category, inStock, quantity } = req.body;

    if (!title || !price || quantity === undefined) {
      return res.status(400).json({ error: "Title, price, and quantity are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      imageURL,
      category,
      inStock,
      quantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// UPDATE product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    updatedProduct
      ? res.status(200).json(updatedProduct)
      : res.status(404).json({ error: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    deletedProduct
      ? res.status(200).json({ message: "Product deleted successfully" })
      : res.status(404).json({ error: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};