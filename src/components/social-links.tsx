import { Github, Mail, Twitter } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/SeMmyT", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/SeMmyTrane", label: "X" },
  { icon: Mail, href: "mailto:hello@semmy.dev", label: "Email" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-6">
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center gap-2 text-text-muted transition-all duration-150 hover:text-text-primary hover:drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]"
        >
          <Icon className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
