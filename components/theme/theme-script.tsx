import {
  darkThemeValues,
  defaultTheme,
  themeOptions,
  themeStorageKey,
} from "@/content/themes";

const allowedThemeValues = themeOptions.map((theme) => theme.value);

const script = `
  (() => {
    try {
      const storageKey = ${JSON.stringify(themeStorageKey)};
      const allowedThemes = ${JSON.stringify(allowedThemeValues)};
      const darkThemes = ${JSON.stringify(darkThemeValues)};
      const fallbackTheme = ${JSON.stringify(defaultTheme)};
      const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      const persisted = localStorage.getItem(storageKey);
      let nextTheme = fallbackTheme;

      if (persisted) {
        try {
          const parsed = JSON.parse(persisted);
          const storedTheme = parsed?.state?.theme;
          if (allowedThemes.includes(storedTheme)) {
            nextTheme = storedTheme;
          }
        } catch {
          if (allowedThemes.includes(persisted)) {
            nextTheme = persisted;
          }
        }
      }

      const resolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;
      const root = document.documentElement;
      root.setAttribute("data-theme-preference", nextTheme);
      root.setAttribute("data-theme", resolvedTheme);
      root.classList.toggle("dark", darkThemes.includes(resolvedTheme));
    } catch {
      // no-op
    }
  })();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
