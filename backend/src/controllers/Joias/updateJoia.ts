import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const updateJoia = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const update: any = {};
    if (name)        update.name        = name;
    if (description) update.description = description;
    if (price)       update.price       = Number(price);
    if (stock !== undefined) update.stock = Number(stock);
    if (category)    update.category    = category;

    // Só troca a imagem se uma nova foi enviada
    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    }

    const joia = await Joias.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!joia) {
      return res.status(404).json({ message: "Joia não encontrada." });
    }

    return res.status(200).json({
      message: "Joia atualizada com sucesso",
      joia,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};