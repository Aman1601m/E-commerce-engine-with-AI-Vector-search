import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let ai = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
} catch (error) {
  console.warn("Failed to initialize GoogleGenAI:", error.message);
}

// Generate a dummy embedding of 768 dimensions for fallback
const getDummyEmbedding = () => Array.from({ length: 768 }, () => Math.random() - 0.5);

/**
 * Generate embedding for a product document
 */
export const generateProductEmbedding = async (product) => {
  if (!ai) {
    console.warn("No GEMINI_API_KEY found, using dummy embedding for product.");
    return getDummyEmbedding();
  }
  const textToEmbed = `
    Name: ${product.name}
    Brand: ${product.brand}
    Category: ${product.category}
    Description: ${product.description}
    Tags: ${product.tags ? product.tags.join(", ") : ""}
  `.trim();

  const response = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: textToEmbed,
  });

  return response.embeddings[0].values;
};

/**
 * Generate embedding for a search query
 */
export const generateQueryEmbedding = async (query) => {
  if (!ai) {
    console.warn("No GEMINI_API_KEY found, using dummy embedding for query.");
    return getDummyEmbedding();
  }
  const response = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: query,
  });

  return response.embeddings[0].values;
};