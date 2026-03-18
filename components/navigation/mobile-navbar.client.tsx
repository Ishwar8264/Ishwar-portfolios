"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import ThemeSwitcher from "@/components/theme/theme-switcher.client";
import { cn } from "@/lib/utils";
import type { NavbarClassNames, NavbarConfig } from "@/types/navigation";

type MobileNavbarProps = {
  config: NavbarConfig;
  classNames?: NavbarClassNames;
};

function NavAnchor({
  href,
  label,
  external,
  className,
  onClick,
}: {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      className={className}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

export default function MobileNavbar({ config, classNames }: MobileNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        size="icon-sm"
        variant="outline"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>

      <button
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-x-4 top-[4.7rem] z-50 rounded-2xl border border-border bg-card p-3 shadow-xl transition-all",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
          classNames?.mobilePanel,
        )}
      >
        <nav className="grid gap-1">
          {config.links.map((link) => (
            <NavAnchor
              key={link.href}
              href={link.href}
              label={link.label}
              external={link.external}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            />
          ))}
        </nav>

        <div className="mt-3 border-t border-border pt-3">
          <ThemeSwitcher fullWidth />
        </div>

        {config.cta ? (
          <NavAnchor
            href={config.cta.href}
            label={config.cta.label}
            external={config.cta.external}
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-3 w-full justify-center",
            )}
          />
        ) : null}
      </div>
    </div>
  );
}
