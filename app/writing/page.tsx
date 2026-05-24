import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing — Jarl Nelson",
  description:
    "Essays from inside the work — agent architecture in financial services, AI-assisted development at production scale, and the design trade-offs in between.",
};

interface Essay {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

const essays: Essay[] = [
  {
    slug: "claude-code-and-antigravity",
    title:
      "Claude Code, Google Antigravity, and shipping production AI software in 2026.",
    excerpt:
      "Notes from shipping both halves of an AI agent platform with both major agentic IDEs of 2025–2026. What I learned, where each shines, and why I migrated.",
    date: "May 2026",
    readingTime: "9 min read",
  },
  {
    slug: "mcp-servers-buy-side",
    title: "MCP servers and the buy-side: what it changes, what it doesn't.",
    excerpt:
      "Reflections from publishing a production Model Context Protocol server for buy-side investment-management data — and what I'd tell another vendor before they shipped one.",
    date: "May 2026",
    readingTime: "6 min read",
  },
  {
    slug: "privacy-tradeoff",
    title: "The privacy trade-off no AI agent paper wants to discuss.",
    excerpt:
      "The honest two-part framing for AI agents on regulated data: schema-only at query construction, results sent under commercial privacy guarantees at narrative time. Why precision earns more trust than the simple claim.",
    date: "May 2026",
    readingTime: "5 min read",
  },
];

export default function WritingPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          Writing
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Notes from inside the work.
        </h1>
        <p className="mt-5 text-zinc-600 dark:text-zinc-300 text-[17px] leading-relaxed">
          Short essays on agent architecture in financial services, the design
          trade-offs between conversational narrative and data privacy, and
          what it has actually been like to ship production AI software with
          both major agentic IDEs of 2025–2026.
        </p>
      </header>

      <div className="space-y-5">
        {essays.map((essay) => (
          <Link
            key={essay.slug}
            href={`/writing/${essay.slug}`}
            className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-6 transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
              {essay.date} · {essay.readingTime}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 leading-snug group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
              {essay.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px] mb-4">
              {essay.excerpt}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-accent dark:text-accent-dark font-medium">
              Read
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        More essays in draft. If you&apos;d like an email when the next piece
        lands, just write to me at{" "}
        <a
          href="mailto:jarlnelson@outlook.com"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          jarlnelson@outlook.com
        </a>{" "}
        and I&apos;ll add you to a small private list. No newsletter platform,
        no tracking pixels — just a personal CC field.
      </div>
    </article>
  );
}
