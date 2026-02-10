import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../index";
import type { UserRole } from "@/app/types";

export interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role: UserRole | null;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: {
        payload: {
          uid: string;
          email: string | null;
          displayName: string | null;
          photoURL: string | null;
          role: UserRole;
        } | null;
      }
    ) => {
      state.user = action.payload;
    },
    setToken: (state, action: { payload: string | null }) => {
      state.token = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setUser, setToken, setLoading, setError, logout } =
  authSlice.actions;

// Manual async thunk - Firebase calls ONLY inside
const setAuthCookies = (token: string, role: UserRole) => {
  const { setCookie } = require("cookies-next");
  setCookie("token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
  setCookie("role", role, { maxAge: 60 * 60 * 24 * 7, path: "/" });
};

export const loginWithEmail =
  (email: string, password: string, role: UserRole) =>
  async (dispatch: AppDispatch): Promise<{ success: boolean; error?: string }> => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { auth } = await import("@/lib/firebase/config");
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setAuthCookies(token, role);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? null,
        displayName: userCredential.user.displayName ?? null,
        photoURL: userCredential.user.photoURL ?? null,
        role,
      }));
      dispatch(setToken(token));
      dispatch(setLoading(false));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      dispatch(setError(message));
      dispatch(setLoading(false));
      return { success: false, error: message };
    }
  };

export const loginWithGoogle =
  (role: UserRole) =>
  async (dispatch: AppDispatch): Promise<{ success: boolean; error?: string }> => {
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
    const { auth } = await import("@/lib/firebase/config");
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      setAuthCookies(token, role);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? null,
        displayName: userCredential.user.displayName ?? null,
        photoURL: userCredential.user.photoURL ?? null,
        role,
      }));
      dispatch(setToken(token));
      dispatch(setLoading(false));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google login failed";
      dispatch(setError(message));
      dispatch(setLoading(false));
      return { success: false, error: message };
    }
  };

export const logoutUser =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { signOut } = await import("firebase/auth");
    const { auth } = await import("@/lib/firebase/config");
    const { clearAuthStorage } = await import("@/lib/auth-utils");
    try {
      await signOut(auth);
    } finally {
      clearAuthStorage();
      dispatch(logout());
    }
  };

export default authSlice.reducer;
