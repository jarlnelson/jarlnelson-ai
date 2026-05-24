import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Jarl Nelson",
  description:
    "A career that started in 1983 and has stayed inside one industry. Investment-management technology, from PCs to AI agents.",
};

export default function AboutPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-20 prose-custom">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          About
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          A career inside one industry.
        </h1>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          I&apos;ve spent my career inside investment management and watched the technology
          underneath it transform four times. Mainframes to client-server to web to cloud to AI.
          Each transition came with new vocabulary; the underlying business has stayed remarkably
          consistent.
        </p>

        <p>
          The starting point is 1983, when I was thirteen, selling and servicing computers at a
          small shop in San Diego. I worked through high school doing it — Gompers, a magnet for
          computers, science and math — and at twenty I co-owned a computer consulting and
          retail firm that grew to a million-and-a-half in annual revenue. We sold systems to
          Hughes Aircraft, CSC, General Dynamics, the U.S. Navy. Two thousand computers to the
          Russian government, around the time the Berlin Wall came down. From there, two years
          at ComputerLand of San Diego as a Senior Systems Engineer — voted Systems Engineer of
          the Year both years, posting record billings.
        </p>

        <p>
          In 1996 I joined Duncan-Hurst Capital Management as their first IT hire. Eighteen
          months later I was IT Director, reporting to the CEO; by the end I was VP of
          Information Technology and a Limited Partner. The firm grew from $1B to $8B in
          assets under management while I was there. Over thirteen years I co-built a
          real-time portfolio performance and attribution system that financial-systems
          vendors tried to buy from us, ran the firm&apos;s first disaster-recovery program,
          and managed Y2K.
        </p>

        <p>
          As the firm wound down and headcount shrank, Beau Duncan — the majority owner and
          CEO — began giving me progressively more of the firm to run. I took on compliance
          administration. I became the backup trader when our main trader was on PTO. I
          worked on the financials and served as the day-to-day interface with outside legal
          counsel. By the end I had sat in nearly every chair on the buy-side: operations,
          trading, compliance, finance, legal, technology. The CEO&apos;s phrase that stuck
          was: <em>&ldquo;Give it to Jarl, he gets things done.&rdquo;</em>
        </p>

        <p>
          After Duncan-Hurst closed I spent four years as Senior Business Systems Analyst at
          Relational Investors, an $8 billion activist equity firm. I implemented the
          firm&apos;s first automated trade order management system, built out our first
          disaster-recovery site — and was called on to invoke a real recovery when a regional
          power outage took the office down. The DR test wasn&apos;t a test that day.
        </p>

        <p>
          A few years in, the firm also started having me serve as backup to the head trader
          when he was away. The trading itself was mechanical — orders routed through VWAP
          algorithms — but the responsibility was real: an eight-billion-dollar activist
          fund&apos;s trading desk, on my watch.
        </p>

        <p>
          In 2014 I joined INDATA, the software firm whose OMS I had selected for Duncan-Hurst
          years earlier. Twelve years in, I&apos;m still here as Director of Product Management,
          reporting directly to the active owner and cofounder. I lead a team of ten developers
          — backlog, product roadmap, stakeholder interface — and I&apos;m the sole merge
          authority on the Nexus repositories. Inside the firm I&apos;m the AI-tooling champion:
          I rolled out GitHub Copilot to the engineering team, brought in Claude Team accounts
          for Claude Code, and run regular internal sessions on shipping with AI assistance.
        </p>

        <p>
          The work I&apos;m proudest of is the most recent. From February 2025 through May 2026
          I designed and built <a href="/work/nexus">INDATA Nexus</a>, our AI Platform for
          buy-side firms. I built it solo, using Claude Code as my development partner. It
          launched publicly in May 2026 and is in production at one client today, with more
          rollouts in progress. A new &ldquo;AI-forward&rdquo; developer is about to join the
          team to help extend it.
        </p>

        <p>
          Between 2024 and 2026 I worked through three of Edward Donner&apos;s curricula on
          modern AI engineering — LLM application development end-to-end, building real agent
          systems with LangGraph and the major agent SDKs, and working with agentic IDEs
          including Claude Code, Antigravity, and MCP tooling. The reading and exercises ran
          alongside the building, not before it. Continuous learning at fifty-five isn&apos;t a
          virtue at this point; it&apos;s the table stakes of working in this field.
        </p>

        <p>
          Outside the building I run marathons — <a href="/outside">eight finishes so far</a>,
          four of them Abbott World Marathon Majors. Boston this April (qualified by time),
          Chicago last fall (also qualified). Berlin in September will be number nine. London in
          2027 will be number ten — and will complete the 6-Star.
        </p>

        <p>That&apos;s the shape of it.</p>
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Available for select conversations.{" "}
        <a
          href="mailto:jarlnelson@outlook.com"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          jarlnelson@outlook.com
        </a>
      </div>
    </article>
  );
}
