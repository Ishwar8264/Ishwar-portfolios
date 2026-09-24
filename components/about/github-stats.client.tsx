"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  FolderGit2,
  GitFork,
  GitCommitVertical,
  Star,
  Users,
  Heart,
  Loader2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import { cn } from "@/lib/utils";

type GithubStatsClientProps = {
  username: string;
  profileUrl: string;
  repositoriesUrl: string;
};

type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  html_url: string;
};

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  homepage: string | null;
};

type CachedPayload = {
  fetchedAt: number;
  user: GithubUser;
  repos: GithubRepo[];
};

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: CachedPayload };

const CACHE_KEY = "ishwar:github-stats:v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const API_USER_TIMEOUT_MS = 8000;

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Astro: "#ff5a03",
  MDX: "#fcb32c",
  Dockerfile: "#384d54",
  Makefile: "#427819",
};

function getLanguageColor(language: string | null) {
  if (!language) return "#94a3b8";
  return LANGUAGE_COLORS[language] ?? "#94a3b8";
}

function formatNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `${value}`;
}

function timeAgo(isoDate: string) {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function readCache(): CachedPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (!parsed.fetchedAt || !parsed.user || !Array.isArray(parsed.repos)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload: CachedPayload) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be full or blocked; safe to ignore.
  }
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: "GET",
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchGithubData(username: string): Promise<CachedPayload> {
  const userResponse = await fetchWithTimeout(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    API_USER_TIMEOUT_MS,
  );
  if (!userResponse.ok) {
    if (userResponse.status === 403) {
      throw new Error("GitHub API rate limit reached. Try again in a few minutes.");
    }
    if (userResponse.status === 404) {
      throw new Error(`GitHub user "${username}" not found.`);
    }
    throw new Error(`GitHub API error (HTTP ${userResponse.status}).`);
  }
  const user = (await userResponse.json()) as GithubUser;

  // Fetch up to 100 most recently pushed repos.
  const reposResponse = await fetchWithTimeout(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=100&type=owner`,
    API_USER_TIMEOUT_MS,
  );
  if (!reposResponse.ok) {
    if (reposResponse.status === 403) {
      throw new Error("GitHub API rate limit reached. Try again in a few minutes.");
    }
    throw new Error(`GitHub API error (HTTP ${reposResponse.status}).`);
  }
  const repos = (await reposResponse.json()) as GithubRepo[];

  return {
    fetchedAt: Date.now(),
    user,
    repos: repos.filter((repo) => !repo.fork && !repo.archived),
  };
}

type StatItem = {
  label: string;
  value: number;
  icon: typeof Users;
  accent: string;
};

function StatTile({
  icon: Icon,
  label,
  value,
  accent,
}: StatItem) {
  return (
    <div className="rounded-2xl border border-border/65 bg-background/65 px-3 py-3 backdrop-blur transition-colors hover:bg-background/80">
      <div className="flex items-center justify-between">
        <Icon className="size-4" style={{ color: accent }} />
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function LanguageBar({
  language,
  count,
  percentage,
}: {
  language: string;
  count: number;
  percentage: number;
}) {
  const color = getLanguageColor(language);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium text-foreground/85">
          <span
            aria-hidden
            className="size-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          {language}
        </span>
        <span>
          {count} repo{count > 1 ? "s" : ""} · {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border/55">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${Math.max(percentage, 4)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

function TopRepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      className="group/repo block rounded-2xl border border-border/65 bg-background/65 p-3 transition-all hover:border-border hover:bg-background/85 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground group-hover/repo:text-primary">
            {repo.name}
          </p>
          {repo.description ? (
            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
              {repo.description}
            </p>
          ) : null}
        </div>
        <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/70 transition-colors group-hover/repo:text-primary" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
        {repo.language ? (
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        ) : null}
        {repo.stargazers_count > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" />
            {formatNumber(repo.stargazers_count)}
          </span>
        ) : null}
        {repo.forks_count > 0 ? (
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3" />
            {formatNumber(repo.forks_count)}
          </span>
        ) : null}
        <span className="ml-auto text-[10px] text-muted-foreground/70">
          {timeAgo(repo.pushed_at)}
        </span>
      </div>
    </a>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-20 animate-pulse rounded-2xl border border-border/50 bg-background/50"
          />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-5 w-full animate-pulse rounded-full bg-border/45"
          />
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-20 animate-pulse rounded-2xl border border-border/40 bg-background/40"
          />
        ))}
      </div>
    </div>
  );
}

export default function GithubStatsClient({
  username,
  profileUrl,
  repositoriesUrl,
}: GithubStatsClientProps) {
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (opts: { forceRefresh: boolean }) => {
    if (!opts.forceRefresh) {
      const cached = readCache();
      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        setState({ status: "ready", data: cached });
        return;
      }
      if (cached) {
        // Show stale data immediately, refresh in background.
        setState({ status: "ready", data: cached });
      }
    } else {
      setIsRefreshing(true);
    }

    try {
      const fresh = await fetchGithubData(username);
      writeCache(fresh);
      setState({ status: "ready", data: fresh });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load GitHub data.";
      const cached = readCache();
      if (cached && !opts.forceRefresh) {
        setState({ status: "ready", data: cached });
      } else {
        setState({ status: "error", message });
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadData({ forceRefresh: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const aggregated = useMemo(() => {
    if (state.status !== "ready") return null;
    const { repos } = state.data;

    const languageCounts = new Map<string, number>();
    let starredTotal = 0;
    let forkedTotal = 0;
    for (const repo of repos) {
      if (repo.language) {
        languageCounts.set(
          repo.language,
          (languageCounts.get(repo.language) ?? 0) + 1,
        );
      }
      starredTotal += repo.stargazers_count;
      forkedTotal += repo.forks_count;
    }

    const totalLangRepos = Array.from(languageCounts.values()).reduce(
      (sum, count) => sum + count,
      0,
    );

    const topLanguages = Array.from(languageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language, count]) => ({
        language,
        count,
        percentage: totalLangRepos === 0 ? 0 : (count / totalLangRepos) * 100,
      }));

    const topRepos = [...repos]
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return (
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
      })
      .slice(0, 6);

    const latestPushDate = repos.reduce((latest, repo) => {
      const pushed = new Date(repo.pushed_at).getTime();
      return pushed > latest ? pushed : latest;
    }, 0);

    return {
      topLanguages,
      topRepos,
      starredTotal,
      forkedTotal,
      latestPushDate,
    };
  }, [state]);

  const stats: StatItem[] | null = useMemo(() => {
    if (state.status !== "ready") return null;
    const { user } = state.data;
    return [
      {
        label: "Followers",
        value: user.followers,
        icon: Users,
        accent: "#38bdf8",
      },
      {
        label: "Following",
        value: user.following,
        icon: Heart,
        accent: "#fb7185",
      },
      {
        label: "Repos",
        value: user.public_repos,
        icon: FolderGit2,
        accent: "#22d3ee",
      },
      {
        label: "Gists",
        value: user.public_gists,
        icon: Code2,
        accent: "#a78bfa",
      },
    ];
  }, [state]);

  return (
    <div className="space-y-4">
      {/* Stats overview card */}
      <ModernGlowCard
        className="min-w-0 p-6"
        accentFrom="#22d3ee"
        accentTo="#3b82f6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              GitHub Live
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              @{username}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {state.status === "ready"
                ? state.data.user.bio ??
                  "Frontend developer building modern web experiences with React and Next.js."
                : "Real-time public profile snapshot."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadData({ forceRefresh: true })}
            disabled={isRefreshing}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60"
            aria-label="Refresh GitHub stats"
          >
            <RefreshCw
              className={cn("size-3", isRefreshing && "animate-spin")}
            />
            Refresh
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats ? (
            stats.map((stat) => <StatTile key={stat.label} {...stat} />)
          ) : (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-20 animate-pulse rounded-2xl border border-border/50 bg-background/50"
              />
            ))
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            Open GitHub Profile
          </a>
          <a
            href={repositoriesUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FolderGit2 className="size-3.5" />
            View Repositories
          </a>
        </div>
      </ModernGlowCard>

      {state.status === "error" ? (
        <ModernGlowCard
          className="min-w-0 p-6"
          accentFrom="#fb7185"
          accentTo="#f59e0b"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                GitHub stats temporarily unavailable
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => void loadData({ forceRefresh: true })}
                className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RefreshCw className="size-3" />
                Try again
              </button>
            </div>
          </div>
        </ModernGlowCard>
      ) : null}

      {state.status === "loading" ? (
        <SkeletonGrid />
      ) : null}

      {state.status === "ready" && aggregated ? (
        <>
          {/* Top languages + activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <ModernGlowCard
              className="min-w-0 p-5"
              accentFrom="#38bdf8"
              accentTo="#fb7185"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Top Languages
                </p>
                <Code2 className="size-4 text-muted-foreground" />
              </div>
              {aggregated.topLanguages.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  No language data available yet.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {aggregated.topLanguages.map((entry) => (
                    <LanguageBar key={entry.language} {...entry} />
                  ))}
                </div>
              )}
            </ModernGlowCard>

            <ModernGlowCard
              className="min-w-0 p-5"
              accentFrom="#22d3ee"
              accentTo="#6366f1"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Activity Summary
                </p>
                <GitCommitVertical className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/60 bg-background/60 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <Star className="size-3 text-amber-500" />
                    Total Stars
                  </div>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {formatNumber(aggregated.starredTotal)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <GitFork className="size-3 text-sky-500" />
                    Total Forks
                  </div>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {formatNumber(aggregated.forkedTotal)}
                  </p>
                </div>
                <div className="col-span-2 rounded-2xl border border-border/60 bg-background/60 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <GitCommitVertical className="size-3 text-emerald-500" />
                    Latest Push
                  </div>
                  <p className="mt-1 text-sm font-semibold tracking-tight">
                    {aggregated.latestPushDate
                      ? timeAgo(new Date(aggregated.latestPushDate).toISOString())
                      : "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {aggregated.topRepos.length} top repos tracked, sorted by stars.
                  </p>
                </div>
              </div>
            </ModernGlowCard>
          </div>

          {/* Top repositories */}
          <ModernGlowCard
            className="min-w-0 p-5"
            accentFrom="#a78bfa"
            accentTo="#22d3ee"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Top Repositories
              </p>
              <FolderGit2 className="size-4 text-muted-foreground" />
            </div>
            {aggregated.topRepos.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                No public repositories found.
              </p>
            ) : (
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {aggregated.topRepos.map((repo) => (
                  <TopRepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </ModernGlowCard>

          <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/70">
            <Loader2 className="size-3" />
            Live data from GitHub REST API · cached locally for 1 hour ·
            {" "}
            updated {timeAgo(new Date(state.data.fetchedAt).toISOString())}
          </p>
        </>
      ) : null}
    </div>
  );
}
