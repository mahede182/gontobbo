import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { generateTokens, verifyRefreshToken, getRefreshTokenExpiry } from "../../utils/jwt";
import { AppError } from "../../utils/appError";
import type { RegisterInput, GoogleAuthInput, AppleAuthInput } from "./auth.schema";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

function sanitizeUser(user: Record<string, unknown>) {
  const { password, ...rest } = user;
  return rest;
}

// ─── Register ───────────────────────────────────────────────────────────────

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw AppError.conflict("A user with this email already exists");
  }

  if (input.username) {
    const existingUsername = await prisma.user.findUnique({
      where: { username: input.username },
    });
    if (existingUsername) {
      throw AppError.conflict("This username is already taken");
    }
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      memberNumber: `GON-${Date.now().toString(36).toUpperCase()}`,
    },
  });

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user: sanitizeUser(user as unknown as Record<string, unknown>),
    ...tokens,
  };
}

// ─── Login ──────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw AppError.unauthorized("Invalid email or password");
  }

  if (!user.password) {
    throw AppError.unauthorized(
      "This account uses social login. Please sign in with Google or Apple.",
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw AppError.unauthorized("Invalid email or password");
  }

  if (!user.isActive) {
    throw AppError.forbidden("Account is deactivated");
  }

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user: sanitizeUser(user as unknown as Record<string, unknown>),
    ...tokens,
  };
}

// ─── Google Login ───────────────────────────────────────────────────────────

export async function googleLogin(input: GoogleAuthInput) {
  const ticket = await googleClient.verifyIdToken({
    idToken: input.idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw AppError.unauthorized("Invalid Google token");
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [{ googleId: payload.sub }, { email: payload.email }],
    },
  });

  if (user) {
    // Link Google account if not already linked
    if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: payload.sub, avatar: user.avatar || payload.picture },
      });
    }
  } else {
    user = await prisma.user.create({
      data: {
        email: payload.email,
        firstName: payload.given_name || "",
        lastName: payload.family_name || "",
        avatar: payload.picture,
        googleId: payload.sub,
        memberNumber: `GON-${Date.now().toString(36).toUpperCase()}`,
      },
    });
  }

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user: sanitizeUser(user as unknown as Record<string, unknown>),
    ...tokens,
  };
}

// ─── Apple Login ────────────────────────────────────────────────────────────

export async function appleLogin(input: AppleAuthInput) {
  // In production, verify the identity token with Apple's public keys
  // For now, we trust the token from the mobile app and extract user info
  // import appleSignin from 'apple-signin-auth';
  // const applePayload = await appleSignin.verifyIdToken(input.identityToken, { audience: env.APPLE_CLIENT_ID });

  const appleUserId = input.user;
  const email = input.email;

  if (!appleUserId && !email) {
    throw AppError.unauthorized("Invalid Apple authentication data");
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [...(appleUserId ? [{ appleId: appleUserId }] : []), ...(email ? [{ email }] : [])],
    },
  });

  if (user) {
    if (!user.appleId && appleUserId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { appleId: appleUserId },
      });
    }
  } else {
    if (!email) {
      throw AppError.badRequest("Email is required for first-time Apple sign in");
    }

    user = await prisma.user.create({
      data: {
        email,
        firstName: input.fullName?.givenName || "",
        lastName: input.fullName?.familyName || "",
        appleId: appleUserId,
        memberNumber: `GON-${Date.now().toString(36).toUpperCase()}`,
      },
    });
  }

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user: sanitizeUser(user as unknown as Record<string, unknown>),
    ...tokens,
  };
}

// ─── Refresh Tokens ─────────────────────────────────────────────────────────

export async function refreshTokens(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || !user.isActive) {
    throw AppError.unauthorized("User not found or deactivated");
  }

  // Delete old refresh token
  await prisma.refreshToken.delete({ where: { id: storedToken.id } });

  // Generate new tokens
  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return tokens;
}

// ─── Get Me ─────────────────────────────────────────────────────────────────

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      passportDetails: true,
      flightPreferences: true,
    },
  });

  if (!user) {
    throw AppError.notFound("User not found");
  }

  return sanitizeUser(user as unknown as Record<string, unknown>);
}

// ─── Logout ─────────────────────────────────────────────────────────────────

export async function logout(userId: string, refreshToken?: string) {
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken, userId },
    });
  } else {
    // Delete all refresh tokens for user
    await prisma.refreshToken.deleteMany({ where: { userId } });
  }
}

// ─── OTP ────────────────────────────────────────────────────────────────────

export async function sendOtp(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw AppError.notFound("No account found with this email");
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otp.create({
    data: { email, code, expiresAt },
  });

  // TODO: Integrate email service (SendGrid, SES, etc.)
  console.log(`📧 OTP for ${email}: ${code}`);

  return { message: "OTP sent successfully" };
}

export async function verifyOtp(email: string, otp: string) {
  const record = await prisma.otp.findFirst({
    where: {
      email,
      code: otp,
      used: false,
      expiresAt: { gte: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    throw AppError.badRequest("Invalid or expired OTP");
  }

  await prisma.otp.update({
    where: { id: record.id },
    data: { used: true },
  });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw AppError.notFound("User not found");
  }

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user: sanitizeUser(user as unknown as Record<string, unknown>),
    ...tokens,
  };
}
