import express from "express";

import protect from "../middleware/protect.js";

import {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);

router.get("/", getCartController);

router.delete("/", clearCartController);

router.post("/:productId", addToCartController);

router.put("/:productId", updateCartItemController);

router.delete("/:productId", removeFromCartController);

export default router;