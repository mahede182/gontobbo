import { PrismaClient } from "@prisma/client";
import { GeminiClient, GeminiContent, GeminiRole } from "../../config/gemini";

const prisma = new PrismaClient();

/**
 * Search relevant context using vector similarity search
 */
async function buildVectorContext(query: string): Promise<string> {
  try {
    const queryEmbedding = await GeminiClient.embedContent(query);
    const vectorStr = `[${queryEmbedding.join(",")}]`;

    const hotels: any[] = await prisma.$queryRaw`
      SELECT name, location, rating, "starRating", description
      FROM "hotels"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 3
    `;

    const trips: any[] = await prisma.$queryRaw`
      SELECT title, destination, duration, price, feature
      FROM "trips"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 3
    `;

    const flights: any[] = await prisma.$queryRaw`
      SELECT airline, "departureAirport", "arrivalAirport", price, route
      FROM "flights"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 3
    `;

    const contextParts = [];

    if (hotels.length > 0) {
      contextParts.push("=== Relevant Hotels ===");
      contextParts.push(
        hotels.map((h) => `• ${h.name} — ${h.location}, ★${h.rating}, ${h.description}`).join("\n"),
      );
    }

    if (trips.length > 0) {
      contextParts.push("\n=== Relevant Trips ===");
      contextParts.push(
        trips.map((t) => `• ${t.title} — ${t.destination}, ${t.duration}, $${t.price}`).join("\n"),
      );
    }

    if (flights.length > 0) {
      contextParts.push("\n=== Relevant Flights ===");
      contextParts.push(
        flights
          .map((f) => `• ${f.airline}: ${f.departureAirport} → ${f.arrivalAirport}, $${f.price}`)
          .join("\n"),
      );
    }

    return contextParts.join("\n");
  } catch (error) {
    console.error("Vector Search Error:", error);
    return "No specific data found for this query.";
  }
}

const SYSTEM_PROMPT = `You are Gontobbo AI — a friendly, concise travel assistant for the Gontobbo app.
You help users find the best hotels, trips, and flights.
Answer only travel-related questions. If a query is off-topic, politely redirect.
When recommending, reference real data from the context below.
Keep answers short (max 3-4 sentences) unless the user asks for detail.`;

export async function chat(
  message: string,
  history: { role: string; content: string }[] = [],
): Promise<string> {
  const context = await buildVectorContext(message);

  const geminiHistory: GeminiContent[] = history.map((h) => ({
    role: (h.role === "user" ? "user" : "model") as GeminiRole,
    parts: [{ text: h.content }],
  }));

  const fullPrompt = `${SYSTEM_PROMPT}\n\n--- DATA ---\n${context}\n--- END DATA ---`;

  return GeminiClient.generateContent(message, geminiHistory, fullPrompt);
}
