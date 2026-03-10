import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "@prisma/client";
import { AppError } from "../utils/appError";

/**
 * JWT authentication middleware.
 * Attaches user to req.user if token is valid.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: Error | null, user: User | false) => {
    if (err) return next(err);
    if (!user) throw AppError.unauthorized("Authentication required");
    req.user = user;
    next();
  })(req, res, next);
}

/**
 * Optional authentication - doesn't fail if no token, just sets req.user if present.
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: Error | null, user: User | false) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
}

/**
 * Role-based authorization middleware.
 * Must be used after `authenticate`.
 */
export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw AppError.unauthorized("Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw AppError.forbidden("You do not have permission to access this resource");
    }

    next();
  };
}
