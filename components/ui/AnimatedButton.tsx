"use client";

import React from "react";
import { Button, ButtonProps } from "@mantine/core";
import { motion } from "framer-motion";
import { useAppTheme } from "@/app/context/ThemeContext";

interface AnimatedButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(({ isLoading, children, className, ...props }, ref) => {
  const { isDark } = useAppTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        ref={ref}
        loading={isLoading}
        className={`transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
