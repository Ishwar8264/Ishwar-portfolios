import HomeSection from "@/components/home";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <HomeSection />

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
