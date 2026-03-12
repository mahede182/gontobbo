import { PrismaClient } from "@prisma/client";
import { GeminiClient } from "../src/utils/gemini";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function populateEmbeddings() {
  console.log("🚀 Starting embedding population...");

  // 1. Hotels
  console.log("🏨 Processing Hotels...");
  const hotels = await prisma.hotel.findMany({
    select: { id: true, name: true, description: true, location: true },
  });

  for (const hotel of hotels) {
    const textToEmbed = `${hotel.name}. ${hotel.location}. ${hotel.description}`;
    console.log(`  - Embedding hotel: ${hotel.name}`);
    const embedding = await GeminiClient.embedContent(textToEmbed);
    const vectorStr = `[${embedding.join(",")}]`;
    await prisma.$executeRawUnsafe(
      `UPDATE "hotels" SET embedding = $1::vector WHERE id = $2`,
      vectorStr,
      hotel.id,
    );
  }

  // 2. Trips
  console.log("✈️ Processing Trips...");
  const trips = await prisma.trip.findMany({
    select: { id: true, title: true, description: true, destination: true },
  });

  for (const trip of trips) {
    const textToEmbed = `${trip.title}. ${trip.destination}. ${trip.description}`;
    console.log(`  - Embedding trip: ${trip.title}`);
    const embedding = await GeminiClient.embedContent(textToEmbed);
    const vectorStr = `[${embedding.join(",")}]`;
    await prisma.$executeRawUnsafe(
      `UPDATE "trips" SET embedding = $1::vector WHERE id = $2`,
      vectorStr,
      trip.id,
    );
  }

  // 3. Flights
  console.log("🛫 Processing Flights...");
  const flights = await prisma.flight.findMany({
    select: { id: true, airline: true, route: true },
  });

  for (const flight of flights) {
    const textToEmbed = `${flight.airline} flight. Route: ${flight.route}`;
    console.log(`  - Embedding flight: ${flight.airline} (${flight.route})`);
    const embedding = await GeminiClient.embedContent(textToEmbed);
    const vectorStr = `[${embedding.join(",")}]`;
    await prisma.$executeRawUnsafe(
      `UPDATE "flights" SET embedding = $1::vector WHERE id = $2`,
      vectorStr,
      flight.id,
    );
  }

  console.log("✅ Embedding population complete!");
}

populateEmbeddings()
  .catch((e) => {
    console.error("❌ Population failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
