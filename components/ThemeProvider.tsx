"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or default to dark
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
    }
  };

  // Avoid hydration mismatch by rendering children immediately;
  // the theme class will be applied after mount.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* prevent flash on initial render */}
      <div style={{ visibility: mounted ? "visible" : "visible" }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback to avoid crashes when accessed outside provider during SSR
    return { theme: "dark" as Theme, toggleTheme: () => {} };
  }
  return ctx;
}
