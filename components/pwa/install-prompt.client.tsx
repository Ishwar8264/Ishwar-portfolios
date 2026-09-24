"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const MIN_VISITS_BEFORE_PROMPT = 2;
const VISIT_COUNT_KEY = "portfolio-pwa-visit-count";
const SESSION_VISIT_KEY = "portfolio-pwa-session-visit";
const DISMISSED_UNTIL_KEY = "portfolio-pwa-dismissed-until";
const DISMISS_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

interface BeforeInstallPromptEvent extends Event {
  platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

function isStandaloneMode() {
  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

function isIosBrowser() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);
  const isIpadOs = userAgent.includes("macintosh") && "ontouchend" in document;

  return isAppleMobile || isIpadOs;
}

function readStoredNumber(key: string) {
  const value = window.localStorage.getItem(key);
  const parsed = Number.parseInt(value ?? "0", 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

export default function InstallPrompt() {
  const [visitCount, setVisitCount] = useState(0);
  const [dismissed, setDismissed] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [iosBrowser, setIosBrowser] = useState(false);
  const [ready, setReady] = useState(false);
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone = isStandaloneMode();
    const dismissedUntil = readStoredNumber(DISMISSED_UNTIL_KEY);

    setInstalled(standalone);
    setIosBrowser(isIosBrowser());
    setDismissed(dismissedUntil > Date.now());

    let nextVisitCount = readStoredNumber(VISIT_COUNT_KEY);
    if (!window.sessionStorage.getItem(SESSION_VISIT_KEY)) {
      nextVisitCount += 1;
      window.localStorage.setItem(VISIT_COUNT_KEY, String(nextVisitCount));
      window.sessionStorage.setItem(SESSION_VISIT_KEY, "true");
    }

    setVisitCount(nextVisitCount);
    setReady(true);

    const handleBeforeInstallPrompt = (event: Event) => {
      const deferredPrompt = event as BeforeInstallPromptEvent;
      deferredPrompt.preventDefault();
      setInstallEvent(deferredPrompt);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      window.localStorage.removeItem(DISMISSED_UNTIL_KEY);
    };

    const displayModeQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return;
      }

      setInstalled(true);
      setInstallEvent(null);
      window.localStorage.removeItem(DISMISSED_UNTIL_KEY);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    if (displayModeQuery.addEventListener) {
      displayModeQuery.addEventListener("change", handleDisplayModeChange);
    } else {
      displayModeQuery.addListener(handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);

      if (displayModeQuery.removeEventListener) {
        displayModeQuery.removeEventListener("change", handleDisplayModeChange);
      } else {
        displayModeQuery.removeListener(handleDisplayModeChange);
      }
    };
  }, []);

  const dismissPrompt = () => {
    const dismissedUntil = Date.now() + DISMISS_WINDOW_MS;
    window.localStorage.setItem(DISMISSED_UNTIL_KEY, String(dismissedUntil));
    setDismissed(true);
  };

  const handleInstall = async () => {
    if (!installEvent) {
      return;
    }

    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;

      if (choice.outcome === "accepted") {
        setInstalled(true);
        setDismissed(false);
        window.localStorage.removeItem(DISMISSED_UNTIL_KEY);
      } else {
        dismissPrompt();
      }
    } catch {
      dismissPrompt();
    } finally {
      setInstallEvent(null);
    }
  };

  const shouldShowPrompt =
    ready &&
    !dismissed &&
    !installed &&
    visitCount >= MIN_VISITS_BEFORE_PROMPT &&
    (Boolean(installEvent) || iosBrowser);

  if (!shouldShowPrompt) {
    return null;
  }

  return (
    <aside className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center">
      <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-border/80 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Install this portfolio
            </p>
            <p className="text-sm text-muted-foreground">
              You have visited more than once. Install it for faster launches,
              full-screen browsing, and offline access.
            </p>
          </div>
          <Button
            size="icon-xs"
            variant="ghost"
            aria-label="Dismiss install prompt"
            onClick={dismissPrompt}
          >
            <X />
          </Button>
        </div>

        {iosBrowser && !installEvent ? (
          <div className="mt-3 flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/60 px-3 py-2.5 text-sm text-muted-foreground">
            <Share2 className="mt-0.5 size-4 shrink-0 text-foreground" />
            <p>
              Open your browser share menu, then choose{" "}
              <span className="font-medium text-foreground">
                Add to Home Screen
              </span>
              .
            </p>
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-2">
          {installEvent ? (
            <Button
              className="flex-1"
              size="sm"
              onClick={() => void handleInstall()}
            >
              <ArrowDownToLine />
              Install App
            </Button>
          ) : null}
          <Button
            className={installEvent ? "flex-1" : "w-full"}
            variant="outline"
            size="sm"
            onClick={dismissPrompt}
          >
            Not now
          </Button>
        </div>
      </div>
    </aside>
  );
}
