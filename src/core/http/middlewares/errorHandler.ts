import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error("❌ ERRO:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
}
