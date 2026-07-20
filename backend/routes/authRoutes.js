const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const validate = require("../middleware/validate");

const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  updateProfile,
  logoutUser,
  forgotPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", validate, registerUser);
router.post("/login", validate, loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.post("/logout", protect, logoutUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;