import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelperState {
  helper: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: HelperState = {
  helper: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setHelper: (state, action: PayloadAction<any>) => {
      state.helper = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    setHelperLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHelperError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutHelper: (state) => {
      state.helper = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setHelper, setHelperLoading, setHelperError, logoutHelper } =
  helperSlice.actions;
export default helperSlice.reducer;
