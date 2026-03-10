import { Response } from "express";

interface SuccessResponseOptions<T> {
  data: T;
  message?: string;
  statusCode?: number;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function successResponse<T>(res: Response, options: SuccessResponseOptions<T>) {
  const { data, message, statusCode = 200, meta } = options;

  const response: Record<string, unknown> = {
    success: true,
    data,
  };

  if (message) response.message = message;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  details?: string,
) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message,
      ...(details && { details }),
    },
  });
}

export function paginationMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
