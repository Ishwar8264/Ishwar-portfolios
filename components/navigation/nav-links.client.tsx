"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { NavigationLink } from "@/types/navigation";

type NavLinksProps = {
  links: NavigationLink[];
  itemClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
};

type SectionEntry = {
  href: string;
  element: HTMLElement;
};

function isHashLink(link: NavigationLink) {
  return link.href.startsWith("#") && !link.external && !link.download;
}

function normalizeHash(value: string) {
  if (!value) {
    return "";
  }

  return value.startsWith("#") ? value : `#${value}`;
}

export default function NavLinks({
  links,
  itemClassName,
  activeClassName,
  onNavigate,
}: NavLinksProps) {
  const hashLinks = useMemo(() => links.filter(isHashLink), [links]);
  const defaultActiveHref = hashLinks[0]?.href ?? "";
  const [activeHref, setActiveHref] = useState(defaultActiveHref);

  useEffect(() => {
    if (!hashLinks.length) {
      return;
    }

    const hrefSet = new Set(hashLinks.map((link) => link.href));

    const getSections = (): SectionEntry[] =>
      hashLinks
        .map((link) => ({
          href: link.href,
          element: document.getElementById(link.href.slice(1)),
        }))
        .filter((entry): entry is SectionEntry => entry.element !== null);

    const getActiveByScroll = () => {
      const sections = getSections();
      if (!sections.length) {
        return defaultActiveHref;
      }

      const triggerLine = window.innerHeight * 0.45;
      let currentHref = sections[0].href;

      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top;
        if (top <= triggerLine) {
          currentHref = section.href;
          continue;
        }

        break;
      }

      return currentHref;
    };

    const syncActiveState = () => {
      const next = getActiveByScroll();
      setActiveHref((prev) => (prev === next ? prev : next));
    };

    const syncHashState = () => {
      const currentHash = normalizeHash(window.location.hash);
      if (currentHash && hrefSet.has(currentHash)) {
        setActiveHref((prev) => (prev === currentHash ? prev : currentHash));
      } else {
        syncActiveState();
      }
    };

    syncActiveState();

    window.addEventListener("hashchange", syncHashState);
    window.addEventListener("scroll", syncActiveState, { passive: true });
    window.addEventListener("resize", syncActiveState);

    return () => {
      window.removeEventListener("hashchange", syncHashState);
      window.removeEventListener("scroll", syncActiveState);
      window.removeEventListener("resize", syncActiveState);
    };
  }, [defaultActiveHref, hashLinks]);

  return (
    <>
      {links.map((link) => {
        const hashLink = isHashLink(link);
        const active = hashLink && link.href === activeHref;

        return (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer noopener" : undefined}
            download={link.download}
            className={cn(itemClassName, active && activeClassName)}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              if (hashLink) {
                setActiveHref(link.href);
              }
              onNavigate?.();
            }}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}
