import type { ViewMode, SortMode } from "@/data/projects";

interface ToolbarProps {
  view: ViewMode;
  sort: SortMode;
  onViewChange: (v: ViewMode) => void;
  onSortChange: (s: SortMode) => void;
  total: number;
  publicCount: number;
  privateCount: number;
}

export function ProjectToolbar({
  view,
  sort,
  onViewChange,
  onSortChange,
  total,
  publicCount,
  privateCount,
}: ToolbarProps) {
  const viewBtn = (mode: ViewMode, label: string) => (
    <button
      onClick={() => onViewChange(mode)}
      className={`font-mono text-xs uppercase tracking-wider transition-all ${
        view === mode
          ? "text-text-primary drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
          : "text-text-muted hover:text-text-secondary"
      }`}
    >
      {label}
    </button>
  );

  const sortBtn = (mode: SortMode, label: string) => (
    <button
      onClick={() => onSortChange(mode)}
      className={`font-mono text-xs uppercase tracking-wider transition-all ${
        sort === mode
          ? "text-text-primary drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
          : "text-text-muted hover:text-text-secondary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="font-mono text-xs text-text-muted">$</span>
      {viewBtn("ls", "ls")}
      {viewBtn("grid", "ls -la")}
      {viewBtn("cat", "cat")}
      <span className="font-mono text-xs text-border-strong">|</span>
      {sortBtn("category", "all")}
      {sortBtn("public", `public (${publicCount})`)}
      {sortBtn("private", `private (${privateCount})`)}
      <span className="ml-auto font-mono text-[10px] text-text-muted">
        {total} items
      </span>
    </div>
  );
}
