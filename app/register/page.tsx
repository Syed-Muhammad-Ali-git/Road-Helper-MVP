"use client";

import React from "react";
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
    Select
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { helperRegisterAction } from "@/redux/actions/helper-action";
import { motion } from "framer-motion";

const helperSchema = z.object({
    fullName: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Invalid phone number"),
    serviceType: z.string().min(1, "Service type is required"),
});

export default function RegisterPage() {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.helper.loading);

    const form = useForm({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            phone: "",
            serviceType: "",
        },
        validate: zodResolver(helperSchema),
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await dispatch(helperRegisterAction(values));
            toast.success("Helper account created successfully!");
            router.replace("/helper/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Registration failed");
        }
    };

    return (
        <Box className="min-h-screen flex bg-slate-50">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex items-center justify-center p-8 bg-white lg:rounded-r-[60px] shadow-2xl z-20 relative order-2 lg:order-1"
            >
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />

                <Container size={450} className="w-full">
                    <Box className="mb-8">
                        <Title order={2} className="text-3xl font-black text-slate-800 tracking-tight">Helper Registration</Title>
                        <Text c="dimmed" size="md" mt={5}>
                            Already registered?{' '}
                            <Anchor size="md" component={Link} href="/login" className="font-bold text-blue-600">
                                Login here
                            </Anchor>
                        </Text>
                    </Box>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Full Name"
                                placeholder="John Doe"
                                required
                                size="md"
                                radius="md"
                                {...form.getInputProps("fullName")}
                            />

                            <TextInput
                                label="Email"
                                placeholder="john@example.com"
                                required
                                size="md"
                                radius="md"
                                {...form.getInputProps("email")}
                            />

                            <TextInput
                                label="Phone"
                                placeholder="+1234567890"
                                required
                                size="md"
                                radius="md"
                                {...form.getInputProps("phone")}
                            />

                            <Select
                                label="Primary Service Type"
                                placeholder="Choose your expertise"
                                required
                                size="md"
                                radius="md"
                                data={[
                                    { value: "bike_mechanic", label: "Bike Mechanic" },
                                    { value: "car_mechanic", label: "Car Mechanic" },
                                    { value: "fuel_delivery", label: "Fuel Delivery" },
                                    { value: "towing", label: "Towing Service" },
                                ]}
                                {...form.getInputProps("serviceType")}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Min 6 characters"
                                required
                                size="md"
                                radius="md"
                                {...form.getInputProps("password")}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                radius="md"
                                className="bg-indigo-600 h-14 mt-6 shadow-lg transition-all"
                            >
                                Register as Helper
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex flex-1 relative overflow-hidden bg-[#1E293B] items-center justify-center p-12 order-1 lg:order-2"
            >
                <Box className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <Image src="/assets/images/logo.jpg" alt="Background" h="100%" w="100%" fit="cover" />
                </Box>
                <Stack align="center" gap="xl" className="z-10 text-white text-center">
                    <Title order={1} className="text-5xl font-black tracking-tight leading-tight">Join Our <br /> <span className="text-red-500">Service Network</span></Title>
                    <Text className="text-xl text-slate-300 max-w-md">
                        Help travelers in need and grow your business with Road Helper.
                    </Text>
                </Stack>
            </motion.div>
        </Box>
    );
}
