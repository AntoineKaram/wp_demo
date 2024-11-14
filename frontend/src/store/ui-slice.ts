import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  isScrolled: boolean;
  isLoading: boolean;
};

const initialState: State = {
  isScrolled: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setIsScrolled(state: State, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
    setIsLoading(state: State, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetSlice(state: State) {
      state.isScrolled = initialState.isScrolled;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
