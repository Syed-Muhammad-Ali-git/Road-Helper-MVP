"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
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
  backgroundColor: "#0A0A0A",
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
  const pathname = usePathname();

  const mainMenuItems: SidebarItem[] = [
    {
      text: "Overview",
      icon: <Image src={dashboardLogo} alt="" />,
      path: "/admin/dashboard",
    },
    {
      text: "Users & Helpers",
      icon: <Image src={totalIcon} alt="" />,
      path: "/admin/dashboard?tab=users",
    },
  ];

  const otherMenuItems: SidebarItem[] = [
    {
      text: "Requests & Payments",
      icon: <Image src={auditLogo} alt="" />,
      path: "/admin/dashboard?tab=requests",
    },
    {
      text: "System Status",
      icon: <Image src={activeIcon} alt="" />,
      path: "/admin/dashboard?tab=status",
    },
    {
      text: "Settings",
      icon: <Image src={settingsLogo} alt="" />,
      path: "/admin/dashboard?tab=settings",
    },
  ];

  const renderMenu = (items: SidebarItem[]) =>
    items.map((item) => {
      const isActive =
        pathname === "/admin/dashboard" &&
        (item.path === "/admin/dashboard" ||
          item.path.startsWith("/admin/dashboard?"));

      return (
        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              mx: 1,
              borderRadius: "12px",
              backgroundColor: isActive ? "#E63946" : "transparent",
              "&:hover": {
                backgroundColor: isActive ? "#E63946" : "#18181B",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                filter: isActive ? "brightness(0)" : "brightness(0) invert(1)",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                color: isActive ? "#FFFFFF" : "#E4E4E7",
              }}
            />
          </ListItemButton>
        </ListItem>
      );
    });

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <>
              <Avatar src="/logo.png" w={60} mt={5} />
              <Stack sx={{ ml: -3 }}>
                <Typography sx={{ color: "#F9FAFB", fontWeight: "bold" }}>
                  Road Helper
                </Typography>
                <Typography fontSize="10px" sx={{ color: "#9CA3AF" }}>
                  Admin Control Center
                </Typography>
              </Stack>
            </>
          )}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ color: "black", backgroundColor: "white" }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Typography
          sx={{
            fontSize: 12,
            color: "#9CA3AF",
            ml: open ? 2 : 0,
            mt: 3,
            opacity: open ? 1 : 0,
          }}
        >
          Overview
        </Typography>
        <List sx={{ mt: 1 }}>{renderMenu(mainMenuItems)}</List>

        <Typography
          sx={{
            fontSize: 12,
            color: "#9CA3AF",
            ml: open ? 2 : 0,
            opacity: open ? 1 : 0,
          }}
        >
          Management
        </Typography>
        <List>{renderMenu(otherMenuItems)}</List>

        <Box sx={{ flexGrow: 1 }} />

        <List sx={{ pb: 2, px: 2 }}>
          <ListItem
            disablePadding
            sx={{
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(127,29,29,0.3))",
            }}
          >
            <ListItemButton
              sx={{
                gap: 1.5,
                alignItems: "flex-start",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <Image src={suspendedRed} alt="alerts" />
              </ListItemIcon>
              <Box sx={{ opacity: open ? 1 : 0 }}>
                <Typography
                  sx={{ fontSize: 12, color: "#FEE2E2", fontWeight: 600 }}
                >
                  System Alerts
                </Typography>
                <Typography sx={{ fontSize: 11, color: "#FCA5A5" }}>
                  2 helper accounts under review
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminSideBar;

