const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", protect, adminOnly, getAllUsers);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;