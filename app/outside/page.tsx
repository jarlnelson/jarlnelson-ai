import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outside — Jarl Nelson",
  description:
    "Eight marathons. Chasing the Abbott World Marathon Majors 6-Star medal.",
};

export default function OutsidePage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-20 prose-custom">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          Outside
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Eight marathons, four majors, the 6-Star ahead.
        </h1>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          I run marathons. Eight finishes so far; four of them are Abbott World Marathon
          Majors, four are not.
        </p>

        <p>
          The current project is the{" "}
          <strong>Abbott World Marathon Majors 6-Star medal</strong> — completing the six world
          majors (Boston, Chicago, New York, Berlin, London, Tokyo). Roughly ten thousand
          finishers worldwide hold it. It is the closest thing distance running has to a global
          credential.
        </p>

        <p>The majors I&apos;ve completed:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Tokyo Marathon — fundraised for a childhood-vaccines charity.</li>
          <li>
            New York Marathon, November 2024 — fundraised for Team for Climate (NY State
            forestry and clean air).
          </li>
          <li>Chicago Marathon, Fall 2025 — qualified by time.</li>
          <li>
            Boston Marathon, the 130th running, April 2026 — qualified by time.
          </li>
        </ul>

        <p>
          <strong>Berlin Marathon</strong> is September 2026; I&apos;m in training now. It will
          be marathon number nine. <strong>London Marathon</strong> in 2027 will be marathon
          ten — and will complete the 6-Star.
        </p>

        <p>
          The qualifying-time entries at Boston and Chicago surprised me as much as anyone. I
          trained for all of this in my mid-fifties.
        </p>

        <p>
          The other four marathons in the count were non-majors — local races, no stories worth
          telling here.
        </p>

        <p>
          What I take from the running, if anything: long projects with no shortcuts. Slow
          compounding. Showing up when you don&apos;t feel like it. The investment-management
          technology arc and the running arc rhyme more than they should.
        </p>
      </div>
    </article>
  );
}
