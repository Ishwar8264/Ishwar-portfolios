"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Moon,
  Palette,
  Sun,
  Sunset,
  Trees,
  Waves,
} from "lucide-react";

import { themeOptions, type AppTheme } from "@/content/themes";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/theme-store";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeSwitcherProps = {
  className?: string;
  fullWidth?: boolean;
};

const themeIcons: Record<AppTheme, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
  sunset: Sunset,
  ocean: Waves,
  forest: Trees,
};

const themeLabelByValue = Object.fromEntries(
  themeOptions.map((option) => [option.value, option.label]),
) as Record<AppTheme, string>;

export default function ThemeSwitcher({
  className,
  fullWidth = false,
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const ActiveThemeIcon = themeIcons[theme];

  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "h-9 rounded-full border-border bg-background/90 px-3 text-foreground shadow-sm",
            fullWidth ? "w-full justify-between" : "justify-center",
          )}
          aria-label="Change theme"
        >
          <span className="flex items-center gap-2">
            <Palette className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">Theme</span>
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <ActiveThemeIcon className="size-3" />
            {themeLabelByValue[theme]}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={8}
          align={fullWidth ? "start" : "end"}
          className={cn("min-w-0")}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => {
              setTheme(value as AppTheme);
              setOpen(false);
            }}
          >
            {themeOptions.map((option) => {
              const OptionIcon = themeIcons[option.value];

              return (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="py-1.5"
                >
                  <span className="inline-flex items-center gap-2">
                    <OptionIcon className="size-3.5 text-muted-foreground" />
                    {option.label}
                  </span>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
