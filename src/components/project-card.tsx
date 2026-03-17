import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group border border-dashed border-border p-4 transition-all duration-150 hover:border-border-accent hover:shadow-[0_0_12px_rgba(74,222,128,0.15)]">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-sm text-text-muted">{">"}</span>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary">
          {project.name}
        </h3>
        {project.url && (
          <ExternalLink className="ml-auto h-3.5 w-3.5 text-text-muted transition-colors group-hover:text-text-primary" />
        )}
      </div>

      <p className="mb-3 text-sm leading-relaxed text-text-body">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted"
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
