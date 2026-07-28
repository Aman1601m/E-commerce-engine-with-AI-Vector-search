const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

// All order routes require login
router.use(protect);

// Create Order
router.post("/", createOrder);

// Get Logged-in User Orders
router.get("/", getMyOrders);

// Get Single Order
router.get("/:id", getOrderById);

module.exports = router;