"use client";

import React from "react";
import { Container, Title, Text, Accordion, Card } from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconHelp,
  IconQuestionMark,
  IconChevronDown,
} from "@tabler/icons-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const FAQPage = () => {
  const { dict, isRTL } = useLanguage();
  const { theme } = useAppTheme();

  const faqs = [
    {
      question: "What is Road Helper?",
      answer:
        "Road Helper is a modern roadside assistance platform that connects drivers with verified professionals for emergency vehicle help. We provide fast, reliable assistance for breakdowns, towing, tire changes, and more.",
    },
    {
      question: "How do I request roadside assistance?",
      answer:
        "Simply download our app or visit our website, create an account, and tap the 'Request Help' button. Share your location, describe the issue, and we'll connect you with the nearest available helper.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Our pricing varies by service and location. Basic roadside assistance starts at $29.99, while towing services range from $49.99 to $149.99 depending on distance. You'll see exact pricing before confirming your request.",
    },
    {
      question: "How long does it take for help to arrive?",
      answer:
        "Our average response time is 15-20 minutes in urban areas. However, this can vary based on your location, time of day, and current demand. You'll receive real-time updates on your helper's ETA.",
    },
    {
      question: "Are the helpers verified?",
      answer:
        "Yes, all our helpers undergo thorough background checks, vehicle inspections, and skill verification. We maintain a 4.8-star average rating and continuously monitor service quality.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer comprehensive roadside assistance including towing, tire changes, jump starts, fuel delivery, lockout services, and minor repairs. We also provide emergency supplies and vehicle diagnostics.",
    },
    {
      question: "Can I track my helper in real-time?",
      answer:
        "Absolutely! Once your request is accepted, you can track your helper's location in real-time through our app. You'll also receive live updates and can contact them directly if needed.",
    },
    {
      question: "What if I need to cancel my request?",
      answer:
        "You can cancel your request at any time through the app. If your helper is already en route, a small cancellation fee may apply. We recommend canceling as soon as possible to avoid charges.",
    },
  ];

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-brand-black text-white" : "bg-white text-black"} transition-colors duration-300`}
    >
      <LandingNavbar />

      <main className="pt-32 pb-20">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 mb-6">
              <IconHelp size={20} className="text-brand-yellow" />
              <span className="text-sm font-bold uppercase tracking-wider text-brand-yellow">
                FAQ
              </span>
            </div>
            <Title
              className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-yellow to-brand-gold">
                Questions
              </span>
            </Title>
            <Text
              className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Find answers to common questions about Road Helper and our
              services.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion
              variant="separated"
              radius="lg"
              className="space-y-4"
              chevron={<IconChevronDown size={20} />}
            >
              {faqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className={`${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} border hover:border-brand-yellow/30 transition-all duration-300`}
                >
                  <Accordion.Control
                    className={`px-6 py-4 ${isDark ? "text-white hover:text-brand-yellow" : "text-black hover:text-brand-gold"} transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <IconQuestionMark
                        size={20}
                        className="text-brand-yellow"
                      />
                      <span className="font-semibold text-left">
                        {faq.question}
                      </span>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel
                    className={`px-6 pb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {faq.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20"
          >
            <Card
              className={`${isDark ? "bg-gradient-to-br from-brand-yellow/10 to-brand-gold/10 border-white/10" : "bg-gradient-to-br from-brand-yellow/5 to-brand-gold/5 border-black/10"} border p-8 md:p-12 rounded-3xl`}
            >
              <Title
                className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}
              >
                Still have questions?
              </Title>
              <Text
                className={`text-lg mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Our support team is here to help you 24/7.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@roadhelper.com"
                  className="px-6 py-3 bg-brand-yellow hover:bg-brand-gold text-black font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-brand-yellow/20"
                >
                  Contact Support
                </a>
                <a
                  href="/about"
                  className={`px-6 py-3 border ${isDark ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/10"} font-bold rounded-xl transition-all hover:scale-105`}
                >
                  Learn More About Us
                </a>
              </div>
            </Card>
          </motion.div>
        </Container>
      </main>

      <LandingFooter />
    </div>
  );
};

export default FAQPage;
