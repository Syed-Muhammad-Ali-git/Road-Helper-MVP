"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Title, Text, Grid, Card, Box } from "@mantine/core";
import {
  IconShieldCheck,
  IconClock,
  IconUsers,
  IconMapPin,
  IconArrowLeft,
} from "@tabler/icons-react";

const stats = [
  { value: "2,000+", label: "Happy Customers", icon: IconUsers },
  { value: "500+", label: "Verified Helpers", icon: IconShieldCheck },
  { value: "24/7", label: "Support Available", icon: IconClock },
  { value: "50+", label: "Cities Covered", icon: IconMapPin },
];

const values = [
  {
    title: "Safety First",
    description:
      "All our helpers are thoroughly verified and background-checked for your peace of mind.",
    icon: IconShieldCheck,
  },
  {
    title: "Lightning Fast",
    description:
      "Average response time of 15 minutes. Help arrives when you need it most.",
    icon: IconClock,
  },
  {
    title: "Trusted Network",
    description:
      "Join thousands of drivers who rely on RoadHelper for emergency roadside assistance.",
    icon: IconUsers,
  },
  {
    title: "Real-time Tracking",
    description:
      "Track your helper's location in real-time and get accurate ETAs.",
    icon: IconMapPin,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-white font-satoshi">
      {/* Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-xl py-4 border-b border-white/5">
        <Container size="xl" className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <IconArrowLeft
              className="text-gray-400 group-hover:text-brand-red transition-colors"
              size={20}
            />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Back to Home
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-red-500/20 transition-transform group-hover:scale-110 bg-white p-1">
              <Image
                src="/assets/images/logo.png"
                alt="Road Helper Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-satoshi font-bold text-xl text-white tracking-tight group-hover:text-brand-red transition-colors">
              Road<span className="text-brand-red">Helper</span>
            </span>
          </Link>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-red/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-10" />

        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <Title className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              We're Building the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
                Roadside Assistance
              </span>
            </Title>
            <Text className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              RoadHelper connects stranded drivers with verified roadside
              assistance professionals in minutes. No more waiting hours for
              help. No more uncertainty.
            </Text>
          </motion.div>

          {/* Stats Grid */}
          <Grid gutter="xl" className="mb-24">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-red/50 transition-all duration-300 group p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-red/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={32} className="text-brand-red" />
                      </div>
                      <Text className="text-4xl font-bold mb-2 text-white">
                        {stat.value}
                      </Text>
                      <Text className="text-gray-400">{stat.label}</Text>
                    </Card>
                  </motion.div>
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <Container size="xl">
          <Grid gutter={60} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 mb-6">
                  <span className="text-brand-red text-sm font-bold uppercase tracking-wider">
                    Our Mission
                  </span>
                </div>
                <Title className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Making Roads Safer, One Rescue at a Time
                </Title>
                <Text className="text-lg text-gray-400 leading-relaxed mb-6">
                  We started RoadHelper because we believe no one should be
                  stranded on the road, uncertain about when help will arrive.
                  Our platform leverages modern technology to connect you with
                  verified professionals instantly.
                </Text>
                <Text className="text-lg text-gray-400 leading-relaxed">
                  Whether you need a tow truck, a jumpstart, fuel delivery, or a
                  mechanic, we ensure help is always just a few taps away.
                </Text>
              </motion.div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square rounded-3xl overflow-hidden"
              >
                <Image
                  src="/assets/images/hero-illustration.png"
                  alt="Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent" />
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <Container size="xl">
          <div className="text-center mb-16">
            <Title className="text-4xl md:text-5xl font-bold mb-4">
              Our Core Values
            </Title>
            <Text className="text-xl text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do at RoadHelper
            </Text>
          </div>

          <Grid gutter="xl">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-red/50 transition-all duration-300 p-8 h-full group">
                      <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-brand-red/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={28} className="text-brand-red" />
                      </div>
                      <Title
                        order={3}
                        className="text-xl font-bold mb-3 text-white"
                      >
                        {value.title}
                      </Title>
                      <Text className="text-gray-400 leading-relaxed">
                        {value.description}
                      </Text>
                    </Card>
                  </motion.div>
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 -z-10" />

        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-brand-red/10 to-orange-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
          >
            <Title className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </Title>
            <Text className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of drivers who trust RoadHelper for emergency
              assistance
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=customer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-brand-red to-brand-dark-red text-white font-bold rounded-xl shadow-xl shadow-brand-red/20 hover:shadow-brand-red/40 transition-all"
                >
                  Sign Up as Customer
                </motion.button>
              </Link>
              <Link href="/register?type=helper">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  Become a Helper
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
