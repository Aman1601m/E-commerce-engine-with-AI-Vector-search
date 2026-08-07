import express from "express";

import {
  registerController,
  loginController,
  getProfileController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authController.js";

import validate from "../middleware/validate.js";

import protect from "../middleware/protect.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  registerController
);

router.post(
  "/login",
  validate(loginSchema),
  loginController
);

router.get(
  "/profile",
  protect,
  getProfileController
);

router.post("/forgotpassword", forgotPasswordController);
router.post("/resetpassword/:token", resetPasswordController);

export default router;