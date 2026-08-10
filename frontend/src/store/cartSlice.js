import { createSlice } from '@reduxjs/toolkit';

const safeParseJSON = (data) => {
  try {
    return data && data !== 'undefined' ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const initialCartItems = safeParseJSON(localStorage.getItem('cartItems'));

const initialShippingAddress = safeParseJSON(localStorage.getItem('shippingAddress')) || {};
const initialPaymentMethod = localStorage.getItem('paymentMethod') || 'CashOnDelivery';

const initialState = {
  items: initialCartItems,
  totalQuantity: initialCartItems.reduce((total, item) => total + item.quantity, 0),
  totalPrice: initialCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  shippingAddress: initialShippingAddress,
  paymentMethod: initialPaymentMethod,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      state.totalPrice += newItem.price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    }
  },
});

export const { addToCart, removeFromCart, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
