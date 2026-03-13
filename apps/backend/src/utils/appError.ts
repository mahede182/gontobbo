export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_ERROR",
    details?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.details = details;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: string) {
    return new AppError(message, 400, "BAD_REQUEST", details);
  }

  static unauthorized(message: string = "Unauthorized", details?: string) {
    return new AppError(message, 401, "UNAUTHORIZED", details);
  }

  static forbidden(message: string = "Forbidden", details?: string) {
    return new AppError(message, 403, "FORBIDDEN", details);
  }

  static notFound(message: string = "Resource not found", details?: string) {
    return new AppError(message, 404, "NOT_FOUND", details);
  }

  static conflict(message: string, details?: string) {
    return new AppError(message, 409, "CONFLICT", details);
  }

  static tooManyRequests(message: string = "Too many requests", details?: string) {
    return new AppError(message, 429, "TOO_MANY_REQUESTS", details);
  }

  static internal(message: string = "Internal server error", details?: string) {
    return new AppError(message, 500, "INTERNAL_ERROR", details);
  }
}
