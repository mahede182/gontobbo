import { Request, Response, NextFunction } from "express";
import * as locationsService from "./locations.service";
import { successResponse } from "../../utils/apiResponse";

export async function searchLocations(req: Request, res: Response, next: NextFunction) {
  try {
    const locations = await locationsService.searchLocations(req.query.q as string);
    successResponse(res, { data: locations });
  } catch (error) {
    next(error);
  }
}

export async function getPopularLocations(req: Request, res: Response, next: NextFunction) {
  try {
    const locations = await locationsService.getPopularLocations();
    successResponse(res, { data: locations });
  } catch (error) {
    next(error);
  }
}
