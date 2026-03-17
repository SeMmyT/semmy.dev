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
