import { Request, Response, NextFunction } from "express";
import * as paymentsService from "./payments.service";
import { successResponse } from "../../utils/apiResponse";

export async function getPaymentMethods(req: Request, res: Response, next: NextFunction) {
  try {
    const methods = await paymentsService.getPaymentMethods(req.user!.id);
    successResponse(res, { data: methods });
  } catch (error) {
    next(error);
  }
}

export async function addPaymentMethod(req: Request, res: Response, next: NextFunction) {
  try {
    const method = await paymentsService.addPaymentMethod(req.user!.id, req.body);
    successResponse(res, { data: method, message: "Payment method added", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function removePaymentMethod(req: Request, res: Response, next: NextFunction) {
  try {
    await paymentsService.removePaymentMethod(req.params.id, req.user!.id);
    successResponse(res, { data: null, message: "Payment method removed" });
  } catch (error) {
    next(error);
  }
}
