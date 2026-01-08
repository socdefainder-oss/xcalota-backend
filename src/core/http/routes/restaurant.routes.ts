import { Router } from "express";
import { RestaurantController } from "../controllers/restaurant.controller";
import { validate } from "../middlewares/validate";
import { createRestaurantSchema } from "../validators/restaurant.schema";

const router = Router();
const controller = new RestaurantController();

/**
 * Rotas de restaurantes
 * Base: /restaurants (o /api vem do app.ts/server.ts)
 */

// ✅ LISTAGEM
router.get("/", controller.list);

// ✅ CREATE
router.post("/", validate(createRestaurantSchema), controller.create);

// ✅ GET POR SLUG
router.get("/:slug", controller.getBySlug);

// ✅ UPDATE
router.put("/:id", controller.update);

// ✅ DELETE
router.delete("/:id", controller.delete);

export default router;
