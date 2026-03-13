import { Request, Response, NextFunction } from "express";
import * as hotelsService from "./hotels.service";
import { successResponse } from "../../utils/apiResponse";

export async function searchHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await hotelsService.searchHotels(req.query as any);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.getFeaturedHotels();
    successResponse(res, { data: hotels });
  } catch (error) {
    next(error);
  }
}

export async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelsService.getHotelById(req.params.id);
    successResponse(res, { data: hotel });
  } catch (error) {
    next(error);
  }
}

export async function getHotelRooms(req: Request, res: Response, next: NextFunction) {
  try {
    const rooms = await hotelsService.getHotelRooms(req.params.id);
    successResponse(res, { data: rooms });
  } catch (error) {
    next(error);
  }
}

export async function getHotelGallery(req: Request, res: Response, next: NextFunction) {
  try {
    const gallery = await hotelsService.getHotelGallery(req.params.id);
    successResponse(res, { data: gallery });
  } catch (error) {
    next(error);
  }
}

export async function getHotelAmenities(req: Request, res: Response, next: NextFunction) {
  try {
    const amenities = await hotelsService.getHotelAmenities(req.params.id);
    successResponse(res, { data: amenities });
  } catch (error) {
    next(error);
  }
}

export async function getHotelReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await hotelsService.getHotelReviews(req.params.id, page, limit);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}
