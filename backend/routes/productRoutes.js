import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/", createProductController);

// Get All Products
router.get("/", getAllProductsController);

// Get Product By ID
router.get("/:id", getProductByIdController);

// Update Product
router.put("/:id", updateProductController);

// Delete Product
router.delete("/:id", deleteProductController);

export default router;