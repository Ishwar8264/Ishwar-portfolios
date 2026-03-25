"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { CertificationData } from "@/types/portfolio";

type CertificationsSectionProps = {
  certifications: CertificationData[];
};

type ActivePreview = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  issuer: string;
  proofUrl?: string;
  credentialUrl?: string;
};

export default function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null);
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
  const aiTracksCount = certifications.filter((certification) => {
    const titleHasAi = certification.title.toLowerCase().includes("ai");
    const skillHasAi =
      certification.skills?.some((skill) => skill.toLowerCase().includes("ai")) ??
      false;

    return titleHasAi || skillHasAi;
  }).length;

  useEffect(() => {
    if (!activePreview) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePreview(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePreview]);

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="teal" pattern="grid" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <BlurFade inView delay={0.04} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                Certifications
              </AnimatedShinyText>
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Proof-backed certifications that reinforce frontend execution, AI
              upskilling, and recruiter trust.
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Each card ties the learning outcome to a certificate preview,
              credential metadata, or LinkedIn proof so hiring teams can verify
              substance quickly.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: `${proofBackedCount}`,
                  label: "Proof-backed wins",
                },
                {
                  value: `${previewCount}`,
                  label: "Local PDF previews",
                },
                {
                  value: `${aiTracksCount}`,
                  label: "AI-focused tracks",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-background/78 px-4 py-4 shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
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
                  className="flex h-full p-4 sm:p-5"
                  accentFrom={index % 2 === 0 ? "#f59e0b" : "#22c55e"}
                  accentTo={index % 2 === 0 ? "#fb7185" : "#0ea5e9"}
                >
                  <article className="grid h-full gap-5 lg:grid-cols-[minmax(0,240px)_1fr] lg:items-start">
                    {certification.imageSrc ? (
                      <button
                        type="button"
                        className="group/image block text-left"
                        aria-label={`Preview ${certification.title} certificate`}
                        onClick={() =>
                          setActivePreview({
                            imageSrc: certification.imageSrc!,
                            imageAlt: previewAlt,
                            title: certification.title,
                            issuer: certification.issuer,
                            proofUrl: certification.proofUrl,
                            credentialUrl: certification.credentialUrl,
                          })
                        }
                      >
                        <div className="rounded-[1.6rem] border border-border/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(226,232,240,0.78))] p-3 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.82))]">
                          <div className="relative overflow-hidden rounded-[1.1rem] border border-black/5 bg-white dark:border-white/10 dark:bg-slate-950">
                            <Image
                              src={certification.imageSrc}
                              alt={previewAlt}
                              width={1200}
                              height={1500}
                              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 42vw, 240px"
                              className="h-[280px] w-full object-contain object-center transition-transform duration-500 group-hover/image:scale-[1.02]"
                            />
                            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-black/10 bg-white/92 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/82 dark:text-slate-100">
                              <span>Open Preview</span>
                              <span>Tap to Zoom</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="flex min-h-[280px] flex-col justify-between rounded-[1.6rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(8,47,73,0.9))] p-5 text-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.55)]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                            Recruiter Signal
                          </span>
                          {certification.kind ? (
                            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                              {certification.kind}
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm uppercase tracking-[0.16em] text-white/55">
                            {certification.issuer}
                          </p>
                          <h3 className="text-2xl font-semibold tracking-tight">
                            {certification.title}
                          </h3>
                          <p className="text-sm leading-6 text-white/70">
                            No local PDF preview is attached here yet, but the
                            proof link below validates this learning milestone.
                          </p>
                        </div>

                        {certification.result ? (
                          <p className="text-sm font-medium text-emerald-200">
                            {certification.result}
                          </p>
                        ) : null}
                      </div>
                    )}

                    <div className="flex h-full flex-col">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="max-w-2xl">
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

                      {certification.imageSrc ||
                      certification.credentialUrl ||
                      certification.proofUrl ? (
                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {certification.imageSrc ? (
                            <ShimmerButton
                              as="button"
                              type="button"
                              onClick={() =>
                                setActivePreview({
                                  imageSrc: certification.imageSrc!,
                                  imageAlt: previewAlt,
                                  title: certification.title,
                                  issuer: certification.issuer,
                                  proofUrl: certification.proofUrl,
                                  credentialUrl: certification.credentialUrl,
                                })
                              }
                              className="h-9 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgba(12,74,110,0.96), rgba(30,64,175,0.94))"
                              shimmerColor="#bfdbfe"
                            >
                              Preview Certificate
                            </ShimmerButton>
                          ) : null}

                          {certification.credentialUrl ? (
                            <ShimmerButton
                              as="a"
                              href={certification.credentialUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="h-9 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgb(17,24,39), rgb(180,83,9))"
                              shimmerColor="#fcd34d"
                            >
                              View Credential
                            </ShimmerButton>
                          ) : null}

                          {certification.proofUrl ? (
                            <ShimmerButton
                              as="a"
                              href={certification.proofUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="h-9 px-4 text-sm font-medium"
                              background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(8,145,178,0.94))"
                              shimmerColor="#67e8f9"
                            >
                              View LinkedIn Proof
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

      {activePreview ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePreview.title} certificate preview`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/78 backdrop-blur-sm"
            aria-label="Close certificate preview"
            onClick={() => setActivePreview(null)}
          />

          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.94))] shadow-[0_30px_120px_-40px_rgba(15,23,42,0.85)]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                  {activePreview.issuer}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {activePreview.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {activePreview.credentialUrl ? (
                  <ShimmerButton
                    as="a"
                    href={activePreview.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="h-9 px-4 text-sm font-medium"
                    background="linear-gradient(115deg, rgb(17,24,39), rgb(180,83,9))"
                    shimmerColor="#fcd34d"
                  >
                    View Credential
                  </ShimmerButton>
                ) : null}
                {activePreview.proofUrl ? (
                  <ShimmerButton
                    as="a"
                    href={activePreview.proofUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="h-9 px-4 text-sm font-medium"
                    background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(8,145,178,0.94))"
                    shimmerColor="#67e8f9"
                  >
                    View LinkedIn Proof
                  </ShimmerButton>
                ) : null}
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-white/12 px-4 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:text-white"
                  onClick={() => setActivePreview(null)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="max-h-[calc(100vh-10rem)] overflow-auto bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.4),rgba(2,6,23,0))] p-4 sm:p-6">
              <div className="mx-auto flex min-h-[55vh] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/95 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:bg-slate-950/94">
                <Image
                  src={activePreview.imageSrc}
                  alt={activePreview.imageAlt}
                  width={1600}
                  height={2200}
                  sizes="100vw"
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
