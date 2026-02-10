"use client";

import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Box,
  ThemeIcon,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconSearch,
  IconUserCheck,
  IconTrophy,
  IconArrowRight,
} from "@tabler/icons-react";

const steps = [
  {
    title: "Request Assistance",
    description:
      "Select your service category and share your current location through our intuitive map interface.",
    icon: IconSearch,
    color: "blue",
    delay: 0.1,
  },
  {
    title: "Instant Matching",
    description:
      "Our algorithm connects you with the nearest verified professional helper within seconds.",
    icon: IconUserCheck,
    color: "red",
    delay: 0.2,
  },
  {
    title: "Get Rescued",
    description:
      "Track your helper in real-time until they arrive to get you back on your journey safely.",
    icon: IconTrophy,
    color: "orange",
    delay: 0.3,
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_50%)]" />

      <Container size="xl" className="relative z-10">
        <Box className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text className="text-brand-red font-black uppercase tracking-[0.4em] text-[10px] pb-4">
              The Process
            </Text>
            <Title className="text-5xl md:text-6xl font-black text-white tracking-tighter pb-6">
              How{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                It Works
              </span>
            </Title>
            <center>
              <Text className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                We&apos;ve streamlined roadside assistance into three simple
                steps to ensure you&apos;re never left stranded for long.
              </Text>
            </center>
          </motion.div>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="group relative"
            >
              <Box className="glass-dark p-10 rounded-[40px] border border-white/5 hover:border-brand-red/30 transition-all duration-500 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 text-white/2 group-hover:text-brand-red/5 transition-colors">
                  <step.icon size={120} stroke={1} />
                </div>

                <ThemeIcon
                  size={72}
                  radius="24px"
                  className={`bg-${step.color}-500/10 text-${step.color}-500 mb-8 border border-${step.color}-500/20 shadow-xl group-hover:scale-110 transition-transform duration-500`}
                >
                  <step.icon size={36} />
                </ThemeIcon>

                <Title
                  order={3}
                  className="text-2xl font-black text-white mb-4 tracking-tight"
                >
                  <span className="text-brand-red mr-2">0{index + 1}.</span>{" "}
                  {step.title}
                </Title>
                <Text className="text-gray-400 font-medium leading-relaxed">
                  {step.description}
                </Text>

                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-20 opacity-20 group-hover:opacity-100 transition-opacity">
                    <IconArrowRight size={32} className="text-brand-red" />
                  </div>
                )}
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
};
