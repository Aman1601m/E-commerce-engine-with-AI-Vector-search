import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  semanticSearchController,
} from "../controllers/productController.js";

import validate from "../middleware/validate.js";
import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAllProductsController);

router.get("/search", semanticSearchController);

router.get("/:id", getProductByIdController);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createProductSchema),
  createProductController
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateProductSchema),
  updateProductController
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProductController
);

export default router;