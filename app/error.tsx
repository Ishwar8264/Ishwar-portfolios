"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Could be wired to an error reporting service later.
    console.error("[portfolio:error-boundary]", error);
  }, [error]);

  return (
    <div className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden border-t border-border py-20">
      <div className="relative z-10 mx-auto w-[min(720px,95%)] rounded-3xl border border-border/70 bg-card/85 p-8 text-center backdrop-blur">
        <div className="mx-auto inline-flex size-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500">
          <AlertCircle className="size-6" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Something went wrong
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          A section of the portfolio failed to render. This is usually a
          transient issue — please try reloading. If the problem persists,
          reach out via the contact section.
        </p>
        <pre className="mt-4 max-h-32 overflow-auto rounded-2xl border border-border/60 bg-background/70 p-3 text-left text-[11px] text-muted-foreground">
          {error.message || "Unknown error"}
        </pre>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-border/70 bg-background/80 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <RefreshCw className="size-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
