const PRODUCT_CACHE_PREFIX = "products:list:";

export const buildProductCacheKey = (query = {}) => {
  const normalizedQuery = Object.keys(query)
    .sort()
    .reduce((result, key) => {
      result[key] = query[key];
      return result;
    }, {});

  return `${PRODUCT_CACHE_PREFIX}${JSON.stringify(normalizedQuery)}`;
};