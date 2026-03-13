import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";
import type { SearchHotelsInput } from "./hotels.schema";

// ─── Search Hotels ──────────────────────────────────────────────────────────

export async function searchHotels(filters: SearchHotelsInput) {
  const { location, minPrice, maxPrice, starRating, sortBy, sortOrder, page, limit } = filters;

  const where: Prisma.HotelWhereInput = {
    isActive: true,
    ...(location && {
      location: { contains: location, mode: "insensitive" as Prisma.QueryMode },
    }),
    ...(starRating && { starRating }),
  };

  // If filtering by price, we need to check rooms
  if (minPrice || maxPrice) {
    where.rooms = {
      some: {
        isAvailable: true,
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
      },
    };
  }

  // Sorting
  let orderBy: Prisma.HotelOrderByWithRelationInput = { createdAt: "desc" };
  if (sortBy === "name") orderBy = { name: sortOrder };
  if (sortBy === "rating") orderBy = { rating: sortOrder };
  if (sortBy === "starRating") orderBy = { starRating: sortOrder };

  const [hotels, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        rooms: {
          where: { isAvailable: true },
          take: 1,
          orderBy: { price: "asc" },
          select: { price: true },
        },
        _count: { select: { reviews: true } },
      },
    }),
    prisma.hotel.count({ where }),
  ]);

  const data = hotels.map((hotel) => ({
    ...hotel,
    startingPrice: hotel.rooms[0]?.price || null,
    reviewCount: hotel._count.reviews,
    rooms: undefined,
    _count: undefined,
  }));

  return { data, meta: paginationMeta(total, page, limit) };
}

// ─── Featured Hotels ────────────────────────────────────────────────────────

export async function getFeaturedHotels() {
  const hotels = await prisma.hotel.findMany({
    where: { isFeatured: true, isActive: true },
    include: {
      rooms: {
        where: { isAvailable: true },
        take: 1,
        orderBy: { price: "asc" },
        select: { price: true },
      },
      _count: { select: { reviews: true } },
    },
    take: 10,
  });

  return hotels.map((hotel) => ({
    ...hotel,
    startingPrice: hotel.rooms[0]?.price || null,
    reviewCount: hotel._count.reviews,
    rooms: undefined,
    _count: undefined,
  }));
}

// ─── Hotel by ID ────────────────────────────────────────────────────────────

export async function getHotelById(id: string) {
  const hotel = await prisma.hotel.findUnique({
    where: { id, isActive: true },
    include: {
      amenities: true,
      rooms: { where: { isAvailable: true }, orderBy: { price: "asc" } },
      reviews: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { firstName: true, lastName: true, avatar: true } },
        },
      },
      _count: { select: { reviews: true } },
    },
  });

  if (!hotel) throw AppError.notFound("Hotel not found");

  return {
    ...hotel,
    reviewCount: hotel._count.reviews,
    _count: undefined,
  };
}

// ─── Hotel Rooms ────────────────────────────────────────────────────────────

export async function getHotelRooms(hotelId: string) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  return prisma.room.findMany({
    where: { hotelId, isAvailable: true },
    orderBy: { price: "asc" },
  });
}

// ─── Hotel Gallery ──────────────────────────────────────────────────────────

export async function getHotelGallery(hotelId: string) {
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    select: { id: true, name: true, images: true },
  });

  if (!hotel) throw AppError.notFound("Hotel not found");

  // Also get room images
  const rooms = await prisma.room.findMany({
    where: { hotelId },
    select: { name: true, images: true },
  });

  return {
    hotelImages: hotel.images,
    roomImages: rooms.map((r) => ({ roomName: r.name, images: r.images })),
  };
}

// ─── Hotel Amenities ────────────────────────────────────────────────────────

export async function getHotelAmenities(hotelId: string) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  return prisma.hotelAmenity.findMany({ where: { hotelId } });
}

// ─── Hotel Reviews ──────────────────────────────────────────────────────────

export async function getHotelReviews(hotelId: string, page: number, limit: number) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { firstName: true, lastName: true, avatar: true } },
      },
    }),
    prisma.review.count({ where: { hotelId } }),
  ]);

  return { data: reviews, meta: paginationMeta(total, page, limit) };
}
