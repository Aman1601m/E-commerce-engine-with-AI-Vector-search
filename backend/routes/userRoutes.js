const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { getAllUsers } = require("../controllers/userController");

// Admin Only
router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;