import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 sm:py-32 text-center">
      <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
        404
      </div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6">
        Not here.
      </h1>
      <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed mb-8">
        The page you were looking for doesn&apos;t exist — or hasn&apos;t been written yet.
        Either way, no harm done.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
        <Link
          href="/"
          className="text-accent dark:text-accent-dark hover:underline font-medium"
        >
          Back to home
        </Link>
        <span className="hidden sm:block text-zinc-300 dark:text-zinc-700">·</span>
        <Link
          href="/work/nexus"
          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Read the NEXUS case study
        </Link>
      </div>
    </div>
  );
}
