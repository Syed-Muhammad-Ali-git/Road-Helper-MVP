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
  Avatar,
  Table,
  Button,
  Box,
} from "@mantine/core";
import {
  IconUsers,
  IconReceipt,
  IconAlertCircle,
  IconActivity,
  IconMapPin,
} from "@tabler/icons-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "3,200", icon: IconUsers, color: "blue" },
    {
      title: "Active Helpers",
      value: "150",
      icon: IconActivity,
      color: "green",
    },
    {
      title: "Today's Revenue",
      value: "$1,840",
      icon: IconReceipt,
      color: "indigo",
    },
    {
      title: "Pending Requests",
      value: "12",
      icon: IconAlertCircle,
      color: "orange",
    },
  ];

  const recentRequests = [
    {
      id: 1,
      user: "John Doe",
      type: "Towing",
      status: "In Progress",
      helper: "Mike T.",
    },
    {
      id: 2,
      user: "Sarah Smith",
      type: "Flat Tire",
      status: "Pending",
      helper: "-",
    },
    {
      id: 3,
      user: "Ali Khan",
      type: "Car Mechanic",
      status: "Completed",
      helper: "Ahmed R.",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50 font-satoshi">
      <Group justify="space-between" mb="xl">
        <Box>
          <Title className="font-manrope text-3xl font-bold text-brand-black">
            Admin Dashboard
          </Title>
          <Text className="text-gray-500">
            Monitor activity and performance
          </Text>
        </Box>
        <Button variant="default">Download Report</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" mb="xl">
        {stats.map((stat, i) => (
          <Paper key={i} p="xl" radius="xl" withBorder className="bg-white">
            <Group justify="space-between" mb="xs">
              <ThemeIcon
                size="xl"
                radius="lg"
                variant="light"
                color={stat.color}
              >
                <stat.icon size={22} />
              </ThemeIcon>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase">
                {stat.title}
              </Text>
            </Group>
            <Title order={2} className="font-manrope">
              {stat.value}
            </Title>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
        <div className="lg:col-span-2">
          <Paper p="xl" radius="xl" withBorder className="bg-white h-full">
            <Title order={3} className="font-manrope mb-6">
              Live Activity
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Helper</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentRequests.map((req) => (
                  <Table.Tr key={req.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="blue">
                          {req.user[0]}
                        </Avatar>
                        <Text size="sm" fw={500}>
                          {req.user}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>{req.type}</Table.Td>
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
                      >
                        {req.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{req.helper}</Table.Td>
                    <Table.Td>
                      <Button size="xs" variant="subtle">
                        View Details
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </div>
        <div>
          <Paper p="xl" radius="xl" withBorder className="bg-white h-full">
            <Title order={3} className="font-manrope mb-6">
              Map Overview
            </Title>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Static map placeholder */}
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-20"></div>
              <Group gap="xs" className="relative z-10 text-gray-500">
                <IconMapPin size={24} />
                <Text>Live tracking restricted</Text>
              </Group>
            </div>
            <Button fullWidth mt="md" variant="light" color="blue">
              Open Live Map
            </Button>
          </Paper>
        </div>
      </SimpleGrid>
    </div>
  );
}
