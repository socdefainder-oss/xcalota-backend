import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(3, "Nome obrigatório e deve ter pelo menos 3 caracteres."),
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífen."),
  phone: z.string().nullable().optional(),
});
