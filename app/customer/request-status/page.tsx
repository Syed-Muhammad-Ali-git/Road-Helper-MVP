"use client";

import React, { useEffect, useMemo, useState } from "react";
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
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEye,
  IconCar,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase/config";
import { subscribeCustomerRequests } from "@/lib/services/requestService";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { RideRequestDoc } from "@/types";

/* ---------------- TYPES ---------------- */

interface Request {
  id: string;
  serviceType: string;
  status: string;
  helperName: string | null;
  location: string;
  createdAt: Date | undefined;
}

/* ---------------- COMPONENT ---------------- */

export default function RequestStatusList() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [uid, setUid] = useState<string | null>(null);
  const { dict } = useLanguage();
  const { isDark } = useAppTheme();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const unsub = subscribeCustomerRequests({
      customerId: uid,
      cb: (reqs) => {
        setRequests(
          reqs.map((r: RideRequestDoc & { id: string }) => ({
            id: r.id,
            serviceType: r.serviceType,
            status: r.status,
            helperName: r.helperName ?? r.customerName ?? null,
            location: r.location?.address ?? "Live location",
            createdAt: r.createdAt,
          })),
        );
      },
    });
    return () => unsub();
  }, [uid]);

  const toDateLabel = useMemo(() => {
    return (createdAt: Date | undefined): string => {
      if (!createdAt || !(createdAt instanceof Date)) return "Just now";
      return `${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      )}`;
    };
  }, []);

  return (
    <Box className={cn("min-h-screen p-4 md:p-8 transition-colors", isDark ? "bg-gray-950" : "bg-gray-50")}>
      <Stack gap="xl" className="max-w-5xl mx-auto">
        <Group justify="space-between">
          <Group>
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={20} />}
              component={Link}
              href="/customer/dashboard"
              className={cn("hover:scale-105 transition-transform", isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}
            >
              {dict.request_status.back}
            </Button>
            <Title
              order={1}
              className={cn(
                "font-manrope text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                isDark ? "from-white to-gray-400" : "from-gray-900 to-gray-600"
              )}
            >
              {dict.request_status.my_requests}
            </Title>
          </Group>
        </Group>

        {requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Paper
              p="xl"
              radius="xl"
              className={cn(
                "text-center border transition-colors",
                isDark ? "bg-brand-charcoal border-gray-800" : "bg-white border-gray-200"
              )}
            >
              <Text className={cn("mb-4", isDark ? "text-gray-400" : "text-gray-600")}>
                {dict.request_status.no_requests}
              </Text>
              <Button
                component={Link}
                href="/customer/request-help"
                mt="md"
                variant="light"
                color="red"
                className="hover:scale-105 active:scale-95 transition-transform"
              >
                {dict.request_status.request_help_now}
              </Button>
            </Paper>
          </motion.div>
        ) : (
          <Stack gap="lg">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Paper
                  p="lg"
                  radius="lg"
                  className={cn(
                    "border transition-all shadow-lg hover:shadow-xl hover:-translate-y-1",
                    isDark ? "bg-brand-charcoal border-gray-800 hover:border-brand-red/50" : "bg-white border-gray-200 hover:border-brand-red/40"
                  )}
                >
                  <Group
                    justify="space-between"
                    align="start"
                    wrap="nowrap"
                    className="flex-col md:flex-row"
                  >
                    <Group align="start" className="w-full md:w-auto">
                      <ThemeIcon
                        size={50}
                        radius="md"
                        color="red"
                        variant="light"
                        className="bg-brand-red/10 text-brand-red"
                      >
                        <IconCar size={28} />
                      </ThemeIcon>

                      <Box>
                        <Text
                          fw={700}
                          size="lg"
                          className="capitalize text-white"
                        >
                          {request.serviceType.replace("_", " ")}
                        </Text>
                        <Group gap={6} mt={4}>
                          <IconMapPin size={14} className="text-gray-500" />
                          <Text size="sm" className="text-gray-400">
                            {request.location}
                          </Text>
                        </Group>
                        <Group gap={6} mt={2}>
                          <IconClock size={14} className="text-gray-500" />
                          <Text size="xs" className="text-gray-500">
                            {toDateLabel(request.createdAt)}
                          </Text>
                        </Group>
                      </Box>
                    </Group>

                    <Stack
                      align="flex-end"
                      className="w-full md:w-auto mt-4 md:mt-0"
                      gap="xs"
                    >
                      <Badge
                        size="lg"
                        variant="light"
                        color={
                          request.status === "completed"
                            ? "green"
                            : request.status === "in_progress"
                              ? "blue"
                              : "yellow"
                        }
                        className="capitalize"
                      >
                        {request.status.replace("_", " ")}
                      </Badge>
                      {request.helperName && (
                        <Text size="sm" className={cn(isDark ? "text-gray-400" : "text-gray-600")}>
                          {dict.request_status.helper}:{" "}
                          <span className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
                            {request.helperName}
                          </span>
                        </Text>
                      )}
                      <Button
                        variant="gradient"
                        gradient={{ from: "red", to: "orange", deg: 90 }}
                        leftSection={<IconEye size={16} />}
                        component={Link}
                        href={`/journey/${request.id}`}
                        size="sm"
                        className="mt-2 w-full md:w-auto shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                      >
                        {dict.request_status.live_view}
                      </Button>
                    </Stack>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
