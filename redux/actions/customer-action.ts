import { AppDispatch } from "@/redux/store";
import {
  setCustomer,
  setCustomerLoading,
  setCustomerError,
  logoutCustomer,
} from "@/redux/reducers/customer-reducer";
import { setCookie, deleteCookie } from "cookies-next";

export const customerLoginAction =
  (phone: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setCustomerLoading(true));
      // Simulated token generation from phone number
      const token = btoa(`customer_${phone}_${Date.now()}`);
      const customerData = {
        phone,
        role: "client",
        uid: phone,
        fullName: "Guest User",
      }; // Using 'client' role to match existing paths

      setCookie("token", token, { path: "/" });
      setCookie("userRole", "client", { path: "/" });
      dispatch(setCustomer(customerData));

      return customerData;
    } catch (error: any) {
      dispatch(setCustomerError(error.message || "Login failed"));
      throw error;
    }
  };

export const customerLogoutAction = () => async (dispatch: AppDispatch) => {
  deleteCookie("token", { path: "/" });
  deleteCookie("userRole", { path: "/" });
  dispatch(logoutCustomer());
};
