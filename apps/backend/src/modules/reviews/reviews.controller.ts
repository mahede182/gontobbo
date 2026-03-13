import { Request, Response, NextFunction } from "express";
import * as reviewsService from "./reviews.service";
import { successResponse } from "../../utils/apiResponse";

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await reviewsService.createReview(req.user!.id, req.body);
    successResponse(res, { data: review, message: "Review created", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function getReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await reviewsService.getReview(req.params.id);
    successResponse(res, { data: review });
  } catch (error) {
    next(error);
  }
}

export async function updateReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await reviewsService.updateReview(req.params.id, req.user!.id, req.body);
    successResponse(res, { data: review, message: "Review updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  try {
    await reviewsService.deleteReview(req.params.id, req.user!.id);
    successResponse(res, { data: null, message: "Review deleted" });
  } catch (error) {
    next(error);
  }
}
