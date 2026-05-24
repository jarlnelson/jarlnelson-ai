import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AskJarlChat from "@/components/AskJarlChat";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-12 sm:pt-24">
      {/* Hero */}
      <section className="mb-20 sm:mb-28">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">
          I build investment-management technology.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 max-w-2xl">
          Most recently: <span className="font-medium text-zinc-900 dark:text-zinc-100">INDATA Nexus&trade;</span> — a
          production AI agent for buy-side firms. Built solo, with Claude Code.
        </p>
        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Three decades in the industry. Currently leading product for AI at INDATA.
        </p>
      </section>

      {/* Featured work */}
      <section className="mb-20 sm:mb-24">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
          Featured work
        </div>
        <Link
          href="/work/nexus"
          className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-6 sm:p-8 transition-colors"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
            INDATA Nexus&trade;
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
            Building a production AI agent for buy-side investment management — five intent paths,
            an MCP server for external AI clients, LLM-neutral architecture, and a conscious privacy
            trade-off honestly told. Launched May 2026; in production at one client today, with more
            rollouts in progress.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-accent dark:text-accent-dark font-medium">
            Read the case study
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20 sm:mb-24">
        <Link
          href="/about"
          className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-5 transition-colors"
        >
          <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
            About
          </div>
          <div className="text-base font-medium group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
            A career that started in 1983, in one industry.
          </div>
        </Link>
        <Link
          href="/writing"
          className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-5 transition-colors"
        >
          <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
            Writing
          </div>
          <div className="text-base font-medium group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
            Notes on agent architecture and AI-assisted development.
          </div>
        </Link>
        <Link
          href="/outside"
          className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-5 transition-colors"
        >
          <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
            Outside
          </div>
          <div className="text-base font-medium group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
            Eight marathons, four majors. Chasing the 6-Star.
          </div>
        </Link>
      </section>

      {/* Ask Jarl */}
      <section className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
          Ask the agent
        </div>
        <AskJarlChat />
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Built with the same patterns I ship at INDATA — streaming, system-prompted, rate-limited.
          Source on GitHub.
        </p>
      </section>
    </div>
  );
}
