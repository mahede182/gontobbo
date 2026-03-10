import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service";
import { successResponse } from "../../utils/apiResponse";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.getProfile(req.user!.id);
    successResponse(res, { data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.updateProfile(req.user!.id, req.body);
    successResponse(res, { data: user, message: "Profile updated" });
  } catch (error) {
    next(error);
  }
}

export async function updatePassport(req: Request, res: Response, next: NextFunction) {
  try {
    const passport = await usersService.updatePassport(req.user!.id, req.body);
    successResponse(res, { data: passport, message: "Passport details updated" });
  } catch (error) {
    next(error);
  }
}

export async function updateFlightPreferences(req: Request, res: Response, next: NextFunction) {
  try {
    const prefs = await usersService.updateFlightPreferences(req.user!.id, req.body);
    successResponse(res, { data: prefs, message: "Flight preferences updated" });
  } catch (error) {
    next(error);
  }
}

export async function getMemberCard(req: Request, res: Response, next: NextFunction) {
  try {
    const card = await usersService.getMemberCard(req.user!.id);
    successResponse(res, { data: card });
  } catch (error) {
    next(error);
  }
}

export async function getBaggage(req: Request, res: Response, next: NextFunction) {
  try {
    const baggage = await usersService.getBaggage(req.user!.id);
    successResponse(res, { data: baggage });
  } catch (error) {
    next(error);
  }
}

export async function updateBaggage(req: Request, res: Response, next: NextFunction) {
  try {
    const baggage = await usersService.updateBaggage(req.user!.id, req.body);
    successResponse(res, { data: baggage, message: "Baggage preferences updated" });
  } catch (error) {
    next(error);
  }
}
