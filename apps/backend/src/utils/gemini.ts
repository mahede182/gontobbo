import axios from "axios";
import { env } from "../config/env";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const API_KEY = env.GONTOBBO_AI;

export type GeminiRole = "user" | "model";

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  role: GeminiRole;
  parts: GeminiPart[];
}

export class GeminiClient {
  /**
   * Generates text content using Gemini model
   */
  static async generateContent(
    message: string,
    history: GeminiContent[] = [],
    systemPrompt?: string,
  ): Promise<string> {
    const model = "gemini-flash-latest";
    const url = `${GEMINI_API_URL}/${model}:generateContent?key=${API_KEY}`;

    const contents: GeminiContent[] = [];

    // System instruction as a user message followed by a model acknowledgment
    // OR use system_instruction if the model version supports it correctly in REST
    // For simplicity and compatibility with existing logic:
    if (systemPrompt) {
      contents.push({
        role: "user",
        parts: [{ text: `${systemPrompt}` }],
      });
      contents.push({
        role: "model",
        parts: [{ text: "Understood! I will follow these instructions." }],
      });
    }

    // Add history
    contents.push(...history);

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    try {
      const response = await axios.post(url, { contents });
      return response.data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.error("Gemini GenerateContent Error:", error.response?.data || error.message);
      const limitError = error.response?.data?.error?.message;
      if (limitError && limitError.includes("quota")) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      throw new Error(limitError || "Failed to generate content from Gemini");
    }
  }

  /**
   * Generates vector embedding for a given text
   */
  static async embedContent(text: string): Promise<number[]> {
    const model = "gemini-embedding-001";
    const url = `${GEMINI_API_URL}/${model}:embedContent?key=${API_KEY}`;

    try {
      const response = await axios.post(url, {
        model: `models/${model}`,
        content: {
          parts: [{ text }],
        },
      });
      return response.data.embedding.values;
    } catch (error: any) {
      console.error("Gemini EmbedContent Error:", error.response?.data || error.message);
      throw new Error("Failed to generate embedding from Gemini");
    }
  }
}
