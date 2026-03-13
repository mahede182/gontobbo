import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import type {
  UpdateProfileInput,
  UpdatePassportInput,
  UpdateFlightPreferencesInput,
  UpdateBaggageInput,
} from "./users.schema";
import { sanitizeUser } from "../../utils/sanitized";

// ─── Get Profile ────────────────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      passportDetails: true,
      flightPreferences: true,
      baggageItems: true,
    },
  });

  if (!user) throw AppError.notFound("User not found");

  return sanitizeUser(user as unknown as Record<string, unknown>);
}

// ─── Update Profile ─────────────────────────────────────────────────────────

export async function updateProfile(userId: string, data: UpdateProfileInput) {
  if (data.username) {
    const existing = await prisma.user.findFirst({
      where: { username: data.username, NOT: { id: userId } },
    });
    if (existing) throw AppError.conflict("Username is already taken");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return sanitizeUser(user as unknown as Record<string, unknown>);
}

// ─── Passport Details ───────────────────────────────────────────────────────

export async function updatePassport(userId: string, data: UpdatePassportInput) {
  const passport = await prisma.passportDetails.upsert({
    where: { userId },
    update: {
      passportNumber: data.passportNumber,
      nationality: data.nationality,
      dateOfBirth: new Date(data.dateOfBirth),
      dateOfIssue: new Date(data.dateOfIssue),
      dateOfExpiry: new Date(data.dateOfExpiry),
    },
    create: {
      userId,
      passportNumber: data.passportNumber,
      nationality: data.nationality,
      dateOfBirth: new Date(data.dateOfBirth),
      dateOfIssue: new Date(data.dateOfIssue),
      dateOfExpiry: new Date(data.dateOfExpiry),
    },
  });

  return passport;
}

// ─── Flight Preferences ─────────────────────────────────────────────────────

export async function updateFlightPreferences(userId: string, data: UpdateFlightPreferencesInput) {
  const prefs = await prisma.flightPreferences.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });

  return prefs;
}

// ─── Member Card ────────────────────────────────────────────────────────────

export async function getMemberCard(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      memberNumber: true,
      memberClass: true,
      avatar: true,
    },
  });

  if (!user) throw AppError.notFound("User not found");

  return {
    name: `${user.firstName} ${user.lastName}`,
    memberNumber: user.memberNumber,
    memberClass: user.memberClass,
    avatar: user.avatar,
  };
}

// ─── Baggage ────────────────────────────────────────────────────────────────

export async function getBaggage(userId: string) {
  return prisma.baggage.findMany({ where: { userId } });
}

export async function updateBaggage(userId: string, items: UpdateBaggageInput) {
  // Delete existing and recreate
  await prisma.baggage.deleteMany({ where: { userId } });

  const created = await prisma.baggage.createMany({
    data: items.map((item) => ({
      userId,
      type: item.type,
      name: item.name,
      description: item.description,
      weight: item.weight,
      dimensions: item.dimensions,
      status: item.status || "INCLUDED",
    })),
  });

  return prisma.baggage.findMany({ where: { userId } });
}
