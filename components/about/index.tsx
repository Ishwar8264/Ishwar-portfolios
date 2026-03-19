import Image from "next/image";

import { StripedPattern } from "@/components/magicui/striped-pattern";
import AnimatedName from "@/components/home/animated-name.client";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import InfoCard, {
  type InfoCardColors,
  type InfoCardPalette,
  type InfoCardSize,
} from "@/components/ui/info-card";
import { MagicCard } from "@/components/ui/magic-card";
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
  cards?: AboutCardItem[];
};

export default function AboutSection({ profile, cards }: AboutSectionProps) {
  const defaultCards: AboutCardItem[] = [
    {
      label: "Role",
      value: profile.role,
      palette: "brandWarm",
      size: "md",
    },
    {
      label: "Coding Hours",
      value: `${profile.codingHours} hrs`,
      palette: "brandCool",
      size: "md",
    },
  ];

  const cardsToRender = cards && cards.length > 0 ? cards : defaultCards;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0  " />
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
      <div className="relative z-10 mx-auto grid w-[min(1200px,95%)] gap-8 md:gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
        <BlurFade inView delay={0.05}>
          <MagicCard
            mode="orb"
            glowFrom="#fb7185"
            glowTo="#f59e0b"
            glowOpacity={0.24}
            glowBlur={56}
            className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-2 shadow-sm"
          >
            <BorderBeam
              size={82}
              duration={7.2}
              delay={0.1}
              borderWidth={1.5}
              colorFrom="#fb7185"
              colorTo="#0ea5e9"
            />
            <Image
              src="/images/profile/img-1.jpeg"
              alt={`${profile.name} portrait`}
              width={960}
              height={1200}
              className="h-[320px] w-full rounded-2xl object-cover object-center sm:h-[420px] lg:h-[min(66svh,580px)]"
            />
          </MagicCard>
        </BlurFade>

        <BlurFade inView delay={0.12}>
          <div className="space-y-6 lg:pr-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                About
              </AnimatedShinyText>
            </p>
            <h2 className="font-semibold tracking-tight">
              <AnimatedName
                name={profile.name}
                place="about"
                size="xl"
                palette="warm"
                className="!flex-nowrap !whitespace-nowrap"
              />
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {cardsToRender.map((card, index) => (
                <BlurFade
                  key={`${card.label}-${card.value}`}
                  inView
                  delay={0.17 + index * 0.06}
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
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
