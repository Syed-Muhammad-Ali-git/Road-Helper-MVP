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
  Avatar,
  SimpleGrid,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconMapPin,
  IconCheck,
  IconPhone,
  IconBrandWhatsapp,
  IconCurrentLocation,
} from "@tabler/icons-react";
import { showError } from "@/lib/sweetalert";
import { toast } from "react-toastify";
import { motion, type Variants } from "framer-motion";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useLiveLocation } from "@/hooks/useLiveLocation";
import {
  acceptRideRequest,
  subscribePendingRequests,
} from "@/lib/services/requestService";
import type { RideRequestDoc } from "@/types";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";

export default function NearbyRequestsUI() {
  const router = useRouter();
  const live = useLiveLocation({
    onSuccess: () =>
      toast.success("GPS enabled! You can now accept nearby jobs."),
  });
  const { dict, isRTL } = useLanguage();
  const { isDark } = useAppTheme();

  const [requests, setRequests] = useState<
    Array<{ id: string } & RideRequestDoc>
  >([]);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const isOnline = useMemo(() => !!live.coords, [live.coords]);

  useEffect(() => {
    const unsub = subscribePendingRequests({
      cb: (reqs) => setRequests(reqs),
    });
    return () => unsub();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const bgClass = isDark ? "bg-transparent" : "bg-gray-50";
  const paperClass = isDark
    ? "glass-dark border border-white/10"
    : "bg-white border border-gray-200 shadow-xl";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <Box className={`p-4 md:p-8 font-satoshi min-h-screen ${bgClass}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Box mb="xl" className={isRTL ? "text-right" : "text-left"}>
            <Text
              className={`${textSecondary} font-medium mb-1 uppercase tracking-wider text-xs`}
            >
              {dict.helper_requests.job_requests}
            </Text>
            <Title
              order={1}
              className={`text-3xl md:text-4xl font-bold ${textPrimary} font-manrope mb-2`}
            >
              {dict.helper_requests.available_jobs}
            </Title>
            <Text className={textSecondary}>
              {dict.helper_requests.nearby_customers_desc}
            </Text>
          </Box>
        </motion.div>

        {!isOnline && (
          <motion.div variants={itemVariants as any}>
            <Paper p="md" radius="xl" className={`${paperClass} mb-6`}>
              <Group
                justify="space-between"
                align="center"
                className={isRTL ? "flex-row-reverse" : ""}
              >
                <Box className={isRTL ? "text-right" : "text-left"}>
                  <Text fw={700} className={textPrimary}>
                    {dict.helper_requests.enable_gps_title}
                  </Text>
                  <Text size="sm" className={textSecondary}>
                    {dict.helper_requests.enable_gps_desc}
                  </Text>
                </Box>
                <Button
                  className="bg-brand-red hover:bg-brand-dark-red rounded-xl"
                  leftSection={<IconCurrentLocation size={18} />}
                  onClick={() => live.requestPermission()}
                >
                  {dict.helper_requests.turn_on_gps}
                </Button>
              </Group>
            </Paper>
          </motion.div>
        )}

        {requests.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Paper
              p="xl"
              radius="xl"
              className={
                isDark
                  ? "glass-dark border-2 border-dashed border-white/10 py-20"
                  : "bg-gray-50 border-2 border-dashed border-gray-300 py-20"
              }
            >
              <Stack align="center" gap="sm">
                <ThemeIcon
                  size={80}
                  radius="xl"
                  className="bg-brand-red/10 text-brand-red mb-4"
                >
                  <IconAlertCircle size={40} />
                </ThemeIcon>
                <Text fw={600} className={`${textPrimary} text-lg`}>
                  {dict.helper_requests.no_requests_title}
                </Text>
                <Text size="sm" className={textSecondary}>
                  {dict.helper_requests.no_requests_desc}
                </Text>
              </Stack>
            </Paper>
          </motion.div>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  p="xl"
                  radius="xl"
                  className={`${paperClass} hover:border-brand-red/30 transition-all duration-300 group h-full`}
                >
                  <Group
                    justify="space-between"
                    mb="md"
                    className={isRTL ? "flex-row-reverse" : ""}
                  >
                    <Badge
                      size="lg"
                      className="bg-brand-red text-white font-bold"
                    >
                      {dict.helper_requests.pending_badge}
                    </Badge>
                    <Text size="xs" className={textSecondary}>
                      {req.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Group>

                  <Stack gap="md">
                    <Group
                      gap="md"
                      className={isRTL ? "flex-row-reverse text-right" : ""}
                    >
                      <Avatar
                        color="blue"
                        radius="xl"
                        size="lg"
                        className="ring-2 ring-blue-500/30"
                      >
                        {(req.customerName || "C").toString().charAt(0)}
                      </Avatar>
                      <Box>
                        <Text fw={700} className={`${textPrimary} text-lg`}>
                          {req.customerName ?? "Customer"}
                        </Text>
                        <Text size="sm" className={textSecondary}>
                          {req.vehicleDetails ??
                            dict.helper_requests.vehicle_details_missing}
                        </Text>
                      </Box>
                    </Group>

                    <Group
                      gap="xs"
                      className={
                        isDark
                          ? "glass p-3 rounded-lg border border-white/5"
                          : "bg-gray-100 p-3 rounded-lg border border-gray-200"
                      }
                      style={isRTL ? { flexDirection: "row-reverse" } : {}}
                    >
                      <IconMapPin size={18} className="text-brand-red" />
                      <Text size="sm" fw={600} className={textPrimary}>
                        {typeof req.location === "object" &&
                        req.location?.address
                          ? req.location.address
                          : `${req.location?.lat?.toFixed?.(4) ?? ""}, ${req.location?.lng?.toFixed?.(4) ?? ""}`}
                      </Text>
                    </Group>

                    <Paper
                      p="md"
                      radius="lg"
                      className={
                        isDark
                          ? "bg-white/5 border border-white/5"
                          : "bg-gray-50 border border-gray-200"
                      }
                    >
                      <Text
                        size="sm"
                        lineClamp={3}
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                        ta={isRTL ? "right" : "left"}
                      >
                        {req.issueDescription ??
                          dict.helper_requests.no_description}
                      </Text>
                    </Paper>

                    <Group mt="md" grow>
                      <Button
                        className="bg-green-600 hover:bg-green-700 h-12 rounded-xl transition-all font-bold hover:scale-105 active:scale-95"
                        leftSection={<IconCheck size={20} />}
                        loading={acceptingId === req.id}
                        disabled={!isOnline || acceptingId !== null}
                        onClick={async () => {
                          const helperId = auth.currentUser?.uid;
                          const helperName =
                            auth.currentUser?.displayName ??
                            auth.currentUser?.email?.split("@")[0] ??
                            "Helper";
                          if (!helperId) {
                            await showError(
                              "Not signed in",
                              "Please log in again.",
                            );
                            return;
                          }
                          if (!live.coords) {
                            await showError(
                              "Location required",
                              "Turn on GPS to accept jobs and share your ETA.",
                            );
                            return;
                          }
                          try {
                            setAcceptingId(req.id);
                            await acceptRideRequest({
                              requestId: req.id,
                              helperId,
                              helperName,
                              helperLocation: {
                                lat: live.coords.lat,
                                lng: live.coords.lng,
                              },
                            });
                            toast.success("Job accepted! Redirecting…");
                            router.push(`/journey/${req.id}`);
                          } catch (e: unknown) {
                            const msg =
                              e instanceof Error
                                ? e.message
                                : "Unable to accept request.";
                            await showError("Accept Failed", msg);
                          } finally {
                            setAcceptingId(null);
                          }
                        }}
                      >
                        {dict.helper_requests.accept_job}
                      </Button>
                    </Group>

                    <Group grow>
                      <Button
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 h-11 rounded-xl transition-all"
                        leftSection={<IconPhone size={18} />}
                        component="a"
                        href={
                          req.customerPhone
                            ? `tel:${String(req.customerPhone).replace(/[^\d+]/g, "")}`
                            : "#"
                        }
                        target={req.customerPhone ? "_blank" : undefined}
                        disabled={!req.customerPhone}
                      >
                        {dict.helper_requests.call}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500/30 text-green-400 hover:bg-green-500/10 h-11 rounded-xl transition-all"
                        leftSection={<IconBrandWhatsapp size={18} />}
                        component="a"
                        href={
                          req.customerPhone
                            ? `https://wa.me/${String(req.customerPhone).replace(/[^\d]/g, "")}?text=${encodeURIComponent(`RoadHelper: I'm accepting your request.`)}`
                            : "#"
                        }
                        target={req.customerPhone ? "_blank" : undefined}
                        disabled={!req.customerPhone}
                      >
                        {dict.helper_requests.whatsapp}
                      </Button>
                    </Group>

                    {!isOnline && (
                      <Text
                        size="xs"
                        className="text-red-400 font-semibold text-center"
                      >
                        {dict.helper_requests.go_online_warning}
                      </Text>
                    )}
                  </Stack>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>
        )}
      </motion.div>
    </Box>
  );
}
