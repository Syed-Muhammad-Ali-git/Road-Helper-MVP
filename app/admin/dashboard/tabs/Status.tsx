"use client";

import React from "react";
import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Group,
  RingProgress,
} from "@mantine/core";
import {
  IconServer,
  IconDatabase,
  IconWifi,
  IconCpu,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function StatusTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Title className="font-manrope text-3xl font-bold text-white mb-1">
        System Status
      </Title>
      <Text className="text-gray-400 mb-8">
        Real-time monitoring of application health and resources.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {/* Server Status */}
        <Paper
          p="xl"
          radius="xl"
          className="glass-dark border border-white/10"
          component={motion.div}
          whileHover={{ y: -5 }}
        >
          <Group justify="space-between" mb="lg">
            <Group>
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                <IconServer size={24} />
              </div>
              <div>
                <Text fw={700} className="text-white text-lg">
                  API Server
                </Text>
                <Text size="xs" className="text-emerald-400">
                  Operational
                </Text>
              </div>
            </Group>
            <RingProgress
              size={60}
              thickness={6}
              roundCaps
              sections={[{ value: 98, color: "teal" }]}
              label={
                <Text c="teal" fw={700} ta="center" size="xs">
                  98%
                </Text>
              }
            />
          </Group>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Uptime</span>
              <span className="text-white">14d 21h 12m</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Response Time</span>
              <span className="text-emerald-400">24ms</span>
            </div>
          </div>
        </Paper>

        {/* Database Status */}
        <Paper
          p="xl"
          radius="xl"
          className="glass-dark border border-white/10"
          component={motion.div}
          whileHover={{ y: -5 }}
        >
          <Group justify="space-between" mb="lg">
            <Group>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                <IconDatabase size={24} />
              </div>
              <div>
                <Text fw={700} className="text-white text-lg">
                  Database
                </Text>
                <Text size="xs" className="text-blue-400">
                  Healthy
                </Text>
              </div>
            </Group>
            <RingProgress
              size={60}
              thickness={6}
              roundCaps
              sections={[{ value: 45, color: "blue" }]}
              label={
                <Text c="blue" fw={700} ta="center" size="xs">
                  45%
                </Text>
              }
            />
          </Group>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Connections</span>
              <span className="text-white">1,204 / 5,000</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Storage</span>
              <span className="text-white">24.5 GB / 100 GB</span>
            </div>
          </div>
        </Paper>

        {/* CPU Usage */}
        <Paper
          p="xl"
          radius="xl"
          className="glass-dark border border-white/10"
          component={motion.div}
          whileHover={{ y: -5 }}
        >
          <Group justify="space-between" mb="lg">
            <Group>
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                <IconCpu size={24} />
              </div>
              <div>
                <Text fw={700} className="text-white text-lg">
                  CPU VCore
                </Text>
                <Text size="xs" className="text-amber-400">
                  Moderate Load
                </Text>
              </div>
            </Group>
            <RingProgress
              size={60}
              thickness={6}
              roundCaps
              sections={[{ value: 65, color: "orange" }]}
              label={
                <Text c="orange" fw={700} ta="center" size="xs">
                  65%
                </Text>
              }
            />
          </Group>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Cores Active</span>
              <span className="text-white">4 / 8</span>
            </div>
          </div>
        </Paper>

        {/* Network */}
        <Paper
          p="xl"
          radius="xl"
          className="glass-dark border border-white/10"
          component={motion.div}
          whileHover={{ y: -5 }}
        >
          <Group justify="space-between" mb="lg">
            <Group>
              <div className="p-3 rounded-lg bg-violet-500/10 text-violet-500">
                <IconWifi size={24} />
              </div>
              <div>
                <Text fw={700} className="text-white text-lg">
                  Network
                </Text>
                <Text size="xs" className="text-violet-400">
                  Stable
                </Text>
              </div>
            </Group>
            <RingProgress
              size={60}
              thickness={6}
              roundCaps
              sections={[{ value: 25, color: "violet" }]}
              label={
                <Text c="violet" fw={700} ta="center" size="xs">
                  25%
                </Text>
              }
            />
          </Group>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Throughput</span>
              <span className="text-white">125 MB/s</span>
            </div>
          </div>
        </Paper>
      </SimpleGrid>
    </motion.div>
  );
}
