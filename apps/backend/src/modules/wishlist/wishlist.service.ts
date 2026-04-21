import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import type { AddWishlistInput } from "./wishlist.schema";

export async function getWishlist(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      hotel: { select: { name: true, location: true, rating: true, images: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function addToWishlist(userId: string, input: AddWishlistInput) {
  if (input.hotelId) {
    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_hotelId: { userId, hotelId: input.hotelId } },
    });
    if (existing) throw AppError.conflict("Hotel already in wishlist");
  }

  return prisma.wishlistItem.create({
    data: {
      userId,
      hotelId: input.hotelId,
      type: input.type,
      name: input.name,
      rating: input.rating,
    },
  });
}

export async function removeFromWishlist(id: string, userId: string) {
  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item) throw AppError.notFound("Wishlist item not found");
  if (item.userId !== userId) throw AppError.forbidden("Access denied");

  await prisma.wishlistItem.delete({ where: { id } });
}
