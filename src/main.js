import { connectDb } from "./app/database.js";
import { logger } from "./app/logging.js";
import { web } from "./app/web.js";

const startServer = async () => {
  await connectDb(process.env.MONGO_URI);
  logger.info("Connected to the DB");
  web.listen(process.env.PORT, () => {
    logger.info("App start");
  });
};

startServer();
