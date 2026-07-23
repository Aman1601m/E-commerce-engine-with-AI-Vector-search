import express from "express";

import {
  registerController,
  loginController,
} from "../controllers/authController.js";

import validate from "../middleware/validate.js";

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

export default router;