"use client";

import React, { useState } from "react";
import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Anchor,
    Stack,
    Box,
    Image,
    Divider
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginUser, setError, setLoading } from "@/redux/reducers/auth-reducer/auth-slice";

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            dispatch(loginUser({ uid: userCredential.user.uid, email: userCredential.user.email }));
            toast.success("Logged in successfully!");
            // Redirection logic will be handled by the layout or Root page auth sync
            router.push("/");
        } catch (error: any) {
            dispatch(setError(error.message));
            toast.error(error.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Box className="min-h-screen flex bg-[#F8FAFC]">
            <Box className="hidden lg:flex flex-1 relative overflow-hidden bg-[#1E293B] items-center justify-center p-12">
                <Box className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <Image src="/assets/images/ui-design.jpg" alt="Background" h="100%" w="100%" fit="cover" />
                </Box>
                <Stack align="center" gap="xl" className="z-10 text-white text-center">
                    <Title order={1} className="text-5xl font-bold tracking-tight">Fixing the way forward</Title>
                    <Text className="text-xl text-slate-300 max-w-md">
                        Join thousands of users getting instant roadside assistance anywhere, anytime.
                    </Text>
                </Stack>
            </Box>

            <Box className="flex-1 flex items-center justify-center p-8 bg-white lg:rounded-l-[40px] shadow-2xl z-20">
                <Container size={420} className="w-full">
                    <Box className="mb-10">
                        <Title order={2} className="text-3xl font-bold text-slate-800">Welcome Back</Title>
                        <Text c="dimmed" size="sm" mt={5}>
                            New to Road Helper?{' '}
                            <Anchor size="sm" component={Link} href="/auth/register" className="font-semibold text-blue-600">
                                Create an account
                            </Anchor>
                        </Text>
                    </Box>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Email Address"
                                placeholder="hello@example.com"
                                required
                                size="md"
                                {...form.getInputProps("email")}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                required
                                size="md"
                                {...form.getInputProps("password")}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="md"
                                className="bg-blue-600 hover:bg-blue-700 h-12 mt-4"
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Box>
        </Box>
    );
}
