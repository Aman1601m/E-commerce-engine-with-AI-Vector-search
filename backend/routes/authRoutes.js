const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const validate = require("../middleware/validate");

const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password minimum 6 characters"),
  ],
  validate,
  registerUser
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginUser
);

// Protected Profile
router.get("/profile", protect, getProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;