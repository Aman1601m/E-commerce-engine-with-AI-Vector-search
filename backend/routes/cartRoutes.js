const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

// All cart routes require login
router.use(protect);

// Get Cart
router.get("/", getCart);

// Add Product To Cart
router.post("/", addToCart);

// Update Cart Item
router.put("/:productId", updateCartItem);

// Remove Product From Cart
router.delete("/:productId", removeCartItem);

// Clear Cart
router.delete("/", clearCart);

module.exports = router; 