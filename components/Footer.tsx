export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>© {year} Jarl Nelson</div>
          <div className="text-xs">
            San Diego, California · Built with Next.js and Claude Code
          </div>
        </div>
        <div className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-3xl">
          INDATA Nexus&trade; is a product of INDATA. This site reflects my personal
          work and views and is not affiliated with or endorsed by INDATA or its
          affiliates.
        </div>
      </div>
    </footer>
  );
}
