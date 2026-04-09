import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
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
      <SectionBackground tone="cyan" pattern="dot" />
      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <BlurFade inView delay={0.05}>
            <ModernGlowCard
              className="relative p-6"
              accentFrom="#22d3ee"
              accentTo="#a855f7"
              glowSize={260}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                  Contact
                </AnimatedShinyText>
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Need a Frontend Developer in Gurugram, India?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Available for freelance frontend development, React.js and
                Next.js projects, responsive website builds, and API-integrated
                web interfaces.
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
                  aria-label="Open Ishwar Sahani LinkedIn profile"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(51,65,85,0.92))"
                  shimmerColor="#cbd5e1"
                >
                  Ishwar Sahani LinkedIn
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
            </ModernGlowCard>
          </BlurFade>

          <BlurFade inView delay={0.12}>
            <ModernGlowCard
              className="p-6"
              accentFrom="#34d399"
              accentTo="#3b82f6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Direct Reach
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    LinkedIn
                  </p>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 block text-sm font-medium hover:underline"
                  >
                    Ishwar Sahani on LinkedIn
                  </a>
                </div>
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
            </ModernGlowCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
