import { configureStore } from "@reduxjs/toolkit";

import categoryModalSlice from "./manager/categoryModal.redux";

export const store = configureStore({
  reducer: {
    categoryModal: categoryModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
