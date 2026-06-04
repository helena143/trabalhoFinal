import { Request, Response } from "express";
import Casamento from "../../models/Casamento";

export const getAllCasamentos = async (
  req: Request,
  res: Response
) => {
  try {
    const casamentos = await Casamento.find();

    return res.status(200).json({
      success: true,
      data: casamentos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar casamentos",
    });
  }
};