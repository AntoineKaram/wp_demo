import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  devTools: {
    name: "supplier management api",
  },
});

export type StoreDispatch = typeof store.dispatch;

export type StoreState = ReturnType<typeof store.getState>;

export default store;
