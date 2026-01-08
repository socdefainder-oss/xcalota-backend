// src/config/env.ts
import "dotenv/config";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL não foi definido no .env");
}

export const env = {
  PORT,
  DATABASE_URL,
};
