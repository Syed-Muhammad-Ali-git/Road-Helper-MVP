"use client";

import React, { ReactNode, useEffect, useState, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import store, { RootState } from "@/redux/store";
import PathChecker from "./utils/pathChecker";
import { protectedRoutes } from "./utils/routes";
import { ToastContainer } from "react-toastify";
import { useLayout } from "./context/layoutContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { setCustomer } from "@/redux/reducers/customer-reducer";
import { setHelper } from "@/redux/reducers/helper-reducer";
import { Box, Center, Loader, Drawer, Stack, Text } from "@mantine/core";
import Sidebar from "@/components/sidebar/sidebar";
import { motion, AnimatePresence } from "framer-motion";

const drawerWidth = 280;

const ClientLayoutInner = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { isLayoutVisible } = useLayout();
  const dispatch = useDispatch();

  const customer = useSelector((state: RootState) => state.customer.customer);
  const helper = useSelector((state: RootState) => state.helper.helper);

  useEffect(() => {
    const role = getCookie("userRole");
    const token = getCookie("token");

    if (token) {
      if (role === "client" && !customer) {
        dispatch(setCustomer({ role: "client", token }));
      } else if (role === "helper" && !helper) {
        // In a real app, you'd fetch helper details here
        dispatch(setHelper({ role: "helper", token }));
      }
    }
  }, [dispatch, customer, helper]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDrawerOpen(false);
    }
  }, [pathname]);

  const showSidebar = useMemo(() => {
    if (!pathname || !isLayoutVisible) return false;
    return protectedRoutes.includes(pathname) || pathname === "/";
  }, [pathname, isLayoutVisible]);

  const mainStyle: React.CSSProperties = {
    transition: "padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    paddingLeft:
      showSidebar &&
      drawerOpen &&
      typeof window !== "undefined" &&
      window.innerWidth >= 768
        ? `${drawerWidth}px`
        : "0",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    width: "100%",
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {showSidebar && (
        <Box
          className="fixed left-0 top-[70px] bottom-0 z-[99] bg-white border-r hidden md:block transition-all duration-300"
          style={{
            width: drawerOpen ? drawerWidth : 0,
            overflow: "hidden",
            opacity: drawerOpen ? 1 : 0,
          }}
        >
          <Box style={{ width: drawerWidth }}>
            <Sidebar />
          </Box>
        </Box>
      )}

      <Drawer
        opened={
          showSidebar &&
          drawerOpen &&
          typeof window !== "undefined" &&
          window.innerWidth < 768
        }
        onClose={() => setDrawerOpen(false)}
        size={drawerWidth}
        withCloseButton={false}
        padding={0}
        hiddenFrom="md"
      >
        <Sidebar />
      </Drawer>

      <Box className="flex flex-col min-h-screen">
        {pathname && isLayoutVisible && (
          <PathChecker
            pathName={pathname}
            open={drawerOpen}
            setOpen={setDrawerOpen}
          />
        )}
        <main style={mainStyle} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </Box>
    </>
  );
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </Provider>
  );
};

export default ClientLayout;
