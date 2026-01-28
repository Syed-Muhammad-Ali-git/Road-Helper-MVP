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
    <Box className="p-4 md:p-8 bg-gray-50 min-h-screen font-satoshi">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER SECTION */}
        <Group justify="space-between" mb="xl" align="flex-end">
          <Box>
            <Text className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-xs">
              Overview
            </Text>
            <Title
              order={1}
              className="font-manrope font-bold text-3xl md:text-4xl text-brand-black"
            >
              Good Afternoon, User
            </Title>
          </Box>
          <Button
            variant="white"
            color="red"
            className="bg-white text-brand-red border border-red-100 shadow-sm hover:shadow-md transition-all font-manrope font-bold"
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
              className="relative overflow-hidden h-[300px] md:h-[400px] shadow-lg border border-gray-200"
            >
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gray-200">
                {/* Placeholder for actual map */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />

                {/* Pulse Effect for User Location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-brand-red border-4 border-white shadow-lg items-center justify-center">
                      <IconCurrentLocation size={16} color="white" />
                    </span>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 flex items-center justify-between">
                <div>
                  <Text className="font-bold text-brand-black">
                    Your Current Location
                  </Text>
                  <Text className="text-xs text-gray-500">
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
                className="bg-brand-black text-white relative overflow-hidden shadow-xl"
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
                    className="bg-white/10 text-green-300"
                  >
                    Active
                  </Badge>
                </Group>
                <Text className="text-sm text-gray-400">
                  Next renewal: Jan 24, 2027
                </Text>
              </Paper>

              <Paper p="lg" radius="xl" withBorder className="bg-white">
                <Group justify="space-between" mb={5}>
                  <Text className="font-bold text-gray-700">
                    Nearby Helpers
                  </Text>
                  <Badge color="gray" variant="light">
                    8 Active
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="md">
                  Within 5km radius
                </Text>
                <Group>
                  <Avatar.Group spacing="sm">
                    <Avatar src="https://i.pravatar.cc/150?u=1" radius="xl" />
                    <Avatar src="https://i.pravatar.cc/150?u=2" radius="xl" />
                    <Avatar src="https://i.pravatar.cc/150?u=3" radius="xl" />
                    <Avatar radius="xl">+5</Avatar>
                  </Avatar.Group>
                </Group>
              </Paper>
            </Stack>
          </motion.div>
        </SimpleGrid>

        <Title
          order={3}
          className="font-manrope text-xl font-bold text-brand-black mb-6"
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
                withBorder
                p="xl"
                radius="xl"
                component={Link}
                href={`/customer/request-help?service=${service.id}`}
                className="hover:shadow-xl transition-all duration-300 no-underline block h-full border-gray-200 bg-white group"
              >
                <ThemeIcon
                  size={60}
                  radius="md"
                  className={`bg-${service.color}-50 text-${service.color}-600 mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon size={30} stroke={1.5} />
                </ThemeIcon>

                <Text
                  fw={700}
                  size="lg"
                  className="font-manrope text-brand-black mb-2 group-hover:text-brand-red transition-colors"
                >
                  {service.title}
                </Text>
                <Text c="dimmed" size="sm" className="leading-relaxed mb-6">
                  {service.desc}
                </Text>

                <Group justify="space-between" align="center" mt="auto">
                  <Text
                    size="sm"
                    fw={600}
                    className={`text-${service.color}-600`}
                  >
                    Select
                  </Text>
                  <ActionIcon variant="subtle" color="gray" radius="xl">
                    <IconMapPin size={18} />
                  </ActionIcon>
                </Group>
              </Paper>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* RECENT ACTIVITY */}
        <motion.div variants={itemVariants}>
          <Paper p="xl" radius="xl" withBorder className="bg-white">
            <Group justify="space-between" mb="lg">
              <Title order={4} className="font-manrope">
                Recent Activity
              </Title>
              <Button variant="subtle" color="gray" size="xs">
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
                >
                  <IconHistory size={30} />
                </ThemeIcon>
                <Text c="dimmed">No recent requests found</Text>
                <Button variant="light" color="red" size="xs" mt="md">
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

// Helper component for Badge - Mantine Badge is fine used above.
import { Badge } from "@mantine/core";
