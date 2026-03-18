import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Portfolio Setup Ready
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Ishwar Portfolio Workspace
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Next.js + shadcn/ui + Radix successfully configured. Start building your
          sections now.
        </p>
        <Button size="lg">Start Building</Button>
      </section>
    </main>
  );
}
