import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

// Create Product
export const createProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By ID
export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProductController = async (req, res) => {
  try {
    const response = await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};