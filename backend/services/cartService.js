import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

const populateCart = async (cartId) => {
  const cart = await Cart.findById(cartId).populate(
    "items.product",
    "name slug price discountPrice thumbnail stock isActive"
  );

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const items = cart.items.map((item) => {
    const product = item.product;

    const unitPrice =
      product.discountPrice > 0
        ? product.discountPrice
        : product.price;

    return {
      product,
      quantity: item.quantity,
      unitPrice,
      itemTotal: unitPrice * item.quantity,
    };
  });

  const subtotal = items.reduce(
    (total, item) => total + item.itemTotal,
    0
  );

  return {
    id: cart._id,
    user: cart.user,
    items,
    totalItems: items.reduce(
      (total, item) => total + item.quantity,
      0
    ),
    subtotal,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  return populateCart(cart._id);
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    throw new ApiError(
      400,
      "Quantity must be a positive integer"
    );
  }

  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  const newQuantity = existingItem
    ? existingItem.quantity + parsedQuantity
    : parsedQuantity;

  if (newQuantity > product.stock) {
    throw new ApiError(
      400,
      `Only ${product.stock} item(s) available in stock`
    );
  }

  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity: parsedQuantity,
    });
  }

  await cart.save();

  return populateCart(cart._id);
};

export const updateCartItem = async (
  userId,
  productId,
  quantity
) => {
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    throw new ApiError(
      400,
      "Quantity must be a positive integer"
    );
  }

  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found");
  }

  if (parsedQuantity > product.stock) {
    throw new ApiError(
      400,
      `Only ${product.stock} item(s) available in stock`
    );
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (cartItem) =>
      cartItem.product.toString() === productId.toString()
  );

  if (!item) {
    throw new ApiError(404, "Product not found in cart");
  }

  item.quantity = parsedQuantity;

  await cart.save();

  return populateCart(cart._id);
};

export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === productId.toString()
  );

  if (!itemExists) {
    throw new ApiError(404, "Product not found in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  await cart.save();

  return populateCart(cart._id);
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = [];

  await cart.save();

  return populateCart(cart._id);
};