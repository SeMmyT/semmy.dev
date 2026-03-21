import { useState, useMemo } from "react";
import { Lock, MessageCircle } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectToolbar } from "@/components/project-toolbar";
import {
  projects,
  categories,
  type ViewMode,
  type SortMode,
} from "@/data/projects";

const privatePortfolio = [
  { name: "Січ", hint: "Military-grade logistics and coordination platform" },
  { name: "Кухня / WinningWarsLLC", hint: "Defense-tech operations and field management" },
  { name: "Noosphere", hint: "Penetration testing and security audit framework" },
  { name: "Trishchyna", hint: "Real estate analytics and market intelligence" },
  { name: "METASHIELD", hint: "AI-powered metadata sanitization and OPSEC tooling" },
];

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

export default function Home() {
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
    <>
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

      {/* Private Portfolio */}
      <section className="mb-16">
        <SectionDivider label="private portfolio" />
        <p className="mt-4 text-xs text-text-muted">
          Select work under NDA or restricted access.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {privatePortfolio.map(({ name, hint }) => (
            <div
              key={name}
              className="relative overflow-hidden border border-dashed border-border p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Lock className="h-3 w-3 text-text-muted" />
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-text-muted">
                  {name}
                </span>
              </div>
              <p className="text-sm text-text-body select-none blur-[5px]">
                {hint}
              </p>
            </div>
          ))}

          <a
            href="https://wa.me/380992069421"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 border border-dashed border-border-strong p-4 transition-all duration-150 hover:bg-surface-hover hover:shadow-[0_0_12px_rgba(74,222,128,0.15)]"
          >
            <MessageCircle className="h-5 w-5 text-text-secondary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-secondary">
              DM for access
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
