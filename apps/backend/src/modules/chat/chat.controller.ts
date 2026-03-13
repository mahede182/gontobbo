import { Request, Response, NextFunction } from "express";
import { chat } from "./chat.service";

export async function chatHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { message, history } = req.body as {
      message: string;
      history?: { role: string; content: string }[];
    };

    if (!message || typeof message !== "string") {
      res.status(400).json({ success: false, error: "message is required" });
      return;
    }

    const reply = await chat(message, history ?? []);
    res.json({ success: true, data: { reply } });
  } catch (error) {
    next(error);
  }
}
