"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mantine/core";
import { Stack } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

// Icons
import dashboardLogo from "../../assets/images/dashboard.png";
import auditLogo from "../../assets/images/audit.png";
import settingsLogo from "../../assets/images/settings.png";
import totalIcon from "../../assets/images/totalIcon.png";
import suspendedRed from "../../assets/images/suspendedRed.png";
import activeIcon from "../../assets/images/activeIcon.png";
import type { SideBarProps, SidebarItem } from "../../types";

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: "#0A0A0A", // brand-black
  color: "#FFFFFF",
  overflow: "hidden",
  borderRight: "1px solid #27272A",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#0A0A0A",
  color: "#FFFFFF",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  overflow: "hidden",
  borderRight: "1px solid #27272A",
});

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 12px",
  height: 64,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    height: "100vh",
    overflow: "hidden",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminSideBar = ({ open, setOpen }: SideBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const mainMenuItems: SidebarItem[] = [
    {
      text: "Overview",
      icon: <Image src={dashboardLogo} alt="Overview" width={24} height={24} />,
      path: "/admin/dashboard",
    },
    {
      text: "Users & Helpers",
      icon: <Image src={totalIcon} alt="Users" width={24} height={24} />,
      path: "/admin/dashboard?tab=users",
    },
  ];

  const otherMenuItems: SidebarItem[] = [
    {
      text: "Requests & Payments",
      icon: <Image src={auditLogo} alt="Requests" width={24} height={24} />,
      path: "/admin/dashboard?tab=requests",
    },
    {
      text: "System Status",
      icon: <Image src={activeIcon} alt="Status" width={24} height={24} />,
      path: "/admin/dashboard?tab=status",
    },
    {
      text: "Settings",
      icon: <Image src={settingsLogo} alt="Settings" width={24} height={24} />,
      path: "/admin/dashboard?tab=settings",
    },
  ];

  const isItemActive = (path: string) => {
    // If exact match (e.g. overview with no tab)
    if (path === "/admin/dashboard" && !currentTab) return true;

    // Check if the path contains the current tab
    if (currentTab && path.includes(`tab=${currentTab}`)) return true;

    return false;
  };

  const renderMenu = (items: SidebarItem[]) =>
    items.map((item) => {
      const active = isItemActive(item.path);

      return (
        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              mx: 1,
              borderRadius: "12px",
              backgroundColor: active ? "#DC2626" : "transparent", // brand-red
              transition: "all 0.3s ease",
              boxShadow: active ? "0 4px 12px rgba(220, 38, 38, 0.3)" : "none",
              "&:hover": {
                backgroundColor: active
                  ? "#DC2626"
                  : "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                filter: active
                  ? "brightness(0) invert(1)"
                  : "brightness(0.7) invert(1)",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                color: active ? "#FFFFFF" : "#A1A1AA",
                "& .MuiTypography-root": {
                  fontFamily: "var(--font-manrope)",
                  fontWeight: active ? 600 : 500,
                  fontSize: "0.95rem",
                },
              }}
            />
            {active && open && (
              <motion.div
                layoutId="active-pill"
                className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white"
              />
            )}
          </ListItemButton>
        </ListItem>
      );
    });

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar src="/logo.png" size="md" radius="sm" />
              <div className="flex flex-col">
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontFamily: "var(--font-manrope)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Road Helper
                </Typography>
                <Typography
                  fontSize="10px"
                  sx={{
                    color: "#ef4444",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Admin Panel
                </Typography>
              </div>
            </motion.div>
          )}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.05)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              width: 32,
              height: 32,
            }}
          >
            {open ? (
              <ChevronLeftIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "#27272A", my: 1 }} />

        <Box
          sx={{
            px: open ? 2 : 0,
            mt: 2,
            mb: 1,
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#52525B",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "var(--font-manrope)",
            }}
          >
            Main
          </Typography>
        </Box>
        <List>{renderMenu(mainMenuItems)}</List>

        <Box
          sx={{
            px: open ? 2 : 0,
            mt: 2,
            mb: 1,
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#52525B",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "var(--font-manrope)",
            }}
          >
            Management
          </Typography>
        </Box>
        <List>{renderMenu(otherMenuItems)}</List>

        <Box sx={{ flexGrow: 1 }} />

        <List sx={{ pb: 2, px: 2 }}>
          <ListItem
            disablePadding
            sx={{
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(220,38,38,0.1), rgba(0,0,0,0))",
              border: "1px solid rgba(220,38,38,0.2)",
            }}
          >
            <ListItemButton
              sx={{
                gap: 1.5,
                alignItems: "flex-start",
                py: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <Image src={suspendedRed} alt="alerts" width={24} height={24} />
              </ListItemIcon>
              <Box sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#FEE2E2",
                    fontWeight: 600,
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  System Alerts
                </Typography>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <Typography sx={{ fontSize: 11, color: "#FCA5A5" }}>
                    2 Suspicious Actions
                  </Typography>
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminSideBar;
