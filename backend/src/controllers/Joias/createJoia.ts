import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const createJoia = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image  // aceita URL externa também

    const joia = await Joias.create({
      name, description, price, stock, category, image
    })

    return res.status(201).json({ message: "Joia criada com sucesso", joia })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
};
