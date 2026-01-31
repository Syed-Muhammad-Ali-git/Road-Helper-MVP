"use client";
import { Container, Grid, Text, Group, ActionIcon, Box } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../assets/images/logo.png";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-brand-black -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />

      <Container size="xl">
        <Grid gutter={60}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-lg shadow-red-500/10">
                <Image
                  src={logoIcon}
                  alt="Road Helper Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <Text className="font-satoshi font-bold text-2xl text-white tracking-tight">
                Road Helper
              </Text>
            </Link>
            <Text className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              The smartest way to get roadside assistance. Reliable, fast, and
              transparent service when you need it most. We are here 24/7.
            </Text>
            <Group gap="sm">
              {[
                IconBrandTwitter,
                IconBrandYoutube,
                IconBrandInstagram,
                IconBrandLinkedin,
              ].map((Icon, i) => (
                <ActionIcon
                  key={i}
                  size="lg"
                  variant="default"
                  className="bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-brand-red hover:border-brand-red transition-colors duration-300"
                >
                  <Icon size={18} />
                </ActionIcon>
              ))}
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 2 }}>
            <Text className="font-bold text-white mb-6 font-satoshi">
              Company
            </Text>
            <div className="flex flex-col gap-4">
              {["About", "Careers", "Contact", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-brand-red transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Text className="font-bold text-white mb-6 font-satoshi">
              Services
            </Text>
            <div className="flex flex-col gap-4">
              {[
                "Towing",
                "Tire Change",
                "Fuel Delivery",
                "Battery Jump",
                "Lockout",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-brand-red transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text className="font-bold text-white mb-6 font-satoshi">
              Get the App
            </Text>
            <Text className="text-gray-400 text-sm mb-4">
              Download our app for the fastest service.
            </Text>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white/10 hover:bg-white/20 border border-white/5 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all w-fit">
                {/* Apple Icon */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.08.05-2.37.72-3.15 1.71-.69.86-1.31 2.08-1.12 3.16 1.19.09 2.42-.84 3.2-1.76z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="text-sm font-semibold mt-0.5">App Store</div>
                </div>
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/5 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all w-fit">
                {/* Play Store Icon */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.84L14.5,12.81L16.81,15.12M20.3,10.84C20.53,10.96 20.69,11.21 20.69,11.5C20.69,11.79 20.53,12 20.3,12.16L18.29,13.62L15.31,12L18.29,10.38L20.3,10.84M16.81,8.88L14.5,11.19L6.05,2.16L16.81,8.88Z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[10px] opacity-70">GET IT ON</div>
                  <div className="text-sm font-semibold mt-0.5">
                    Google Play
                  </div>
                </div>
              </button>
            </div>
          </Grid.Col>
        </Grid>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Road Helper. All rights reserved.
          </Text>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
