"use client";

/* ---------------- IMPORTS ---------------- */
import React, {
    ReactNode,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import store, { AppDispatch } from "@/redux/store";
import PathChecker from "./utils/pathChecker";
import { protectedRoutes } from "./utils/routes";
import { ToastContainer } from "react-toastify";
import { useLayout } from "./context/layoutContext";
import { Provider, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { loginUser, logoutUser, setUserData, setLoading } from "@/redux/reducers/auth-reducer/auth-slice";

/* ---------------- INTERFACES ---------------- */
interface ClientLayoutProps {
    children: ReactNode;
}

/* ---------------- COMPONENT ---------------- */
const ClientLayout = ({ children }: ClientLayoutProps) => {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isLayoutVisible } = useLayout();

    // Component to initialize Firebase Auth Sync
    const ReduxInitializer = () => {
        const dispatch: AppDispatch = useDispatch();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    dispatch(loginUser({ uid: firebaseUser.uid, email: firebaseUser.email }));

                    // Fetch user data
                    const clientDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (clientDoc.exists()) {
                        dispatch(setUserData(clientDoc.data()));
                    } else {
                        const helperDoc = await getDoc(doc(db, "helpers", firebaseUser.uid));
                        if (helperDoc.exists()) {
                            dispatch(setUserData(helperDoc.data()));
                        }
                    }
                } else {
                    dispatch(logoutUser());
                }
                dispatch(setLoading(false));
            });

            return () => unsubscribe();
        }, [dispatch]);

        return null;
    };

    const handleSetDrawerOpen = useCallback((value: boolean) => {
        setDrawerOpen(value);
    }, []);

    const showSidebar = useMemo(() => {
        if (!pathname || !isLayoutVisible) return false;
        return protectedRoutes.includes(pathname) || pathname === "/";
    }, [pathname, isLayoutVisible]);

    const mainStyle: React.CSSProperties = useMemo(
        () => ({
            transition: "margin-left 200ms ease",
            paddingTop: showSidebar ? "70px" : "0",
        }),
        [showSidebar]
    );

    return (
        <Provider store={store}>
            <ReduxInitializer />
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {pathname && isLayoutVisible && (
                    <PathChecker
                        pathName={pathname}
                        open={drawerOpen}
                        setOpen={handleSetDrawerOpen}
                    />
                )}
                <main style={mainStyle}>{children}</main>
            </>
        </Provider>
    );
};

export default ClientLayout;
