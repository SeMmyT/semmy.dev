# SeMmy.dev Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Build a dark, minimal portfolio site at semmy.dev in the style of studio.neato.fun — centered hero, project icon grid, subtle canvas background animation.

**Architecture:** Single-page React app with Vite. Dark theme built on Tailwind CSS with shadcn/ui components. Custom canvas background renders subtle generative dots/particles. Project grid uses icon cards with hover effects. Content is hardcoded (no CMS). Deployed to Cloudflare Pages via the existing semmy.dev domain.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, canvas API

---

## Design Tokens (extracted from studio.neato.fun)

```
Background:    #000000 (pure black)
Text Primary:  #ededed (rgb 237,237,237)
Text Secondary:#a0a0a0 (rgb 160,160,160)
Text Muted:    #4a4a4a (rgb 74,74,74)
Hover BG:      white/15 (rgba 255,255,255,0.15)
Font:          Inter, ui-sans-serif, system-ui, sans-serif
Heading:       2.5rem, font-semibold, tracking-tight
Subtitle:      text-sm
Labels:        text-xs (desktop), 10px (mobile)
Icon size:     56px desktop (h-14 w-14), 40px mobile (h-10 w-10)
Icon shape:    squircle (8px radius on 27px viewBox)
Grid:          4-col mobile, flex row desktop, gap-4/gap-6
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `tailwind.config.ts`, `postcss.config.js` (if needed by Tailwind v4)
- Create: `.gitignore`

**Step 1: Initialize Vite + React + TypeScript project**

```bash
cd /home/semmy/codeprojects/semmy.dev
pnpm create vite . --template react-ts
```

If directory not empty, accept overwrite for config files only.

**Step 2: Install dependencies**

```bash
pnpm install
```

**Step 3: Install Tailwind CSS v4**

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Update `vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

Replace `src/index.css` with:
```css
@import "tailwindcss";
```

**Step 4: Initialize shadcn/ui**

```bash
pnpx shadcn@latest init
```

Choose: New York style, Zinc color, CSS variables YES.

After init, verify `components.json` exists and `src/lib/utils.ts` was created.

**Step 5: Set up custom theme colors**

In `src/index.css`, add custom theme tokens after the tailwind import:

```css
@import "tailwindcss";

@theme {
  --color-canvas: #000000;
  --color-surface: #0a0a0a;
  --color-text-primary: #ededed;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #4a4a4a;
  --color-border-control: #1a1a1a;
  --color-sidebar: #050505;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

**Step 6: Clean up default Vite boilerplate**

- Delete `src/App.css`
- Replace `src/App.tsx` with minimal shell:

```tsx
export default function App() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-canvas">
      <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
        SeMmy
      </h1>
    </div>
  );
}
```

**Step 7: Verify dev server starts**

```bash
pnpm dev
```

Expected: Dev server at localhost:5173 showing "SeMmy" centered on black background.

**Step 8: Commit**

```bash
git init && git add -A
git commit -m "chore: scaffold Vite + React + Tailwind + shadcn project"
```

---

### Task 2: Canvas Background Animation

**Files:**
- Create: `src/components/background-canvas.tsx`
- Modify: `src/App.tsx`

**Step 1: Create the background canvas component**

A subtle particle/dot field that slowly drifts. Matches the `<canvas>` element on neato.fun.

```tsx
// src/components/background-canvas.tsx
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initParticles() {
      const count = Math.floor((canvas!.width * canvas!.height) / 8000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(237, 237, 237, ${p.opacity})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
    />
  );
}
```

**Step 2: Wire into App**

```tsx
// src/App.tsx
import { BackgroundCanvas } from "@/components/background-canvas";

export default function App() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-canvas">
      <BackgroundCanvas />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-[2.5rem] font-semibold tracking-tight text-text-primary">
            SeMmy
          </h1>
          <p className="text-sm text-text-secondary">
            Software Engineer & Builder
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Verify visually**

```bash
pnpm dev
```

Expected: Black screen with "SeMmy" centered, subtle floating particles in background.

**Step 4: Commit**

```bash
git add src/components/background-canvas.tsx src/App.tsx
git commit -m "feat: add canvas background particle animation"
```

---

### Task 3: Project Icon Grid

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/data/projects.ts`
- Modify: `src/App.tsx`

**Step 1: Define project data**

```ts
// src/data/projects.ts
export interface Project {
  name: string;
  description: string;
  url?: string;
  colors: [string, string]; // gradient pair for icon
}

export const projects: Project[] = [
  {
    name: "Surf CLI",
    description: "AI browser automation",
    url: "https://github.com/nicobailon/surf-cli",
    colors: ["#3b82f6", "#1d4ed8"],
  },
  {
    name: "Memory Chain",
    description: "Ed25519 signed memory",
    url: "https://github.com/SeMmyT/memory-chain",
    colors: ["#8b5cf6", "#6d28d9"],
  },
  {
    name: "Agent Prefab",
    description: "Reusable agent modules",
    url: "https://github.com/SeMmyT/agent-prefab",
    colors: ["#10b981", "#059669"],
  },
  {
    name: "ReVisper",
    description: "Voice activity pipeline",
    colors: ["#f59e0b", "#d97706"],
  },
  {
    name: "Crawler",
    description: "Web scraping toolkit",
    colors: ["#ef4444", "#dc2626"],
  },
  {
    name: "Dotfiles",
    description: "System configuration",
    url: "https://github.com/SeMmyT/dotfiles",
    colors: ["#06b6d4", "#0891b2"],
  },
];
```

**Step 2: Create ProjectCard component**

Replicates the neato.fun icon style: squircle with dithered gradient, label below, hover scale + glow.

```tsx
// src/components/project-card.tsx
import type { Project } from "@/data/projects";

function SquircleIcon({ colors }: { colors: [string, string] }) {
  const id = `grad-${colors[0].replace("#", "")}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      className="h-10 w-10 lg:h-14 lg:w-14"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <path d="M0 16C0 5 5 0 16 0h24c11 0 16 5 16 16v24c0 11-5 16-16 16H16C5 56 0 51 0 40z" />
        </clipPath>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <rect width="56" height="56" fill={`url(#${id})`} />
        {/* Dither-like noise overlay */}
        {Array.from({ length: 64 }, (_, i) => {
          const x = (i % 8) * 7;
          const y = Math.floor(i / 8) * 7;
          const opacity = Math.random() * 0.3;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="7"
              height="7"
              fill={i % 2 === 0 ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)"}
              opacity={opacity}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 transition-all duration-150 hover:bg-white/15 lg:gap-3 lg:p-3"
    >
      <div className="transition-transform duration-150 group-hover:scale-110">
        <SquircleIcon colors={project.colors} />
      </div>
      <span className="text-[10px] text-text-muted transition-colors duration-150 group-hover:text-text-secondary lg:text-xs">
        {project.name}
      </span>
    </Wrapper>
  );
}
```

**Step 3: Wire into App**

```tsx
// src/App.tsx
import { BackgroundCanvas } from "@/components/background-canvas";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export default function App() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-canvas">
      <BackgroundCanvas />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-[2.5rem] font-semibold tracking-tight text-text-primary">
            SeMmy
          </h1>
          <p className="text-sm text-text-secondary">
            Software Engineer & Builder
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 px-6 lg:flex lg:gap-6 lg:px-0">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Verify visually**

```bash
pnpm dev
```

Expected: Centered "SeMmy" with subtitle, row of 6 project icons below with labels. Hover causes scale-up and background glow. Mobile shows 3-column grid.

**Step 5: Commit**

```bash
git add src/components/project-card.tsx src/data/projects.ts src/App.tsx
git commit -m "feat: add project icon grid with squircle icons"
```

---

### Task 4: Social Links & Footer

**Files:**
- Create: `src/components/social-links.tsx`
- Modify: `src/App.tsx`

**Step 1: Install lucide-react for icons**

```bash
pnpm add lucide-react
```

**Step 2: Create social links component**

Minimal row of icon links below the project grid, matching the muted text style.

```tsx
// src/components/social-links.tsx
import { Github, Mail, Twitter } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/SeMmyT", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/SeMmyT", label: "X / Twitter" },
  { icon: Mail, href: "mailto:hello@semmy.dev", label: "Email" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-text-muted transition-colors duration-150 hover:text-text-secondary"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
```

**Step 3: Add to App below project grid**

Add `<SocialLinks />` inside the `z-10` container, below the grid div, with some top margin:

```tsx
import { SocialLinks } from "@/components/social-links";
// ... inside the z-10 div, after the grid:
<SocialLinks />
```

**Step 4: Verify visually**

Expected: Small GitHub/X/Mail icons below the project grid, muted color, brighten on hover.

**Step 5: Commit**

```bash
git add src/components/social-links.tsx src/App.tsx
git commit -m "feat: add social links row"
```

---

### Task 5: Inter Font & HTML Meta

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

**Step 1: Add Inter font via Google Fonts**

In `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Also update meta tags:

```html
<title>SeMmy — Software Engineer</title>
<meta name="description" content="SeMmy's portfolio — software engineer & builder">
<meta property="og:title" content="SeMmy — Software Engineer">
<meta property="og:description" content="Software engineer & builder">
<meta property="og:url" content="https://semmy.dev">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

**Step 2: Ensure font-sans uses Inter**

Already defined in `@theme` block. Add a base layer rule in `src/index.css`:

```css
@layer base {
  body {
    @apply bg-canvas text-text-primary antialiased;
    font-family: var(--font-sans);
  }
}
```

**Step 3: Verify font renders as Inter**

Dev tools → Computed styles on `<h1>` should show `Inter`.

**Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: add Inter font and HTML meta tags"
```

---

### Task 6: Responsive Polish & Favicon

**Files:**
- Create: `public/favicon.svg` (simple S monogram)
- Modify: `index.html`
- Modify: `src/App.tsx` (minor responsive tweaks if needed)

**Step 1: Create SVG favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#000"/>
  <text x="16" y="22" text-anchor="middle" fill="#ededed" font-family="Inter,sans-serif" font-size="18" font-weight="600">S</text>
</svg>
```

**Step 2: Reference in index.html**

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

Remove the default Vite favicon reference.

**Step 3: Test responsive at 375px, 768px, 1440px**

- 375px: 3-col grid, smaller icons (40px), 10px labels
- 768px: flex row, larger icons
- 1440px: flex row, 56px icons, 12px labels

**Step 4: Commit**

```bash
git add public/favicon.svg index.html
git commit -m "feat: add favicon and responsive polish"
```

---

### Task 7: Build & Deploy Prep

**Files:**
- Modify: `package.json` (verify build script)
- Create: `wrangler.toml` (if deploying via Cloudflare Pages CLI) OR just use `pnpm build` output

**Step 1: Verify production build**

```bash
pnpm build
```

Expected: `dist/` folder with optimized assets, no errors.

**Step 2: Preview locally**

```bash
pnpm preview
```

Expected: Production build serves correctly at localhost:4173.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: verify production build"
```

---

## Content Placeholders

The project data in `src/data/projects.ts` uses placeholder projects based on known repos. SeMmy should update:
- Project names, descriptions, URLs
- Color pairs for each icon
- Social link URLs (GitHub, X, email)
- Subtitle text ("Software Engineer & Builder")
- OG image (generate or screenshot after deploy)
