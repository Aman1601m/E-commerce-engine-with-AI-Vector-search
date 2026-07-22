import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

// Create Product
export const createProductController = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Get All Products
export const getAllProductsController = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await getAllProducts(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Get Product By ID
export const getProductByIdController = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Update Product
export const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
      next(error); // Pass the error to the error handling middleware
  }
};

// Delete Product
export const deleteProductController = async (req, res, next) => {
  try {
    const response = await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};