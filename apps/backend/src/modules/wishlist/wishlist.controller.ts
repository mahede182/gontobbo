import { Request, Response, NextFunction } from "express";
import * as wishlistService from "./wishlist.service";
import { successResponse } from "../../utils/apiResponse";

export async function getWishlist(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await wishlistService.getWishlist(req.user!.id);
    successResponse(res, { data: items });
  } catch (error) {
    next(error);
  }
}

export async function addToWishlist(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await wishlistService.addToWishlist(req.user!.id, req.body);
    successResponse(res, { data: item, message: "Added to wishlist", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function removeFromWishlist(req: Request, res: Response, next: NextFunction) {
  try {
    await wishlistService.removeFromWishlist(req.params.id, req.user!.id);
    successResponse(res, { data: null, message: "Removed from wishlist" });
  } catch (error) {
    next(error);
  }
}
