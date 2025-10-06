import { configureStore } from "@reduxjs/toolkit";

import categoryModalSlice from "./manager/modal/categoryModal.redux";
import testModalSlice from "./manager/modal/testModal.redux";

export const store = configureStore({
  reducer: {
    categoryModal: categoryModalSlice,
    testModal: testModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
