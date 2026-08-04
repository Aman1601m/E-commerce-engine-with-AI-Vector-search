import express from "express";

import protect from "../middleware/protect.js";

import {
  createOrderController,
  getMyOrdersController,
  getMyOrderByIdController,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/", createOrderController);

router.get("/", getMyOrdersController);

router.get("/:orderId", getMyOrderByIdController);

export default router;