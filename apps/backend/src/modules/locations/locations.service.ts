import { prisma } from "../../config/database";

export async function searchLocations(query?: string) {
  return prisma.location.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { country: { contains: query, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { name: "asc" },
    take: 20,
  });
}

export async function getPopularLocations() {
  return prisma.location.findMany({
    where: { isPopular: true },
    orderBy: { name: "asc" },
  });
}
