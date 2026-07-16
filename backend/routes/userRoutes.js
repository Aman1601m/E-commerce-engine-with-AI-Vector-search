const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/", protect, adminOnly, getAllUsers);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

router.get("/:id", protect, adminOnly, getUserById);

module.exports = router;