import { Request, Response } from "express";
import Coupon from "../../models/Coupon";

export const validateCoupon = async (
  req: Request,
  res: Response
) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Informe um cupom",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Cupom inválido",
      });
    }

    if (
      coupon.expiresAt &&
      coupon.expiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Cupom expirado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cupom aplicado com sucesso",
      coupon: {
        code: coupon.code,
        discount: coupon.discount,
      },
    });
  } catch (error) {
    console.error("Erro ao validar cupom:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};