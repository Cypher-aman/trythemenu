import { Cart } from '@/utils/interface';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  cart: [] as Cart[],
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.cart.push(action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((cart) => cart.id === action.payload);

      const item = state.cart[index];
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
      };

      state.cart[index] = updatedItem;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((cart) => cart.id === action.payload);

      const item = state.cart[index];
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      if (updatedItem.quantity > 0) {
        state.cart[index] = updatedItem;
      } else {
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } =
  cart.actions;

const cartarr = (state: RootState) => state.cart.cart;

export const selectTotalPrice = createSelector([cartarr], (cart) => {
  return cart.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );
});

export default cart.reducer;
