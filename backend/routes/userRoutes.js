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
} = require("../controllers/userController");

router.get("/", protect, adminOnly, getAllUsers);

router.get("/:id", protect, adminOnly, getUserById);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

router.put("/:id/status", protect, adminOnly, toggleUserStatus);

module.exports = router;