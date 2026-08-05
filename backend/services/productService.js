import Product from "../models/Product.js";

import ApiError from "../utils/ApiError.js";
import buildProductQuery from "../utils/buildProductQuery.js";

import redisClient from "../config/redis.js";

import {
  buildProductCacheKey,
  invalidateProductCache,
} from "../utils/productCache.js";

import {
  generateProductEmbedding,
  generateQueryEmbedding,
} from "./embeddingService.js";

import dotenv from "dotenv";

dotenv.config();

const PRODUCT_CACHE_TTL = 300;

const SEMANTIC_CACHE_TTL = 300; 

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  const embedding = await generateProductEmbedding(productData);

  const product = await Product.create({
    ...productData,
    embedding,
  });

  await invalidateProductCache();

  return product;
};

/**
 * Get All Products
 *
 * Cache-Aside Pattern:
 *
 * 1. Check Redis
 * 2. HIT  -> return cached result
 * 3. MISS -> query MongoDB
 * 4. Store result in Redis
 * 5. Return result
 */
export const getAllProducts = async (query) => {
  const cacheKey = buildProductCacheKey(query);

  /*
  |--------------------------------------------------------------------------
  | Check Redis
  |--------------------------------------------------------------------------
  */

  if (redisClient.isReady) {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`CACHE HIT: ${cacheKey}`);

      return {
        ...JSON.parse(cachedData),
        cache: "HIT",
      };
    }

    console.log(`CACHE MISS: ${cacheKey}`);
  }

  /*
  |--------------------------------------------------------------------------
  | Build MongoDB Query
  |--------------------------------------------------------------------------
  */

  const {
    filter,
    sortOption,
    projection,
    page,
    limit,
  } = buildProductQuery(query);

  const skip = (page - 1) * limit;

  /*
  |--------------------------------------------------------------------------
  | Query MongoDB
  |--------------------------------------------------------------------------
  */

  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .select(projection)
      .sort(sortOption)
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  const result = {
    products,

    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
      pageSize: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };

  /*
  |--------------------------------------------------------------------------
  | Cache MongoDB Result
  |--------------------------------------------------------------------------
  */

  if (redisClient.isReady) {
    await redisClient.setEx(
      cacheKey,
      PRODUCT_CACHE_TTL,
      JSON.stringify(result)
    );
  }

  return {
    ...result,
    cache: "MISS",
  };
};

/**
 * Get Product By ID
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

/**
 * Update Product
 */
export const updateProduct = async (id, updatedData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await invalidateProductCache();

  return product;
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await invalidateProductCache();

  return {
    message: "Product deleted successfully",
  };
};

// Sematic Product Search
export const semanticSearchProducts = async (query) => {
  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const cacheKey = `semantic-search:${query.toLowerCase().trim()}`;

  // Check Redis
  if (redisClient.isReady) {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`SEMANTIC CACHE HIT: ${cacheKey}`);

      return JSON.parse(cachedData);
    }

    console.log(`SEMANTIC CACHE MISS: ${cacheKey}`);
  }

  const queryVector = await generateQueryEmbedding(query);

  const products = await Product.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector,
        numCandidates: 100,
        limit: 10,
      },
    },
    {
      $project: {
        embedding: 0,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  if (redisClient.isReady) {
    await redisClient.setEx(
      cacheKey,
      SEMANTIC_CACHE_TTL,
      JSON.stringify(products)
    );
  }

  return products;
};