// src/core/http/middlewares/notFound.ts
import { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(404).json({
    status: "error",
    message: "Rota não encontrada",
    path: req.originalUrl,
  });
}