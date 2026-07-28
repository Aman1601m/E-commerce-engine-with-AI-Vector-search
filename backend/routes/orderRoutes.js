const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware")("admin");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
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

router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;