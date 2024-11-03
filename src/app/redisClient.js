import redis from "redis";
import dotenv from "dotenv";
import { logger } from "./logging.js";

dotenv.config();

export const redisClient = await redis
  .createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    // url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  })
  .on("error", (err) => logger.error("Redis Client Error"))
  .connect();
