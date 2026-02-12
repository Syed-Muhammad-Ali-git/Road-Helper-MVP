"use client";

import React, { useState, useEffect, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import LandingHomeClient from "@/components/landing/LandingHomeClient";

const Home = () => {
  // Initialize to false to match server rendering (hydration-safe)
  const [showSplash, setShowSplash] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Determine splash state AFTER hydration to avoid mismatch
  useEffect(() => {
    const splashKey = "rh_splash_seen";
    const sessionKey = "rh_session_started";

    const splashSeen = localStorage.getItem(splashKey);
    const sessionStarted = sessionStorage.getItem(sessionKey);

    // Show splash if:
    // 1. It's the very first visit (splashSeen is null or not 'true')
    // 2. Or, it's a hard refresh on the home page (splashSeen is 'true', but sessionStarted is null, and current path is '/')
    const shouldShow =
      splashSeen !== "true" ||
      (splashSeen === "true" &&
        sessionStarted !== "true" &&
        window.location.pathname === "/");

    // If showing splash due to a refresh or first visit, immediately mark session as started
    if (shouldShow) {
      sessionStorage.setItem(sessionKey, "true");
    }

    setShowSplash(shouldShow);
    setIsHydrated(true);
  }, []);

  const handleSplashComplete = useCallback(() => {
    const splashKey = "rh_splash_seen";
    const sessionKey = "rh_session_started";
    localStorage.setItem(splashKey, "true");
    sessionStorage.setItem(sessionKey, "true");
    setShowSplash(false);
  }, []);

  // During hydration, show landing page (same as server render)
  if (!isHydrated) {
    return <LandingHomeClient />;
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} duration={2000} />
      )}
      {!showSplash && <LandingHomeClient />}
    </>
  );
};

export default Home;
