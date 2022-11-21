import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/user/userSlice'
import productReducer from '../feature/product/productSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer
  },
});