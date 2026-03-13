import axios from "axios";
import { env } from "./env";
import { GeminiContent } from "../@types/express";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const API_KEY = env.GONTOBBO_AI;

export class GeminiClient {
  static async generateContent(
    message: string,
    history: GeminiContent[] = [],
    systemPrompt?: string,
  ): Promise<string> {
    const model = "gemini-flash-latest";
    const url = `${GEMINI_API_URL}/${model}:generateContent?key=${API_KEY}`;

    const contents: GeminiContent[] = [];

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

    contents.push(...history);

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
