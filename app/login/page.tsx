"use client";

import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Group,
  Anchor,
  Stack,
  Box,
  Image,
  LoadingOverlay,
  SegmentedControl,
  Paper,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { customerLoginAction } from "@/redux/actions/customer-action";
import { helperLoginAction } from "@/redux/actions/helper-action";
import { motion, AnimatePresence } from "framer-motion";

const customerSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const helperSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [loginType, setLoginType] = useState<string>("customer");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const customerLoading = useSelector(
    (state: RootState) => state.customer.loading,
  );
  const helperLoading = useSelector((state: RootState) => state.helper.loading);

  const customerForm = useForm({
    initialValues: { phone: "" },
    validate: zodResolver(customerSchema),
  });

  const helperForm = useForm({
    initialValues: { email: "", password: "" },
    validate: zodResolver(helperSchema),
  });

  const handleCustomerSubmit = async (values: typeof customerForm.values) => {
    try {
      await dispatch(customerLoginAction(values.phone));
      toast.success("Welcome! Login successful.");
      router.replace("/client/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleHelperSubmit = async (values: typeof helperForm.values) => {
    try {
      await dispatch(helperLoginAction(values));
      toast.success("Helper login successful.");
      router.replace("/helper/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Invalid helper credentials");
    }
  };

  return (
    <Box className="min-h-screen flex bg-slate-50">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 relative overflow-hidden bg-[#1a237e] items-center justify-center p-12"
      >
        <Box className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <Image
            src="/assets/images/ui-design.jpg"
            alt="Background"
            h="100%"
            w="100%"
            fit="cover"
          />
        </Box>
        <Stack align="center" gap="xl" className="z-10 text-white text-center">
          <Title
            order={1}
            className="text-6xl font-black tracking-tight leading-tight"
          >
            Your Roadside <br /> <span className="text-blue-400">Guardian</span>
          </Title>
          <Text className="text-xl text-slate-300 max-w-md font-medium">
            Instant assistance for car and bike emergencies.
          </Text>
        </Stack>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-8 bg-white lg:rounded-l-[60px] shadow-2xl z-20 relative"
      >
        <LoadingOverlay
          visible={customerLoading || helperLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />

        <Container size={420} className="w-full">
          <Box className="mb-8">
            <Group gap="xs" mb="lg">
              <Box className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Text fw={900} c="white">
                  RH
                </Text>
              </Box>
              <Text fw={900} size="xl" className="tracking-tighter">
                ROAD HELPER
              </Text>
            </Group>
            <Title
              order={2}
              className="text-3xl font-black text-slate-800 tracking-tight"
            >
              Login Account
            </Title>
          </Box>

          <Paper p="xs" radius="xl" bg="slate.0" mb="xl">
            <SegmentedControl
              fullWidth
              size="md"
              radius="xl"
              value={loginType}
              onChange={setLoginType}
              data={[
                { label: "Customer", value: "customer" },
                { label: "Helper", value: "helper" },
              ]}
              classNames={{
                root: "bg-transparent",
                indicator: "bg-blue-600",
                label: "font-bold text-sm h-10",
              }}
              styles={{
                label: {
                  color: "inherit",
                  "&[data-active]": { color: "white" },
                },
              }}
            />
          </Paper>

          <AnimatePresence mode="wait">
            {loginType === "customer" ? (
              <motion.div
                key="customer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={customerForm.onSubmit(handleCustomerSubmit)}>
                  <Stack gap="lg">
                    <TextInput
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      required
                      size="lg"
                      radius="md"
                      {...customerForm.getInputProps("phone")}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      radius="md"
                      className="bg-blue-600 h-14"
                    >
                      Continue with Phone
                    </Button>

                    <Divider label="OR" labelPosition="center" my="sm" />

                    <Button
                      variant="default"
                      fullWidth
                      size="lg"
                      radius="md"
                      leftSection={
                        <Image
                          src="https://www.google.com/favicon.ico"
                          w={16}
                          h={16}
                        />
                      }
                      onClick={() => toast.info("Google Login coming soon!")}
                    >
                      Continue with Google
                    </Button>
                  </Stack>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="helper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={helperForm.onSubmit(handleHelperSubmit)}>
                  <Stack gap="lg">
                    <TextInput
                      label="Email Address"
                      placeholder="helper@example.com"
                      required
                      size="lg"
                      radius="md"
                      {...helperForm.getInputProps("email")}
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="••••••••"
                      required
                      size="lg"
                      radius="md"
                      {...helperForm.getInputProps("password")}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      radius="md"
                      className="bg-indigo-600 h-14"
                    >
                      Helper Sign In
                    </Button>
                    <Text size="sm" ta="center">
                      New helper?{" "}
                      <Anchor component={Link} href="/register" fw={700}>
                        Register Here
                      </Anchor>
                    </Text>
                  </Stack>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <Text
            ta="center"
            mt="xl"
            size="xs"
            c="dimmed"
            className="uppercase font-bold tracking-widest"
          >
            SECURE LOGGED-IN SESSION
          </Text>
        </Container>
      </motion.div>
    </Box>
  );
}
