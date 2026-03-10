import { Request, Response, NextFunction } from "express";
import * as searchesService from "./searches.service";
import { successResponse } from "../../utils/apiResponse";

export async function getRecentSearches(req: Request, res: Response, next: NextFunction) {
  try {
    const searches = await searchesService.getRecentSearches(req.user!.id);
    successResponse(res, { data: searches });
  } catch (error) {
    next(error);
  }
}

export async function addRecentSearch(req: Request, res: Response, next: NextFunction) {
  try {
    const search = await searchesService.addRecentSearch(req.user!.id, req.body);
    successResponse(res, { data: search, statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function clearRecentSearches(req: Request, res: Response, next: NextFunction) {
  try {
    await searchesService.clearRecentSearches(req.user!.id);
    successResponse(res, { data: null, message: "Recent searches cleared" });
  } catch (error) {
    next(error);
  }
}
