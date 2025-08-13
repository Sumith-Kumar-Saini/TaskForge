import "@dotenvx/dotenvx/config";

import app from "./src/app.js";
import { createServer } from "http";
import logger from "./src/utils/winstonLogger.js";
import shutdownDB from "./src/utils/gracefulShutdown.js";
import connectDB from "./src/config/db.js";
import { ENV } from "./src/config/env.js";

async function main() {
  const server = createServer(app);
  const { PORT } = ENV;

  await connectDB();

  server.listen(PORT, () => {
    logger.info(`Server Listening on ${PORT}`);
  });

  const connections = new Set();
  server.on("connection", (conn) => {
    connections.add(conn);
    conn.on("close", () => connections.delete(conn));
  });

  const shutdown = async () => {
    logger.info("Shutdown initiated");
    server.close(() => {
      logger.info("HTTP server closed");
    });

    await shutdownDB();

    for (const conn of connections) conn.destroy();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  logger.error("Startup error", err);
  process.exit(1);
});
