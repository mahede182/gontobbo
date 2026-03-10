import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { successResponse } from "../../utils/apiResponse";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    successResponse(res, { data: result, message: "Registration successful", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    successResponse(res, { data: result, message: "Login successful" });
  } catch (error) {
    next(error);
  }
}

export async function googleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.googleLogin(req.body);
    successResponse(res, { data: result, message: "Google login successful" });
  } catch (error) {
    next(error);
  }
}

export async function appleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.appleLogin(req.body);
    successResponse(res, { data: result, message: "Apple login successful" });
  } catch (error) {
    next(error);
  }
}

export async function refreshTokens(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.refreshTokens(req.body.refreshToken);
    successResponse(res, { data: result, message: "Tokens refreshed" });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.user!.id);
    successResponse(res, { data: user });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.logout(req.user!.id, req.body.refreshToken);
    successResponse(res, { data: null, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.sendOtp(req.body.email);
    successResponse(res, { data: result });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.verifyOtp(req.body.email, req.body.otp);
    successResponse(res, { data: result, message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
}
