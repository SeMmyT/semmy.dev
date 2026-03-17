export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    name: "Memory Chain",
    description:
      "Ed25519-signed append-only memory chain for AI agents. Tamper-evident session persistence with cryptographic verification.",
    tech: ["TypeScript", "Ed25519", "CLI"],
    url: "https://github.com/SeMmyT/memory-chain",
  },
  {
    name: "Agent Prefab",
    description:
      "Library of 50+ versioned, copy-paste modules for AI agent development. Themes, components, hooks, Rust audio/image processing.",
    tech: ["TypeScript", "React", "Rust"],
    url: "https://github.com/SeMmyT/agent-prefab",
  },
  {
    name: "ReVisper",
    description:
      "Real-time voice activity detection pipeline. Silero VAD, rubato resampling, ring-buffer pre-padding for low-latency speech segmentation.",
    tech: ["Rust", "Audio", "VAD"],
  },
];
