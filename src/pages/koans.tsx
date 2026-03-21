import { useState } from "react";
import { koans } from "@/data/koans";

export default function Koans() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <section className="mb-12">
        <h1
          className="font-mono text-2xl font-bold tracking-wider text-text-primary"
          style={{ textShadow: "0 0 8px rgba(74, 222, 128, 0.5)" }}
        >
          {">"} koans_
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          attention gates for AI agents
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-body">
          Bug fixes for attention. Each koan addresses a specific failure mode
          observed in AI agent sessions — attention drift, over-engineering,
          context loss, poltergeist output. They're not philosophy. They're
          operational corrections distilled into memorable forms.
        </p>
      </section>

      <div className="space-y-3">
        {koans.map((koan) => {
          const isOpen = expanded === koan.id;
          return (
            <div
              key={koan.id}
              className={`border border-dashed transition-all duration-150 ${
                isOpen
                  ? "border-border-strong bg-surface shadow-[0_0_12px_rgba(74,222,128,0.08)]"
                  : "border-border hover:border-border-strong hover:bg-surface-hover"
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : koan.id)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-muted">
                    {isOpen ? "[-]" : "[+]"}
                  </span>
                  <span className="font-mono text-sm font-bold tracking-wide text-text-secondary">
                    {koan.title}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-text-muted">
                  {koan.date}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-dashed border-border px-4 pb-5 pt-4">
                  {koan.body.split("\n\n").map((para, i) => {
                    const trimmed = para.trim();
                    if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
                      return (
                        <p
                          key={i}
                          className="mt-4 font-mono text-xs italic tracking-wide text-text-primary"
                          style={{
                            textShadow: "0 0 4px rgba(74, 222, 128, 0.3)",
                          }}
                        >
                          {trimmed.slice(1, -1)}
                        </p>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="mt-3 text-sm leading-relaxed text-text-body first:mt-0"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
