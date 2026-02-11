"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";
import { useAppTheme } from "@/app/context/ThemeContext";

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedLink = React.forwardRef<
  HTMLAnchorElement,
  AnimatedLinkProps
>(({ children, className = "", ...props }, ref) => {
  const { isDark } = useAppTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        ref={ref}
        className={`inline-block transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
});

AnimatedLink.displayName = "AnimatedLink";

export default AnimatedLink;
