import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { publicRouter } from "../routes/publicApi.js";
import { router } from "../routes/api.js";

dotenv.config();
export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(router);
web.use(errorMiddleware);
