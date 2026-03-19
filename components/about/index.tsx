import Image from "next/image";

import AnimatedName from "@/components/home/animated-name.client";
import InfoCard, {
  type InfoCardColors,
  type InfoCardPalette,
  type InfoCardSize,
} from "@/components/ui/info-card";
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

  const cardsToRender =
    cards && cards.length > 0
      ? cards
      : defaultCards;

  return (
    <section
      id="about"
      className="mx-auto grid w-[min(1200px,95%)] gap-8 border-t border-border py-20 md:gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-sm">
        <Image
          src="/images/profile/img-1.jpeg"
          alt={`${profile.name} portrait`}
          width={960}
          height={1200}
          className="h-[320px] w-full rounded-2xl object-cover object-center sm:h-[420px] lg:h-[min(66svh,580px)]"
        />
      </div>

      <div className="space-y-6 lg:pr-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h2 className="font-semibold tracking-tight">
          <AnimatedName
            name={profile.name}
            place="about"
            size="xl"
            palette="warm"
          />
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {cardsToRender.map((card) => (
            <InfoCard
              key={`${card.label}-${card.value}`}
              label={card.label}
              value={card.value}
              size={card.size ?? "md"}
              palette={card.palette ?? "brandPrimary"}
              colors={card.colors}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
