import { prisma } from "../../config/database";
import type { AddRecentSearchInput } from "./searches.schema";

export async function getRecentSearches(userId: string) {
  const searches = await prisma.recentSearch.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return {
    hotels: searches.filter((s) => s.type === "HOTEL").map((s) => s.query),
    flights: searches.filter((s) => s.type === "FLIGHT").map((s) => s.query),
  };
}

export async function addRecentSearch(userId: string, input: AddRecentSearchInput) {
  // Avoid duplicates — delete old same-query search, re-add at top
  await prisma.recentSearch.deleteMany({
    where: { userId, type: input.type, query: input.query },
  });

  return prisma.recentSearch.create({
    data: {
      userId,
      type: input.type,
      query: input.query,
    },
  });
}

export async function clearRecentSearches(userId: string) {
  await prisma.recentSearch.deleteMany({ where: { userId } });
}
