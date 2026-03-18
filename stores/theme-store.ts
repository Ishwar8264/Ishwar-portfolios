"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { defaultTheme, themeStorageKey, type AppTheme } from "@/content/themes";

type ThemeState = {
  theme: AppTheme;
  hydrated: boolean;
  setTheme: (theme: AppTheme) => void;
  setHydrated: (hydrated: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      hydrated: false,
      setTheme: (theme) => set({ theme }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: themeStorageKey,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
