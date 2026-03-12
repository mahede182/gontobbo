import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends PrismaUser {}
  }
}

export {};

export type GeminiRole = "user" | "model";

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  role: GeminiRole;
  parts: GeminiPart[];
}
