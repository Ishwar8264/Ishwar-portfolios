import type { ContactData } from "@/types/portfolio";
import { resumeHref } from "@/content/profile";

type ContactSectionProps = {
  contact: ContactData;
};

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="mx-auto w-[min(1200px,95%)] border-t border-border py-20"
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-border bg-card/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something sharp and useful.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Open for frontend engineering roles, freelance builds, and
            product-focused collaboration.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Email Me
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              GitHub
            </a>
            <a
              href={resumeHref}
              download
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Direct Reach
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Email
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block text-sm font-medium hover:underline"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Phone
              </p>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="mt-1 block text-sm font-medium hover:underline"
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
