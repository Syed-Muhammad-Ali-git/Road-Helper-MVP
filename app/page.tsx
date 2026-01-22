"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Center, Loader, Stack, Text } from "@mantine/core";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    const role = getCookie("userRole");

    if (!token) {
      router.replace("/login");
    } else {
      if (role === "helper") {
        router.replace("/helper/dashboard");
      } else {
        router.replace("/client/dashboard");
      }
    }
  }, [router]);

  return (
    <Center className="h-screen bg-slate-50">
      <Stack align="center">
        <Loader size="xl" variant="bars" color="blue" />
        <Text fw={700} c="dimmed">
          Redirecting to your dashboard...
        </Text>
      </Stack>
    </Center>
  );
}
