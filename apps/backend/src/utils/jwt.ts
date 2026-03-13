import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  sub: string;
  role: string;
}

export function generateAccessToken(userId: string, role: string): string {
  return jwt.sign({ sub: userId, role } as TokenPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRY as string & jwt.SignOptions["expiresIn"],
  });
}

export function generateRefreshToken(userId: string, role: string): string {
  return jwt.sign({ sub: userId, role } as TokenPayload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as string & jwt.SignOptions["expiresIn"],
  });
}

export function generateTokens(userId: string, role: string) {
  return {
    accessToken: generateAccessToken(userId, role),
    refreshToken: generateRefreshToken(userId, role),
  };
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}

export function getRefreshTokenExpiry(): Date {
  const match = env.JWT_REFRESH_EXPIRY.match(/^(\d+)([smhd])$/);
  if (!match) {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // default 7d
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  const ms: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * (ms[unit] || ms.d));
}
