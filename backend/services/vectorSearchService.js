// We will use dynamic import to ensure compatibility with CommonJS/ESM
let pipelinePromise = null;

const getPipeline = async () => {
  if (!pipelinePromise) {
    // Suppress local model loading warnings if any
    const { env, pipeline } = require('@xenova/transformers');
    env.allowLocalModels = false; // We will fetch from HF hub initially, then it caches
    
    // all-MiniLM-L6-v2 is a small, fast, and excellent model for embeddings
    pipelinePromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return pipelinePromise;
};

/**
 * Generates vector embeddings for a given text using Local AI (Transformers.js)
 * @param {string} text - The text to generate embeddings for (e.g. product title + description)
 * @returns {Promise<number[]>} The vector embedding array
 */
const generateEmbedding = async (text) => {
  try {
    const extractor = await getPipeline();
    // pooling: 'mean' and normalize: true is standard for cosine similarity (MongoDB vector search)
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    
    // Output data is a Float32Array, convert to standard JS Array for MongoDB
    return Array.from(output.data);
  } catch (error) {
    console.error("Local Embedding Error:", error);
    throw new Error("Failed to generate vector embedding locally");
  }
};

module.exports = {
  generateEmbedding,
};
