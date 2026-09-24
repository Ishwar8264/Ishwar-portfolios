export const themeStorageKey = "ishwar-theme";

export const themeOptions = [
  { value: "system", label: "System", isDark: false },
  { value: "light", label: "Light", isDark: false },
  { value: "dark", label: "Dark", isDark: true },
  { value: "sunset", label: "Sunset", isDark: true },
  { value: "ocean", label: "Ocean", isDark: false },
  { value: "forest", label: "Forest", isDark: true },
] as const;

export type AppTheme = (typeof themeOptions)[number]["value"];
export type ResolvedTheme = Exclude<AppTheme, "system">;

export const defaultTheme: AppTheme = "system";

export const darkThemeValues: ResolvedTheme[] = themeOptions
  .filter(
    (theme): theme is (typeof themeOptions)[number] & { value: ResolvedTheme } =>
      theme.value !== "system" && theme.isDark,
  )
  .map((theme) => theme.value);
