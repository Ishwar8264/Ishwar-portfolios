import Image from "next/image";

import { StripedPattern } from "@/components/magicui/striped-pattern";
import AnimatedName from "@/components/home/animated-name.client";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import InfoCard, {
  type InfoCardColors,
  type InfoCardPalette,
  type InfoCardSize,
} from "@/components/ui/info-card";
import { MagicCard } from "@/components/ui/magic-card";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { ProfileData } from "@/types/portfolio";

type AboutCardItem = {
  label: string;
  value: string;
  size?: InfoCardSize;
  palette?: InfoCardPalette;
  colors?: Partial<InfoCardColors>;
};

type AboutSectionProps = {
  profile: ProfileData;
  githubUrl: string;
  cards?: AboutCardItem[];
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

export default function AboutSection({
  profile,
  githubUrl,
  cards,
}: AboutSectionProps) {
  const defaultCards: AboutCardItem[] = [
    {
      label: "Role",
      value: profile.role,
      palette: "brandWarm",
      size: "md",
    },
    {
      label: "Education",
      value: profile.education,
      palette: "brandCool",
      size: "md",
    },
    {
      label: "Location",
      value: profile.location,
      palette: "brandPrimary",
      size: "md",
    },
  ];

  const cardsToRender = cards && cards.length > 0 ? cards : defaultCards;
  const username = extractGithubUsername(githubUrl);
  const repositoriesUrl = `https://github.com/${username}?tab=repositories`;
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&rank_icon=percentile&include_all_commits=true&title_color=38bdf8&icon_color=22d3ee&text_color=94a3b8&bg_color=00000000`;
  const streakUrl = `https://streak-stats.demolab.com?user=${username}&hide_border=true&background=00000000&ring=22D3EE&fire=FB7185&currStreakLabel=CBD5E1&sideNums=E2E8F0&currStreakNum=F8FAFC&sideLabels=94A3B8&dates=64748B`;
  const activityGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=00000000&hide_border=true&color=94a3b8&line=22d3ee&point=fb7185&area=true&area_color=0e7490`;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <StripedPattern
          direction="right"
          width={18}
          height={18}
          className="text-sky-500/25 opacity-70 [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent),linear-gradient(180deg,transparent,white_10%,white_88%,transparent)] dark:text-sky-300/12"
        />
        <StripedPattern
          direction="left"
          width={24}
          height={24}
          className="text-fuchsia-500/10 opacity-55 [mask-image:radial-gradient(circle_at_center,white,transparent_78%)] dark:text-fuchsia-300/8"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-6 md:grid-cols-2 md:items-start lg:gap-8">
          <div className="min-w-0 space-y-6">
            <BlurFade inView delay={0.05}>
              <MagicCard
                mode="orb"
                glowFrom="#fb7185"
                glowTo="#f59e0b"
                glowOpacity={0.24}
                glowBlur={56}
                className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-2 shadow-sm"
              >
                <Image
                  src="/images/profile/img-1.jpeg"
                  alt={`${profile.name} portrait`}
                  width={960}
                  height={1200}
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="h-[320px] w-full rounded-2xl object-cover object-center sm:h-[380px] lg:h-[min(66svh,540px)]"
                />
              </MagicCard>
            </BlurFade>

            <BlurFade inView delay={0.1}>
              <ModernGlowCard
                className="min-w-0 p-6"
                accentFrom="#fb7185"
                accentTo="#f59e0b"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                    About
                  </AnimatedShinyText>
                </p>
                <h2 className="mt-2 font-semibold tracking-tight">
                  <AnimatedName
                    name={profile.name}
                    place="about"
                    size="lg"
                    palette="warm"
                    className="max-w-full sm:!text-4xl"
                  />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {profile.summary}
                </p>
              </ModernGlowCard>
            </BlurFade>

            <BlurFade inView delay={0.14}>
              <div className="grid gap-3 sm:grid-cols-2">
                {cardsToRender.map((card, index) => (
                  <BlurFade
                    key={`${card.label}-${card.value}`}
                    inView
                    delay={0.18 + index * 0.06}
                  >
                    <InfoCard
                      label={card.label}
                      value={card.value}
                      size={card.size ?? "md"}
                      palette={card.palette ?? "brandPrimary"}
                      colors={card.colors}
                    />
                  </BlurFade>
                ))}
              </div>
            </BlurFade>
          </div>

          <div id="github" className="min-w-0 space-y-4 self-start scroll-mt-28">
            <BlurFade inView delay={0.06}>
              <ModernGlowCard
                className="min-w-0 p-6"
                accentFrom="#22d3ee"
                accentTo="#3b82f6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                    GitHub
                  </AnimatedShinyText>
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Live coding activity and contribution momentum.
                </h3>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  Real-time public profile status for {username} with commit
                  stats, streak tracking, and contribution graph.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <ShimmerButton
                    as="a"
                    href={githubUrl}
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

            <BlurFade inView delay={0.11}>
              <ModernGlowCard
                className="min-w-0 p-4"
                accentFrom="#38bdf8"
                accentTo="#fb7185"
              >
                <Image
                  src={statsUrl}
                  alt={`${username} GitHub stats card`}
                  width={560}
                  height={240}
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="h-full min-h-[210px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
                />
              </ModernGlowCard>
            </BlurFade>

            <BlurFade inView delay={0.14}>
              <ModernGlowCard
                className="min-w-0 p-4"
                accentFrom="#22d3ee"
                accentTo="#6366f1"
              >
                <Image
                  src={streakUrl}
                  alt={`${username} GitHub streak card`}
                  width={560}
                  height={240}
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="h-full min-h-[210px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
                />
              </ModernGlowCard>
            </BlurFade>

            <BlurFade inView delay={0.17}>
              <ModernGlowCard
                className="min-w-0 p-4"
                accentFrom="#a78bfa"
                accentTo="#22d3ee"
              >
                <Image
                  src={activityGraphUrl}
                  alt={`${username} GitHub contribution activity graph`}
                  width={820}
                  height={260}
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="h-full min-h-[210px] w-full rounded-2xl border border-border/60 bg-background/70 object-contain p-1"
                />
              </ModernGlowCard>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
