import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  return await Product.create(productData);
};

/**
 * Get Products with
 * Pagination
 * Filtering
 */
export const getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    category,
    brand,
    minPrice,
    maxPrice,
  } = query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (brand) {
    filter.brand = brand;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const skip = (pageNumber - 1) * pageSize;

  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      currentPage: pageNumber,
      pageSize,
      hasNextPage: pageNumber < Math.ceil(totalProducts / pageSize),
      hasPreviousPage: pageNumber > 1,
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