"use client";

import React, { useMemo } from "react";
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
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";

export const HowItWorks = () => {
  const { dict, isRTL } = useLanguage();
  const { theme } = useAppTheme();

  const steps = useMemo(
    () => [
      {
        title: dict.how_it_works.step1_title,
        description: dict.how_it_works.step1_desc,
        icon: IconSearch,
        color: "blue",
        delay: 0.1,
      },
      {
        title: dict.how_it_works.step2_title,
        description: dict.how_it_works.step2_desc,
        icon: IconUserCheck,
        color: "red",
        delay: 0.2,
      },
      {
        title: dict.how_it_works.step3_title,
        description: dict.how_it_works.step3_desc,
        icon: IconTrophy,
        color: "orange",
        delay: 0.3,
      },
    ],
    [dict],
  );

  const isDark = theme === "dark";

  return (
    <section
      className={`py-32 relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div
        className={`absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_50%)]" : "bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"}`}
      />

      <Container size="xl" className="relative z-10">
        <Box className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text
              className={`font-black uppercase tracking-[0.4em] text-[10px] pb-4 ${isDark ? "text-brand-red" : "text-brand-gold"}`}
            >
              {dict.how_it_works.the_process}
            </Text>
            <Title
              className={`text-5xl md:text-6xl font-black tracking-tighter pb-6 ${isDark ? "text-white" : "text-black"}`}
            >
              {dict.how_it_works.title}{" "}
              <span
                className={`text-transparent bg-clip-text ${isDark ? "bg-gradient-to-r from-white to-gray-500" : "bg-gradient-to-r from-black to-gray-500"}`}
              >
                {dict.how_it_works.subtitle}
              </span>
            </Title>
            <center>
              <Text
                className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg max-w-2xl mx-auto font-medium`}
              >
                {dict.how_it_works.description}
              </Text>
            </center>
          </motion.div>
        </Box>

        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing={40}
          className={isRTL ? "text-right" : "text-left"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="group relative"
            >
              <Box
                className={`${isDark ? "glass-dark border-white/5" : "glass-light border-black/5"} p-10 rounded-[40px] border hover:border-brand-red/30 transition-all duration-500 relative overflow-hidden h-full`}
              >
                <div
                  className={`absolute top-0 right-0 p-8 ${isDark ? "text-white/2 group-hover:text-brand-red/5" : "text-black/5 group-hover:text-brand-red/10"} transition-colors`}
                >
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
                  className={`text-2xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-black"}`}
                >
                  <span
                    className={`${isDark ? "text-brand-red" : "text-brand-gold"} mr-2`}
                  >
                    0{index + 1}.
                  </span>{" "}
                  {step.title}
                </Title>
                <Text
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} font-medium leading-relaxed`}
                >
                  {step.description}
                </Text>

                {index < 2 && (
                  <div
                    className={`hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-20 opacity-20 group-hover:opacity-100 transition-opacity ${isRTL ? "rotate-180 left-0 right-auto" : ""}`}
                  >
                    <IconArrowRight
                      size={32}
                      className={isDark ? "text-brand-red" : "text-brand-gold"}
                    />
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
