"use client";

import { useEffect } from "react";

import { applyThemeToDocument } from "@/lib/theme";
import { useThemeStore } from "@/stores/theme-store";

export default function ThemeProvider() {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);
  const setHydrated = useThemeStore((state) => state.setHydrated);

  useEffect(() => {
    if (useThemeStore.persist.hasHydrated()) {
      setHydrated(true);
    }
  }, [setHydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    applyThemeToDocument(theme);

    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyThemeToDocument("system");

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [hydrated, theme]);

  return null;
}
