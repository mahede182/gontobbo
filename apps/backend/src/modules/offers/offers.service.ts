import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";

export async function getOffers() {
  return prisma.offer.findMany({
    where: {
      isActive: true,
      OR: [{ validTo: null }, { validTo: { gte: new Date() } }],
    },
    include: {
      hotel: { select: { name: true, location: true, rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOfferById(id: string) {
  const offer = await prisma.offer.findUnique({
    where: { id, isActive: true },
    include: {
      hotel: { select: { name: true, location: true, rating: true, images: true } },
    },
  });

  if (!offer) throw AppError.notFound("Offer not found");
  return offer;
}
