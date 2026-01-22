"use client";

import React from "react";
import { Stack, UnstyledButton, Text, Box, Divider } from "@mantine/core";
import {
  IconDashboard,
  IconHistory,
  IconUser,
  IconMapPin,
  IconWallet,
  IconListDetails,
  IconArrowLeftRight,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { motion } from "framer-motion";
import { customerLogoutAction } from "@/redux/actions/customer-action";
import { helperLogoutAction } from "@/redux/actions/helper-action";

const clientItems = [
  { icon: IconDashboard, label: "Dashboard", href: "/client/dashboard" },
  { icon: IconMapPin, label: "Request Help", href: "/client/request-help" },
  { icon: IconHistory, label: "Service History", href: "/client/history" },
  { icon: IconUser, label: "Profile", href: "/client/profile" },
];

const helperItems = [
  { icon: IconDashboard, label: "Overview", href: "/helper/dashboard" },
  { icon: IconListDetails, label: "Requests", href: "/helper/requests" },
  { icon: IconArrowLeftRight, label: "Active Job", href: "/helper/active-job" },
  { icon: IconWallet, label: "Earnings", href: "/helper/earnings" },
  { icon: IconUser, label: "Profile", href: "/helper/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const customer = useSelector((state: RootState) => state.customer.customer);
  const helper = useSelector((state: RootState) => state.helper.helper);

  const isHelper = !!helper || pathname?.includes("/helper");
  const items = isHelper ? helperItems : clientItems;

  const handleLogout = async () => {
    if (isHelper) {
      await dispatch(helperLogoutAction());
    } else {
      await dispatch(customerLogoutAction());
    }
    router.replace("/login");
  };

  return (
    <Box className="w-full bg-[#fcfcfc] h-[calc(100vh-70px)] p-4 border-r flex flex-col justify-between">
      <Stack gap="xs" className="flex-1 overflow-y-auto">
        <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="md" mb="xs">
          Main Menu
        </Text>

        {items.map((item, index) => {
          const active = pathname === item.href;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <UnstyledButton
                component={Link}
                href={item.href}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <item.icon size={22} stroke={active ? 2.5 : 2} />
                <Text fw={active ? 700 : 500} size="sm">
                  {item.label}
                </Text>
              </UnstyledButton>
            </motion.div>
          );
        })}

        <Divider my="md" label="Help & Support" labelPosition="center" />

        <UnstyledButton className="w-full p-3 rounded-xl flex items-center gap-3 hover:bg-slate-100 text-slate-600 transition-all">
          <IconUser size={22} />
          <Text fw={500} size="sm">
            Customer Service
          </Text>
        </UnstyledButton>
      </Stack>

      <Box pt="md">
        <UnstyledButton
          onClick={handleLogout}
          className="w-full p-3 rounded-xl flex items-center gap-3 hover:bg-red-50 text-red-600 transition-all font-bold"
        >
          <IconLogout size={22} />
          <Text size="sm">Logout Session</Text>
        </UnstyledButton>
      </Box>
    </Box>
  );
}
