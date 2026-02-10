import { deleteCookie } from "cookies-next";

/**
 * Clear all auth-related cookies and storage on logout
 */
export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  deleteCookie("token", { path: "/" });
  deleteCookie("role", { path: "/" });
  localStorage.removeItem("loginData");
}
