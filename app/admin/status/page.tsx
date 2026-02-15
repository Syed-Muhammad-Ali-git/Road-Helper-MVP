"use client";

import React, { memo, useEffect, useState } from "react";
import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Group,
  RingProgress,
  Box,
  ThemeIcon,
  Timeline,
} from "@mantine/core";
import {
  IconDatabase,
  IconActivity,
  IconShieldLock,
  IconBolt,
  IconUsers,
  IconTruck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { getAdminStats } from "@/lib/services/adminService";
import { useAppTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const StatusPage = () => {
  const { isDark } = useAppTheme();
  const { dict } = useLanguage();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const s = await getAdminStats();
      setStats(s);
    })();
  }, []);

  const systemMetrics = [
    {
      title: "Rescue Beacons",
      sub: "Active Help Signals",
      val: stats ? Math.min(100, stats.pendingRequests * 10) : 0,
      color: "red",
      icon: IconActivity,
      details: [`Pending: ${stats?.pendingRequests || 0}`, "Signal: Strong"],
    },
    {
      title: "Dispatch Engine",
      sub: "Matching Logic",
      val: 99,
      color: "emerald",
      icon: IconBolt,
      details: ["Efficiency: 94%", "Latency: 12ms"],
    },
    {
      title: "Hero Network",
      sub: "Helper Connectivity",
      val: stats
        ? Math.min(
            100,
            Math.round((stats.activeHelpers / (stats.totalUsers || 1)) * 100),
          )
        : 0,
      color: "blue",
      icon: IconTruck,
      details: [`Online: ${stats?.activeHelpers || 0}`, "Ping: 45ms"],
    },
    {
      title: "Ops Control",
      sub: "Platform Stability",
      val: 100,
      color: "violet",
      icon: IconShieldLock,
      details: ["Status: Nominal", "Uptime: 99.9%"],
    },
  ];

  return (
    <Box
      className={cn(
        "relative min-h-screen overflow-hidden p-4 md:p-8 font-satoshi transition-colors pt-24",
        isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900",
      )}
    >
      {/* Dynamic Grid Background */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity",
          isDark ? "opacity-20" : "opacity-10",
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(circle at 1px 1px, #333 1px, transparent 0)"
              : "radial-gradient(circle at 1px 1px, #ccc 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          animate={{ x: [-1000, 1000], opacity: [0, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-0 w-full h-[1px] bg-brand-red shadow-[0_0_15px_#ef4444]"
        />
      </div>

      <motion.div
        variants={containerVariants as any}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto"
      >
        <header className="mb-12">
          <motion.div
            variants={itemVariants as any}
            className="flex items-center gap-2 mb-2"
          >
            <IconActivity size={16} className="text-brand-red" />
            <Text className="text-brand-red font-black uppercase tracking-[0.3em] text-[10px]">
              Platform Intelligence
            </Text>
          </motion.div>
          <Title
            order={1}
            className={cn(
              "font-manrope font-black text-4xl md:text-5xl tracking-tight transition-colors",
              isDark ? "text-white" : "text-gray-900",
            )}
          >
            System{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
              Pulse
            </span>
          </Title>
          <Text className="text-gray-500 mt-2 font-bold uppercase tracking-tight text-xs">
            Operational status of core rescue infrastructure
          </Text>
        </header>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={32} mb={45}>
          {systemMetrics.map((metric, idx) => (
            <motion.div key={idx} variants={itemVariants as any}>
              <Paper
                p={32}
                radius="32px"
                className={cn(
                  "border relative overflow-hidden group transition-all duration-500 shadow-2xl",
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-brand-red/30"
                    : "bg-white border-gray-200 hover:border-brand-red/20 shadow-gray-200/50",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-[0.02] group-hover:opacity-[0.08] transition-opacity",
                    metric.color === "red"
                      ? "from-brand-red/20 to-transparent"
                      : metric.color === "emerald"
                        ? "from-emerald-600/20 to-transparent"
                        : metric.color === "blue"
                          ? "from-blue-600/20 to-transparent"
                          : "from-violet-600/20 to-transparent",
                  )}
                />

                <Group justify="space-between" mb={24}>
                  <Group gap="lg">
                    <ThemeIcon
                      size={64}
                      radius="22px"
                      className={cn(
                        "border group-hover:scale-110 transition-transform shadow-inner",
                        isDark
                          ? "bg-white/5 border-white/10"
                          : "bg-gray-50 border-gray-100",
                        metric.color === "red"
                          ? "text-brand-red"
                          : metric.color === "emerald"
                            ? "text-emerald-400"
                            : metric.color === "blue"
                              ? "text-blue-400"
                              : "text-violet-400",
                      )}
                    >
                      <metric.icon size={32} />
                    </ThemeIcon>
                    <div>
                      <Text
                        fw={900}
                        className={cn(
                          "text-xl tracking-tight uppercase font-manrope",
                          isDark ? "text-white" : "text-gray-900",
                        )}
                      >
                        {metric.title}
                      </Text>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full animate-pulse",
                            metric.color === "red"
                              ? "bg-brand-red"
                              : metric.color === "emerald"
                                ? "bg-emerald-400"
                                : metric.color === "blue"
                                  ? "bg-blue-400"
                                  : "bg-violet-400",
                          )}
                        />
                        <Text
                          size="xs"
                          className={cn(
                            "font-black tracking-widest uppercase",
                            metric.color === "red"
                              ? "text-brand-red"
                              : metric.color === "emerald"
                                ? "text-emerald-400"
                                : metric.color === "blue"
                                  ? "text-blue-400"
                                  : "text-violet-400",
                          )}
                        >
                          {metric.sub}
                        </Text>
                      </div>
                    </div>
                  </Group>

                  <RingProgress
                    size={100}
                    thickness={8}
                    roundCaps
                    sections={[
                      {
                        value: metric.val,
                        color:
                          metric.color === "red"
                            ? "red"
                            : metric.color === "emerald"
                              ? "teal"
                              : metric.color,
                      },
                    ]}
                    label={
                      <Text
                        fw={900}
                        ta="center"
                        size="sm"
                        className={isDark ? "text-white" : "text-gray-900"}
                      >
                        {metric.val}%
                      </Text>
                    }
                  />
                </Group>

                <SimpleGrid
                  cols={2}
                  spacing="md"
                  className={cn(
                    "border-t pt-6 relative z-10",
                    isDark ? "border-white/5" : "border-gray-100",
                  )}
                >
                  {metric.details.map((detail, i) => (
                    <div key={i} className="flex flex-col">
                      <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        {detail.split(":")[0]}
                      </Text>
                      <Text
                        className={cn(
                          "font-black text-md",
                          isDark ? "text-white" : "text-gray-900",
                        )}
                      >
                        {detail.split(":")[1]}
                      </Text>
                    </div>
                  ))}
                </SimpleGrid>
              </Paper>
            </motion.div>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={32}>
          {/* Active Protocols */}
          <motion.div variants={itemVariants as any} className="lg:col-span-1">
            <Paper
              p={40}
              radius="32px"
              className={cn(
                "border h-full shadow-2xl overflow-hidden relative",
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200 shadow-gray-200/50",
              )}
            >
              <div
                className={cn(
                  "absolute top-0 right-0 p-8",
                  isDark ? "text-white/[0.02]" : "text-gray-900/[0.02]",
                )}
              >
                <IconShieldLock size={120} />
              </div>
              <Title
                order={3}
                className={cn(
                  "font-black mb-10 text-xl tracking-tight uppercase",
                  isDark ? "text-white" : "text-gray-900",
                )}
              >
                Security Protocols
              </Title>

              <Timeline
                bulletSize={32}
                lineWidth={2}
                active={2}
                color="red"
                classNames={{
                  itemTitle: cn(
                    "font-bold text-sm",
                    isDark ? "text-white" : "text-gray-900",
                  ),
                  itemBullet: cn(
                    "border-2",
                    isDark
                      ? "bg-[#111] border-white/10"
                      : "bg-white border-gray-200",
                  ),
                  itemContent: "text-gray-500 text-xs font-medium",
                }}
              >
                <Timeline.Item
                  bullet={<IconUsers size={16} />}
                  title="User Onboarding"
                >
                  Active - Monitoring new registrations globally.
                </Timeline.Item>
                <Timeline.Item
                  bullet={<IconShieldLock size={16} />}
                  title="Payment Escrow"
                >
                  Enforced - 20% commission deduction active.
                </Timeline.Item>
                <Timeline.Item
                  bullet={<IconBolt size={16} />}
                  title="Incident Management"
                >
                  Active - Real-time job status tracking.
                </Timeline.Item>
              </Timeline>
            </Paper>
          </motion.div>

          {/* Live Analytics Stream */}
          <motion.div variants={itemVariants as any} className="lg:col-span-2">
            <Paper
              p={40}
              radius="32px"
              className={cn(
                "border shadow-2xl",
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200 shadow-gray-200/50",
              )}
            >
              <Group justify="space-between" mb={30}>
                <Title
                  order={3}
                  className={cn(
                    "font-black text-xl tracking-tight uppercase",
                    isDark ? "text-white" : "text-gray-900",
                  )}
                >
                  Dispatch Telemetry
                </Title>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                  <IconActivity size={14} className="text-emerald-400" />
                  <Text className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                    Fleet Status: Optimized
                  </Text>
                </div>
              </Group>

              <div className="space-y-6">
                {[
                  {
                    label: "Network Latency",
                    val: "12%",
                    color: "blue",
                    stat: "24ms Avg",
                  },
                  {
                    label: "Database I/O",
                    val: "45%",
                    color: "emerald",
                    stat: "Healthy",
                  },
                  {
                    label: "Compute Load",
                    val: "18%",
                    color: "amber",
                    stat: "Low",
                  },
                ].map((row, idx) => (
                  <div key={idx} className="space-y-3">
                    <Group justify="space-between">
                      <Text
                        size="xs"
                        fw={900}
                        className="text-gray-500 uppercase tracking-widest"
                      >
                        {row.label}
                      </Text>
                      <Text
                        size="xs"
                        fw={900}
                        className={cn(
                          "font-manrope",
                          isDark ? "text-white" : "text-gray-900",
                        )}
                      >
                        {row.stat}
                      </Text>
                    </Group>
                    <div
                      className={cn(
                        "h-2 w-full rounded-full overflow-hidden",
                        isDark ? "bg-white/5" : "bg-gray-100",
                      )}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: row.val }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className={cn(
                          "h-full rounded-full",
                          row.color === "emerald"
                            ? "bg-emerald-500"
                            : row.color === "blue"
                              ? "bg-blue-500"
                              : "bg-amber-500",
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </motion.div>
        </SimpleGrid>

        <div className="h-32" />
      </motion.div>
    </Box>
  );
};

export default memo(StatusPage);
