/* ---------------- IMPORTS ---------------- */
import React from "react";
import { protectedRoutes, customerRoutes, helperRoutes, adminRoutes } from "./routes";
import HelperSideBar from "../components/helperSidebar/sidebar";
import HelperHeader from "../components/helperHeader/header";
import CustomerSideBar from "../components/customerSidebar/sidebar";
import CustomerHeader from "../components/customerHeader/header";
import AdminSideBar from "../components/adminSidebar/sidebar";
import AdminHeader from "../components/adminHeader/header";

/* ---------------- INTERFACES ---------------- */
interface PathCheckerProps {
  pathName: string;
  open: boolean;
  setOpen: (v: boolean) => void;
}

/* ---------------- COMPONENT ---------------- */
const PathChecker = ({ pathName, open, setOpen }: PathCheckerProps) => {
  // ----- CHECK IF THE CURRENT PATH IS A PROTECTED ROUTE -----
  const show = protectedRoutes.includes(pathName);
  // ----- RENDER NOTHING IF THE ROUTE IS NOT PROTECTED -----
  if (!show) return null;

  // ----- DETERMINE IF IT'S A CLIENT OR HELPER ROUTE -----
  const isCustomerRoute = customerRoutes.includes(pathName);
  const isHelperRoute = helperRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);

  // ----- RENDER HEADER AND SIDEBAR BASED ON ROUTE TYPE -----
  if (isCustomerRoute) {
    return (
      <>
        <CustomerHeader sidebarOpen={open} />
        <CustomerSideBar open={open} setOpen={setOpen} />
      </>
    );
  } else if (isHelperRoute) {
    return (
      <>
        <HelperHeader sidebarOpen={open} />
        <HelperSideBar open={open} setOpen={setOpen} />
      </>
    );
  } else if (isAdminRoute) {
    return (
      <>
        <AdminHeader sidebarOpen={open} />
        <AdminSideBar open={open} setOpen={setOpen} />
      </>
    );
  }

  // ----- FALLBACK (SHOULD NOT REACH HERE) -----
  return null;
};

export default PathChecker;
