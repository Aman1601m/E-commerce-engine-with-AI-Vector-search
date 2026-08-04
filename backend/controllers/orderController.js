import {
  createOrder,
  getMyOrders,
  getMyOrderById,
} from "../services/orderService.js";

export const createOrderController = async (
  req,
  res,
  next
) => {
  try {
    const order = await createOrder(req.user._id);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrdersController = async (
  req,
  res,
  next
) => {
  try {
    const orders = await getMyOrders(req.user._id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrderByIdController = async (
  req,
  res,
  next
) => {
  try {
    const order = await getMyOrderById(
      req.user._id,
      req.params.orderId
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};