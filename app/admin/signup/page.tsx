"use client";

import React from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Paper,
  Container,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { motion } from "framer-motion";
import {
  IconLock,
  IconMail,
  IconUser,
  IconArrowRight,
  IconShieldCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminSignup() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminCode: "",
    },
    validate: {
      firstName: (val) => (val.length < 2 ? "Too short" : null),
      lastName: (val) => (val.length < 2 ? "Too short" : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password must include at least 6 characters" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
      adminCode: (val) => (val.length < 4 ? "Invalid Admin Code" : null),
    },
  });

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center relative overflow-hidden font-satoshi py-10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <Container size={500} className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Image src="/logo.png" alt="Road Helper" width={60} height={60} />
            </motion.div>
            <Title className="text-white font-manrope text-3xl font-extrabold tracking-tight">
              Request Admin Access
            </Title>
            <Text className="text-gray-400 mt-2 text-sm max-w-xs mx-auto">
              Join the administrative team. Requires a valid verification code.
            </Text>
          </div>

          <Paper
            radius="xl"
            p={30}
            className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]"
          >
            <form onSubmit={form.onSubmit(() => {})}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="First Name"
                  placeholder="John"
                  leftSection={<IconUser size={16} />}
                  {...form.getInputProps("firstName")}
                  classNames={{
                    label:
                      "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                    input:
                      "bg-[#18181B] border-[#27272A] text-white focus:border-brand-red h-11 rounded-lg",
                  }}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Doe"
                  leftSection={<IconUser size={16} />}
                  {...form.getInputProps("lastName")}
                  classNames={{
                    label:
                      "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                    input:
                      "bg-[#18181B] border-[#27272A] text-white focus:border-brand-red h-11 rounded-lg",
                  }}
                />
              </SimpleGrid>

              <TextInput
                mt="md"
                label="Email Address"
                placeholder="admin@roadhelper.com"
                leftSection={<IconMail size={16} />}
                {...form.getInputProps("email")}
                classNames={{
                  label:
                    "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                  input:
                    "bg-[#18181B] border-[#27272A] text-white focus:border-brand-red h-11 rounded-lg",
                }}
              />

              <PasswordInput
                mt="md"
                label="Password"
                placeholder="Create a strong password"
                leftSection={<IconLock size={16} />}
                {...form.getInputProps("password")}
                classNames={{
                  label:
                    "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                  input:
                    "bg-[#18181B] border-[#27272A] text-white focus:border-brand-red h-11 rounded-lg",
                  innerInput: "h-11",
                }}
              />

              <PasswordInput
                mt="md"
                label="Confirm Password"
                placeholder="Repeat password"
                leftSection={<IconLock size={16} />}
                {...form.getInputProps("confirmPassword")}
                classNames={{
                  label:
                    "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                  input:
                    "bg-[#18181B] border-[#27272A] text-white focus:border-brand-red h-11 rounded-lg",
                  innerInput: "h-11",
                }}
              />

              <TextInput
                mt="md"
                label="Verification Code"
                placeholder="Enter Super Admin Code"
                leftSection={
                  <IconShieldCheck size={16} className="text-brand-red" />
                }
                {...form.getInputProps("adminCode")}
                classNames={{
                  label:
                    "text-gray-300 text-xs font-bold mb-1 uppercase tracking-wider",
                  input:
                    "bg-brand-red/5 border-brand-red/30 text-white focus:border-brand-red h-11 rounded-lg placeholder-brand-red/30",
                }}
              />

              <Button
                fullWidth
                size="lg"
                mt="xl"
                type="submit"
                rightSection={<IconArrowRight size={18} />}
                className="bg-brand-red hover:bg-brand-dark-red text-white h-12 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </Button>
            </form>

            <Group justify="center" mt="xl">
              <Text size="sm" className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/admin/login"
                  className="text-brand-red hover:underline font-bold"
                >
                  Sign In
                </Link>
              </Text>
            </Group>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
}
