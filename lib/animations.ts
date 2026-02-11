// Global animation utilities and CSS
import { CSSProperties } from "react";

export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  
  // Slide animations
  slideInFromLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.4 },
  },

  slideInFromRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.4 },
  },

  slideInFromTop: {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 },
    transition: { duration: 0.3 },
  },

  slideInFromBottom: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
    transition: { duration: 0.3 },
  },

  // Scale animations
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3 },
  },

  // Container animations
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  },

  // Button hover animations
  buttonHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },

  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },

  // Hover lift effect
  hoverLift: {
    whileHover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
    transition: { duration: 0.2 },
  },
};

// Theme-aware color utilities
export const themeColors = {
  light: {
    bg: "bg-white",
    bgSecondary: "bg-gray-50",
    bgTertiary: "bg-gray-100",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textTertiary: "text-gray-400",
    border: "border-gray-200",
    shadow: "shadow-sm",
  },
  dark: {
    bg: "dark:bg-gray-900",
    bgSecondary: "dark:bg-gray-800",
    bgTertiary: "dark:bg-gray-700",
    text: "dark:text-gray-100",
    textSecondary: "dark:text-gray-300",
    textTertiary: "dark:text-gray-500",
    border: "dark:border-gray-700",
    shadow: "dark:shadow-2xl",
  },
};

// Combine both light and dark
export const getThemeClasses = (lightClasses: string, darkClasses: string) => {
  return `${lightClasses} ${darkClasses}`;
};
