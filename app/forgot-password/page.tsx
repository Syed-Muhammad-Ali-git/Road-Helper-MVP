"use client";

import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Title,
  Text,
  Paper,
  Box,
  Group,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMail,
  IconArrowLeft,
  IconShieldCheck,
  IconSparkles,
  IconSend,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/lib/sweetalert";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setSubmitted(true);
      await showSuccess("Reset link sent", "Check your email for the recovery link.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send reset email";
      await showError("Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden font-satoshi">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-brand-red/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[480px]"
      >
        <Paper
          p={40}
          radius="32px"
          className="glass-dark border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <Box mb={40}>
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold mb-8 no-underline group"
            >
              <IconArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Sign In
            </Link>

            <Group gap="sm" mb={12}>
              <div className="h-[2px] w-8 bg-brand-red" />
              <Text className="text-brand-red font-black uppercase tracking-[0.3em] text-[10px]">
                Authentication
              </Text>
            </Group>
            <Title className="text-4xl font-extrabold text-white tracking-tight mb-4">
              Forgot <span className="text-brand-red">Password?</span>
            </Title>
            <Text className="text-gray-400 font-medium leading-relaxed">
              No worries! It happens. Enter your email and we'll send you a
              recovery link.
            </Text>
          </Box>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-8"
              >
                <div className="relative group">
                  <Text className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">
                    Email Address
                  </Text>
                  <TextInput
                    placeholder="Enter your registered email"
                    {...form.getInputProps("email")}
                    size="xl"
                    radius="16px"
                    leftSection={
                      <IconMail
                        size={20}
                        className="text-gray-500 group-focus-within:text-brand-red transition-colors"
                      />
                    }
                    classNames={{
                      input:
                        "bg-white/[0.03] border-white/10 focus:border-brand-red transition-all h-[64px] pl-[52px] text-white font-medium placeholder:text-gray-600 hover:bg-white/[0.05]",
                    }}
                  />
                </div>

                <Button
                  fullWidth
                  type="submit"
                  size="xl"
                  loading={loading}
                  radius="20px"
                  className="bg-brand-red hover:bg-brand-dark-red h-[64px] font-black uppercase tracking-widest shadow-2xl shadow-brand-red/20 border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  rightSection={<IconSend size={20} />}
                >
                  Send Recovery Link
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                  <ThemeIcon
                    size={100}
                    radius="32px"
                    className="bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 relative z-10"
                  >
                    <IconShieldCheck size={48} />
                  </ThemeIcon>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-4 -right-4 text-emerald-500/40"
                  >
                    <IconSparkles size={32} />
                  </motion.div>
                </div>

                <Title
                  order={3}
                  className="text-white text-2xl font-black mb-4"
                >
                  Check Your Inbox
                </Title>
                <Text className="text-gray-400 font-medium leading-relaxed mb-10">
                  A verification link has been sent to{" "}
                  <span className="text-white font-bold">
                    {form.values.email}
                  </span>
                  . Click the link to reset your password.
                </Text>

                <Button
                  fullWidth
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="xl"
                  radius="20px"
                  className="border-white/10 hover:bg-white/5 text-gray-300 font-bold h-[64px]"
                >
                  Try another email
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Branding */}
          <Box className="mt-12 pt-8 border-t border-white/5 text-center">
            <Text className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
              Road<span className="text-brand-red">Helper</span> Secure
              Authentication
            </Text>
          </Box>
        </Paper>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
