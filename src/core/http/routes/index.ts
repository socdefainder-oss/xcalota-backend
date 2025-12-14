import { Router } from "express";
import restaurantRoutes from "./restaurant.routes";

const router = Router();

/** DEBUG TEMPORÁRIO */
console.log("🧩 Carregando routes/index.ts");

router.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

/** ✅ ESTA LINHA É A CHAVE */
router.use("/restaurants", restaurantRoutes);

/** DEBUG FINAL */
console.log(
  "🚀 Rotas carregadas:",
  router.stack
    .filter((r: any) => r.route)
    .map((r: any) => r.route.path)
);

export default router;
