import { useState, useMemo } from "react";
import { BackgroundCanvas } from "@/components/background-canvas";
import { ProjectCard } from "@/components/project-card";
import { ProjectToolbar } from "@/components/project-toolbar";
import { SocialLinks } from "@/components/social-links";
import {
  projects,
  categories,
  type ViewMode,
  type SortMode,
} from "@/data/projects";

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

const stack = [
  { label: "CPU", value: "AMD Ryzen 7 7800X3D" },
  { label: "GPU", value: "NVIDIA RTX 4070 Ti" },
  { label: "Board", value: "ASRock B650 PG Lightning" },
  { label: "Storage", value: "1TB + 2TB NVMe" },
  { label: "Network", value: "Realtek 2.5GbE + Tailscale" },
  { label: "OS", value: "Windows 11 + WSL2 (Ubuntu)" },
  { label: "Displays", value: "MSI MPG271QX OLED + ASUS VG249" },
  { label: "Audio", value: "Sound Blaster GC7" },
  { label: "Keyboard", value: "Keychron V6 Max" },
  { label: "Mouse", value: "Logitech Lightspeed" },
  { label: "Camera", value: "Razer Kiyo Pro" },
  { label: "Security", value: "YubiKey + TPM 2.0" },
  { label: "BT", value: "ASUS USB-BT500" },
  { label: "VR", value: "Meta Quest + Virtual Desktop" },
  { label: "Portable", value: "Steam Deck + Mac Mini" },
];

export default function App() {
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortMode>("category");

  const publicCount = projects.filter((p) => !p.private).length;
  const privateCount = projects.filter((p) => p.private).length;

  const sorted = useMemo(() => {
    if (sort === "public")
      return [...projects].sort((a, b) =>
        a.private === b.private ? 0 : a.private ? 1 : -1
      );
    if (sort === "private")
      return [...projects].sort((a, b) =>
        a.private === b.private ? 0 : a.private ? -1 : 1
      );
    return projects;
  }, [sort]);

  const gridClass =
    view === "ls"
      ? ""
      : view === "cat"
        ? "grid gap-4"
        : "grid gap-3 sm:grid-cols-2";

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
          <div className="mt-4">
            <ProjectToolbar
              view={view}
              sort={sort}
              onViewChange={setView}
              onSortChange={setSort}
              total={projects.length}
              publicCount={publicCount}
              privateCount={privateCount}
            />

            {sort === "category" ? (
              categories.map((category) => {
                const items = sorted.filter((p) => p.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category} className="mb-8">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      // {category}
                    </p>
                    <div className={gridClass}>
                      {items.map((project) => (
                        <ProjectCard
                          key={project.name}
                          project={project}
                          view={view}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={gridClass}>
                {sorted.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    view={view}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stack */}
        <section className="mb-16">
          <SectionDivider label="stack" />
          <div className="mt-4 space-y-1">
            {stack.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className="w-20 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {label}
                </span>
                <span className="font-mono text-xs text-text-body">
                  {value}
                </span>
              </div>
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
