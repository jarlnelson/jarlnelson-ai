"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/outside", label: "Outside" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-lg hover:text-accent dark:hover:text-accent-dark transition-colors"
        >
          Jarl Nelson
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <ul className="hidden sm:flex items-center gap-5 text-sm">
            {links.slice(1).map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive
                        ? "text-zinc-900 dark:text-zinc-100 font-medium"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
      {/* Mobile nav */}
      <nav className="sm:hidden border-t border-zinc-200 dark:border-zinc-800">
        <ul className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4 text-sm overflow-x-auto">
          {links.slice(1).map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href} className="flex-shrink-0">
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100 font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
