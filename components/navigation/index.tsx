import Image from "next/image";

import { cn } from "@/lib/utils";
import type { NavbarClassNames, NavbarConfig } from "@/types/navigation";
import ThemeSwitcher from "@/components/theme/theme-switcher.client";

import MobileNavbar from "./mobile-navbar.client";
import NavLinks from "./nav-links.client";

type NavbarProps = {
  config: NavbarConfig;
  classNames?: NavbarClassNames;
};

function NavAnchor({
  href,
  label,
  external,
  download,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      download={download}
      className={className}
    >
      {label}
    </a>
  );
}

export default function Navbar({ config, classNames }: NavbarProps) {
  const baseLinkClasses =
    "portfolio-nav-link rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all";
  const ctaClasses =
    "portfolio-nav-cta inline-flex h-8 items-center justify-center rounded-full px-4 text-[0.78rem] font-semibold tracking-[0.02em] transition-all";

  return (
    <header
      className={cn(
        "portfolio-nav-root fixed inset-x-0 top-0 z-40",
        classNames?.root,
      )}
    >
      <div
        className={cn(
          "portfolio-nav-shell mx-auto mt-3 flex w-[min(1200px,95%)] items-center rounded-2xl border px-3 backdrop-blur-md md:px-4",
          classNames?.container,
        )}
      >
        <div className="flex h-14 w-full items-center justify-between gap-3 md:h-16">
          <a
            href={config.brand.href}
            className={cn(
              "portfolio-nav-brand shrink-0 rounded-full px-2.5 py-1.5 text-sm font-semibold tracking-tight",
              classNames?.brand,
            )}
          >
            <span className="flex items-center gap-2">
              <Image
                src="/images/profile/ishwar-logo.png"
                alt="Ishwar logo"
                width={24}
                height={24}
                className="size-6 rounded-md object-contain"
              />
              <span className="hidden sm:inline">{config.brand.name}</span>
              <span className="sm:hidden">
                {config.brand.shortName ?? config.brand.name}
              </span>
            </span>
          </a>

          <nav
            className={cn(
              "portfolio-nav-menu portfolio-nav-menu-tablet hidden items-center gap-1 rounded-full px-1.5 py-1 md:flex lg:hidden",
              classNames?.tabletMenu,
            )}
            aria-label="Primary"
          >
            <NavLinks
              links={config.links}
              itemClassName={cn(baseLinkClasses, "px-2.5 py-1.5 text-xs")}
              activeClassName="portfolio-nav-link-active"
            />
          </nav>

          <nav
            className={cn(
              "portfolio-nav-menu portfolio-nav-menu-desktop hidden items-center gap-1 rounded-full px-2 py-1 lg:flex",
              classNames?.desktopMenu,
            )}
            aria-label="Primary"
          >
            <NavLinks
              links={config.links}
              itemClassName={cn(baseLinkClasses, classNames?.link)}
              activeClassName="portfolio-nav-link-active"
            />
          </nav>

          <div className="portfolio-nav-actions flex items-center gap-2">
            <ThemeSwitcher className="portfolio-nav-theme hidden md:block" />
            {config.cta ? (
              <NavAnchor
                href={config.cta.href}
                label={config.cta.label}
                external={config.cta.external}
                download={config.cta.download}
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
