import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database";
import { AppError } from "../../utils/appError";
import { paginationMeta } from "../../utils/apiResponse";
import type { SearchFlightsInput } from "./flights.schema";

export async function searchFlights(filters: SearchFlightsInput) {
  const { departure, arrival, maxStops, minPrice, maxPrice, sortBy, sortOrder, page, limit } =
    filters;

  const where: Prisma.FlightWhereInput = {
    isActive: true,
    ...(departure && {
      departureAirport: { contains: departure, mode: "insensitive" as Prisma.QueryMode },
    }),
    ...(arrival && {
      arrivalAirport: { contains: arrival, mode: "insensitive" as Prisma.QueryMode },
    }),
    ...(maxStops !== undefined && { stops: { lte: maxStops } }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
  };

  let orderBy: Prisma.FlightOrderByWithRelationInput = { departureTime: "asc" };
  if (sortBy === "price") orderBy = { price: sortOrder };
  if (sortBy === "departure") orderBy = { departureTime: sortOrder };

  const [flights, total] = await Promise.all([
    prisma.flight.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.flight.count({ where }),
  ]);

  return { data: flights, meta: paginationMeta(total, page, limit) };
}

export async function getFlightById(id: string) {
  const flight = await prisma.flight.findUnique({ where: { id, isActive: true } });
  if (!flight) throw AppError.notFound("Flight not found");
  return flight;
}
