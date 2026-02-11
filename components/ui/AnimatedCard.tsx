"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppTheme } from "@/app/context/ThemeContext";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  onClick,
  delay = 0,
}) => {
  const { isDark } = useAppTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`transition-all duration-200 ${ isDark
        ? "hover:shadow-lg hover:shadow-red-500/20"
        : "hover:shadow-md hover:shadow-blue-500/10"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
