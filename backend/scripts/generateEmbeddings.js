import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Product from "../models/Product.js";

import {
  generateProductEmbedding,
} from "../services/embeddingService.js";

dotenv.config();

const generateProductEmbeddings = async () => {
  try {
    await connectDB();

    console.log("Starting product embedding generation...");

    const products = await Product.find({
      $or: [
        { embedding: { $exists: false } },
        { embedding: { $size: 0 } },
      ],
    }).select("+embedding");

    console.log(
      `${products.length} product(s) require embeddings`
    );

    let successCount = 0;
    let failureCount = 0;

    for (const product of products) {
      try {
        console.log(`Generating embedding: ${product.name}`);

        const embedding =
          await generateProductEmbedding(product);

        product.embedding = embedding;

        await product.save();

        successCount += 1;

        console.log(`Completed: ${product.name}`);
      } catch (error) {
        failureCount += 1;

        console.error(
          `Failed: ${product.name} - ${error.message}`
        );
      }
    }

    console.log("");
    console.log("Embedding generation complete");
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failureCount}`);

    process.exit(failureCount > 0 ? 1 : 0);
  } catch (error) {
    console.error(
      "Embedding generation failed:",
      error.message
    );

    process.exit(1);
  }
};

generateProductEmbeddings();