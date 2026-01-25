"use client";

/* ---------------- IMPORTS ---------------- */
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PathChecker from "./utils/pathChecker";
import { helperRoutes, customerRoutes } from "./utils/routes";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- INTERFACES ---------------- */
interface ClientLayoutProps {
  children: ReactNode;
}

/* ---------------- CONSTANTS ---------------- */
const drawerWidth = 260;

/* ---------------- COMPONENT ---------------- */
const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ----- MEDIA QUERY FOR DESKTOP VIEW -----
  const isDesktop = useMediaQuery("(min-width: 900px)");

  // ----- EFFECT TO SET DRAWER STATE BASED ON VIEWPORT -----
  useEffect(() => {
    setDrawerOpen(isDesktop);
  }, [isDesktop]);

  // ----- DETERMINE IF SIDEBAR SHOULD BE SHOWN -----
  const showSidebar =
    helperRoutes.includes(pathname) || customerRoutes.includes(pathname);
  // ----- DYNAMIC STYLING FOR THE MAIN CONTENT -----
  const mainStyle: React.CSSProperties = {
    transition: "margin-left 200ms ease",
    marginLeft:
      showSidebar && drawerOpen && pathname
        ? `${drawerWidth}px`
        : showSidebar
          ? "calc(59px + 1px)"
          : undefined,
    paddingTop: showSidebar ? "70px" : "0",
  };

  return (
    <>
      {/* Toast Notification Container */}
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

      {/* PATH CHECKER (Handles Sidebar/Header Rendering) */}
      <PathChecker
        pathName={pathname}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
      {/* MAIN CONTENT */}
      <main style={mainStyle}>{children}</main>
    </>
  );
};

export default ClientLayout;
