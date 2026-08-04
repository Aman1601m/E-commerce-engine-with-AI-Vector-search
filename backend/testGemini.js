import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: "Warm winter jacket for snowy weather",
    });

    console.log(response.embeddings[0].values.length);
  } catch (error) {
    console.error(error);
  }
}

test();