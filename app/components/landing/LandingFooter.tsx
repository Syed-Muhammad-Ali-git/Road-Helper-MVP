"use client";
import { Container, Grid, Text, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <Container size="xl">
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src="/assets/images/logo.jpg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <Text className="font-manrope font-bold text-xl text-brand-black">
                Road Helper
              </Text>
            </div>
            <Text className="text-gray-500 text-sm leading-relaxed mb-6">
              The smartest way to get roadside assistance. Reliable, fast, and
              transparent service when you need it most.
            </Text>
            <Group gap="xs">
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandTwitter size={18} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandYoutube size={18} />
              </ActionIcon>
              <ActionIcon size="lg" color="gray" variant="subtle">
                <IconBrandInstagram size={18} />
              </ActionIcon>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 2 }}>
            <Text className="font-bold text-brand-black mb-4">Company</Text>
            <div className="flex flex-col gap-3">
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                About
              </Text>
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                Careers
              </Text>
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                Contact
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Text className="font-bold text-brand-black mb-4">Services</Text>
            <div className="flex flex-col gap-3">
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                Towing
              </Text>
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                Tire Change
              </Text>
              <Text className="text-gray-500 hover:text-brand-red cursor-pointer text-sm">
                Fuel Delivery
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text className="font-bold text-brand-black mb-4">Install App</Text>
            <div className="flex gap-4">
              <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-xs">
                  <div className="opacity-70 text-[10px]">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-xs">
                  <div className="opacity-70 text-[10px]">GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </div>
            </div>
          </Grid.Col>
        </Grid>

        <div className="border-t border-gray-100 mt-16 pt-8 text-center">
          <Text className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Road Helper. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
