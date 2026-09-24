"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Award,
  Wrench,
  Sparkles,
  FolderGit2,
  Github,
  Mail,
  FileDown,
  MessageCircle,
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { navbarConfig } from "@/content/navigation";
import { contactData, resumeHref } from "@/content/profile";

type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Quick Links" | "Connect";
  href: string;
  external?: boolean;
  download?: boolean;
  icon: typeof Home;
  keywords?: string[];
};

const ALL_ITEMS: PaletteItem[] = [
  {
    id: "nav-home",
    label: "Home",
    hint: "Hero section",
    group: "Navigate",
    href: "#home",
    icon: Home,
    keywords: ["top", "hero", "start", "intro"],
  },
  {
    id: "nav-about",
    label: "About",
    hint: "Profile & GitHub live stats",
    group: "Navigate",
    href: "#about",
    icon: User,
    keywords: ["bio", "profile", "story", "who"],
  },
  {
    id: "nav-experience",
    label: "Experience",
    hint: "Work timeline & client work",
    group: "Navigate",
    href: "#experience",
    icon: BriefcaseBusiness,
    keywords: ["work", "job", "freelance", "career"],
  },
  {
    id: "nav-certifications",
    label: "Certifications",
    hint: "Verified credentials",
    group: "Navigate",
    href: "#certifications",
    icon: Award,
    keywords: ["certs", "credentials", "courses"],
  },
  {
    id: "nav-skills",
    label: "Skills",
    hint: "Tech stack & tools",
    group: "Navigate",
    href: "#skills",
    icon: Wrench,
    keywords: ["tech", "stack", "tools", "languages"],
  },
  {
    id: "nav-services",
    label: "Services",
    hint: "What I can help with",
    group: "Navigate",
    href: "#services",
    icon: Sparkles,
    keywords: ["offer", "help", "freelance", "work"],
  },
  {
    id: "nav-projects",
    label: "Projects",
    hint: "Featured frontend builds",
    group: "Navigate",
    href: "#projects",
    icon: FolderGit2,
    keywords: ["work", "portfolio", "apps", "sites"],
  },
  {
    id: "nav-github",
    label: "GitHub Activity",
    hint: "Live coding stats & repos",
    group: "Navigate",
    href: "#github",
    icon: Github,
    keywords: ["code", "repos", "commits", "stats"],
  },
  {
    id: "nav-contact",
    label: "Contact",
    hint: "Start a conversation",
    group: "Navigate",
    href: "#contact",
    icon: Mail,
    keywords: ["email", "whatsapp", "hire", "reach"],
  },
  {
    id: "quick-resume",
    label: "Download Resume",
    hint: "PDF · 1 page",
    group: "Quick Links",
    href: resumeHref,
    download: true,
    icon: FileDown,
    keywords: ["cv", "pdf", "download"],
  },
  {
    id: "quick-github",
    label: "Open GitHub Profile",
    hint: "External · github.com",
    group: "Quick Links",
    href: contactData.github,
    external: true,
    icon: Github,
    keywords: ["repos", "code", "external"],
  },
  {
    id: "quick-linkedin",
    label: "Open LinkedIn Profile",
    hint: "External · linkedin.com",
    group: "Quick Links",
    href: contactData.linkedin,
    external: true,
    icon: User,
    keywords: ["professional", "network"],
  },
  {
    id: "connect-email",
    label: "Email Ishwar",
    hint: contactData.email,
    group: "Connect",
    href: `mailto:${contactData.email}?subject=Frontend%20Project%20Inquiry%20%E2%80%94%20from%20your%20portfolio`,
    icon: Mail,
    keywords: ["contact", "send", "message"],
  },
  ...(contactData.whatsapp
    ? [
        {
          id: "connect-whatsapp",
          label: "Chat on WhatsApp",
          hint: "Fastest reply",
          group: "Connect" as const,
          href: `https://wa.me/${contactData.whatsapp.replace(
            /[^\d]/g,
            "",
          )}?text=${encodeURIComponent(
            "Hi Ishwar, I saw your portfolio and would like to discuss a frontend project.",
          )}`,
          external: true,
          icon: MessageCircle,
          keywords: ["chat", "message", "fast"],
        } satisfies PaletteItem,
      ]
    : []),
];

const GROUP_ORDER: PaletteItem["group"][] = ["Navigate", "Quick Links", "Connect"];

function scrollToSection(href: string) {
  if (!href.startsWith("#")) {
    return false;
  }
  const element = document.getElementById(href.slice(1));
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Global Cmd/Ctrl + K shortcut
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus input + lock scroll when opened; reset query when closed.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    // Clear query on close — safe to do in a microtask to avoid render cascades.
    const t = setTimeout(() => {
      setQuery("");
      setActiveIndex(0);
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter((item) => {
      const haystack = [
        item.label,
        item.hint ?? "",
        item.group,
        ...(item.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  // Clamp activeIndex to the available range — done lazily via Math.min in handlers.
  const safeActiveIndex = Math.min(activeIndex, Math.max(filteredItems.length - 1, 0));

  // Scroll active item into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `[data-cmd-item-index="${safeActiveIndex}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [safeActiveIndex, open]);

  const handleSelect = useCallback((item: PaletteItem) => {
    const isHash = item.href.startsWith("#");
    if (isHash) {
      const ok = scrollToSection(item.href);
      if (!ok) {
        window.location.hash = item.href;
      }
    } else {
      window.open(item.href, "_blank", "noreferrer noopener");
    }
    setOpen(false);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const max = Math.max(filteredItems.length, 1);
      setActiveIndex((i) => (i + 1) % max);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const max = Math.max(filteredItems.length, 1);
      setActiveIndex((i) => (i - 1 + max) % max);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[safeActiveIndex];
      if (item) handleSelect(item);
    }
  };

  // Group filtered items for display
  const grouped = useMemo(() => {
    const map = new Map<PaletteItem["group"], PaletteItem[]>();
    for (const item of filteredItems) {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      items: map.get(g) ?? [],
    }));
  }, [filteredItems]);

  // Flatten with running index for keyboard nav
  const flatIndexMap = useMemo(() => {
    let counter = 0;
    const m = new Map<string, number>();
    for (const group of grouped) {
      for (const item of group.items) {
        m.set(item.id, counter++);
      }
    }
    return m;
  }, [grouped]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="portfolio-cmd-trigger inline-flex h-9 items-center gap-2 rounded-full border border-border/70 bg-background/72 px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-border/60 bg-background/85 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[15vh] sm:pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <div
              className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl"
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 border-b border-border/65 px-4">
                <Search className="size-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search sections, links, contact..."
                  className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                  aria-label="Search command palette"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close command palette"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div
                ref={listRef}
                className="max-h-[55vh] overflow-y-auto p-2"
                role="listbox"
                aria-label="Available actions"
              >
                {grouped.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm font-medium text-foreground">No results found</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Try a different keyword — e.g. &quot;projects&quot;, &quot;resume&quot;, &quot;whatsapp&quot;.
                    </p>
                  </div>
                ) : (
                  grouped.map(({ group, items }) => (
                    <div key={group} className="mb-1.5 last:mb-0">
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {group}
                      </p>
                      {items.map((item) => {
                        const Icon = item.icon;
                        const idx = flatIndexMap.get(item.id) ?? 0;
                        const active = idx === safeActiveIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            data-cmd-item-index={idx}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => handleSelect(item)}
                            role="option"
                            aria-selected={active}
                            className={cn(
                              "group/cmp flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                              active
                                ? "bg-primary/10 text-foreground"
                                : "text-foreground/85 hover:bg-muted/60",
                            )}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className={cn(
                                  "inline-flex size-8 items-center justify-center rounded-lg border transition-colors",
                                  active
                                    ? "border-primary/30 bg-primary/10 text-primary"
                                    : "border-border/60 bg-background/60 text-muted-foreground",
                                )}
                              >
                                <Icon className="size-4" />
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {item.label}
                                </p>
                                {item.hint ? (
                                  <p className="truncate text-[11px] text-muted-foreground">
                                    {item.hint}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            {active ? (
                              <CornerDownLeft className="size-3.5 shrink-0 text-primary/80" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border/65 px-4 py-2.5 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="inline-flex size-5 items-center justify-center rounded border border-border/60 bg-background/80">
                      <ArrowUp className="size-3" />
                    </kbd>
                    <kbd className="inline-flex size-5 items-center justify-center rounded border border-border/60 bg-background/80">
                      <ArrowDown className="size-3" />
                    </kbd>
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="inline-flex h-5 items-center justify-center rounded border border-border/60 bg-background/80 px-1.5 text-[10px] font-medium">
                      ↵
                    </kbd>
                    select
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="inline-flex h-5 items-center justify-center rounded border border-border/60 bg-background/80 px-1.5 text-[10px] font-medium">
                      esc
                    </kbd>
                    close
                  </span>
                </div>
                <span className="hidden sm:inline">{navbarConfig.brand.name}</span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
