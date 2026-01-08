import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

interface CreateRestaurantDTO {
  name: string;
  slug: string;
  phone?: string;
  whatsapp?: string;
  document?: string;
}

export class RestaurantService {
  async create(data: CreateRestaurantDTO) {
    try {
      return await prisma.restaurant.create({
        data,
      });
    } catch (error) {
      // 🔴 Slug duplicado
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError(
          "Já existe um restaurante com este slug",
          409,
          { field: "slug" }
        );
      }

      throw error;
    }
  }

  // ✅ LISTAGEM (NOVO)
  async list() {
    return prisma.restaurant.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: number) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      throw new AppError("Restaurante não encontrado", 404);
    }

    return restaurant;
  }

  async getBySlug(slug: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { slug },
      include: {
        categories: true,
        products: true,
      },
    });

    if (!restaurant) {
      throw new AppError("Restaurante não encontrado", 404);
    }

    return restaurant;
  }

  async update(id: number, data: Partial<CreateRestaurantDTO>) {
    try {
      return await prisma.restaurant.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new AppError("Restaurante não encontrado", 404);
      }

      throw error;
    }
  }

  async delete(id: number) {
    try {
      // 🔕 DELETE físico por enquanto
      await prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new AppError("Restaurante não encontrado", 404);
      }

      throw error;
    }
  }
}
