import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";

export async function getTrips(page: number = 1, limit: number = 10) {
  const [trips, total] = await Promise.all([
    prisma.trip.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { packageDetails: true },
    }),
    prisma.trip.count({ where: { isActive: true } }),
  ]);

  return { data: trips, meta: paginationMeta(total, page, limit) };
}

export async function getPopularTrips() {
  return prisma.trip.findMany({
    where: { isPopular: true, isActive: true },
    include: { packageDetails: true },
    take: 10,
  });
}

export async function getTripById(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id, isActive: true },
    include: { packageDetails: true },
  });

  if (!trip) throw AppError.notFound("Trip not found");
  return trip;
}
