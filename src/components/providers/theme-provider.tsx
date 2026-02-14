"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get initial theme from localStorage
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "system";
    try {
      const stored = localStorage.getItem("user-preferences");
      if (stored) {
        const prefs = JSON.parse(stored);
        return (prefs.theme as Theme) || "system";
      }
    } catch {}
    return "system";
  };

  const [theme, setThemeState] = React.useState<Theme>("system");
  const [mounted, setMounted] = React.useState(false);

  // Resolve system theme
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  // Initialize theme on mount
  React.useEffect(() => {
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme to document
  React.useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Listen to system theme changes
  React.useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      const newTheme = getSystemTheme();
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      root.setAttribute("data-theme", newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Listen to localStorage changes (from settings page)
  React.useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = getInitialTheme();
      if (newTheme !== theme) {
        setThemeState(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("theme-change", handleStorageChange as any);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("theme-change", handleStorageChange as any);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    // Update localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("user-preferences");
        const prefs = stored ? JSON.parse(stored) : {};
        prefs.theme = newTheme;
        localStorage.setItem("user-preferences", JSON.stringify(prefs));
        window.dispatchEvent(new Event("theme-change"));
      } catch {}
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
