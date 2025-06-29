import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/product.model.js";

dotenv.config();
await connectDB();

const seedProducts = [
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 25,
    imageURL: "https://via.placeholder.com/150",
    category: "Electronics",
  },
  {
    title: "Running Shoes",
    description: "Lightweight and comfortable",
    price: 50,
    imageURL: "https://via.placeholder.com/150",
    category: "Footwear",
  },
];

try {
  await Product.deleteMany();
  await Product.insertMany(seedProducts);
  console.log("Products seeded!");
  process.exit();
} catch (err) {
  console.error(err);
  process.exit(1);
}
