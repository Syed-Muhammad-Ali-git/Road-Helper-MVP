"use client";

import React from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Group,
  Button,
  Badge,
  ThemeIcon,
  Avatar,
  SimpleGrid,
} from "@mantine/core";
import { IconAlertCircle, IconMapPin, IconCheck } from "@tabler/icons-react";
import { toast } from "react-toastify";

export default function NearbyRequestsUI() {
  // Mock helper info
  const userData = {
    fullName: "Ali Khan",
    serviceType: "car_mechanic",
    isOnline: true,
  };

  // Hardcoded requests
  const requests = [
    {
      id: "1",
      customerName: "Ahmed Raza",
      vehicleDetails: "Toyota Corolla White (XYZ-123)",
      location: "Gulshan-e-Iqbal, Karachi",
      issueDescription: "Car won't start, engine makes clicking sound",
      createdAt: new Date(),
    },
    {
      id: "2",
      customerName: "Sara Khan",
      vehicleDetails: "Honda Civic Red (ABC-456)",
      location: "Clifton, Karachi",
      issueDescription: "Flat tire, need urgent help to replace it",
      createdAt: new Date(),
    },
  ];

  return (
    <Box className="p-4 md:p-8 font-satoshi bg-gray-50 min-h-screen">
      <Stack gap="xl">
        <Box>
          <Title
            order={1}
            className="text-3xl font-bold text-brand-black font-manrope"
          >
            Available Jobs
          </Title>
          <Text c="dimmed">Nearby customers needing your assistance.</Text>
        </Box>

        {requests.length === 0 ? (
          <Paper
            p="xl"
            radius="xl"
            withBorder
            className="bg-white border-dashed py-20"
          >
            <Stack align="center" gap="sm">
              <ThemeIcon size={60} radius="xl" color="gray" variant="light">
                <IconAlertCircle size={30} />
              </ThemeIcon>
              <Text fw={600}>No requests in your area right now.</Text>
              <Text size="sm" c="dimmed">
                Jobs matching your service (
                {userData.serviceType.replace("_", " ")}) will appear here.
              </Text>
            </Stack>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {requests.map((req) => (
              <Paper
                key={req.id}
                p="xl"
                radius="xl"
                withBorder
                className="hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <Group justify="space-between" mb="md">
                  <Badge
                    size="lg"
                    color="red"
                    variant="filled"
                    className="bg-brand-red"
                  >
                    PENDING
                  </Badge>
                  <Text size="xs" c="dimmed">
                    {req.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Group>

                <Stack gap="md">
                  <Group gap="md">
                    <Avatar color="blue" radius="xl" size="md">
                      {req.customerName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Text fw={700} className="text-brand-black">
                        {req.customerName}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {req.vehicleDetails}
                      </Text>
                    </Box>
                  </Group>

                  <Group gap="xs" className="bg-gray-50 p-2 rounded-lg">
                    <IconMapPin size={18} className="text-brand-red" />
                    <Text size="sm" fw={600} className="text-gray-700">
                      {req.location}
                    </Text>
                  </Group>

                  <Paper p="md" radius="lg" bg="gray.0" withBorder>
                    <Text size="sm" lineClamp={3} className="text-gray-600">
                      {req.issueDescription}
                    </Text>
                  </Paper>

                  <Group mt="md">
                    <Button
                      className="bg-green-600 hover:bg-green-700 flex-1 h-12 rounded-xl transition-colors font-bold"
                      leftSection={<IconCheck size={20} />}
                      disabled={!userData.isOnline}
                      onClick={() => alert("Accepted")}
                    >
                      Accept Job
                    </Button>
                    {!userData.isOnline && (
                      <Text size="xs" c="red" fw={600}>
                        Go Online to accept
                      </Text>
                    )}
                  </Group>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Box>
  );
}
