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
  const products = await Product.find().sort({ createdAt: -1 });

  return products;
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