const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware")("admin");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
} = require("../controllers/productController");

// Public Routes
router.get("/", getAllProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/search/:keyword", searchProducts);

router.get("/:id", getSingleProduct);

// Admin Routes
router.post("/", protect, adminOnly, createProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;