import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cartService.js";

export const getCartController = async (req, res, next) => {
  try {
    const cart = await getCart(req.user._id);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCartController = async (req, res, next) => {
  try {
    const cart = await addToCart(
      req.user._id,
      req.params.productId,
      req.body.quantity
    );

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItemController = async (
  req,
  res,
  next
) => {
  try {
    const cart = await updateCartItem(
      req.user._id,
      req.params.productId,
      req.body.quantity
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCartController = async (
  req,
  res,
  next
) => {
  try {
    const cart = await removeFromCart(
      req.user._id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCartController = async (req, res, next) => {
  try {
    const cart = await clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};