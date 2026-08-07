import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  semanticSearchProducts,
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
    next(error);
  }
};

// Get All Products
export const getAllProductsController = async (req, res, next) => {
  try {
    const result = await getAllProducts(req.query);

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
    next(error);
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
    next(error);
  }
};

// Delete Product
export const deleteProductController = async (req, res, next) => {
  try {
    const result = await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};