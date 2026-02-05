"use client";

import React from "react";
import {
  SimpleGrid,
  Paper,
  Text,
  Title,
  Group,
  ThemeIcon,
  Badge,
  Table,
  Button,
  Box,
  Tooltip,
  Avatar,
} from "@mantine/core";
import {
  IconUsers,
  IconReceipt,
  IconAlertCircle,
  IconActivity,
  IconTrendingUp,
  IconPercentage,
  IconUserShield,
  IconMapPin,
  IconArrowRight,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import mapBg from "../../../../assets/images/backgrounds/map-bg.svg";

// Mock Data (Moved from original page)
const stats = [
  {
    title: "Total Users",
    value: "3,240",
    subtitle: "Customers + Helpers",
    change: "+8.4% this week",
    icon: IconUsers,
    color: "blue",
  },
  {
    title: "Active Helpers",
    value: "158",
    subtitle: "Online now",
    change: "+12 new",
    icon: IconActivity,
    color: "green",
  },
  {
    title: "Completed Requests",
    value: "1,284",
    subtitle: "All time",
    change: "+32 today",
    icon: IconTrendingUp,
    color: "violet",
  },
  {
    title: "Pending Requests",
    value: "18",
    subtitle: "Need attention",
    change: "5 older than 30m",
    icon: IconAlertCircle,
    color: "orange",
  },
];

const revenueData = [
  { day: "Mon", total: 3200, platform: 640 },
  { day: "Tue", total: 2800, platform: 560 },
  { day: "Wed", total: 3500, platform: 700 },
  { day: "Thu", total: 4100, platform: 820 },
  { day: "Fri", total: 4600, platform: 920 },
  { day: "Sat", total: 3800, platform: 760 },
  { day: "Sun", total: 3000, platform: 600 },
  { day: "Mon", total: 3800, platform: 760 }, // Added extra data point for smoothness
];

const recentRequests = [
  {
    id: 1,
    user: "Ali Raza",
    type: "Towing",
    status: "In Progress",
    helper: "Ahmed K.",
    amount: 4500,
    hasCommissionPaid: true,
  },
  {
    id: 2,
    user: "Sara Ahmed",
    type: "Flat Tire",
    status: "Pending",
    helper: "-",
    amount: 1200,
    hasCommissionPaid: false,
  },
  {
    id: 3,
    user: "Usman Ali",
    type: "Fuel Delivery",
    status: "Completed",
    helper: "Bilal H.",
    amount: 2200,
    hasCommissionPaid: true,
  },
  {
    id: 4,
    user: "John Doe",
    type: "Car Mechanic",
    status: "Completed",
    helper: "Mike T.",
    amount: 3100,
    hasCommissionPaid: false,
  },
];

export default function OverviewTab() {
  const totalCommission = recentRequests.reduce(
    (sum, r) => sum + r.amount * 0.2,
    0,
  );
  const paidCommission = recentRequests
    .filter((r) => r.hasCommissionPaid)
    .reduce((sum, r) => sum + r.amount * 0.2, 0);
  const pendingCommission = totalCommission - paidCommission;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <Group justify="space-between" mb="xl" align="flex-end">
        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
            Control Center
          </Text>
          <Title className="font-manrope text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Admin Dashboard
          </Title>
          <Text className="text-gray-400 mt-2 font-medium">
            Live overview of users, helpers, requests & 20% platform fee.
          </Text>
        </Box>
        <Group gap="sm">
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="default"
            className="bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:text-white transition-all rounded-xl shadow-lg shadow-black/20"
          >
            Download Report
          </Button>
        </Group>
      </Group>

      {/* Stats Grid */}
      <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" mb="xl">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Paper
              p="xl"
              radius="xl"
              className="glass-dark border border-white/5 h-full relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:from-white/10 transition-all" />

              <Group justify="space-between" mb="md" className="relative z-10">
                <ThemeIcon
                  size="xl"
                  radius="md"
                  variant="light"
                  color={stat.color}
                  className="bg-white/5 text-white shadow-inner"
                >
                  <stat.icon size={22} stroke={1.5} />
                </ThemeIcon>
                <Badge
                  size="sm"
                  variant="outline"
                  className="bg-white/5 text-gray-400 border-white/10 group-hover:border-white/20 transition-colors"
                >
                  {stat.subtitle}
                </Badge>
              </Group>

              <div className="relative z-10">
                <Text
                  size="xs"
                  fw={700}
                  tt="uppercase"
                  className="text-gray-500 tracking-wider mb-2 font-manrope"
                >
                  {stat.title}
                </Text>
                <Title
                  order={2}
                  className="font-manrope text-white mb-2 text-3xl"
                >
                  {stat.value}
                </Title>
                <Group gap={6}>
                  <IconTrendingUp size={16} className="text-emerald-400" />
                  <Text size="sm" className="text-emerald-300 font-semibold">
                    {stat.change}
                  </Text>
                </Group>
              </div>
            </Paper>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Charts & Map Grid */}
      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" mb="xl">
        {/* Revenue Chart */}
        <Paper
          p="xl"
          radius="xl"
          className="glass-dark border border-white/5 lg:col-span-2 h-full flex flex-col relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
          <Group justify="space-between" mb="lg" className="relative z-10">
            <Group gap="md">
              <ThemeIcon
                size="xl"
                radius="lg"
                className="bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20"
              >
                <IconReceipt size={24} />
              </ThemeIcon>
              <Box>
                <Title
                  order={3}
                  className="font-manrope text-xl text-white tracking-tight"
                >
                  Revenue & 20% Platform Share
                </Title>
                <Text size="sm" className="text-gray-400 mt-1">
                  Track how much customers paid and how much 20% commission is
                  received.
                </Text>
              </Box>
            </Group>
          </Group>

          <Box className="h-72 md:h-80 mb-8 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="platform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#52525b"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#52525b"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderRadius: 12,
                    border: "1px solid #27272a",
                    color: "white",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
                  }}
                  itemStyle={{ padding: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#total)"
                  name="Total Paid"
                />
                <Area
                  type="monotone"
                  dataKey="platform"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#platform)"
                  name="Platform Share"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          <div className="relative z-10 mt-auto">
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              {[
                {
                  label: "20% Given",
                  value: `Rs ${paidCommission.toFixed(0)}`,
                  color: "emerald",
                  icon: IconPercentage,
                },
                {
                  label: "20% Pending",
                  value: `Rs ${pendingCommission.toFixed(0)}`,
                  color: "amber",
                  icon: IconAlertCircle,
                },
                {
                  label: "Active Customers",
                  value: "1,024",
                  color: "sky",
                  icon: IconUserShield,
                },
              ].map((item, idx) => (
                <Paper
                  key={idx}
                  p="md"
                  radius="lg"
                  className={`bg-white/5 border border-white/5 hover:border-${item.color}-500/30 transition-colors group`}
                >
                  <Group gap="xs" mb={1}>
                    <ThemeIcon
                      size="md"
                      radius="xl"
                      className={`bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon size={14} />
                    </ThemeIcon>
                    <Text
                      size="xs"
                      className="text-gray-400 uppercase font-bold tracking-wide"
                    >
                      {item.label}
                    </Text>
                  </Group>
                  <Text
                    className={`text-${item.color}-300 text-xl font-bold font-manrope`}
                  >
                    {item.value}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </div>
        </Paper>

        {/* Live Map Card */}
        <Paper
          p={0}
          radius="xl"
          className="glass-dark border border-white/5 h-full relative overflow-hidden flex flex-col"
        >
          <div className="p-6 relative z-10 bg-gradient-to-b from-brand-black/90 to-transparent">
            <Group justify="space-between">
              <Group gap="md">
                <ThemeIcon
                  size="lg"
                  radius="lg"
                  className="bg-white/10 text-white"
                >
                  <IconMapPin size={20} />
                </ThemeIcon>
                <Box>
                  <Title
                    order={3}
                    className="font-manrope text-lg text-white mb-0"
                  >
                    Live Map Snapshot
                  </Title>
                  <Text size="xs" className="text-gray-400">
                    User density & requests
                  </Text>
                </Box>
              </Group>
            </Group>
          </div>

          <div className="flex-1 relative bg-brand-charcoal overflow-hidden">
            <Image
              src={mapBg}
              alt="Map Overview"
              fill
              className="object-cover opacity-30 hover:opacity-40 transition-opacity duration-500 scale-105"
            />
            {/* Pulsing Dots */}
            <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                fullWidth
                variant="filled"
                rightSection={<IconArrowRight size={16} />}
                className="bg-brand-red hover:bg-brand-dark-red text-white border-none backdrop-blur-md shadow-lg"
              >
                Open Detailed Map
              </Button>
            </div>
          </div>
        </Paper>
      </SimpleGrid>

      {/* Recent Requests Table */}
      <Paper
        p="xl"
        radius="xl"
        className="glass-dark border border-white/5 relative overflow-hidden"
      >
        <Group justify="space-between" mb="xl">
          <Box>
            <Title order={3} className="font-manrope text-xl text-white">
              Recent Requests
            </Title>
            <Text size="sm" className="text-gray-400 mt-1">
              Latest job statuses and commission payments.
            </Text>
          </Box>
          <Button variant="subtle" color="gray" className="hover:bg-white/5">
            View All
          </Button>
        </Group>

        <Table
          verticalSpacing="md"
          horizontalSpacing="lg"
          className="text-gray-300"
        >
          <Table.Thead className="bg-white/5">
            <Table.Tr>
              <Table.Th className="text-gray-400 font-medium">User</Table.Th>
              <Table.Th className="text-gray-400 font-medium">Type</Table.Th>
              <Table.Th className="text-gray-400 font-medium">Status</Table.Th>
              <Table.Th className="text-gray-400 font-medium">Helper</Table.Th>
              <Table.Th className="text-gray-400 font-medium text-right">
                Amount
              </Table.Th>
              <Table.Th className="text-gray-400 font-medium">20% Fee</Table.Th>
              <Table.Th className="text-gray-400 font-medium"></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recentRequests.map((req) => (
              <Table.Tr
                key={req.id}
                className="hover:bg-white/5 transition-colors group"
              >
                <Table.Td>
                  <Group gap="sm">
                    <Avatar
                      size="sm"
                      radius="xl"
                      color="blue"
                      className="bg-blue-500/20 text-blue-300"
                      variant="light"
                    >
                      {req.user[0]}
                    </Avatar>
                    <Box>
                      <Text size="sm" fw={600} className="text-white">
                        {req.user}
                      </Text>
                    </Box>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge
                    variant="dot"
                    color="gray"
                    size="lg"
                    className="bg-transparent text-gray-300 pl-0"
                  >
                    {req.type}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={
                      req.status === "Completed"
                        ? "green"
                        : req.status === "Pending"
                          ? "orange"
                          : "blue"
                    }
                    variant="light"
                    radius="sm"
                    className="capitalize"
                  >
                    {req.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{req.helper}</Table.Td>
                <Table.Td className="text-right">
                  <Text
                    size="sm"
                    className="text-brand-red font-bold font-manrope"
                  >
                    Rs {req.amount.toLocaleString()}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip
                      label={
                        req.hasCommissionPaid
                          ? "20% received by platform"
                          : "20% still pending from helper"
                      }
                      withArrow
                      className="bg-gray-800"
                    >
                      <div
                        className={`flex items-center gap-2 px-2 py-1 round-md rounded-lg ${req.hasCommissionPaid ? "bg-emerald-500/10" : "bg-amber-500/10"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${req.hasCommissionPaid ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        <Text
                          size="xs"
                          className={
                            req.hasCommissionPaid
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }
                        >
                          {req.hasCommissionPaid ? "Paid" : "Pending"}
                        </Text>
                      </div>
                    </Tooltip>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    variant="light"
                    color="gray"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Details
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </motion.div>
  );
}
