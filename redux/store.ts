import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./reducers/customer-reducer";
import helperReducer from "./reducers/helper-reducer";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    helper: helperReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
