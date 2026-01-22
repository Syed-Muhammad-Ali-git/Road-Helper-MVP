import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  customer: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customer: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<any>) => {
      state.customer = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    setCustomerLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCustomerError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutCustomer: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCustomer,
  setCustomerLoading,
  setCustomerError,
  logoutCustomer,
} = customerSlice.actions;
export default customerSlice.reducer;
