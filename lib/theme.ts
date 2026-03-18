import {
  darkThemeValues,
  defaultTheme,
  themeOptions,
  type AppTheme,
  type ResolvedTheme,
} from "@/content/themes";

const allowedThemes = new Set<AppTheme>(themeOptions.map((theme) => theme.value));
const darkThemes = new Set<ResolvedTheme>(darkThemeValues);

export function isAppTheme(value: string): value is AppTheme {
  return allowedThemes.has(value as AppTheme);
}

export function resolveTheme(value?: string | null): AppTheme {
  if (!value) {
    return defaultTheme;
  }

  return isAppTheme(value) ? value : defaultTheme;
}

export function getSystemTheme(): Extract<ResolvedTheme, "light" | "dark"> {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return "light";
}

export function getResolvedTheme(theme: AppTheme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }

  return theme;
}

export function isDarkTheme(theme: AppTheme): boolean {
  return darkThemes.has(getResolvedTheme(theme));
}

export function applyThemeToDocument(theme: AppTheme): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  const resolvedTheme = getResolvedTheme(theme);

  root.setAttribute("data-theme-preference", theme);
  root.setAttribute("data-theme", resolvedTheme);
  root.classList.toggle("dark", darkThemes.has(resolvedTheme));
}
