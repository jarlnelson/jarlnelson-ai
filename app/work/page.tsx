import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Jarl Nelson",
  description: "Selected work, currently centered on INDATA Nexus.",
};

export default function WorkIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          Work
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Selected work.
        </h1>
      </header>

      <Link
        href="/work/nexus"
        className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 p-6 sm:p-8 transition-colors"
      >
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
          2025 – present · INDATA
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
          INDATA Nexus&trade;
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
          A production AI Platform for buy-side investment management. Five intent paths, an MCP
          server for external AI clients, LLM-neutral architecture, conversational narrative with
          honest privacy controls. Designed and built solo with Claude Code. Launched May 2026.
        </p>
        <div className="flex items-center gap-1.5 text-sm text-accent dark:text-accent-dark font-medium">
          Read the case study
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      <div className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        Earlier work — Relational Investors, Duncan-Hurst Capital Management, ComputerLand of San
        Diego — covered in the <Link href="/about" className="text-accent dark:text-accent-dark hover:underline">about</Link> page.
      </div>
    </div>
  );
}
