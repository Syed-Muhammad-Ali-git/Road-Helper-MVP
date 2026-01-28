"use client";
import {
  Container,
  Grid,
  Text,
  Title,
  ThemeIcon,
  Card,
  SimpleGrid,
} from "@mantine/core";
import {
  IconClock,
  IconShieldCheck,
  IconWallet,
  IconMapPin,
  IconUserCheck,
  IconCar,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconClock,
    title: "Lighting Fast Response",
    description:
      "Our helpers are notified instantly. Average arrival time is 15-30 minutes.",
  },
  {
    icon: IconShieldCheck,
    title: "Trusted Professionals",
    description:
      "Every helper is verified, background-checked, and rated by users like you.",
  },
  {
    icon: IconWallet,
    title: "Transparent Pricing",
    description:
      "Know the cost upfront. No hidden fees, no haggling. Pay securely through the app.",
  },
];

const steps = [
  {
    num: "01",
    title: "Request Help",
    desc: "Choose your service (tow, tire, gas) and set your location.",
    icon: IconMapPin,
  },
  {
    num: "02",
    title: "Get Matched",
    desc: "Nearby helpers accept your request. See their profile and ETA.",
    icon: IconUserCheck,
  },
  {
    num: "03",
    title: "Back on the Road",
    desc: "Get help quick. Pay seamlessly and rate your experience.",
    icon: IconCar,
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      id="features"
    >
      <Container size="xl">
        <div className="text-center mb-16">
          <Text className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2">
            Why Road Helper
          </Text>
          <Title className="font-manrope text-3xl md:text-4xl font-bold text-brand-black">
            Emergency assistance, <br /> redefined.
          </Title>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30} className="mb-32">
          {features.map((f, i) => (
            <Card
              key={i}
              padding="xl"
              radius="lg"
              className="border border-gray-100 hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <ThemeIcon
                size={60}
                radius="md"
                className="bg-red-50 text-brand-red mb-6"
              >
                <f.icon size={30} stroke={1.5} />
              </ThemeIcon>
              <Text className="font-manrope text-xl font-bold text-brand-black mb-3">
                {f.title}
              </Text>
              <Text className="text-gray-500 leading-relaxed">
                {f.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* HOW IT WORKS */}
        <div className="bg-brand-black rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <Text className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2">
                How it works
              </Text>
              <Title className="font-manrope text-3xl md:text-4xl font-bold text-white">
                Simple steps to safety
              </Title>
            </div>

            <Grid gutter={40}>
              {steps.map((s, i) => (
                <Grid.Col span={{ base: 12, md: 4 }} key={i}>
                  <div className="relative pl-8 border-l border-white/10 md:border-none md:pl-0 md:text-center group">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                      <s.icon size={32} />
                    </div>
                    <Text className="text-5xl font-bold text-white/5 absolute -top-4 left-4 md:left-1/2 md:-translate-x-1/2 font-manrope z-0 select-none">
                      {s.num}
                    </Text>
                    <Text className="font-manrope text-xl font-bold text-white mb-2 relative z-10">
                      {s.title}
                    </Text>
                    <Text className="text-gray-400 relative z-10">
                      {s.desc}
                    </Text>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  );
}
