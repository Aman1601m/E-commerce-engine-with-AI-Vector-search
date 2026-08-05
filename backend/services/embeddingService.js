import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const buildProductEmbeddingText = (product) => {
  return `
Product Name: ${product.name}
Description: ${product.description}
Brand: ${product.brand}
Category: ${product.category}
Tags: ${(product.tags || []).join(", ")}
`.trim();
};

export const generateEmbedding = async (text) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
  });

  return response.embeddings[0].values;
};

export const generateProductEmbedding = async (product) => {
  const text = buildProductEmbeddingText(product);

  return generateEmbedding(text);
};

export const generateQueryEmbedding = async (query) => {
  return generateEmbedding(query);
};

export const generateQueryEmbedding = async (query) =>{
  return generateEmbedding(query);
};