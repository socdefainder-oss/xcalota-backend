import { Router } from "express";
import restaurantRoutes from "./restaurant.routes";

const router = Router();

// ✅ Health sempre simples
router.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// ✅ Rotas de restaurantes
router.use("/restaurants", restaurantRoutes);

/**
 * DEBUG ÚTIL (opcional):
 * Mostra as rotas registradas (incluindo routers montados)
 * Ative somente se precisar, pois polui logs.
 */
// console.log("🚀 Router /api stack:", router.stack.map((l: any) => l?.name || l?.route?.path));

export default router;
