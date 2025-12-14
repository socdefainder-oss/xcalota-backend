import { Request, Response } from "express";
import { RestaurantService } from "../../services/restaurant.service";

export class RestaurantController {
  private service = new RestaurantService();

  // ✅ ARROW FUNCTION (obrigatório)
  create = async (req: Request, res: Response) => {
    const restaurant = await this.service.create(req.body);
    return res.status(201).json(restaurant);
  };

  getBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const restaurant = await this.service.getBySlug(slug);
    return res.json(restaurant);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const restaurant = await this.service.update(Number(id), req.body);
    return res.json(restaurant);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.delete(Number(id));
    return res.status(204).send();
  };
}
