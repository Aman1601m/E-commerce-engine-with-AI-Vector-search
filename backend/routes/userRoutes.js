import express from "express";
import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getDashboardStats,
  updateProfile,
  changePassword,
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect);

// Self-service profile routes (Any logged-in user)
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

// Wishlist routes
router.get("/wishlist", getWishlist);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

// Admin-only routes
router.use(authorize("admin"));
router.get("/stats", getDashboardStats);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/status", toggleUserStatus);

export default router;