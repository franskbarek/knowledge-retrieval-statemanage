import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productsSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
