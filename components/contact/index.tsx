import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  BriefcaseBusiness,
  FileDown,
} from "lucide-react";

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

function buildWhatsAppUrl(number: string, message?: string) {
  const cleaned = number.replace(/[^\d]/g, "");
  const base = `https://wa.me/${cleaned}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

function buildMailtoUrl(email: string, subject?: string) {
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const whatsappUrl = contact.whatsapp
    ? buildWhatsAppUrl(
        contact.whatsapp,
        "Hi Ishwar, I saw your portfolio and would like to discuss a full-time frontend engineering opportunity.",
      )
    : null;

  const mailtoUrl = buildMailtoUrl(
    contact.email,
    "Frontend Engineering Job Opportunity — from your portfolio",
  );

  const directChannels = [
    {
      label: "Email",
      value: contact.email,
      href: mailtoUrl,
      icon: Mail,
      external: false,
      accent: "text-sky-500",
    },
    {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
      icon: Phone,
      external: false,
      accent: "text-fuchsia-500",
    },
    {
      label: "LinkedIn",
      value: "ishwarsahani",
      href: contact.linkedin,
      icon: Linkedin,
      external: true,
      accent: "text-sky-600",
    },
    {
      label: "GitHub",
      value: "Ishwar8264",
      href: contact.github,
      icon: Github,
      external: true,
      accent: "text-emerald-500",
    },
  ] as const;

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="cyan" pattern="dot" />
      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          {/* Primary CTA card — WhatsApp + Email focus */}
          <BlurFade inView delay={0.05}>
            <ModernGlowCard
              className="relative p-6 sm:p-8"
              accentFrom="#22d3ee"
              accentTo="#a855f7"
              glowSize={280}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                  Contact
                </AnimatedShinyText>
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s discuss frontend engineering opportunities.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Open to full-time frontend roles working with React, Next.js, and
                TypeScript. Reach out to discuss your team, the role, and how
                my product experience can contribute.
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {whatsappUrl ? (
                  <ShimmerButton
                    as="a"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Chat with Ishwar Sahani on WhatsApp"
                    className="h-12 px-4 text-sm font-semibold"
                    background="linear-gradient(115deg, rgb(8,89,63), rgb(34,197,94))"
                    shimmerColor="#bbf7d0"
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="size-4" />
                      Chat on WhatsApp
                    </span>
                  </ShimmerButton>
                ) : null}
                <ShimmerButton
                  as="a"
                  href={mailtoUrl}
                  aria-label="Email Ishwar Sahani"
                  className="h-12 px-4 text-sm font-semibold"
                  background="linear-gradient(115deg, rgb(15,23,42), rgb(30,64,175))"
                  shimmerColor="#93c5fd"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="size-4" />
                    Send an Email
                  </span>
                </ShimmerButton>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
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
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="size-3.5" />
                    LinkedIn
                  </span>
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open Ishwar Sahani GitHub profile"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(31,41,55,0.92))"
                  shimmerColor="#94a3b8"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="size-3.5" />
                    GitHub
                  </span>
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={resumeHref}
                  download
                  aria-label="Download Ishwar Sahani resume PDF"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(30,41,59,0.94), rgba(14,116,144,0.9))"
                  shimmerColor="#67e8f9"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileDown className="size-3.5" />
                    Resume
                  </span>
                </ShimmerButton>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/65 bg-background/60 px-3 py-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <BriefcaseBusiness className="size-3.5 text-emerald-500" />
                    Opportunities
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    Full-time roles
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Frontend engineering
                  </p>
                </div>
                <div className="rounded-2xl border border-border/65 bg-background/60 px-3 py-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <MapPin className="size-3.5 text-sky-500" />
                    Based In
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    Gurugram, India
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    IST (UTC+05:30)
                  </p>
                </div>
                <div className="rounded-2xl border border-border/65 bg-background/60 px-3 py-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <MessageCircle className="size-3.5 text-fuchsia-500" />
                    Recruiter Contact
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    Email or LinkedIn
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    For role discussions
                  </p>
                </div>
              </div>
            </ModernGlowCard>
          </BlurFade>

          {/* Direct reach card */}
          <BlurFade inView delay={0.12}>
            <ModernGlowCard
              className="p-6 sm:p-7"
              accentFrom="#34d399"
              accentTo="#3b82f6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Direct Reach
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Pick the channel that works for you.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact me directly about frontend roles, interviews, and
                engineering teams. My resume is available above.
              </p>

              <div className="mt-5 space-y-2.5">
                {directChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer noopener" : undefined}
                      className="group/channel flex items-center justify-between gap-3 rounded-2xl border border-border/65 bg-background/60 px-3.5 py-3 transition-all hover:border-border hover:bg-background/85 hover:shadow-sm"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`inline-flex size-9 items-center justify-center rounded-xl bg-background/85 ${channel.accent}`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {channel.label}
                          </p>
                          <p className="truncate text-sm font-medium text-foreground">
                            {channel.value}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/60 transition-all group-hover/channel:text-primary" />
                    </a>
                  );
                })}
              </div>

              {whatsappUrl ? (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                    <MessageCircle className="size-3.5" />
                    Job inquiries
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Share the company name, job description, tech stack, and work
                    location so we can discuss whether the role is a good fit.
                  </p>
                </div>
              ) : null}
            </ModernGlowCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
