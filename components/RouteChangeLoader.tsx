"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const RouteChangeLoaderContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    // Clear any existing timers
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (endTimerRef.current) clearTimeout(endTimerRef.current);

    setIsLoading(true);
    setProgress(10); // Start progress

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 15; // Random increment
        const newProgress = Math.min(prev + diff, 90); // Cap at 90%
        return newProgress;
      });
    }, 150); // Update every 150ms
  };

  const completeLoading = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(100); // Complete progress

    endTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0); // Reset for next time
    }, 400); // Hide after a short delay
  };

  useEffect(() => {
    // Start loader on route change
    startLoading();

    // Complete loader after a short delay, simulating content load
    const contentLoadTimer = setTimeout(() => {
      completeLoading();
    }, 500); // Adjust this delay as needed

    return () => {
      // Cleanup timers on unmount or before next effect run
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      clearTimeout(contentLoadTimer);
    };
  }, [pathname, searchParams]); // Re-run effect when pathname or searchParams change

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-loader" // Key for AnimatePresence
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[9997] h-1" // Reduced height for less intrusiveness
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }} // Smoother progress animation
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" // Example gradient, can be themed
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const RouteChangeLoader = () => {
  return (
    <Suspense fallback={null}>
      <RouteChangeLoaderContent />
    </Suspense>
  );
};

export default RouteChangeLoader;
