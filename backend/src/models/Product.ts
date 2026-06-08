import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    image: String
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;