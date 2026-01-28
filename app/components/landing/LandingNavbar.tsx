"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Group, Container } from "@mantine/core";
import { motion } from "framer-motion";

export function LandingNavbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <Container
        size="xl"
        className="h-[70px] flex items-center justify-between"
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src="/assets/images/logo.jpg"
              alt="Road Helper Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-manrope font-bold text-xl text-brand-black tracking-tight">
            Road Helper
          </span>
        </Link>

        {/* DESKTOP MENU - HIDDEN ON MOBILE */}
        <Group visibleFrom="sm" gap="xl">
          <Link
            href="#features"
            className="text-gray-600 hover:text-brand-red transition-colors font-medium"
          >
            How it works
          </Link>
          <Link
            href="#features"
            className="text-gray-600 hover:text-brand-red transition-colors font-medium"
          >
            Trust & Safety
          </Link>
          <Link
            href="/register?type=helper"
            className="text-gray-600 hover:text-brand-red transition-colors font-medium"
          >
            Become a Helper
          </Link>
        </Group>

        {/* AUTH BUTTONS */}
        <Group>
          <Link href="/login">
            <Button
              variant="subtle"
              color="gray"
              className="font-manrope text-gray-700 hover:bg-gray-100"
            >
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button
              className="bg-brand-red hover:bg-brand-dark-red transition-all shadow-md hover:shadow-lg font-manrope rounded-full px-6"
              size="md"
            >
              Get Started
            </Button>
          </Link>
        </Group>
      </Container>
    </motion.nav>
  );
}
