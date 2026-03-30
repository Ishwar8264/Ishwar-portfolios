"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  ExternalLink,
  FileBadge2,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { CertificationData } from "@/types/portfolio";

type CertificationsSectionProps = {
  certifications: CertificationData[];
};

function isAiFocused(certification: CertificationData) {
  const titleHasAi = certification.title.toLowerCase().includes("ai");
  const skillHasAi =
    certification.skills?.some((skill) => skill.toLowerCase().includes("ai")) ??
    false;

  return titleHasAi || skillHasAi;
}

function getVerificationMessage(certification: CertificationData) {
  if (certification.imageSrc) {
    return "Preview-ready certificate opens in a dialog so the document stays readable on both mobile and desktop.";
  }

  if (certification.credentialUrl) {
    return "No local preview is attached here yet, but the credential link below validates this learning milestone.";
  }

  if (certification.proofUrl) {
    return "No local preview is attached here yet, but the LinkedIn proof below validates this learning milestone.";
  }

  return "Learning milestone recorded without a local preview attachment.";
}

export default function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  const [activePreview, setActivePreview] = useState<CertificationData | null>(
    null,
  );

  const proofBackedCount = certifications.filter((certification) =>
    Boolean(
      certification.credentialId ||
        certification.credentialUrl ||
        certification.proofUrl ||
        certification.imageSrc,
    ),
  ).length;
  const previewCount = certifications.filter((certification) =>
    Boolean(certification.imageSrc),
  ).length;
  const aiTracksCount = certifications.filter(isAiFocused).length;
  const spotlightCertification =
    certifications.find((certification) => certification.imageSrc) ??
    certifications[0];

  const sectionStats = [
    {
      value: `${proofBackedCount}`,
      label: "Proof-backed wins",
      icon: BadgeCheck,
      iconClassName: "text-emerald-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(59,130,246,0.06))]",
    },
    {
      value: `${previewCount}`,
      label: "Dialog previews",
      icon: ScanSearch,
      iconClassName: "text-sky-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(99,102,241,0.08))]",
    },
    {
      value: `${aiTracksCount}`,
      label: "AI-focused tracks",
      icon: Sparkles,
      iconClassName: "text-amber-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(244,114,182,0.08))]",
    },
  ] as const;

  const openPreview = (certification: CertificationData) => {
    if (!certification.imageSrc) {
      return;
    }

    setActivePreview(certification);
  };

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="teal" pattern="grid" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="mb-8 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] xl:items-stretch">
          <BlurFade inView delay={0.04} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                Certifications
              </AnimatedShinyText>
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Verified learning milestones with cleaner previews, stronger
              proof, and recruiter-friendly context.
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Every certificate card now prioritizes readable metadata first,
              with large preview access in a dialog and proof links kept close
              to the record.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.08}>
            <ModernGlowCard
              className="h-full min-w-0 p-5 sm:p-6"
              accentFrom="#14b8a6"
              accentTo="#2563eb"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Verification Surface
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {sectionStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border border-border/70 px-4 py-4 shadow-sm backdrop-blur ${stat.shellClassName}`}
                    >
                      <Icon className={`size-4 ${stat.iconClassName}`} />
                      <p className="mt-3 text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {spotlightCertification ? (
                <div className="mt-4 rounded-2xl border border-border/70 bg-background/72 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Spotlight
                  </p>
                  <p className="mt-2 text-sm font-semibold tracking-tight">
                    {spotlightCertification.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {spotlightCertification.issuer}
                  </p>
                </div>
              ) : null}
            </ModernGlowCard>
          </BlurFade>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {certifications.map((certification, index) => {
            const previewAlt =
              certification.imageAlt ??
              `${certification.title} certificate preview`;

            return (
              <BlurFade
                key={certification.title}
                inView
                delay={0.08 + index * 0.06}
                className="h-full"
              >
                <ModernGlowCard
                  className="flex h-full min-w-0 p-4 sm:p-5"
                  accentFrom={index % 2 === 0 ? "#f59e0b" : "#22c55e"}
                  accentTo={index % 2 === 0 ? "#fb7185" : "#0ea5e9"}
                >
                  <article className="grid h-full min-w-0 gap-5 md:grid-cols-[minmax(0,220px)_1fr] xl:grid-cols-[minmax(0,250px)_1fr] xl:items-start">
                    {certification.imageSrc ? (
                      <button
                        type="button"
                        className="group/image block rounded-[1.75rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                        aria-label={`Preview ${certification.title} certificate`}
                        onClick={() => openPreview(certification)}
                      >
                        <div className="rounded-[1.6rem] border border-border/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(226,232,240,0.78))] p-3 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.82))]">
                          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-full border border-black/8 bg-white/88 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/8 dark:text-slate-100">
                              {certification.issuer}
                            </span>
                            {certification.kind ? (
                              <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:border-white/10 dark:bg-white/6 dark:text-slate-200">
                                {certification.kind}
                              </span>
                            ) : null}
                          </div>

                          <div className="relative overflow-hidden rounded-[1.1rem] border border-black/5 bg-white dark:border-white/10 dark:bg-slate-950">
                            <Image
                              src={certification.imageSrc}
                              alt={previewAlt}
                              width={1200}
                              height={1500}
                              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 42vw, 250px"
                              className="h-[280px] w-full bg-white object-contain object-center transition-transform duration-500 group-hover/image:scale-[1.02] dark:bg-slate-950"
                            />
                            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-full border border-black/10 bg-white/92 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/82 dark:text-slate-100">
                              <span className="inline-flex items-center gap-1.5">
                                <ScanSearch className="size-3" />
                                Preview
                              </span>
                              <span>Open Dialog</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="flex min-h-[280px] flex-col justify-between rounded-[1.6rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(8,47,73,0.9))] p-5 text-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                            External Proof
                          </span>
                          {certification.kind ? (
                            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                              {certification.kind}
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-3">
                          <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10">
                            <FileBadge2 className="size-5 text-cyan-200" />
                          </div>
                          <p className="text-sm uppercase tracking-[0.16em] text-white/55">
                            {certification.issuer}
                          </p>
                          <h3 className="text-2xl font-semibold tracking-tight">
                            {certification.title}
                          </h3>
                          <p className="text-sm leading-6 text-white/70">
                            {getVerificationMessage(certification)}
                          </p>
                        </div>

                        {certification.result ? (
                          <p className="text-sm font-medium text-emerald-200">
                            {certification.result}
                          </p>
                        ) : null}
                      </div>
                    )}

                    <div className="flex min-w-0 h-full flex-col">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 max-w-2xl">
                          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            {certification.issuer}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold tracking-tight">
                            {certification.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {certification.kind ? (
                            <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                              {certification.kind}
                            </span>
                          ) : null}
                          {certification.result ? (
                            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                              {certification.result}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {certification.issuedAt ? (
                          <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                            Issued {certification.issuedAt}
                          </span>
                        ) : null}
                        {certification.credentialId ? (
                          <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                            ID: {certification.credentialId}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {certification.description}
                      </p>

                      {certification.skills && certification.skills.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {certification.skills.map((skill) => (
                            <span
                              key={`${certification.title}-${skill}`}
                              className="rounded-full border border-border/70 bg-background/82 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-border/70 bg-background/60 p-3 text-xs leading-5 text-muted-foreground">
                        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <p>{getVerificationMessage(certification)}</p>
                      </div>

                      {certification.imageSrc ||
                      certification.credentialUrl ||
                      certification.proofUrl ? (
                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {certification.imageSrc ? (
                            <ShimmerButton
                              as="button"
                              type="button"
                              onClick={() => openPreview(certification)}
                              className="h-9 gap-2 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgba(12,74,110,0.96), rgba(30,64,175,0.94))"
                              shimmerColor="#bfdbfe"
                            >
                              <ScanSearch className="size-4" />
                              <span>Open Preview</span>
                            </ShimmerButton>
                          ) : null}

                          {certification.credentialUrl ? (
                            <ShimmerButton
                              as="a"
                              href={certification.credentialUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="h-9 gap-2 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgb(17,24,39), rgb(180,83,9))"
                              shimmerColor="#fcd34d"
                            >
                              <ExternalLink className="size-4" />
                              <span>View Credential</span>
                            </ShimmerButton>
                          ) : null}

                          {certification.proofUrl ? (
                            <ShimmerButton
                              as="a"
                              href={certification.proofUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="h-9 gap-2 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(8,145,178,0.94))"
                              shimmerColor="#67e8f9"
                            >
                              <ExternalLink className="size-4" />
                              <span>LinkedIn Proof</span>
                            </ShimmerButton>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </ModernGlowCard>
              </BlurFade>
            );
          })}
        </div>
      </div>

      <Dialog
        open={Boolean(activePreview)}
        onOpenChange={(open) => {
          if (!open) {
            setActivePreview(null);
          }
        }}
      >
        {activePreview ? (
          <DialogContent
            showClose={false}
            className="max-w-6xl overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.94))] p-0 text-white shadow-[0_30px_120px_-40px_rgba(15,23,42,0.85)]"
          >
            <div className="flex flex-col">
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <DialogHeader className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                      {activePreview.issuer}
                    </p>
                    <DialogTitle className="text-lg text-white sm:text-2xl">
                      {activePreview.title}
                    </DialogTitle>
                    <DialogDescription className="max-w-3xl leading-6 text-slate-300">
                      {activePreview.description}
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="justify-start sm:justify-end">
                    {activePreview.credentialUrl ? (
                      <ShimmerButton
                        as="a"
                        href={activePreview.credentialUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="h-10 gap-2 px-4 text-sm font-medium"
                        background="linear-gradient(115deg, rgb(17,24,39), rgb(180,83,9))"
                        shimmerColor="#fcd34d"
                      >
                        <ExternalLink className="size-4" />
                        <span>View Credential</span>
                      </ShimmerButton>
                    ) : null}
                    {activePreview.proofUrl ? (
                      <ShimmerButton
                        as="a"
                        href={activePreview.proofUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="h-10 gap-2 px-4 text-sm font-medium"
                        background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(8,145,178,0.94))"
                        shimmerColor="#67e8f9"
                      >
                        <ExternalLink className="size-4" />
                        <span>LinkedIn Proof</span>
                      </ShimmerButton>
                    ) : null}
                    <DialogClose className="h-10 w-auto rounded-full border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/80 hover:border-white/20 hover:bg-white/8 hover:text-white">
                      Close
                    </DialogClose>
                  </DialogFooter>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activePreview.kind ? (
                    <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200">
                      {activePreview.kind}
                    </span>
                  ) : null}
                  {activePreview.result ? (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                      {activePreview.result}
                    </span>
                  ) : null}
                  {activePreview.issuedAt ? (
                    <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200">
                      Issued {activePreview.issuedAt}
                    </span>
                  ) : null}
                  {activePreview.credentialId ? (
                    <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200">
                      ID: {activePreview.credentialId}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="max-h-[calc(100vh-10rem)] overflow-auto bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.4),rgba(2,6,23,0))] p-4 sm:p-6">
                <div className="mx-auto flex min-h-[55vh] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/95 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:bg-slate-950/94">
                  <Image
                    src={activePreview.imageSrc!}
                    alt={
                      activePreview.imageAlt ??
                      `${activePreview.title} certificate preview`
                    }
                    width={1600}
                    height={2200}
                    sizes="100vw"
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
