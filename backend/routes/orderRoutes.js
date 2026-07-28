const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// ==========================
// User Routes
// ==========================

router.post("/", protect, createOrder);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrderById);


// ==========================
// Admin Routes
// ==========================

router.get("/admin/all", protect, adminOnly, getAllOrders);

router.put(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

module.exports = router;