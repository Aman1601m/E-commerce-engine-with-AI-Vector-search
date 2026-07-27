import OpenAI from "openai";

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

/**
 * Convert product information into a single searchable string.
 */
export const buildProductEmbeddingText = (product) => {
  const parts = [
    product.name,
    product.brand,
    product.category,
    product.description,
    ...(product.tags || []),
  ];

  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Generate an embedding for supplied text.
 */
export const generateEmbedding = async (text) => {
  if (!text || !text.trim()) {
    throw new Error("Embedding text cannot be empty");
  }

  const openai = getOpenAIClient();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
};

/**
 * Generate an embedding from a product.
 */
export const generateProductEmbedding = async (product) => {
  const text = buildProductEmbeddingText(product);

  return generateEmbedding(text);
};