import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GONTOBBO_AI;

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const models = response.data.models;
    console.log("Available Models:");
    models.forEach((model: any) => {
      if (model.supportedGenerationMethods.includes("embedContent")) {
        console.log(`- ${model.name} (${model.supportedGenerationMethods.join(", ")})`);
      }
    });
  } catch (error: any) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
}

listModels();
