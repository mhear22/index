export type SiteStatus = "Live" | "In Progress" | "Archived";

export interface HostedProject {
  name: string;
  url: string;
  description: string;
  stack: string;
  status: SiteStatus;
  tags: string[];
}

export const projects: HostedProject[] = [
  {
    name: "Data Centre Management Minigame",
    url: "https://datacentre.mikahear.es",
    description: "data centre management minigame",
    stack: "Vue + TypeScript + Vercel",
    status: "Live",
    tags: ["game", "management", "minigame"],
  },
  {
    name: "Wedding Planner",
    url: "https://weddingplanner.mikahear.es/",
    description: "wedding planner for my wedding",
    stack: "Nextjs + TypeScript + Vercel",
    status: "Live",
    tags: ["wedding", "planner"],
  },
  {
    name: "Solar System Simulator",
    url: "https://vercel.mikahear.es/",
    description: "interactive solar system simulator",
    stack: "Nextjs + TypeScript + Vercel",
    status: "Live",
    tags: [ "simulation", "solar system"],
  },
  {
    name: "Self hosted proxy page",
    url: "https://homesite.mikahear.es/",
    description: "a self hosted proxy page for my home network",
    stack: "Vuejs + TypeScript + Vercel",
    status: "Live",
    tags: ["self-hosted", "proxy", "home network"],
  },
  {
    name: "Immich Stats",
    url: "https://immich-stats.mikahear.es/",
    description: "a self hosted stats page for my immich instance",
    stack: "Vuejs + TypeScript + Vercel",
    status: "Live",
    tags: ["self-hosted", "stats", "immich"],
  },
  {
    name: "Multiplayer Vibe coded website",
    url: "https://mald.mikahear.es/",
    description: "a multiplayer vibe coded website",
    stack: "vuejs + TypeScript + docker",
    status: "Live",
    tags: ["multiplayer", "vibe", "coded"],
  },
  {
    name: "Review website",
    url: "https://review.mikahear.es/",
    description: "a review website for videos",
    stack: "vuejs + TypeScript + Vercel",
    status: "Live",
    tags: ["review", "videos"],
  }
];
