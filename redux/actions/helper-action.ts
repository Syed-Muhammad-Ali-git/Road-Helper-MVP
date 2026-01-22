import { AppDispatch } from "@/redux/store";
import {
  setHelper,
  setHelperLoading,
  setHelperError,
  logoutHelper,
} from "@/redux/reducers/helper-reducer";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";

export const helperLoginAction =
  (credentials: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setHelperLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      const user = userCredential.user;

      const helperDoc = await getDoc(doc(db, "helpers", user.uid));
      if (!helperDoc.exists()) {
        throw new Error("Helper record not found");
      }

      const token = await user.getIdToken();
      const helperData = helperDoc.data();

      setCookie("token", token, { path: "/" });
      setCookie("userRole", "helper", { path: "/" });
      dispatch(setHelper(helperData));

      return helperData;
    } catch (error: any) {
      dispatch(setHelperError(error.message || "Helper login failed"));
      throw error;
    }
  };

export const helperRegisterAction =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setHelperLoading(true));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      const helperData = {
        uid: user.uid,
        ...data,
        role: "helper",
        createdAt: new Date().toISOString(),
      };
      delete helperData.password;

      await setDoc(doc(db, "helpers", user.uid), helperData);

      const token = await user.getIdToken();
      setCookie("token", token, { path: "/" });
      setCookie("userRole", "helper", { path: "/" });
      dispatch(setHelper(helperData));

      return helperData;
    } catch (error: any) {
      dispatch(setHelperError(error.message || "Helper registration failed"));
      throw error;
    }
  };

export const helperLogoutAction = () => async (dispatch: AppDispatch) => {
  await signOut(auth);
  deleteCookie("token", { path: "/" });
  deleteCookie("userRole", { path: "/" });
  dispatch(logoutHelper());
};
