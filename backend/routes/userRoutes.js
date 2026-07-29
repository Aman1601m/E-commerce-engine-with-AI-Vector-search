const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getDashboardStats,
} = require("../controllers/userController");

// Only admins can access these routes
router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/stats", getDashboardStats);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/status", toggleUserStatus);

module.exports = router;