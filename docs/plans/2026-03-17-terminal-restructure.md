# Terminal Portfolio Restructure

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Restructure semmy.dev from a bare icon-grid name card into a terminal-themed single-scroll portfolio with real project descriptions, tech tags, and terminal green phosphor aesthetic.

**Architecture:** Single-page React SPA (no router). Apply StyleTerminal@1.0.0 design tokens blended with existing dark base. Full monospace for headings/labels/chrome, Inter for body text. Scrollable sections: hero, projects grid, social footer. Nuke squircle icons, unused shadcn CSS vars, and the neato.fun clone approach.

**Tech Stack:** Vite 8, React 19, TypeScript, Tailwind CSS v4, lucide-react

**Prefabs used:**
- `StyleTerminal@1.0.0` — design tokens (adapted into index.css)
- ThemeSwitcher skipped — terminal aesthetic is dark-only

---

### Task 1: Nuke unused CSS & apply StyleTerminal tokens

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

**Step 1: Replace src/index.css**

Nuke the entire file. The `:root`/`.dark` blocks (lines 32-99), `@theme inline` (lines 101-141), and `@fontsource-variable/geist` import are all unused. Replace with StyleTerminal-adapted tokens:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* StyleTerminal@1.0.0 — adapted */
  --color-canvas: #000000;
  --color-surface: #0a0f0a;
  --color-surface-hover: #122012;

  --color-text-primary: #4ade80;
  --color-text-secondary: #22c55e;
  --color-text-muted: #166534;
  --color-text-body: #d1d5db;

  --color-border: #1a2f1a;
  --color-border-strong: #22c55e;
  --color-border-accent: #4ade80;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
}

@layer base {
  body {
    @apply antialiased bg-canvas text-text-body;
    font-family: var(--font-sans);
  }
}
```

Key changes from current:
- Remove `shadcn/tailwind.css` import (unused, pulls in oklch vars)
- Remove `@fontsource-variable/geist` import (using Inter + system mono)
- Remove `@custom-variant dark` (no dark toggle)
- Remove all `:root`, `.dark`, `@theme inline` blocks (100+ lines of unused shadcn vars)
- Add `--color-text-body: #d1d5db` for readable paragraph text (gray-300, not green)
- Add `--font-mono` for terminal headings/labels
- Terminal green palette from StyleTerminal@1.0.0 tokens

**Step 2: Remove Google Fonts link from index.html if switching to system mono**

Keep Inter font link in index.html (still used for body text). No changes needed to index.html for this step.

**Step 3: Verify dev server starts with new CSS**

```bash
pnpm dev
```

Expected: Site renders with green text on black. Existing components may look off (that's fine, we rebuild them next).

**Step 4: Commit**

```bash
git add src/index.css
git commit -m "refactor: nuke unused shadcn CSS, apply StyleTerminal tokens"
```

---

### Task 2: Update background canvas to terminal green

**Files:**
- Modify: `src/components/background-canvas.tsx`

**Step 1: Change particle color to terminal green**

In the `draw()` function, change:
```ts
// OLD:
ctx!.fillStyle = `rgba(237, 237, 237, ${p.opacity})`;

// NEW:
ctx!.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
```

This uses `#4ade80` (--color-text-primary) in rgba form.

**Step 2: Reduce particle density for subtlety**

Change divisor from 8000 to 12000:
```ts
const count = Math.floor((canvas!.width * canvas!.height) / 12000);
```

Fewer particles = more subtle digital noise effect. Terminal glow carries the vibe, not particle density.

**Step 3: Reduce max opacity**

Change:
```ts
opacity: Math.random() * 0.3 + 0.05,
// to:
opacity: Math.random() * 0.2 + 0.03,
```

Green particles are more visible than white — dial back opacity.

**Step 4: Commit**

```bash
git add src/components/background-canvas.tsx
git commit -m "feat: terminal green particles with reduced density"
```

---

### Task 3: Rebuild project data with descriptions and tech tags

**Files:**
- Modify: `src/data/projects.ts`

**Step 1: Add `tech` field and update all projects**

```ts
export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    name: "Surf CLI",
    description: "Browser automation for AI agents via Chrome DevTools Protocol. Fork with stealth mode, DOM extraction, and screenshot pipelines.",
    tech: ["TypeScript", "CDP", "CLI"],
    url: "https://github.com/nicobailon/surf-cli",
  },
  {
    name: "Memory Chain",
    description: "Ed25519-signed append-only memory chain for AI agents. Tamper-evident session persistence with cryptographic verification.",
    tech: ["TypeScript", "Ed25519", "CLI"],
    url: "https://github.com/SeMmyT/memory-chain",
  },
  {
    name: "Agent Prefab",
    description: "Library of 50+ versioned, copy-paste modules for AI agent development. Themes, components, hooks, Rust audio/image processing.",
    tech: ["TypeScript", "React", "Rust"],
    url: "https://github.com/SeMmyT/agent-prefab",
  },
  {
    name: "ReVisper",
    description: "Real-time voice activity detection pipeline. Silero VAD, rubato resampling, ring-buffer pre-padding for low-latency speech segmentation.",
    tech: ["Rust", "Audio", "VAD"],
  },
  {
    name: "Dotfiles",
    description: "System configuration for WSL2, WezTerm, Neovim, Claude Code. Hooks, skills, and agent memory architecture.",
    tech: ["Shell", "Lua", "Config"],
    url: "https://github.com/SeMmyT/dotfiles",
  },
];
```

Changes:
- Remove `colors` field (squircle icons are gone)
- Add `tech: string[]` for tag badges
- Remove "Crawler" project (placeholder with no content)
- Write real descriptions for each project
- 5 projects instead of 6 (only real ones)

**Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: rebuild project data with descriptions and tech tags"
```

---

### Task 4: Rebuild project card in terminal style

**Files:**
- Rewrite: `src/components/project-card.tsx`

**Step 1: Replace entire file with terminal-style card**

```tsx
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group border border-dashed border-border p-4 transition-all duration-150 hover:border-border-accent hover:shadow-[0_0_12px_rgba(74,222,128,0.15)]">
      {/* Header row: name + optional link icon */}
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-sm text-text-muted">{">"}</span>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary">
          {project.name}
        </h3>
        {project.url && (
          <ExternalLink className="ml-auto h-3.5 w-3.5 text-text-muted transition-colors group-hover:text-text-primary" />
        )}
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed text-text-body">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-text-muted border border-border px-1.5 py-0.5"
          >
            [{tag}]
          </span>
        ))}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
```

Design:
- Dashed border (terminal containment) with green glow on hover
- `> ProjectName` monospace header with tracking
- Body text in Inter (readable gray, not green)
- `[TAG]` badges in monospace, muted, bordered
- External link icon appears for projects with URLs
- No squircle icons, no gradients, no SVG noise overlay

**Step 2: Commit**

```bash
git add src/components/project-card.tsx
git commit -m "feat: terminal-style project cards with descriptions and tags"
```

---

### Task 5: Rebuild social links in terminal style

**Files:**
- Modify: `src/components/social-links.tsx`

**Step 1: Update styling to match terminal theme**

```tsx
import { Github, Mail, Twitter } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/SeMmyT", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/SeMmyT", label: "X" },
  { icon: Mail, href: "mailto:hello@semmy.dev", label: "Email" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-6">
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center gap-2 text-text-muted transition-all duration-150 hover:text-text-primary hover:drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
        >
          <Icon className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
```

Changes:
- Show labels next to icons (not icons only)
- Monospace uppercase labels
- Green glow on hover via drop-shadow
- Wider spacing between items

**Step 2: Commit**

```bash
git add src/components/social-links.tsx
git commit -m "feat: terminal-style social links with labels"
```

---

### Task 6: Restructure App.tsx into scrollable sections

**Files:**
- Rewrite: `src/App.tsx`

**Step 1: Replace with sectioned layout**

```tsx
import { BackgroundCanvas } from "@/components/background-canvas";
import { ProjectCard } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { projects } from "@/data/projects";

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <div className="h-px flex-1 border-t border-dashed border-border" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <BackgroundCanvas />

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-20 lg:py-32">
        {/* Hero */}
        <section className="mb-16">
          <h1
            className="font-mono text-3xl font-bold tracking-wider text-text-primary lg:text-4xl"
            style={{ textShadow: "0 0 8px rgba(74, 222, 128, 0.5)" }}
          >
            {">"} SeMmy_
          </h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-widest text-text-muted">
            software engineer :: dev tools :: infrastructure
          </p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-text-body">
            Building developer tools and AI agent infrastructure in TypeScript
            and Rust. Browser automation, cryptographic memory, voice pipelines,
            and the systems that connect them.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <SectionDivider label="projects" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        {/* Connect */}
        <section>
          <SectionDivider label="connect" />
          <div className="mt-6">
            <SocialLinks />
          </div>
        </section>
      </main>
    </div>
  );
}
```

Key changes:
- `min-h-screen` instead of `h-screen` — scrollable, not viewport-locked
- `max-w-2xl` centered content column
- `py-20 lg:py-32` — generous top padding, hero starts below fold on large screens
- `> SeMmy_` with text-shadow glow
- `software engineer :: dev tools :: infrastructure` status line
- Brief bio paragraph in readable gray (not green)
- `──── PROJECTS ────` and `──── CONNECT ────` section dividers with dashed lines
- 2-column grid for projects on `sm:` breakpoint
- No more `flex h-screen justify-center` centering — this is a page, not a card

**Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: restructure into terminal-themed scrollable sections"
```

---

### Task 7: Update favicon and meta

**Files:**
- Modify: `public/favicon.svg`
- Modify: `index.html`
- Modify: `package.json`

**Step 1: Terminal-green favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#000"/>
  <text x="16" y="22" text-anchor="middle" fill="#4ade80" font-family="monospace" font-size="18" font-weight="700">&gt;</text>
</svg>
```

A green `>` prompt on black — matches the terminal theme better than "S".

**Step 2: Update index.html**

Remove the Google Fonts Inter link — we can self-host or use system sans:

Actually, keep Inter. It's a good body font. No changes to index.html beyond verifying meta tags are correct.

**Step 3: Fix package.json name**

```json
"name": "semmy-dev"
```

Change from "vite-scaffold" to "semmy-dev".

**Step 4: Commit**

```bash
git add public/favicon.svg package.json
git commit -m "chore: terminal favicon and fix package name"
```

---

### Task 8: Remove unused dependencies

**Files:**
- Modify: `package.json`

**Step 1: Remove packages no longer used**

```bash
pnpm remove @base-ui/react @fontsource-variable/geist shadcn class-variance-authority
```

These were for shadcn/ui components we're no longer using. Keep:
- `lucide-react` (icons)
- `clsx` + `tailwind-merge` (utility, may use later)
- `tw-animate-css` (animation utilities)

**Step 2: Remove shadcn config**

Delete `components.json` — no longer using shadcn/ui.

Also delete `src/components/ui/button.tsx` and `src/lib/utils.ts` if they exist and are unused.

**Step 3: Verify build**

```bash
pnpm build
```

Expected: Clean build with no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused shadcn dependencies and config"
```

---

## Verification

After all tasks:

1. `pnpm dev` — site renders terminal-themed portfolio
2. `pnpm build` — clean production build
3. Visual check at 375px, 768px, 1440px widths
4. All project links open correctly
5. Social links work
6. Particle canvas shows green particles
7. Favicon shows green `>` prompt
