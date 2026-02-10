"use client";

import React, { useState } from "react";
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
  Divider,
  Timeline,
} from "@mantine/core";
import {
  IconPhone,
  IconCircleCheck,
  IconClock,
  IconNavigation,
  IconCheck,
} from "@tabler/icons-react";
import { showSuccess } from "@/lib/sweetalert";

export default function ActiveJobUI() {
  interface ActiveJobState {
    customerName: string;
    customerPhone: string;
    location: string;
    vehicleDetails: string;
    issueDescription: string;
    status: string;
  }
  const [activeJob, setActiveJob] = useState<ActiveJobState>({
    customerName: "Ali Khan",
    customerPhone: "+92 300 1234567",
    location: "Gulshan-e-Iqbal, Karachi",
    vehicleDetails: "Honda Civic Red (ABC-123)",
    issueDescription: "Car broke down near main road, engine not starting.",
    status: "accepted", // accepted | in_progress | completed
  });

  const updateStatus = async (status: string) => {
    setActiveJob((prev) => ({ ...prev, status }));
    console.log(`Status updated to ${status}`);
    await showSuccess(`Job status updated to ${status.replace("_", " ")}`);
  };

  // Mock loading state
  const loading = false;

  if (loading)
    return (
      <Box className="p-8 text-center">
        <Text>Loading...</Text>
      </Box>
    );

  if (!activeJob) {
    return (
      <Box className="p-4 md:p-8 flex items-center justify-center min-h-[70vh]">
        <Paper
          p="xl"
          radius="xl"
          withBorder
          className="text-center max-w-md bg-slate-50 border-dashed"
        >
          <ThemeIcon size={80} radius="xl" color="gray" variant="light" mb="md">
            <IconClock size={40} />
          </ThemeIcon>
          <Title order={3} mb="xs">
            No Active Job
          </Title>
          <Text c="dimmed" mb="xl">
            You don&apos;t have any ongoing jobs right now.
          </Text>
          <Button color="red" size="lg" radius="md">
            Find Nearby Jobs
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="p-4 md:p-8 max-w-4xl mx-auto">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={1} className="text-3xl font-bold">
            Active Job
          </Title>
          <Badge
            size="xl"
            color={activeJob.status === "accepted" ? "blue" : "green"}
            variant="filled"
            p="lg"
          >
            {activeJob.status.replace("_", " ").toUpperCase()}
          </Badge>
        </Group>

        <Paper p="xl" radius="xl" withBorder shadow="sm">
          <Group justify="space-between" mb="xl">
            <Group gap="md">
              <Avatar size="xl" radius="md" color="blue">
                {activeJob.customerName.charAt(0)}
              </Avatar>
              <Box>
                <Title order={3}>{activeJob.customerName}</Title>
                <Group gap="xs">
                  <IconPhone size={14} className="text-slate-400" />
                  <Text size="sm" c="dimmed">
                    {activeJob.customerPhone}
                  </Text>
                </Group>
              </Box>
            </Group>
            <Button
              variant="light"
              color="blue"
              leftSection={<IconNavigation size={18} />}
            >
              Get Directions
            </Button>
          </Group>

          <Divider my="xl" />

          <Stack gap="lg">
            <Box>
              <Text fw={700} size="sm" c="dimmed">
                LOCATION
              </Text>
              <Text fw={600}>{activeJob.location}</Text>
            </Box>
            <Box>
              <Text fw={700} size="sm" c="dimmed">
                VEHICLE DETAILS
              </Text>
              <Text>{activeJob.vehicleDetails}</Text>
            </Box>
            <Box>
              <Text fw={700} size="sm" c="dimmed">
                ISSUE DESCRIPTION
              </Text>
              <Text className="bg-slate-50 p-4 rounded-xl italic">
                {activeJob.issueDescription}
              </Text>
            </Box>
          </Stack>

          <Divider my="xl" />

          <Timeline
            active={
              activeJob.status === "accepted"
                ? 0
                : activeJob.status === "in_progress"
                  ? 1
                  : 2
            }
            bulletSize={30}
            lineWidth={2}
          >
            <Timeline.Item
              bullet={<IconCheck size={16} />}
              title="Request Accepted"
            >
              <Text size="xs" c="dimmed">
                You accepted this request
              </Text>
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconNavigation size={16} />}
              title="In Progress"
            >
              <Text size="xs" c="dimmed">
                Work started or you are on your way
              </Text>
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconCircleCheck size={16} />}
              title="Completed"
            >
              <Text size="xs" c="dimmed">
                Service delivered successfully
              </Text>
            </Timeline.Item>
          </Timeline>

          <Group grow mt="xl">
            {activeJob.status === "accepted" && (
              <Button
                color="blue"
                size="lg"
                radius="md"
                onClick={() => updateStatus("in_progress")}
              >
                Start Service
              </Button>
            )}
            {activeJob.status === "in_progress" && (
              <Button
                color="green"
                size="lg"
                radius="md"
                onClick={() => updateStatus("completed")}
              >
                Mark as Completed
              </Button>
            )}
          </Group>
        </Paper>
      </Stack>
    </Box>
  );
}
