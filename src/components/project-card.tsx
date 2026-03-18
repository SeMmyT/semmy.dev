import { ExternalLink, Lock } from "lucide-react";
import type { Project, ViewMode } from "@/data/projects";

function LinkButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border border-dashed border-border-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary transition-all hover:bg-surface-hover hover:text-text-primary hover:shadow-[0_0_8px_rgba(74,222,128,0.3)]"
    >
      <ExternalLink className="h-2.5 w-2.5" />
      view
    </a>
  );
}

function CardView({ project }: { project: Project }) {
  return (
    <div className="group border border-dashed border-border p-4 transition-all duration-150 hover:border-border-accent hover:shadow-[0_0_12px_rgba(74,222,128,0.15)]">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-sm text-text-muted">{">"}</span>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary">
          {project.name}
        </h3>
        {project.private && (
          <Lock className="ml-auto h-3 w-3 text-text-muted" />
        )}
      </div>
      <p className="mb-3 text-sm leading-relaxed text-text-body">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted"
          >
            [{tag}]
          </span>
        ))}
        {project.private && (
          <span className="px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
            [private]
          </span>
        )}
        {project.url && !project.private && (
          <span className="ml-auto">
            <LinkButton url={project.url} />
          </span>
        )}
      </div>
    </div>
  );
}

function ListView({ project }: { project: Project }) {
  return (
    <div className="group flex items-center gap-3 border-b border-dashed border-border px-2 py-2 transition-all duration-150 hover:bg-surface-hover">
      <span className="font-mono text-xs text-text-muted">{">"}</span>
      <span className="min-w-0 flex-shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
        {project.name}
      </span>
      <span className="hidden min-w-0 flex-1 truncate text-xs text-text-body sm:block">
        {project.description}
      </span>
      <div className="ml-auto flex flex-shrink-0 items-center gap-1.5">
        {project.tech.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-text-muted"
          >
            [{tag}]
          </span>
        ))}
        {project.private ? (
          <Lock className="h-3 w-3 text-text-muted" />
        ) : project.url ? (
          <LinkButton url={project.url} />
        ) : null}
      </div>
    </div>
  );
}

function CatView({ project }: { project: Project }) {
  return (
    <div className="group border border-dashed border-border p-6 transition-all duration-150 hover:border-border-accent hover:shadow-[0_0_16px_rgba(74,222,128,0.2)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-base text-text-muted">{">"}</span>
        <h3 className="font-mono text-base font-bold uppercase tracking-wider text-text-primary">
          {project.name}
        </h3>
        {project.private && (
          <Lock className="ml-auto h-4 w-4 text-text-muted" />
        )}
      </div>
      <p className="mb-4 leading-relaxed text-text-body">
        {project.description}
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-1 font-mono text-xs uppercase tracking-wider text-text-muted"
          >
            [{tag}]
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span>{project.category}</span>
        {project.private && <span>:: private</span>}
        {project.url && !project.private && (
          <span className="ml-auto">
            <LinkButton url={project.url} />
          </span>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  view,
}: {
  project: Project;
  view: ViewMode;
}) {
  const ViewComponent =
    view === "ls" ? ListView : view === "cat" ? CatView : CardView;

  return <ViewComponent project={project} />;
}
