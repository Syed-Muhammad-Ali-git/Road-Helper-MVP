"use client";

import React, { useState } from "react";
import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Group,
  Stack,
  Button,
  Box,
  Badge,
  ThemeIcon,
  Switch,
  RingProgress,
  ActionIcon,
  Avatar,
  Card,
} from "@mantine/core";
import {
  IconCash,
  IconChecklist,
  IconClock,
  IconStar,
  IconBriefcase,
  IconMapPin,
  IconNavigation,
  IconPhone,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HelperDashboardUI() {
  const [isOnline, setIsOnline] = useState(true);

  // Static/hardcoded data for UI
  const userData = {
    fullName: "Ali Khan",
    totalJobs: 12,
    rating: 4.9,
    todaysEarnings: 150,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box className="p-4 md:p-8 bg-gray-50 min-h-screen font-satoshi">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Group justify="space-between" mb="xl" align="center">
          <Box>
            <Text className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-xs">
              WORKSTATION
            </Text>
            <Title
              order={1}
              className="font-manrope text-3xl font-bold text-brand-black"
            >
              Welcome back, {userData.fullName.split(" ")[0]}
            </Title>
          </Box>
          <Paper
            p="xs"
            radius="xl"
            withBorder
            className="bg-white shadow-sm flex items-center gap-3 pr-4"
          >
            <Switch
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.currentTarget.checked)}
              color="green"
              classNames={{ track: "cursor-pointer" }}
            />
            <Text size="sm" fw={700} c={isOnline ? "green" : "dimmed"}>
              {isOnline ? "You are Online" : "You are Offline"}
            </Text>
          </Paper>
        </Group>

        <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="md" mb="xl">
          {/* Earnings Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Paper
              p="xl"
              radius="xl"
              className="bg-brand-black text-white relative overflow-hidden shadow-lg h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <IconCash size={80} />
              </div>
              <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                Today's Earnings
              </Text>
              <Title order={1} className="font-manrope text-4xl mb-4">
                ${userData.todaysEarnings}
              </Title>
              <Group gap="xs" mb="lg">
                <Badge
                  color="green"
                  variant="light"
                  className="bg-green-900/30 text-green-300"
                >
                  +12% vs yesterday
                </Badge>
              </Group>
              <Text className="text-xs text-brand-red font-medium bg-red-900/20 py-1 px-2 rounded inline-block">
                20% Platform Fee Applied
              </Text>
            </Paper>
          </motion.div>

          {/* Other Stats */}
          <motion.div variants={itemVariants}>
            <Paper
              p="xl"
              radius="xl"
              withBorder
              className="bg-white h-full flex flex-col justify-between"
            >
              <ThemeIcon
                size={48}
                radius="xl"
                className="bg-blue-50 text-blue-600 mb-2"
              >
                <IconChecklist size={24} />
              </ThemeIcon>
              <div>
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  Jobs Done
                </Text>
                <Title order={2} className="text-brand-black">
                  {userData.totalJobs}
                </Title>
              </div>
            </Paper>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Paper
              p="xl"
              radius="xl"
              withBorder
              className="bg-white h-full flex flex-col justify-between"
            >
              <ThemeIcon
                size={48}
                radius="xl"
                className="bg-yellow-50 text-yellow-600 mb-2"
              >
                <IconStar size={24} />
              </ThemeIcon>
              <div>
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  Rating
                </Text>
                <Title order={2} className="text-brand-black">
                  {userData.rating}
                </Title>
              </div>
            </Paper>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Paper
              p="xl"
              radius="xl"
              withBorder
              className="bg-white h-full flex flex-col justify-between"
            >
              <ThemeIcon
                size={48}
                radius="xl"
                className="bg-orange-50 text-orange-600 mb-2"
              >
                <IconClock size={24} />
              </ThemeIcon>
              <div>
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  Active Hours
                </Text>
                <Title order={2} className="text-brand-black">
                  5h 20m
                </Title>
              </div>
            </Paper>
          </motion.div>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* Active Job / Incoming Requests */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Paper p="xl" radius="xl" withBorder className="bg-white h-full">
              <Group justify="space-between" mb="xl">
                <Title
                  order={3}
                  className="font-manrope font-bold text-gray-800"
                >
                  Nearby Requests
                </Title>
                <Button variant="subtle" size="sm">
                  View Map
                </Button>
              </Group>

              {/* Placeholder for no requests */}
              <Box className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full animate-pulse"></div>
                  <ThemeIcon
                    size={80}
                    radius="full"
                    className="bg-white text-brand-red shadow-lg relative z-10"
                  >
                    <IconBriefcase size={40} />
                  </ThemeIcon>
                </div>
                <Text fw={600} size="lg" className="text-gray-700">
                  Searching for requests...
                </Text>
                <Text c="dimmed" size="sm" mb="xl">
                  Stay online to receive job alerts nearby.
                </Text>

                <Button
                  variant="gradient"
                  gradient={{ from: "red", to: "pink", deg: 90 }}
                  size="md"
                  radius="xl"
                  className="shadow-lg shadow-red-200"
                  component={Link}
                  href="/helper/requests"
                >
                  Browse Manual List
                </Button>
              </Box>
            </Paper>
          </motion.div>

          {/* Active Job Widget (Simulated as "No Active Job" for now) */}
          <motion.div variants={itemVariants}>
            <Paper
              p="xl"
              radius="xl"
              className="bg-gradient-to-br from-brand-charcoal to-black text-white h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-3xl rounded-full"></div>

              <Title order={4} className="font-manrope mb-6 text-white/90">
                Current Status
              </Title>

              <div className="text-center py-10">
                <ThemeIcon
                  variant="outline"
                  color="gray"
                  size={60}
                  radius="full"
                  className="border-white/20 text-white/50 mb-4"
                >
                  <IconNavigation size={30} />
                </ThemeIcon>
                <Text className="text-white font-bold">No Active Job</Text>
                <Text className="text-white/50 text-sm mt-1">
                  You are ready to accept new work.
                </Text>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <Group justify="space-between">
                  <Text size="xs" className="text-white/50">
                    Shift Started
                  </Text>
                  <Text size="xs" className="text-white font-bold">
                    09:00 AM
                  </Text>
                </Group>
              </div>
            </Paper>
          </motion.div>
        </SimpleGrid>
      </motion.div>
    </Box>
  );
}
