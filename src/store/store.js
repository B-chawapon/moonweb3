import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import itemSlice from "./itemSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    listItemNFT: itemSlice,
  },
});
