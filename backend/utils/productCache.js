import redisClient from "../config/redis.js";

const PRODUCT_CACHE_PREFIX = "products:list:";

/**
 * Generate a consistent cache key for product-list queries.
 *
 * Example:
 *
 * /api/products?page=1&limit=5
 *
 * products:list:{"limit":"5","page":"1"}
 */
export const buildProductCacheKey = (query = {}) => {
  const normalizedQuery = Object.keys(query)
    .sort()
    .reduce((result, key) => {
      result[key] = query[key];
      return result;
    }, {});

  return `${PRODUCT_CACHE_PREFIX}${JSON.stringify(normalizedQuery)}`;
};

/**
 * Delete all cached product-list queries.
 *
 * Uses SCAN instead of KEYS so Redis does not need to
 * block while searching the entire keyspace.
 */
export const invalidateProductCache = async () => {
  if (!redisClient.isReady) {
    return;
  }

  let deletedKeys = 0;

  for await (const keys of redisClient.scanIterator({
    MATCH: `${PRODUCT_CACHE_PREFIX}*`,
    COUNT: 100,
  })) {
    if (keys.length === 0) {
      continue;
    }

    await redisClient.del(keys);

    deletedKeys += keys.length;
  }

  console.log(
    `PRODUCT CACHE INVALIDATED: ${deletedKeys} key(s) deleted`
  );
};