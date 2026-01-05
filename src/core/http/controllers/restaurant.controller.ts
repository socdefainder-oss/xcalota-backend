import { Request, Response } from "express";
import { RestaurantService } from "../../services/restaurant.service";

export class RestaurantController {
  private service = new RestaurantService();

  // ✅ CREATE
  create = async (req: Request, res: Response) => {
    try {
      const restaurant = await this.service.create(req.body);
      return res.status(201).json(restaurant);
    } catch (err: any) {
      // Loga o erro real no console/pm2 logs
      console.error("CREATE RESTAURANT ERROR:", err);

      // Tratamento comum do Prisma (slug duplicado)
      // PrismaClientKnownRequestError: code P2002
      if (err?.code === "P2002") {
        return res.status(409).json({
          error: "Conflict",
          message: "Esse link (slug) já está em uso. Tente outro.",
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  };

  // ✅ LIST
  list = async (_: Request, res: Response) => {
    try {
      const restaurants = await this.service.list();
      return res.json(restaurants);
    } catch (err) {
      console.error("LIST RESTAURANTS ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  };

  // ✅ GET POR SLUG
  getBySlug = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const restaurant = await this.service.getBySlug(slug);
      return res.json(restaurant);
    } catch (err) {
      console.error("GET RESTAURANT BY SLUG ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  };

  // ✅ UPDATE
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const restaurant = await this.service.update(Number(id), req.body);
      return res.json(restaurant);
    } catch (err: any) {
      console.error("UPDATE RESTAURANT ERROR:", err);

      if (err?.code === "P2002") {
        return res.status(409).json({
          error: "Conflict",
          message: "Esse link (slug) já está em uso. Tente outro.",
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  };

  // ✅ DELETE
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      return res.status(204).send();
    } catch (err) {
      console.error("DELETE RESTAURANT ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  };
}
