"use client";

import React, { memo } from "react";
import SharedSidebar from "@/components/SharedSidebar";
import { LayoutDashboard, User, History, HelpCircle } from "lucide-react";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const customerItems = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/customer/dashboard" },
  { text: "Profile", icon: User, path: "/customer/profile" },
  { text: "History", icon: History, path: "/customer/history" },
  { text: "Help", icon: HelpCircle, path: "/customer/help" },
];

const CustomerSideBar = ({ open, setOpen }: SideBarProps) => {
  return (
    <SharedSidebar
      open={open}
      setOpen={setOpen}
      menuItems={customerItems}
      logoSrc="/assets/images/logo.png"
      title="Customer"
    />
  );
};

export default memo(CustomerSideBar);
