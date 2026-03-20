import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import SectionBackground from "@/components/ui/section-background.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { ContactData } from "@/types/portfolio";
import { resumeHref } from "@/content/profile";

type ContactSectionProps = {
  contact: ContactData;
};

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="cyan" pattern="interactive" />
      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <BlurFade inView delay={0.05}>
            <MagicCard
              mode="orb"
              glowFrom="#22d3ee"
              glowTo="#a855f7"
              glowOpacity={0.24}
              className="relative rounded-3xl border border-border/75 bg-card/70 p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                  Contact
                </AnimatedShinyText>
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something sharp and useful.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Open for frontend engineering roles, freelance builds, and
                product-focused collaboration.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <ShimmerButton
                  as="a"
                  href={`mailto:${contact.email}`}
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgb(17,24,39), rgb(30,64,175))"
                  shimmerColor="#93c5fd"
                >
                  Email Me
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(51,65,85,0.92))"
                  shimmerColor="#cbd5e1"
                >
                  LinkedIn
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(31,41,55,0.92))"
                  shimmerColor="#94a3b8"
                >
                  GitHub
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={resumeHref}
                  download
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(30,41,59,0.94), rgba(14,116,144,0.9))"
                  shimmerColor="#67e8f9"
                >
                  Download Resume
                </ShimmerButton>
              </div>
            </MagicCard>
          </BlurFade>

          <BlurFade inView delay={0.12}>
            <MagicCard
              className="rounded-3xl border border-border/75 bg-card/70 p-6"
              gradientFrom="#34d399"
              gradientTo="#3b82f6"
              gradientOpacity={0.16}
            >
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
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
