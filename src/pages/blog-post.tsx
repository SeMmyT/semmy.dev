import { useParams, Link } from "react-router";
import { blogPosts } from "@/data/blog-posts";

function renderMarkdown(md: string) {
  const blocks = md.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Headings
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mb-4 mt-10 font-mono text-lg font-bold tracking-wide text-text-primary"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mb-3 mt-8 font-mono text-sm font-bold uppercase tracking-widest text-text-secondary"
        >
          {trimmed.slice(4)}
        </h3>
      );
    }

    // Code blocks
    if (trimmed.startsWith("```")) {
      const lines = trimmed.split("\n");
      const lang = lines[0].slice(3);
      const code = lines.slice(1, -1).join("\n");
      return (
        <div key={i} className="my-4">
          {lang && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {lang}
            </span>
          )}
          <pre className="mt-1 overflow-x-auto border border-dashed border-border bg-surface p-4 font-mono text-xs leading-relaxed text-text-body">
            {code}
          </pre>
        </div>
      );
    }

    // Lists
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="my-3 space-y-1">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex gap-2 text-sm leading-relaxed text-text-body"
            >
              <span className="text-text-muted">-</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: inlineMarkdown(item.slice(2)),
                }}
              />
            </li>
          ))}
        </ul>
      );
    }

    // Paragraph
    return (
      <p
        key={i}
        className="my-3 text-sm leading-relaxed text-text-body"
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(trimmed) }}
      />
    );
  });
}

function inlineMarkdown(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-text-secondary underline decoration-dashed underline-offset-2 hover:text-text-primary">$1</a>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-surface px-1.5 py-0.5 font-mono text-xs text-text-secondary">$1</code>'
    )
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-bold text-text-secondary">$1</strong>'
    );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="font-mono text-sm text-text-muted">404 — post not found</p>
        <Link
          to="/blog"
          className="mt-4 inline-block font-mono text-xs text-text-secondary underline decoration-dashed"
        >
          back to blog
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="mb-8">
        <Link
          to="/blog"
          className="font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
        >
          {"<"}- blog
        </Link>
      </div>

      <header className="mb-8">
        <h1
          className="font-mono text-xl font-bold tracking-wide text-text-primary lg:text-2xl"
          style={{ textShadow: "0 0 6px rgba(74, 222, 128, 0.4)" }}
        >
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-mono text-[10px] text-text-muted">
            {post.date}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-text-muted"
            >
              [{tag}]
            </span>
          ))}
        </div>
      </header>

      <div>{renderMarkdown(post.content)}</div>
    </article>
  );
}
