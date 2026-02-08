"use client";

import React, { memo } from "react";
import SharedSidebar from "@/components/SharedSidebar";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Activity,
  Settings,
} from "lucide-react";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const adminItems = [
  { text: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { text: "Users", icon: Users, path: "/admin/users" },
  { text: "Requests", icon: Receipt, path: "/admin/requests" },
  { text: "Status", icon: Activity, path: "/admin/status" },
  { text: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminSideBar = ({ open, setOpen }: SideBarProps) => {
  return (
    <SharedSidebar
      open={open}
      setOpen={setOpen}
      menuItems={adminItems}
      logoSrc="/assets/images/logo.png"
      title="RoadHelper"
    />
  );
};

export default memo(AdminSideBar);
