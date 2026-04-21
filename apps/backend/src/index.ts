import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/database";

const PORT = env.PORT;

async function bootstrap() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("[:::DATABASE:::] Database connected successfully");

    // const server = app.listen(PORT, () => {
    //   console.log(`[:::SERVER:::] Server running on http://localhost:${PORT}`);
    //   console.log(`[:::Docs:::] API Docs: http://localhost:${PORT}/api/docs`);
    //   console.log(`[:::ENV:::] Environment: ${env.NODE_ENV}`);
    // });

    const server = app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`[:::SERVER:::] Server running on http://0.0.0.0:${PORT}`);
      console.log(`[:::Docs:::] API Docs: http://localhost:${PORT}/api/docs`);
      console.log(`[:::ENV:::] Environment: ${env.NODE_ENV}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log("Database disconnected. Goodbye!");
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10_000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
