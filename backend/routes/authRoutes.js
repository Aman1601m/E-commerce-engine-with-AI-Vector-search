import express from "express";

import {
  registerController,
  loginController,
  profileController,
} from "../controllers/authController.js";

import validate from "../middleware/validate.js";

import protect from "../middleware/authMiddleware.js";

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
  profileController
);

export default router;