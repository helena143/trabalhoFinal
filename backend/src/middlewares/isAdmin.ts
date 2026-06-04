import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Não autenticado",
    });
  }

  // ✅ O JWT assina { id, role } — checar role === "admin"
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Acesso negado: apenas administradores",
    });
  }

  next();
};
