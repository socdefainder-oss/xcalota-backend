import { Router } from "express";
import { RestaurantController } from "../controllers/restaurant.controller";
import { validate } from "../middlewares/validate";
import { createRestaurantSchema } from "../validators/restaurant.schema";

const router = Router();
const controller = new RestaurantController();

router.post("/", validate(createRestaurantSchema), controller.create);

router.get("/:slug", controller.getBySlug);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
