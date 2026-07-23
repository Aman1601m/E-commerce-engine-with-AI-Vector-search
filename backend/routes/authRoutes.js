import express from "express";

import { registerController } from "../controllers/authController.js";

import validate from "../middleware/validate.js";

import { registerSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  registerController
);

export default router;