import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

import validate from "../middleware/validate.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.js";

const router = express.Router();

// Create Product
router.post(
  "/", 
  validate(createProductController),
  createProductController
);

// Get All Products
router.get("/", getAllProductsController);

// Get Product By ID
router.get("/:id", getProductByIdController);

// Update Product
router.put(
  "/:id", 
  validate(updateProductController),
  updateProductController
);

// Delete Product
router.delete("/:id", deleteProductController);

export default router;