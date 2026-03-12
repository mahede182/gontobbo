const axios = require('axios');
const API_KEY = process.env.GONTOBBO_AI;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

async function testGeneration() {
  const model = "gemini-flash-latest"; 
  const url = `${GEMINI_API_URL}/${model}:generateContent?key=${API_KEY}`;
  try {
    const res = await axios.post(url, {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }]
    });
    console.log("Generate success (" + model + "):", res.data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error("Generate error (" + model + "):", err.response?.data?.error?.message || err.response?.data || err.message);
  }
}

testGeneration();
