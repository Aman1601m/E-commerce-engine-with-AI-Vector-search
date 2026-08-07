import mongoose from "mongoose";

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create an order from the authenticated user's cart.
 */
export const createOrder = async (userId, clientItems) => {
  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      if (!clientItems || clientItems.length === 0) {
        throw new ApiError(400, "Cart is empty");
      }

      const productIds = clientItems.map((item) => item.product);

      const products = await Product.find({
        _id: { $in: productIds },
      }).session(session);

      const productMap = new Map(
        products.map((product) => [
          product._id.toString(),
          product,
        ])
      );

      const orderItems = [];
      let subtotal = 0;
      let totalItems = 0;

      for (const cartItem of clientItems) {
        const product = productMap.get(
          cartItem.product.toString()
        );

        if (!product || !product.isActive) {
          throw new ApiError(
            400,
            "One or more products are no longer available"
          );
        }

        if (product.stock < cartItem.quantity) {
          throw new ApiError(
            400,
            `Insufficient stock for ${product.name}`
          );
        }

        const price =
          product.discountPrice > 0
            ? product.discountPrice
            : product.price;

        const itemTotal = price * cartItem.quantity;

        orderItems.push({
          product: product._id,
          name: product.name,
          quantity: cartItem.quantity,
          price,
          itemTotal,
        });

        subtotal += itemTotal;
        totalItems += cartItem.quantity;
      }

      /*
       * Conditional stock updates prevent stock from going below zero
       * if another order modifies inventory at the same time.
       */
      for (const cartItem of clientItems) {
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: cartItem.product,
            stock: { $gte: cartItem.quantity },
          },
          {
            $inc: {
              stock: -cartItem.quantity,
              salesCount: cartItem.quantity,
            },
          },
          {
            new: true,
            session,
          }
        );

        if (!updatedProduct) {
          throw new ApiError(
            409,
            "Product stock changed. Please review your cart and try again."
          );
        }
      }

      const orders = await Order.create(
        [
          {
            user: userId,
            items: orderItems,
            totalItems,
            subtotal,
          },
        ],
        { session }
      );

      createdOrder = orders[0];

      // If user had a db cart, optionally clear it, but we don't strictly need to throw error if not exists
      const cart = await Cart.findOne({ user: userId }).session(session);
      if (cart) {
        cart.items = [];
        await cart.save({ session });
      }
    });

    return createdOrder;
  } finally {
    await session.endSession();
  }
};

/**
 * Get all orders belonging to the authenticated user.
 */
export const getMyOrders = async (userId) => {
  return Order.find({
    user: userId,
  })
    .populate("items.product", "name slug thumbnail")
    .sort({ createdAt: -1 });
};

/**
 * Get one order belonging to the authenticated user.
 */
export const getMyOrderById = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.product", "name slug thumbnail");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};