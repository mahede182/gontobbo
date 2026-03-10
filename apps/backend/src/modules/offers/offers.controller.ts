import { Request, Response, NextFunction } from "express";
import * as offersService from "./offers.service";
import { successResponse } from "../../utils/apiResponse";

export async function getOffers(req: Request, res: Response, next: NextFunction) {
  try {
    const offers = await offersService.getOffers();
    successResponse(res, { data: offers });
  } catch (error) {
    next(error);
  }
}

export async function getOfferById(req: Request, res: Response, next: NextFunction) {
  try {
    const offer = await offersService.getOfferById(req.params.id);
    successResponse(res, { data: offer });
  } catch (error) {
    next(error);
  }
}
