import { Link } from "react-router";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  return (
    <>
      <section className="mb-12">
        <h1
          className="font-mono text-2xl font-bold tracking-wider text-text-primary"
          style={{ textShadow: "0 0 8px rgba(74, 222, 128, 0.5)" }}
        >
          {">"} blog_
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          field notes from the terminal
        </p>
      </section>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block border border-dashed border-border p-5 transition-all duration-150 hover:border-border-strong hover:bg-surface-hover hover:shadow-[0_0_12px_rgba(74,222,128,0.08)]"
          >
            <div className="mb-2 flex items-center gap-3">
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
            <h2 className="font-mono text-sm font-bold tracking-wide text-text-secondary">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-body">
              {post.summary}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
