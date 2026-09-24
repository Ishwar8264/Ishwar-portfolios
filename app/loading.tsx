"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-border py-20">
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading portfolio…</p>
      </div>
    </div>
  );
}
