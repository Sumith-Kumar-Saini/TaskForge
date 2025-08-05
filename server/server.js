import dotenv from "dotenv";
import { createServer } from "http";
import app from "./src/app.js";
import logger from "./src/utils/winstonLogger.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  const server = createServer(app);

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
