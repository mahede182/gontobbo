import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";
import type {
  CreateHotelInput,
  CreateRoomInput,
  CreateOfferInput,
  CreateTripInput,
  BroadcastNotificationInput,
} from "./admin.schema";

// ─── Dashboard ──────────────────────────────────────────────────────────────

export async function getDashboard() {
  const [totalUsers, totalBookings, totalHotels, totalTrips, revenueResult] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.hotel.count({ where: { isActive: true } }),
    prisma.trip.count({ where: { isActive: true } }),
    prisma.booking.aggregate({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      _sum: { totalPrice: true },
    }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      hotel: { select: { name: true } },
    },
  });

  return {
    stats: {
      totalUsers,
      totalBookings,
      totalHotels,
      totalTrips,
      totalRevenue: revenueResult._sum.totalPrice || 0,
    },
    recentBookings,
  };
}

// ─── Users ──────────────────────────────────────────────────────────────────

export async function getUsers(page: number, limit: number) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        role: true,
        isActive: true,
        memberClass: true,
        createdAt: true,
        _count: { select: { bookings: true, reviews: true } },
      },
    }),
    prisma.user.count(),
  ]);

  return { data: users, meta: paginationMeta(total, page, limit) };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      passportDetails: true,
      flightPreferences: true,
      bookings: { take: 5, orderBy: { createdAt: "desc" } },
      reviews: { take: 5, orderBy: { createdAt: "desc" } },
      _count: { select: { bookings: true, reviews: true, wishlist: true } },
    },
  });

  if (!user) throw AppError.notFound("User not found");

  const { password, ...rest } = user as unknown as Record<string, unknown>;
  return rest;
}

export async function updateUser(id: string, data: { role?: string; isActive?: boolean }) {
  return prisma.user.update({
    where: { id },
    data: data as any,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    },
  });
}

// ─── Bookings ───────────────────────────────────────────────────────────────

export async function getBookings(page: number, limit: number, status?: string, type?: string) {
  const where: any = {};
  if (status) where.status = status;
  if (type) where.type = type;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        hotel: { select: { name: true, location: true } },
        trip: { select: { title: true, destination: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { data: bookings, meta: paginationMeta(total, page, limit) };
}

export async function updateBookingStatus(id: string, status: string) {
  return prisma.booking.update({
    where: { id },
    data: { status: status as any },
  });
}

// ─── Hotels ─────────────────────────────────────────────────────────────────

export async function createHotel(input: CreateHotelInput) {
  const { amenities, ...hotelData } = input;

  return prisma.hotel.create({
    data: {
      ...hotelData,
      amenities: amenities
        ? { create: amenities.map((a) => ({ name: a.name, icon: a.icon })) }
        : undefined,
    },
    include: { amenities: true },
  });
}

export async function updateHotel(id: string, input: Partial<CreateHotelInput>) {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  const { amenities, ...hotelData } = input;

  if (amenities) {
    await prisma.hotelAmenity.deleteMany({ where: { hotelId: id } });
    await prisma.hotelAmenity.createMany({
      data: amenities.map((a) => ({ hotelId: id, name: a.name, icon: a.icon })),
    });
  }

  return prisma.hotel.update({
    where: { id },
    data: hotelData,
    include: { amenities: true },
  });
}

export async function deleteHotel(id: string) {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  return prisma.hotel.update({
    where: { id },
    data: { isActive: false },
  });
}

// ─── Rooms ──────────────────────────────────────────────────────────────────

export async function createRoom(hotelId: string, input: CreateRoomInput) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw AppError.notFound("Hotel not found");

  return prisma.room.create({
    data: { hotelId, ...input },
  });
}

export async function updateRoom(id: string, input: Partial<CreateRoomInput>) {
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw AppError.notFound("Room not found");

  return prisma.room.update({ where: { id }, data: input });
}

export async function getRooms(page: number, limit: number, hotelId?: string) {
  const where: any = {};
  if (hotelId) where.hotelId = hotelId;

  const [rooms, total] = await Promise.all([
    prisma.room.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { hotel: { select: { name: true, location: true } } },
    }),
    prisma.room.count({ where }),
  ]);

  return { data: rooms, meta: paginationMeta(total, page, limit) };
}

export async function getRoomById(id: string) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { hotel: true, bookings: { take: 5, orderBy: { createdAt: "desc" } } },
  });

  if (!room) throw AppError.notFound("Room not found");

  return room;
}

// ─── Offers ─────────────────────────────────────────────────────────────────

export async function createOffer(input: CreateOfferInput) {
  return prisma.offer.create({
    data: {
      ...input,
      validFrom: input.validFrom ? new Date(input.validFrom) : undefined,
      validTo: input.validTo ? new Date(input.validTo) : undefined,
    },
  });
}

export async function updateOffer(id: string, input: Partial<CreateOfferInput>) {
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) throw AppError.notFound("Offer not found");

  return prisma.offer.update({
    where: { id },
    data: {
      ...input,
      validFrom: input.validFrom ? new Date(input.validFrom) : undefined,
      validTo: input.validTo ? new Date(input.validTo) : undefined,
    },
  });
}

export async function deleteOffer(id: string) {
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) throw AppError.notFound("Offer not found");

  return prisma.offer.update({ where: { id }, data: { isActive: false } });
}

// ─── Trips ──────────────────────────────────────────────────────────────────

export async function createTrip(input: CreateTripInput) {
  const { packageDetails, ...tripData } = input;

  return prisma.trip.create({
    data: {
      ...tripData,
      packageDetails: packageDetails
        ? { create: packageDetails.map((d) => ({ detail: d })) }
        : undefined,
    },
    include: { packageDetails: true },
  });
}

export async function updateTrip(id: string, input: Partial<CreateTripInput>) {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip) throw AppError.notFound("Trip not found");

  const { packageDetails, ...tripData } = input;

  if (packageDetails) {
    await prisma.tripPackageDetail.deleteMany({ where: { tripId: id } });
    await prisma.tripPackageDetail.createMany({
      data: packageDetails.map((d) => ({ tripId: id, detail: d })),
    });
  }

  return prisma.trip.update({
    where: { id },
    data: tripData,
    include: { packageDetails: true },
  });
}

// ─── Notifications ──────────────────────────────────────────────────────────

export async function broadcastNotification(input: BroadcastNotificationInput) {
  if (input.userIds && input.userIds.length > 0) {
    // Send to specific users
    await prisma.notification.createMany({
      data: input.userIds.map((userId) => ({
        userId,
        title: input.title,
        body: input.body,
      })),
    });
    return { sent: input.userIds.length };
  }

  // Send to all users
  const users = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true },
  });

  await prisma.notification.createMany({
    data: users.map((user) => ({
      userId: user.id,
      title: input.title,
      body: input.body,
    })),
  });

  return { sent: users.length };
}
