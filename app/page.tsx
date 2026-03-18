import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <section
        id="home"
        className="mx-auto flex min-h-[85vh] w-[min(1200px,95%)] flex-col items-start justify-center gap-6"
      >
        <p className="rounded-full border border-border px-4 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Frontend Engineer
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Building fast and expressive interfaces for real products.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Server-first Next.js portfolio starter with flexible, customizable
          navigation across desktop, tablet, and mobile.
        </p>
        <Button size="lg">View Projects</Button>
      </section>

      <section
        id="about"
        className="mx-auto w-[min(1200px,95%)] border-t border-border py-24"
      >
        <h2 className="text-3xl font-semibold tracking-tight">About</h2>
      </section>

      <section
        id="skills"
        className="mx-auto w-[min(1200px,95%)] border-t border-border py-24"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
      </section>

      <section
        id="projects"
        className="mx-auto w-[min(1200px,95%)] border-t border-border py-24"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
      </section>

      <section
        id="contact"
        className="mx-auto w-[min(1200px,95%)] border-t border-border py-24"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
      </section>
    </main>
  );
}
