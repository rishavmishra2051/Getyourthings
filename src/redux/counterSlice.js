import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData: [],
  userInfo: null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartData.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity
        item.price *= action.payload.quantity
      } else {
        state.cartData.push(action.payload)
      }
    },
    increamentQuantity: (state, action) => {
      const item = state.cartData.find(
        (p) => p.id === action.payload.id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartData.find(
        (p) => p.id === action.payload.id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.cartData = state.cartData.filter(
        (p) => p.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.cartData = [];
    },
    // =============== User Start here ==============
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  }
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  addUser,
  removeUser, } = counterSlice.actions;
export default counterSlice.reducer;