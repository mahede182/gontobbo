import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";
import type { CreateBookingInput, AddTravellerInput, BookingsQueryInput } from "./bookings.schema";

// ─── Create Booking ─────────────────────────────────────────────────────────

export async function createBooking(userId: string, input: CreateBookingInput) {
  let totalPrice = 0;
  let taxAmount = 0;

  if (input.type === "HOTEL" && input.roomId) {
    const room = await prisma.room.findUnique({ where: { id: input.roomId } });
    if (!room || !room.isAvailable) {
      throw AppError.badRequest("Room not found or unavailable");
    }

    const checkIn = new Date(input.checkIn);
    const checkOut = new Date(input.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) throw AppError.badRequest("Check-out must be after check-in");

    totalPrice = room.price * nights * input.rooms;
    taxAmount = totalPrice * 0.12; // 12% tax
    totalPrice += taxAmount;
  } else if (input.type === "TRIP" && input.tripId) {
    const trip = await prisma.trip.findUnique({ where: { id: input.tripId } });
    if (!trip) throw AppError.notFound("Trip not found");

    totalPrice = trip.price * (input.adults + input.children * 0.5);
    taxAmount = totalPrice * 0.1; // 10% tax
    totalPrice += taxAmount;
  } else {
    throw AppError.badRequest("Either hotelId+roomId or tripId is required");
  }

  const booking = await prisma.booking.create({
    data: {
      userId,
      hotelId: input.hotelId,
      roomId: input.roomId,
      tripId: input.tripId,
      type: input.type,
      checkIn: new Date(input.checkIn),
      checkOut: new Date(input.checkOut),
      adults: input.adults,
      children: input.children,
      rooms: input.rooms,
      totalPrice,
      taxAmount,
      bookingFor: input.bookingFor,
      guestTitle: input.guestTitle,
      guestFirstName: input.guestFirstName,
      guestLastName: input.guestLastName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      guestAddress: input.guestAddress,
      guestState: input.guestState,
      travellers: input.travellers
        ? {
            create: input.travellers.map((t) => ({
              fullName: t.fullName,
              dateOfBirth: t.dateOfBirth ? new Date(t.dateOfBirth) : undefined,
              gender: t.gender,
              nationality: t.nationality,
              passportNumber: t.passportNumber,
              passportCountry: t.passportCountry,
              travellerType: t.travellerType,
            })),
          }
        : undefined,
    },
    include: {
      hotel: { select: { name: true, location: true, images: true } },
      room: { select: { name: true, price: true } },
      trip: { select: { title: true, destination: true } },
      travellers: true,
    },
  });

  return booking;
}

// ─── Get Bookings ───────────────────────────────────────────────────────────

export async function getBookings(userId: string, query: BookingsQueryInput) {
  const { type, status, page, limit } = query;

  const where: Prisma.BookingWhereInput = {
    userId,
    ...(type && { type }),
    ...(status && { status }),
  };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        hotel: { select: { name: true, location: true, images: true, rating: true } },
        room: { select: { name: true, price: true } },
        trip: { select: { title: true, destination: true, image: true } },
        _count: { select: { travellers: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { data: bookings, meta: paginationMeta(total, page, limit) };
}

// ─── Get Booking by ID ──────────────────────────────────────────────────────

export async function getBookingById(bookingId: string, userId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      hotel: true,
      room: true,
      trip: { include: { packageDetails: true } },
      travellers: true,
    },
  });

  if (!booking) throw AppError.notFound("Booking not found");
  if (booking.userId !== userId) throw AppError.forbidden("Access denied");

  return booking;
}

// ─── Cancel Booking ─────────────────────────────────────────────────────────

export async function cancelBooking(bookingId: string, userId: string) {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) throw AppError.notFound("Booking not found");
  if (booking.userId !== userId) throw AppError.forbidden("Access denied");
  if (booking.status === "CANCELLED") throw AppError.badRequest("Booking is already cancelled");
  if (booking.status === "COMPLETED")
    throw AppError.badRequest("Cannot cancel a completed booking");

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
}

// ─── Add Traveller ──────────────────────────────────────────────────────────

export async function addTraveller(bookingId: string, userId: string, input: AddTravellerInput) {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) throw AppError.notFound("Booking not found");
  if (booking.userId !== userId) throw AppError.forbidden("Access denied");

  return prisma.bookingTraveller.create({
    data: {
      bookingId,
      fullName: input.fullName,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
      gender: input.gender,
      nationality: input.nationality,
      passportNumber: input.passportNumber,
      passportCountry: input.passportCountry,
      travellerType: input.travellerType,
    },
  });
}
