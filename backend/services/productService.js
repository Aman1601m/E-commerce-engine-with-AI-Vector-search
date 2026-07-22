import Product from "../models/Product.js";

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

/**
 * Get all products
 */
export const getAllProducts = async () => {
  /**
 * Get paginated products
 */
export const getAllProducts = async (page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Product.countDocuments(),
  ]);

  return {
    products,
    pagination: {
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      pageSize: limit,
      hasNextPage: page * limit < totalProducts,
      hasPreviousPage: page > 1,
    },
  };
};
};

/**
 * Get product by ID
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

/**
 * Update product
 */
export const updateProduct = async (id, updatedData) => {
  const product = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

/**
 * Delete product
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    message: "Product deleted successfully",
  };
};