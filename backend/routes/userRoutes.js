const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  verifyEmail,
  dashboard,
} = require("../controllers/userController");

router.get("/", protect, adminOnly, getAllUsers);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

router.get("/:id", protect, adminOnly, getUserById);

router.patch("/:id/status", protect, adminOnly, toggleUserStatus);

router.get("/verify-email/:token", verifyEmail);

router.get("/dashboard", protect, dashboard);

module.exports = router;