import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import passport from "./config/passport";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import hotelsRoutes from "./modules/hotels/hotels.routes";
import reviewsRoutes from "./modules/reviews/reviews.routes";
import bookingsRoutes from "./modules/bookings/bookings.routes";
import flightsRoutes from "./modules/flights/flights.routes";
import tripsRoutes from "./modules/trips/trips.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import notificationsRoutes from "./modules/notifications/notifications.routes";
import paymentsRoutes from "./modules/payments/payments.routes";
import locationsRoutes from "./modules/locations/locations.routes";
import searchesRoutes from "./modules/searches/searches.routes";
import adminRoutes from "./modules/admin/admin.routes";
import chatRoutes from "./modules/chat/chat.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? "*" : env.CORS_ORIGIN.split(","),
    credentials: true,
  }),
);
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize() as unknown as express.RequestHandler);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Gontobbo API is running!",
    version: "1.0.0",
    docs: "/api/docs",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/searches", searchesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

app.use(
  "/api/docs",
  swaggerUi.serve as unknown as express.RequestHandler[],
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Gontobbo API Docs",
  }) as unknown as express.RequestHandler,
);

app.get("/api/docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 404, message: "Route not found" },
  });
});

app.use(errorHandler);

export default app;
