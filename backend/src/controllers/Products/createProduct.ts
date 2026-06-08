import { Request, Response } from "express";
import Product from "../../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, stock, category, description } = req.body;

    const image = req.file
      ? `/public/products/${req.file.filename}`
      : null;

    const product = await Product.create({
      name,
      price,
      stock,
      category,
      description,
      image
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log("ERRO CREATE:", error);
    return res.status(500).json({ message: "Erro ao criar produto" });
  }
};