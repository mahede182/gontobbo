import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import { errorResponse } from "../utils/apiResponse";
import { env } from "../config/env";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (res.headersSent) return;

  if (err instanceof AppError) {
    return errorResponse(res, err.statusCode, err.message, err.details);
  }

  if (err instanceof ZodError) {
    const details = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
    return errorResponse(res, 400, "Validation error", details);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const target = (err.meta?.target as string[])?.join(", ") || "field";
        return errorResponse(res, 409, `Duplicate value for: ${target}`);
      }
      case "P2025":
        return errorResponse(res, 404, "Record not found");
      case "P2003":
        return errorResponse(res, 400, "Related record not found");
      default:
        return errorResponse(res, 400, `Database error: ${err.code}`);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return errorResponse(res, 400, "Invalid data provided");
  }

  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, 401, "Invalid token");
  }
  if (err.name === "TokenExpiredError") {
    return errorResponse(res, 401, "Token expired");
  }

  console.error("Unhandled error:", err);

  const message = env.NODE_ENV === "development" ? err.message : "Internal server error";
  return errorResponse(res, 500, message);
}
