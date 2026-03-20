import Image from "next/image";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";

type GithubSectionProps = {
  profileUrl: string;
};

function extractGithubUsername(profileUrl: string) {
  try {
    const parsedUrl = new URL(profileUrl);
    const [firstPathSegment] = parsedUrl.pathname
      .split("/")
      .filter((segment) => segment.length > 0);
    return firstPathSegment ?? "Ishwar8264";
  } catch {
    const [firstPathSegment] = profileUrl
      .replace("https://github.com/", "")
      .replace("http://github.com/", "")
      .split("/")
      .filter((segment) => segment.length > 0);
    return firstPathSegment ?? "Ishwar8264";
  }
}

export default function GithubSection({ profileUrl }: GithubSectionProps) {
  const username = extractGithubUsername(profileUrl);
  const repositoriesUrl = `https://github.com/${username}?tab=repositories`;
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&rank_icon=percentile&include_all_commits=true&title_color=38bdf8&icon_color=22d3ee&text_color=94a3b8&bg_color=00000000`;
  const streakUrl = `https://streak-stats.demolab.com?user=${username}&hide_border=true&background=00000000&ring=22D3EE&fire=FB7185&currStreakLabel=CBD5E1&sideNums=E2E8F0&currStreakNum=F8FAFC&sideLabels=94A3B8&dates=64748B`;
  const activityGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=00000000&hide_border=true&color=94a3b8&line=22d3ee&point=fb7185&area=true&area_color=0e7490`;

  return (
    <section
      id="github"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="cyan" pattern="striped" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <BlurFade inView delay={0.04}>
            <ModernGlowCard
              className="h-full p-6"
              accentFrom="#22d3ee"
              accentTo="#3b82f6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                  GitHub
                </AnimatedShinyText>
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Daily coding status and commit momentum.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Live cards pull public GitHub data for {username}. You can track
                streak, commits, and contribution graph directly from this
                portfolio.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <ShimmerButton
                  as="a"
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgb(15,23,42), rgb(30,64,175))"
                  shimmerColor="#93c5fd"
                >
                  Open GitHub
                </ShimmerButton>
                <ShimmerButton
                  as="a"
                  href={repositoriesUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="h-10 px-4 text-sm font-medium"
                  background="linear-gradient(115deg, rgba(30,41,59,0.94), rgba(14,116,144,0.9))"
                  shimmerColor="#67e8f9"
                >
                  View Repositories
                </ShimmerButton>
              </div>
            </ModernGlowCard>
          </BlurFade>

          <BlurFade inView delay={0.08}>
            <ModernGlowCard
              className="h-full p-4 sm:p-5"
              accentFrom="#38bdf8"
              accentTo="#fb7185"
            >
              <Image
                src={statsUrl}
                alt={`${username} GitHub stats card`}
                width={560}
                height={240}
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="h-full min-h-[220px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
              />
            </ModernGlowCard>
          </BlurFade>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <BlurFade inView delay={0.12}>
            <ModernGlowCard
              className="p-4 sm:p-5"
              accentFrom="#22d3ee"
              accentTo="#6366f1"
            >
              <Image
                src={streakUrl}
                alt={`${username} GitHub streak card`}
                width={560}
                height={240}
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="h-full min-h-[220px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
              />
            </ModernGlowCard>
          </BlurFade>

          <BlurFade inView delay={0.16}>
            <ModernGlowCard
              className="p-4 sm:p-5"
              accentFrom="#a78bfa"
              accentTo="#22d3ee"
            >
              <Image
                src={activityGraphUrl}
                alt={`${username} GitHub contribution activity graph`}
                width={820}
                height={260}
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="h-full min-h-[220px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
              />
            </ModernGlowCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
