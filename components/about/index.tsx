import Image from "next/image";

import type { ProfileData } from "@/types/portfolio";

type AboutSectionProps = {
  profile: ProfileData;
};

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="mx-auto grid w-[min(1200px,95%)] gap-8 border-t border-border py-20 lg:grid-cols-[1fr_1.2fr]"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2">
        <Image
          src="/images/profile/img-1.jpeg"
          alt={`${profile.name} portrait`}
          width={960}
          height={1200}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>

      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.name}
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card/80 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Role
            </p>
            <p className="mt-2 text-base font-medium">{profile.role}</p>
          </article>
          <article className="rounded-2xl border border-border bg-card/80 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Coding Hours
            </p>
            <p className="mt-2 text-base font-medium">{profile.codingHours} hrs</p>
          </article>
        </div>
      </div>
    </section>
  );
}
