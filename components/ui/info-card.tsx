import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "p-3 sm:p-4",
    label: "text-[10px] tracking-[0.12em]",
    value: "mt-1.5 text-sm",
  },
  md: {
    container: "p-4 sm:p-5",
    label: "text-xs tracking-[0.14em]",
    value: "mt-2 text-base",
  },
  lg: {
    container: "p-5 sm:p-6",
    label: "text-xs tracking-[0.16em]",
    value: "mt-2.5 text-lg",
  },
} as const;

export const infoCardBrandPalettes = {
  brandWarm: {
    from: "rgba(244, 63, 94, 0.3)",
    via: "rgba(251, 146, 60, 0.24)",
    to: "rgba(250, 204, 21, 0.26)",
    border: "rgba(253, 164, 175, 0.45)",
    shadow: "rgba(251, 113, 133, 0.82)",
    text: "var(--foreground)",
    label: "color-mix(in oklch, var(--muted-foreground) 70%, var(--foreground))",
  },
  brandCool: {
    from: "rgba(14, 165, 233, 0.28)",
    via: "rgba(34, 211, 238, 0.24)",
    to: "rgba(52, 211, 153, 0.26)",
    border: "rgba(125, 211, 252, 0.45)",
    shadow: "rgba(56, 189, 248, 0.82)",
    text: "var(--foreground)",
    label: "color-mix(in oklch, var(--muted-foreground) 70%, var(--foreground))",
  },
  brandPrimary: {
    from: "color-mix(in oklch, var(--primary) 28%, transparent)",
    via: "color-mix(in oklch, var(--chart-2) 26%, transparent)",
    to: "color-mix(in oklch, var(--accent) 28%, transparent)",
    border: "color-mix(in oklch, var(--primary) 45%, var(--border))",
    shadow: "color-mix(in oklch, var(--primary) 55%, transparent)",
    text: "var(--foreground)",
    label: "color-mix(in oklch, var(--muted-foreground) 68%, var(--foreground))",
  },
} as const;

export type InfoCardPalette = keyof typeof infoCardBrandPalettes;
export type InfoCardSize = keyof typeof sizeClasses;

export type InfoCardColors = {
  from: string;
  via: string;
  to: string;
  border: string;
  shadow: string;
  text: string;
  label: string;
};

export type InfoCardProps = {
  label: ReactNode;
  value: ReactNode;
  size?: InfoCardSize;
  palette?: InfoCardPalette;
  colors?: Partial<InfoCardColors>;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export default function InfoCard({
  label,
  value,
  size = "md",
  palette = "brandPrimary",
  colors,
  className,
  labelClassName,
  valueClassName,
}: InfoCardProps) {
  const sizeClass = sizeClasses[size];
  const baseColors = infoCardBrandPalettes[palette];
  const resolvedColors = { ...baseColors, ...colors };

  const cardStyle: CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${resolvedColors.from}, ${resolvedColors.via}, ${resolvedColors.to})`,
    borderColor: resolvedColors.border,
    boxShadow: `0 16px 30px -22px ${resolvedColors.shadow}`,
    color: resolvedColors.text,
  };

  return (
    <article
      className={cn(
        "h-full rounded-2xl border backdrop-blur-sm",
        sizeClass.container,
        className,
      )}
      style={cardStyle}
    >
      <p
        className={cn(
          "uppercase text-muted-foreground/95",
          sizeClass.label,
          labelClassName,
        )}
        style={{ color: resolvedColors.label }}
      >
        {label}
      </p>
      <p className={cn("font-medium leading-snug", sizeClass.value, valueClassName)}>
        {value}
      </p>
    </article>
  );
}
