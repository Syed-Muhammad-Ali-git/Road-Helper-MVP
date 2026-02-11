"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useMantineColorScheme } from "@mantine/core";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeToDOM = (newTheme: Theme) => {
  if (typeof window === "undefined") return;
  
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  htmlElement.setAttribute("data-theme", newTheme);
  htmlElement.classList.remove("light", "dark");
  htmlElement.classList.add(newTheme);

  if (newTheme === "dark") {
    bodyElement.classList.add("dark");
    bodyElement.classList.remove("light");
  } else {
    bodyElement.classList.add("light");
    bodyElement.classList.remove("dark");
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { setColorScheme } = useMantineColorScheme();
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = (localStorage.getItem("rh_theme") || "dark") as Theme;
    setThemeState(savedTheme);
    setColorScheme(savedTheme);
    applyThemeToDOM(savedTheme);
    setMounted(true);
  }, [setColorScheme]);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    applyThemeToDOM(theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeState(newTheme);
    setColorScheme(newTheme);
    localStorage.setItem("rh_theme", newTheme);
    applyThemeToDOM(newTheme);
  }, [theme, setColorScheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      setColorScheme(newTheme);
      localStorage.setItem("rh_theme", newTheme);
      applyThemeToDOM(newTheme);
    },
    [setColorScheme]
  );

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
