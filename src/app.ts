import express from "express";
import cors from "cors";
import router from "./core/http/routes";
import { errorHandler } from "./core/http/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

// ⬇️ SEMPRE POR ÚLTIMO
app.use(errorHandler);

export default app;
