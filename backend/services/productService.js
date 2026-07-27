import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import buildProductQuery from "../utils/buildProductQuery.js";
import redisClient from "../config/redis.js";
import { buildProductCacheKey } from "../utils/productCache.js";

const PRODUCT_CACHE_TTL = 300;

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  return await Product.create(productData);
};

/**
 * Get Products
 *
 * Supports:
 * - Redis caching
 * - Pagination
 * - Filtering
 * - Sorting
 * - Search
 * - Field selection
 */
export const getAllProducts = async (query) => {
  const cacheKey = buildProductCacheKey(query);

  /*
  |--------------------------------------------------------------------------
  | 1. Check Redis
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
  | 2. Build MongoDB Query
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
  | 3. Query MongoDB
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
  | 4. Store Result in Redis
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

  return {
    message: "Product deleted successfully",
  };
};