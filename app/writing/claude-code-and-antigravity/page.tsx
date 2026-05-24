import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Claude Code, Google Antigravity, and shipping production AI software in 2026 — Jarl Nelson",
  description:
    "Notes from shipping both halves of an AI agent platform with both major agentic IDEs of 2025-2026. What I learned, where each shines, and why I migrated.",
};

export default function ClaudeCodeAndAntigravityEssay() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-20 prose-custom">
      <header className="mb-12">
        <Link
          href="/writing"
          className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-4 inline-block"
        >
          ← Writing
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] mb-4 mt-3">
          Claude Code, Google Antigravity, and shipping production AI software
          in 2026.
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          May 2026 · 9 min read
        </p>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          I have shipped two halves of a production AI agent platform with two
          different agentic IDEs. The backend — about seventeen thousand lines
          of Python orchestrating a five-path LangGraph workflow, an MCP server,
          a Qdrant RAG layer, and a multi-provider LLM abstraction — I built
          from the first commit with Anthropic&apos;s Claude Code. The frontend
          — a React 19 widget designed to embed into INDATA&apos;s flagship
          Architect AI&trade; web application — I built first with Google
          Antigravity, then migrated to Claude Code earlier this year. The
          same codebase, two different tools, in sequence.
        </p>

        <p>
          I don&apos;t think a lot of people in 2026 have done this with real
          stakes attached, so I want to write down what I learned while it&apos;s
          still fresh. The audience I have in mind is the senior engineer or
          engineering leader trying to make a tool call for their team and
          tired of hot takes from people who used each for an afternoon.
        </p>

        <p>
          What follows is one developer&apos;s experience on one project,
          working alone, in a specific industry (buy-side investment-management
          software). Treat it as a single data point. I&apos;ll mark places
          where my conclusions might not generalize.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          A summary, for people who want to leave now
        </h2>

        <p>
          Both tools shipped real software. The backend was built from the
          first commit with Claude Code, run from terminal windows inside VS
          Code. The frontend I deliberately built with Antigravity as a test
          drive of Google&apos;s new agentic IDE — and it worked so well that
          the prototype became the production frontend. I only started touching
          that frontend with Claude Code in the past week, so this essay
          isn&apos;t the &ldquo;I evaluated and chose&rdquo; story it might
          look like. It&apos;s the &ldquo;I shipped real work with both, the
          transition is happening right now, here&apos;s what I&apos;m
          noticing&rdquo; story.
        </p>

        <p>
          That distinction matters. I am not in a position to tell you which
          tool is better — my data points on Claude Code in the frontend are
          still measured in days. What I can do is tell you what each tool
          did well during a substantial production build, and what made me
          start moving from one to the other.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What I built, briefly
        </h2>

        <p>
          The system is{" "}
          <Link
            href="/work/nexus"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            INDATA Nexus
          </Link>{" "}
          — an AI Platform for buy-side investment-management firms. Portfolio
          managers, traders, compliance officers and operations staff
          interact with their holdings, transactions and performance data in
          natural language. There&apos;s a five-path agent that classifies
          intent and routes accordingly; a RAG layer over schema; an MCP
          server that publishes read-only data tools for external clients; and
          an embeddable React widget that lives inside our flagship Architect
          AI host application. I built and maintain the entire thing solo.
          It launched publicly on May 12, 2026.
        </p>

        <p>
          Backend: Python 3.11, FastAPI, LangGraph, Anthropic + OpenAI SDKs,
          Qdrant, Redis, SQL Server. Frontend: React 19, TypeScript, Vite,
          Tailwind, AG Grid, Recharts. Roughly seventeen thousand lines of
          Python and six and a half thousand lines of TypeScript at last
          count, excluding tests, generated artifacts, and the deployment
          guides.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What Claude Code does well in production
        </h2>

        <p>
          The thing I underestimated until I had been using it daily for
          months is the value of a coding agent that lives in the terminal,
          not in an IDE chrome. Claude Code is a command-line tool. It reads
          and writes the same files my editor reads and writes, runs the same
          commands I would run, and treats my project as a long-running
          conversation rather than a series of independent prompts. The
          friction of context-switching out of my normal workflow is
          essentially zero.
        </p>

        <p>
          The pattern that grew on me hardest is the memory file system. In
          the Nexus repo I keep three files —{" "}
          <code>coding_agent_memory/PROJECT_STATUS.md</code>,{" "}
          <code>DECISIONS_LOG.md</code>, and <code>ISSUES_RESOLVED.md</code> —
          and a <code>CLAUDE.md</code> at the project root that tells Claude
          Code how to behave in the repo. Twenty architectural decisions logged
          with dates and rationale; seven non-trivial bug fixes documented;
          the project status updated continuously. When I open a new session
          weeks later, Claude reads those files first and arrives oriented.
          The cumulative effect is that my project has a memory longer than
          any individual conversation, and I almost never re-litigate settled
          decisions or re-solve solved problems.
        </p>

        <p>
          The second pattern that mattered is that Claude Code does
          architectural pushback in a useful way. Early in the Nexus build I
          tried to hard-code a function to extract stock tickers from chain
          query results — a regex over the result rows. Claude&apos;s response
          was effectively, &ldquo;Production agent frameworks don&apos;t
          extract structured data with regex from LLM-adjacent code. Use the
          LLM with a tool schema for argument extraction; here&apos;s the
          pattern from the OpenAI function-calling docs.&rdquo; It logged the
          decision into <code>DECISIONS_LOG.md</code> as D032. Six months
          later that decision still holds. I&apos;d guess this kind of
          principled feedback only works when the agent has a CLAUDE.md that
          tells it what production standards to apply, and when you give it
          the right level of trust to push back. But when it works, it&apos;s
          like having a thoughtful senior engineer in the loop.
        </p>

        <p>
          The third thing is MCP. Claude Code natively understands the Model
          Context Protocol, which meant I could expose INDATA&apos;s internal
          tools to it during development the same way I&apos;d expose them to
          a customer&apos;s AI agent later. Eating my own dogfood with no
          adapter layer accelerated the entire MCP server design — I was the
          first MCP client of the MCP server I was building.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          How I ended up using Antigravity in the first place
        </h2>

        <p>
          I&apos;d been building the backend exclusively in Claude Code for
          months. When it came time to start the frontend, I had a choice
          that wasn&apos;t obviously settled. I wanted to try several of the
          coding agents that had emerged in the previous year — Cursor,
          Copilot, Codex, OpenCode, and so on — and Google had just released
          Antigravity with significant fanfare. I&apos;ve always had respect
          for Google&apos;s engineering, and I knew they couldn&apos;t be
          counted out in the broader competition over AI tooling. Trying
          Antigravity on a real piece of work seemed more honest than judging
          it from afar.
        </p>

        <p>
          There was also a structural reason to be willing to experiment:
          I wasn&apos;t sure whether the frontend I was about to build would
          be the production UI or a throwaway prototype. The v1 product had
          been built by one of our developers working with me, and it was
          plausible that v2&apos;s UI would follow the same path. If
          Antigravity turned out to be a dead end, the cost was a couple of
          weeks and a learning experience. If it turned out well, I&apos;d
          have something to show.
        </p>

        <p>
          I told Antigravity I wanted a widget — something that could be
          plugged into our host web application or run as a standalone
          surface. Its Gemini-backed agent proposed React with Tailwind, set
          up the Vite build pipeline, and scaffolded the entire project
          structure in a session. Within a day I had a runnable app. The
          stack recommendation was the right one; it&apos;s what I&apos;m
          still using six months later.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What Antigravity did well
        </h2>

        <p>
          The single most useful thing it did, and the one I will defend
          unreservedly, was its handling of design tokens through MCP. INDATA
          had recently engaged a professional design firm to redesign the
          host application; the deliverables came as Figma files. I installed
          Figma locally on my development machine, ran its MCP server in
          stdio mode, and connected Antigravity to it as an MCP client. The
          agent could then read the design firm&apos;s style guides, color
          tokens, typography, and component specifications directly — without
          my having to translate any of it by hand. The frontend that emerged
          inherited those design tokens cleanly, and the host application
          could pass them through at runtime via CSS variables. Two distinct
          MCP servers working together — Figma&apos;s and ours — bracketing
          the build from both ends.
        </p>

        <p>
          I also remember the moment the work crossed from prototype to
          production. I demoed it to our internal development team — the
          people who would have built it themselves if I hadn&apos;t — and
          asked whether it could serve as a reference design for them to work
          against. The response was something like, <em>&ldquo;this looks
          great, why not just use this?&rdquo;</em> That is the social
          validation moment that tells you a tool earned its place in the
          stack, not a feature comparison or a benchmark. It worked well
          enough that experienced engineers chose not to rebuild it.
        </p>

        <p>
          One more thing worth saying clearly: Google&apos;s ecosystem
          integration is real. If your team is on Google Cloud, building
          against Gemini, working in BigQuery, or shipping into Workspace,
          Antigravity is doing things no other agentic IDE can match. The
          decision in this essay reflects my situation, not a universal
          ranking.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          Why I started moving the frontend to Claude Code
        </h2>

        <p>
          Two things converged in the last few weeks that made me start
          touching the frontend with Claude Code instead of Antigravity. They
          weren&apos;t complaints exactly — more like a sense that the
          trade-off had shifted.
        </p>

        <p>
          The first was a direction shift at Google. Antigravity&apos;s UI
          was recently restructured to feel less like a traditional IDE and
          more like an agentic programming front-end of its own — closer to
          a chat-driven assistant surface than the familiar IDE shell I
          started with. There&apos;s a defensible product thesis behind the
          change, but the new surface didn&apos;t fit how I work. I want my
          agent to live in the terminal next to the same editor I&apos;ve
          used for years, not to become the editor.
        </p>

        <p>
          The second was that Claude&apos;s models and Claude Code itself
          have gotten noticeably stronger over the same period. The thing
          that crossed the threshold for me was{" "}
          <strong>
            <code>/ultraplan</code>
          </strong>
          : a recent Claude Code feature that routes a planning task to a
          dedicated cloud session running Opus 4.6 in Anthropic&apos;s Cloud
          Container Runtime. The session reads the repository for up to half
          an hour and produces a structured plan I review in a browser
          before any code is written. For a frontend migration — where I
          want the model to deeply understand the existing component tree,
          state management, and styling conventions before it changes
          anything — that is exactly the right shape of feature. I&apos;ve
          used it twice this week and have not yet missed Antigravity&apos;s
          equivalent.
        </p>

        <p>
          There&apos;s a secondary appeal that&apos;s harder to quantify:
          continuity. The backend already had a memory-file system, a
          dated decisions log, an issues-resolved log, and a CLAUDE.md that
          encoded our engineering standards. Beginning to apply the same
          discipline to the frontend repo — under the same coding agent —
          has felt structurally satisfying. Whether that&apos;s a durable
          improvement or an early-honeymoon feeling, I don&apos;t know yet.
          I&apos;ve only been at this for days.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What I&apos;d say to someone choosing now
        </h2>

        <p>
          With the caveat that my data on Claude Code in the frontend is
          measured in days and not months, here are the questions I&apos;d
          push someone to think about before deciding:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Where does your stack live?</strong> Google ecosystem
            favors Antigravity by default. Heterogeneous or
            Anthropic-aligned stacks favor Claude Code. This is the single
            most predictive question and the easiest to answer.
          </li>
          <li>
            <strong>
              How comfortable is your team with a terminal-resident agent?
            </strong>{" "}
            Claude Code lives in the terminal alongside your existing editor.
            Antigravity wants to be more of a primary surface. Neither is
            better in the abstract; one will fit your team&apos;s habits and
            the other will fight them.
          </li>
          <li>
            <strong>How long-lived is the codebase?</strong> Claude
            Code&apos;s decisions-log + project-status discipline compounds
            over time. For projects measured in years, this matters a lot.
            For prototypes and one-shot work, less so.
          </li>
          <li>
            <strong>Do you need MCP integration?</strong> Both tools have it,
            and my experience using both shows neither is a barrier. But the
            details differ enough — stdio vs. HTTP, configuration patterns,
            the ergonomics of connecting third-party MCP servers — that you
            should try the specific thing you need before committing.
          </li>
          <li>
            <strong>Do you care about cloud-scale planning?</strong>{" "}
            Ultraplan is a real differentiator for big, multi-file work. If
            your team does a lot of refactors or migrations across hundreds
            of files, that single feature can change the math. If your
            day-to-day is individual file edits, it won&apos;t move you.
          </li>
        </ul>

        <p>
          The strongest recommendation I have is the unsexy one:{" "}
          <strong>try both, on real work, for a week each.</strong> Anyone
          who tells you definitively which is better — including me — is
          extrapolating from a sample size you shouldn&apos;t trust. The
          structural differences (workflow philosophy, ecosystem alignment,
          terminal-resident vs. primary-surface posture) are durable. The
          feature deltas will close in both directions within months.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          Caveats and limitations
        </h2>

        <p>
          I&apos;m one developer on one project. I&apos;m the sole contributor
          to a private codebase, which is exactly the situation where agentic
          tools shine the brightest; multi-developer teams have collaboration
          patterns I haven&apos;t had to think about. I&apos;ve been in this
          industry for thirty years and have strong opinions about how
          production software should be structured — readers without that
          background may experience either tool differently.
        </p>

        <p>
          Both products are also moving fast. Anything specific I&apos;ve
          said about either may be obsolete within months. The structural
          differences — workflow philosophy, ecosystem fit, agent-operation
          model — are more durable than the feature deltas.
        </p>

        <p>
          Finally: I am writing this on a site that itself is built with
          Claude Code. The site includes an{" "}
          <Link
            href="/"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            agent
          </Link>{" "}
          that knows about my background, using the same patterns I ship at
          INDATA. The source is on GitHub. If anything in this essay sounds
          biased, that&apos;s the most useful place to look — at the actual
          code I&apos;ve written with each tool, in production, with my name
          on it.
        </p>
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Comments, corrections, or counter-experience welcome —{" "}
        <a
          href="mailto:jarlnelson@outlook.com"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          jarlnelson@outlook.com
        </a>
        .
      </div>
    </article>
  );
}
