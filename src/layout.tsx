import { Link, Outlet, useLocation } from "react-router";
import { BackgroundCanvas } from "@/components/background-canvas";
import { SocialLinks } from "@/components/social-links";

const navLinks = [
  { to: "/", label: "~" },
  { to: "/blog", label: "blog" },
  { to: "/koans", label: "koans" },
];

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen bg-canvas">
      <BackgroundCanvas />

      <nav className="relative z-10 mx-auto flex max-w-2xl items-center gap-6 px-6 pt-8">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-150 ${
              pathname === to ||
              (to !== "/" && pathname.startsWith(to))
                ? "text-text-primary drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12 lg:py-20">
        <Outlet />
      </main>

      <footer className="relative z-10 mx-auto max-w-2xl px-6 pb-12">
        <div className="h-px border-t border-dashed border-border" />
        <div className="mt-6">
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
