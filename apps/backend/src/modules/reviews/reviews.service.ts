import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import type { CreateReviewInput, UpdateReviewInput } from "./reviews.schema";

export async function createReview(userId: string, input: CreateReviewInput) {
  const hotel = await prisma.hotel.findUnique({ where: { id: input.hotelId } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  const review = await prisma.review.create({
    data: {
      hotelId: input.hotelId,
      userId,
      rating: input.rating,
      text: input.text,
    },
    include: {
      user: { select: { firstName: true, lastName: true, avatar: true } },
    },
  });

  const avgResult = await prisma.review.aggregate({
    where: { hotelId: input.hotelId },
    _avg: { rating: true },
  });

  await prisma.hotel.update({
    where: { id: input.hotelId },
    data: { rating: avgResult._avg.rating || 0 },
  });

  return review;
}

export async function getReview(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { firstName: true, lastName: true, avatar: true } },
    },
  });

  if (!review) throw AppError.notFound("Review not found");
  return review;
}

export async function updateReview(id: string, userId: string, input: UpdateReviewInput) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw AppError.notFound("Review not found");
  if (review.userId !== userId) throw AppError.forbidden("You can only edit your own reviews");

  const updated = await prisma.review.update({
    where: { id },
    data: input,
    include: {
      user: { select: { firstName: true, lastName: true, avatar: true } },
    },
  });

  const avgResult = await prisma.review.aggregate({
    where: { hotelId: review.hotelId },
    _avg: { rating: true },
  });

  await prisma.hotel.update({
    where: { id: review.hotelId },
    data: { rating: avgResult._avg.rating || 0 },
  });

  return updated;
}

export async function deleteReview(id: string, userId: string) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw AppError.notFound("Review not found");
  if (review.userId !== userId) throw AppError.forbidden("You can only delete your own reviews");

  await prisma.review.delete({ where: { id } });

  const avgResult = await prisma.review.aggregate({
    where: { hotelId: review.hotelId },
    _avg: { rating: true },
  });

  await prisma.hotel.update({
    where: { id: review.hotelId },
    data: { rating: avgResult._avg.rating || 0 },
  });
}
