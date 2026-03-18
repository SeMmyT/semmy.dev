export interface Project {
  name: string;
  description: string;
  tech: string[];
  category: string;
  private?: boolean;
  url?: string;
}

export const categories = [
  "ai agents",
  "claude code skills",
  "voice & audio",
  "apps & tools",
  "gaming",
  "web & ecommerce",
  "hardware",
] as const;

export type ViewMode = "ls" | "grid" | "cat";
export type SortMode = "category" | "public" | "private";

export const projects: Project[] = [
  // ── AI Agents ──
  {
    name: "Memory Chain",
    description:
      "Ed25519-signed append-only memory chain for AI agents. Tamper-evident session persistence with cryptographic verification.",
    tech: ["TypeScript", "Ed25519", "CLI"],
    category: "ai agents",
    url: "https://github.com/SeMmyT/witness-memory-chain",
  },
  {
    name: "Agent Prefab",
    description:
      "Library of 50+ versioned, copy-paste modules for AI agent development. Themes, components, hooks, Rust audio/image processing.",
    tech: ["TypeScript", "React", "Rust"],
    category: "ai agents",
    url: "https://github.com/SeMmyT/agent-prefab",
  },
  {
    name: "OSS Skills",
    description:
      "Open-source Claude Code skill packs — CLI development, Go development, and more.",
    tech: ["TypeScript", "AI"],
    category: "ai agents",
    url: "https://github.com/SeMmyT/oss-skills",
  },
  {
    name: "Lysyna Benchmark",
    description:
      "Benchmark suite: can AI models distinguish transliterated identities across scripts?",
    tech: ["TypeScript", "AI"],
    category: "ai agents",
    url: "https://github.com/SeMmyT/lysyna-benchmark",
  },
  {
    name: "Docs",
    description:
      "Public collection of koans, plans, rozvidka notes, and strategy docs for AI agent development.",
    tech: ["Markdown"],
    category: "ai agents",
    url: "https://github.com/SeMmyT/docs",
  },

  // ── Claude Code Skills ──
  {
    name: "GSD-TDD",
    description:
      "TDD fork of Get Shit Done — replaces AI verification with test-based verification for Claude Code.",
    tech: ["TypeScript", "TDD"],
    category: "claude code skills",
    url: "https://github.com/SeMmyT/gsd-tdd",
  },
  {
    name: "Ruff Type Annotations",
    description:
      "Claude Code skill for adding Python type annotations to legacy codebases using Ruff ANN rules, mypy, and tiered LLM annotation.",
    tech: ["Python", "Rust", "Ruff"],
    category: "claude code skills",
    url: "https://github.com/SeMmyT/ruff-type-annotations",
  },
  {
    name: "CLI Development",
    description:
      "Claude Code skill for building production-grade Go CLI tools that wrap REST APIs.",
    tech: ["Go", "CLI"],
    category: "claude code skills",
    url: "https://github.com/oss-skills/cli-development",
  },
  {
    name: "Go Development",
    description:
      "Claude Code skill for writing production-grade Go code with best practices.",
    tech: ["Go"],
    category: "claude code skills",
    url: "https://github.com/oss-skills/go-development",
  },
  {
    name: "Upstream Recon",
    description:
      "Claude Code skill for investigating open-source projects before filing issues, PRs, or comments.",
    tech: ["TypeScript", "OSS"],
    category: "claude code skills",
    url: "https://github.com/oss-skills/upstream-recon",
  },

  // ── Voice & Audio ──
  {
    name: "ReVisper",
    description:
      "Real-time voice activity detection pipeline. Silero VAD, rubato resampling, ring-buffer pre-padding for low-latency speech segmentation.",
    tech: ["Rust", "Audio", "VAD"],
    category: "voice & audio",
  },

  // ── Apps & Tools ──
  {
    name: "Agent ScreenSaver",
    description:
      "Android app that displays real-time Claude Code agent status on a charging stand.",
    tech: ["Android", "Kotlin"],
    category: "apps & tools",
    url: "https://github.com/SeMmyT/AgentScreenSaver",
  },
  {
    name: "ZohCLI",
    description:
      "Fast CLI for Zoho Mail and Admin APIs with OAuth2, 8 data centers, and scriptable output formats.",
    tech: ["Go", "CLI", "OAuth2"],
    category: "apps & tools",
    url: "https://github.com/SeMmyT/zohcli",
  },
  {
    name: "CargoReimagined Helper",
    description:
      "Chrome extension that enhances Gmail interaction for cargo bidding workflows.",
    tech: ["TypeScript", "Chrome"],
    category: "apps & tools",
    url: "https://github.com/SeMmyT/CargoReimagined-Helper",
  },
  {
    name: "OLED ScreenSaver",
    description:
      "Workaround for running screensaver after idle time when blocked by background apps.",
    tech: ["C#", "Windows"],
    category: "apps & tools",
    url: "https://github.com/SeMmyT/simple-oled-screensaver",
  },
  {
    name: "Orchestrator ScreenSaver",
    description:
      "1-bit dither screensaver for the OG orchestration field. Floyd-Steinberg, Mac-1988-meets-Minority-Report aesthetic.",
    tech: ["TypeScript", "Canvas"],
    category: "apps & tools",
    url: "https://github.com/SeMmyT/orchestrator-screensaver",
  },
  {
    name: "YT CLI",
    description: "YouTube CLI tool.",
    tech: ["TypeScript", "CLI"],
    category: "apps & tools",
  },

  // ── Gaming ──
  {
    name: "Ghost Hunt",
    description:
      "Cross-platform co-op game — ghosts hunt a target in a dithered 1-bit maze. VR, PC, Switch, mobile.",
    tech: ["Unity", "C#", "Photon"],
    category: "gaming",
    url: "https://github.com/SeMmyT/ghost-hunt",
  },
  {
    name: "ARC Raiders Data",
    description:
      "Community game data repository for ARC Raiders — items, missions, skills, hideout modules in JSON.",
    tech: ["JSON", "Data"],
    category: "gaming",
    url: "https://github.com/SeMmyT/arcraiders-data",
  },
  {
    name: "ARC Companion",
    description:
      "Windows desktop overlay for ARC Raiders — detects inventory items with price overlays via screen recognition.",
    tech: ["TypeScript", "Tauri", "CV"],
    category: "gaming",
    private: true,
  },

  // ── Web & Ecommerce ──
  {
    name: "CosmeticIQ",
    description:
      "Cosmetic product catalog and browser built with Astro.",
    tech: ["Astro", "TypeScript"],
    category: "web & ecommerce",
    url: "https://github.com/SeMmyT/cosmeticiq",
  },
  {
    name: "SkladIQ",
    description:
      "Ingredient database with safety ratings built with Astro.",
    tech: ["Astro", "TypeScript"],
    category: "web & ecommerce",
    url: "https://github.com/SeMmyT/skladiq",
  },
  {
    name: "RestoGuide",
    description:
      "Restaurant guide by city and cuisine built with Astro.",
    tech: ["Astro", "TypeScript"],
    category: "web & ecommerce",
    url: "https://github.com/SeMmyT/restoguide",
  },
  {
    name: "RE_Holoscape",
    description:
      "3D spatial visualization with MediaPipe hand tracking, React Three Fiber, and Tauri desktop shell.",
    tech: ["TypeScript", "Tauri", "3D"],
    category: "web & ecommerce",
  },

  // ── Hardware ──
  {
    name: "Keychron V6 Max RGB",
    description:
      "Wireless RGB control utility for Keychron V6 Max keyboard via reverse-engineered 2.4GHz protocol.",
    tech: ["Rust", "SDR", "HackRF"],
    category: "hardware",
  },
];
