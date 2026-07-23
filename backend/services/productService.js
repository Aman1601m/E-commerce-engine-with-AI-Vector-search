import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import buildProductQuery from "../utils/buildProductQuery.js";

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  return await Product.create(productData);
};

/**
 * Get Products
 * Pagination + Filtering + Sorting
 */
export const getAllProducts = async (query) => {
  const {
    filter,
    sortOption,
    page,
    limit,
  } = buildProductQuery(query);

  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      pageSize: limit,
      hasNextPage: page < Math.ceil(totalProducts / limit),
      hasPreviousPage: page > 1,
    },
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
  const product = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

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