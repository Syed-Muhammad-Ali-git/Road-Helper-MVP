"use client";

import React, { useEffect, useState } from "react";
import {
  Title,
  Text,
  Paper,
  Group,
  Button,
  Switch,
  Divider,
  NumberInput,
  Box,
  Center,
  Stack,
} from "@mantine/core";
import { IconShieldLock, IconBell, IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  getSystemSettings,
  updateSystemSettings,
} from "@/lib/services/adminService";
import { showSuccess, showError } from "@/lib/sweetalert";

export default function SettingsPage() {
  const [commission, setCommission] = useState<number>(20);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const settings = await getSystemSettings();
      setCommission(settings.commission);
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSystemSettings({ commission });
      await showSuccess(
        "Settings Saved",
        "Platform configuration has been updated.",
      );
    } catch (e: any) {
      await showError("Save Failed", e.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Center className="min-h-screen bg-brand-black text-white p-4 md:p-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Box mb={40} className="text-center">
          <Title className="font-manrope text-4xl font-black text-white mb-2">
            System <span className="text-brand-red">Control</span>
          </Title>
          <Text className="text-gray-500 font-medium">
            Manage global platform parameters and infrastructure protocols.
          </Text>
        </Box>

        <Paper
          p={40}
          radius="32px"
          className="glass-dark border border-white/10 space-y-10 shadow-2xl"
        >
          <div>
            <Group gap="md" mb="xl">
              <div className="h-10 w-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                <IconShieldLock size={22} />
              </div>
              <Text className="text-white font-black text-xl tracking-tight">
                Platform Configuration
              </Text>
            </Group>

            <div className="space-y-4">
              <NumberInput
                label={
                  <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">
                    System Commission Fee
                  </Text>
                }
                value={commission}
                onChange={(val) => setCommission(Number(val))}
                min={0}
                max={100}
                suffix="%"
                size="lg"
                classNames={{
                  input:
                    "bg-white/5 border-2 border-white/5 text-white focus:border-brand-red h-14 rounded-2xl transition-all",
                }}
              />
              <Text className="text-gray-500 text-xs font-medium leading-relaxed">
                This percentage is automatically deducted from helper earnings
                for every successfully completed service request.
              </Text>
            </div>
          </div>

          <Divider color="white" opacity={0.05} />

          <div>
            <Group gap="md" mb="xl">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <IconBell size={22} />
              </div>
              <Text className="text-white font-black text-xl tracking-tight">
                Notification Protocols
              </Text>
            </Group>

            <Stack gap="lg">
              <Group justify="space-between">
                <div>
                  <Text className="text-gray-200 font-bold">Email Alerts</Text>
                  <Text className="text-gray-500 text-xs">
                    Receive data on new operator registrations
                  </Text>
                </div>
                <Switch color="red" defaultChecked size="md" />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text className="text-gray-200 font-bold">
                    Health Monitoring
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Get telemetry for system infrastructure
                  </Text>
                </div>
                <Switch color="red" defaultChecked size="md" />
              </Group>
            </Stack>
          </div>

          <Group justify="end" mt={50} gap="md">
            <Button
              variant="subtle"
              color="gray"
              className="text-gray-500 hover:text-white font-bold h-14 rounded-2xl px-8"
            >
              Reset
            </Button>
            <Button
              className="bg-brand-red hover:bg-brand-dark-red text-white h-14 rounded-2xl px-10 transition-all font-black shadow-xl shadow-brand-red/20 border-none"
              leftSection={<IconCheck size={20} />}
              loading={saving}
              onClick={handleSave}
            >
              Apply Changes
            </Button>
          </Group>
        </Paper>
      </motion.div>
    </Center>
  );
}
