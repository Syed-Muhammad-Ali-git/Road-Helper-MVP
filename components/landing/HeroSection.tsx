"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Grid, Text, Title, Group } from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconMapPin,
  IconPhoneCall,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";

const HeroSectionComponent = () => {
  const { dict, isRTL } = useLanguage();
  const { theme } = useAppTheme();

  const stats = useMemo(
    () => [
      {
        icon: IconShieldCheck,
        label: dict.hero.verified_helper,
        value: "500+",
      },
      { icon: IconMapPin, label: dict.hero.cities_coverage, value: "50+" },
    ],
    [dict],
  );

  const isDark = theme === "dark";

  return (
    <section
      className={`relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden transition-colors duration-300 ${isDark ? "bg-brand-black" : "bg-white"}`}
    >
      {/* Background Glows */}
      <div
        className={`absolute top-0 right-0 w-[50vw] h-[50vw] ${isDark ? "bg-brand-red/10" : "bg-brand-yellow/30"} rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 pointer-events-none`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[40vw] h-[40vw] ${isDark ? "bg-blue-600/10" : "bg-blue-400/20"} rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 -z-10 pointer-events-none`}
      />

      <Container size="xl">
        <Grid
          gutter={60}
          align="center"
          className={isRTL ? "text-right" : "text-left"}
        >
          <Grid.Col span={{ base: 12, md: 6 }} order={isRTL ? 2 : 1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 animate-fade-in ${isDark ? "glass border-brand-charcoal" : "bg-gray-100 border-gray-200"}`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {dict.hero.emergency_support}
                </span>
              </div>

              {/* Main Heading */}
              <Title
                className={`font-satoshi text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight ${isDark ? "text-white" : "text-brand-black"}`}
              >
                {dict.hero.stuck_on_road} <br />
                <span
                  className={isDark ? "text-gradient-red" : "text-brand-yellow"}
                >
                  {dict.hero.got_you_covered}
                </span>
              </Title>

              <Text
                className={`text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {dict.hero.description}
              </Text>

              {/* CTA Buttons */}
              <Group
                gap="md"
                className={`mb-12 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Link href="/register?type=customer">
                  <Button
                    size="xl"
                    className={`bg-gradient-to-r ${isDark ? "from-brand-red to-brand-dark-red hover:from-brand-dark-red hover:to-brand-red" : "from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-black"} transition-all hover:scale-105 active:scale-95 shadow-xl ${isDark ? "shadow-red-600/20" : "shadow-yellow-500/20"} rounded-full px-8 h-14 font-bold`}
                    leftSection={<IconMapPin size={22} stroke={2} />}
                  >
                    {dict.hero.request_help}
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="xl"
                    color="gray"
                    className={`rounded-full px-8 h-14 transition-all ${isDark ? "border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white glass" : "border-gray-300 text-gray-700 hover:bg-black/5 hover:text-black"}`}
                    leftSection={<IconPhoneCall size={22} stroke={1.5} />}
                  >
                    {dict.hero.emergency_call}
                  </Button>
                </Link>
              </Group>

              {/* Social Proof */}
              <div
                className={`flex items-center gap-6 flex-wrap ${isRTL ? "justify-end" : "justify-start"}`}
              >
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-brand-red/20 text-brand-red" : "bg-brand-yellow/20 text-brand-gold"}`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p
                          className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}
                        >
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </Grid.Col>

          {/* Right Image */}
          <Grid.Col
            span={{ base: 12, md: 6 }}
            className="relative"
            order={isRTL ? 1 : 2}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative z-10"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-4/3 group">
                <div
                  className={`absolute inset-0 z-0 ${isDark ? "bg-gradient-to-br from-brand-charcoal to-brand-black" : "bg-gradient-to-br from-gray-100 to-white"}`}
                />

                <Image
                  src="/assets/images/hero-illustration.png"
                  alt="Roadside Assistance App Interface"
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                    isDark ? "mix-blend-overlay opacity-60" : "opacity-90"
                  }`}
                />

                {/* Floating Elements */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`absolute bottom-6 left-0 right-6 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 border ${isDark ? "glass-dark border-white/10" : "glass-light border-black/10"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-brand-red/20 text-brand-red" : "bg-brand-yellow/20 text-brand-gold"}`}
                  >
                    <IconMapPin size={24} />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <Text
                      className={`font-bold text-sm ${isDark ? "text-white" : "text-black"}`}
                    >
                      {dict.hero.tow_truck_arriving}
                    </Text>
                    <Text
                      className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {dict.hero.estimated_time}
                    </Text>
                  </div>
                  <Button
                    size="xs"
                    color="red"
                    radius="xl"
                    className={`sm:ml-auto w-full sm:w-auto max-[450px]:mt-2 ${isDark ? "bg-brand-red hover:bg-brand-dark-red" : "bg-brand-yellow hover:bg-brand-gold text-black"}`}
                  >
                    {dict.hero.track}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`absolute top-6 right-6 p-3 rounded-xl flex items-center gap-3 border ${isDark ? "glass-dark border-white/10" : "glass-light border-black/10"}`}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <IconShieldCheck size={18} />
                  </div>
                  <div>
                    <Text
                      className={`font-bold text-xs ${isDark ? "text-white" : "text-black"}`}
                    >
                      {dict.hero.verified_helper}
                    </Text>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Blobs */}
              <div
                className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[80px] -z-10 animate-pulse ${isDark ? "bg-brand-red/20" : "bg-brand-yellow/40"}`}
              />
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] -z-10 animate-pulse ${isDark ? "bg-blue-500/20" : "bg-blue-400/30"}`}
              />
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
};

export const HeroSection = memo(HeroSectionComponent);
