import { Request, Response, NextFunction } from "express";
import * as tagsService from "./tags.service";
import { successResponse } from "../../utils/apiResponse";

export async function getTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await tagsService.getTags();
    successResponse(res, { data: tags });
  } catch (error) {
    next(error);
  }
}
