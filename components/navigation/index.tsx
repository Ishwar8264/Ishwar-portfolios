import { cn } from "@/lib/utils";
import type { NavbarClassNames, NavbarConfig } from "@/types/navigation";

import MobileNavbar from "./mobile-navbar.client";

type NavbarProps = {
  config: NavbarConfig;
  classNames?: NavbarClassNames;
};

function NavAnchor({
  href,
  label,
  external,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={className}
    >
      {label}
    </a>
  );
}

export default function Navbar({ config, classNames }: NavbarProps) {
  const baseLinkClasses =
    "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
  const ctaClasses =
    "inline-flex h-7 items-center justify-center rounded-full bg-primary px-4 text-[0.8rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40", classNames?.root)}>
      <div
        className={cn(
          "mx-auto mt-3 flex w-[min(1200px,95%)] items-center rounded-2xl border border-border/80 bg-background/85 px-3 shadow-sm backdrop-blur-md md:px-4",
          classNames?.container,
        )}
      >
        <div className="flex h-14 w-full items-center justify-between gap-3 md:h-16">
          <a
            href={config.brand.href}
            className={cn(
              "shrink-0 rounded-full border border-border px-3 py-1.5 text-sm font-semibold tracking-tight",
              classNames?.brand,
            )}
          >
            <span className="hidden sm:inline">{config.brand.name}</span>
            <span className="sm:hidden">
              {config.brand.shortName ?? config.brand.name}
            </span>
          </a>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border border-border bg-muted/30 px-1.5 py-1 md:flex lg:hidden",
              classNames?.tabletMenu,
            )}
            aria-label="Primary"
          >
            {config.links.map((link) => (
              <NavAnchor
                key={`tablet-${link.href}`}
                href={link.href}
                label={link.label}
                external={link.external}
                className={cn(baseLinkClasses, "px-2 py-1.5 text-xs")}
              />
            ))}
          </nav>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border border-border bg-muted/30 px-2 py-1 lg:flex",
              classNames?.desktopMenu,
            )}
            aria-label="Primary"
          >
            {config.links.map((link) => (
              <NavAnchor
                key={`desktop-${link.href}`}
                href={link.href}
                label={link.label}
                external={link.external}
                className={cn(baseLinkClasses, classNames?.link)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {config.cta ? (
              <NavAnchor
                href={config.cta.href}
                label={config.cta.label}
                external={config.cta.external}
                className={cn(ctaClasses, "hidden md:inline-flex")}
              />
            ) : null}
            <MobileNavbar config={config} classNames={classNames} />
          </div>
        </div>
      </div>
    </header>
  );
}
