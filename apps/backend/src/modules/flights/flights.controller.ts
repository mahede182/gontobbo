import { Request, Response, NextFunction } from "express";
import * as flightsService from "./flights.service";
import { successResponse } from "../../utils/apiResponse";

export async function searchFlights(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await flightsService.searchFlights(req.query as any);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getFlightById(req: Request, res: Response, next: NextFunction) {
  try {
    const flight = await flightsService.getFlightById(req.params.id);
    successResponse(res, { data: flight });
  } catch (error) {
    next(error);
  }
}
