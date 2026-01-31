"use client";

import React from "react";
import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Stack,
  Button,
  Box,
  ThemeIcon,
  Group,
  RingProgress,
  ActionIcon,
  Card,
  Avatar,
  Badge,
} from "@mantine/core";
import {
  IconCar,
  IconBike,
  IconDroplet,
  IconTruck,
  IconMapPin,
  IconCurrentLocation,
  IconPhoneCall,
  IconHistory,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import mapBg from "../../../assets/images/backgrounds/map-bg.svg";
import avatar1 from "../../../assets/images/avatars/avatar-1.jpg";
import avatar2 from "../../../assets/images/avatars/avatar-2.jpg";
import avatar3 from "../../../assets/images/avatars/avatar-3.jpg";
import avatar5 from "../../../assets/images/avatars/avatar-5.jpg";
import avatar6 from "../../../assets/images/avatars/avatar-6.jpg";
import avatar7 from "../../../assets/images/avatars/avatar-7.jpg";

const serviceCategories = [
  {
    title: "Car Mechanic",
    icon: IconCar,
    color: "blue",
    desc: "Breakdown, tire change, jump start",
    id: "car_mechanic",
  },
  {
    title: "Bike Mechanic",
    icon: IconBike,
    color: "orange",
    desc: "Puncture repair, chain help, etc.",
    id: "bike_mechanic",
  },
  {
    title: "Fuel Delivery",
    icon: IconDroplet,
    color: "red",
    desc: "Ran out of gas? We'll bring fuel.",
    id: "fuel_delivery",
  },
  {
    title: "Towing Service",
    icon: IconTruck,
    color: "grape",
    desc: "Safe towing to nearest garage.",
    id: "towing",
  },
];

export default function ClientDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box className="p-4 md:p-8 min-h-screen font-satoshi bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER SECTION */}
        <Group justify="space-between" mb="xl" align="flex-end">
          <Box>
            <Text className="text-gray-400 font-medium mb-1 uppercase tracking-wider text-xs">
              Overview
            </Text>
            <Title
              order={1}
              className="font-manrope font-bold text-3xl md:text-4xl text-white"
            >
              Good Afternoon, User
            </Title>
          </Box>
          <Button
            variant="filled"
            color="red"
            size="md"
            className="bg-brand-red text-white shadow-lg shadow-red-900/20 hover:bg-brand-dark-red transition-all font-manrope font-bold rounded-full px-6"
            leftSection={<IconPhoneCall size={18} />}
          >
            Emergency Support
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" mb="xl">
          {/* MAP SECTION (Takes up 2 columns) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Paper
              p={0}
              radius="xl"
              className="relative overflow-hidden h-[300px] md:h-[400px] shadow-lg border border-white/10 glass-dark"
            >
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-brand-charcoal">
                {/* Placeholder for actual map - Dark Mode Style */}
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src={mapBg}
                    alt="Map Background"
                    fill
                    className="object-cover invert filter brightness-0"
                  />
                </div>

                {/* Pulse Effect for User Location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-brand-red border-4 border-brand-charcoal shadow-lg items-center justify-center">
                      <IconCurrentLocation size={16} color="white" />
                    </span>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 glass-dark rounded-2xl shadow-sm border border-white/10 flex items-center justify-between z-20">
                <div>
                  <Text className="font-bold text-white">
                    Your Current Location
                  </Text>
                  <Text className="text-xs text-gray-400">
                    242 Park Avenue, NY (Approximate)
                  </Text>
                </div>
                <Button
                  className="bg-brand-red hover:bg-brand-dark-red rounded-full px-6 font-manrope transition-all"
                  leftSection={<IconMapPin size={18} />}
                  component={Link}
                  href="/customer/request-help"
                >
                  Request Help Here
                </Button>
              </div>
            </Paper>
          </motion.div>

          {/* QUICK STATS / INFO */}
          <motion.div variants={itemVariants}>
            <Stack>
              <Paper
                p="xl"
                radius="xl"
                className="bg-gradient-to-br from-brand-charcoal to-brand-black text-white relative overflow-hidden shadow-xl border border-white/10"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <IconCar size={100} />
                </div>
                <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  Membership Status
                </Text>
                <Title order={2} className="font-manrope mb-4">
                  Premium Plan
                </Title>
                <Group mb="xl">
                  <Badge
                    color="green"
                    variant="light"
                    size="lg"
                    className="bg-green-500/10 text-green-400 border border-green-500/20"
                  >
                    Active
                  </Badge>
                </Group>
                <Text className="text-sm text-gray-400">
                  Next renewal: Jan 24, 2027
                </Text>
              </Paper>

              <Paper
                p="lg"
                radius="xl"
                className="glass-dark border border-white/10"
              >
                <Group justify="space-between" mb={5}>
                  <Text className="font-bold text-gray-200">
                    Nearby Helpers
                  </Text>
                  <Badge
                    color="gray"
                    variant="light"
                    className="text-gray-300 bg-white/10"
                  >
                    8 Active
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="md" className="text-gray-500">
                  Within 5km radius
                </Text>
                <Group>
                  <Avatar.Group spacing="sm">
                    <Avatar src={avatar1.src} radius="xl" />
                    <Avatar src={avatar5.src} radius="xl" />
                    <Avatar src={avatar6.src} radius="xl" />
                    <Avatar radius="xl" className="bg-brand-red text-white">
                      +5
                    </Avatar>
                  </Avatar.Group>
                </Group>
              </Paper>
            </Stack>
          </motion.div>
        </SimpleGrid>

        <Title
          order={3}
          className="font-manrope text-xl font-bold text-white mb-6"
        >
          What help do you need?
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
          {serviceCategories.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Paper
                p="xl"
                radius="xl"
                component={Link}
                href={`/customer/request-help?service=${service.id}`}
                className="hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-300 no-underline block h-full border border-white/10 glass-dark group"
              >
                <ThemeIcon
                  size={60}
                  radius="md"
                  className={`bg-${service.color}-500/10 text-${service.color}-400 mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon size={30} stroke={1.5} />
                </ThemeIcon>

                <Text
                  fw={700}
                  size="lg"
                  className="font-manrope text-white mb-2 group-hover:text-brand-red transition-colors"
                >
                  {service.title}
                </Text>
                <Text
                  c="dimmed"
                  size="sm"
                  className="leading-relaxed mb-6 text-gray-400"
                >
                  {service.desc}
                </Text>

                <Group justify="space-between" align="center" mt="auto">
                  <Text
                    size="sm"
                    fw={600}
                    className={`text-${service.color}-400 group-hover:underline`}
                  >
                    Select
                  </Text>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    radius="xl"
                    className="hover:bg-white/10 text-gray-400"
                  >
                    <IconMapPin size={18} />
                  </ActionIcon>
                </Group>
              </Paper>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* RECENT ACTIVITY */}
        <motion.div variants={itemVariants}>
          <Paper
            p="xl"
            radius="xl"
            className="glass-dark border border-white/10"
          >
            <Group justify="space-between" mb="lg">
              <Title order={4} className="font-manrope text-white">
                Recent Activity
              </Title>
              <Button
                variant="subtle"
                color="gray"
                size="xs"
                className="hover:bg-white/5 text-gray-400"
              >
                View All
              </Button>
            </Group>

            <Stack gap="md">
              <div className="text-center py-10">
                <ThemeIcon
                  color="gray"
                  variant="light"
                  size={60}
                  radius="xl"
                  mb="md"
                  className="bg-white/5 text-gray-500"
                >
                  <IconHistory size={30} />
                </ThemeIcon>
                <Text c="dimmed" className="text-gray-500">
                  No recent requests found
                </Text>
                <Button
                  variant="outline"
                  color="red"
                  size="xs"
                  mt="md"
                  className="border-brand-red text-brand-red hover:bg-brand-red/10"
                >
                  Request Help
                </Button>
              </div>
            </Stack>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  );
}
