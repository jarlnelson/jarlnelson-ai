import type { Metadata } from "next";
import NexusArchitectureDiagram from "@/components/NexusArchitectureDiagram";

export const metadata: Metadata = {
  title: "INDATA Nexus — Jarl Nelson",
  description:
    "Building INDATA Nexus, a production AI agent for buy-side investment management — five intent paths, an MCP server, LLM-neutral architecture, an honest privacy trade-off. Solo build with Claude Code.",
};

export default function NexusPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-20 prose-custom">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          Work · 2025 – present · INDATA
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
          INDATA Nexus&trade;
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Building an AI agent for buy-side investment management — solo, in fifteen months.
        </p>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          I&apos;m Director of Product Management at INDATA, an investment-management software
          firm whose buy-side OMS, accounting, performance and reporting platform sits inside the
          back office of asset managers, hedge funds, wealth managers, pension funds, and
          institutional advisors. In February 2025 I started building an AI agent for that
          platform. I have not stopped.
        </p>

        <p>
          INDATA Nexus is the result: a production AI Platform that lets portfolio managers,
          traders, compliance officers, operations staff and executives interact with their
          portfolio data — holdings, transactions, performance, accounting, compliance — using
          natural language. It launched publicly on May 12, 2026 (
          <a
            href="https://www.indataipm.com/indata-announces-major-software-release/"
            target="_blank"
            rel="noopener noreferrer"
          >
            press release
          </a>
          ) and is in production at one buy-side client today, with more rollouts in progress.
        </p>

        <p>
          The detail that doesn&apos;t appear in any press release: I designed and led the
          development of the entire system, working alone with Claude Code as my development
          partner.
        </p>

        <p>
          The reason I can design a system like this from scratch is that I have spent three
          decades inside the rooms where this work actually happens. Across thirteen years at
          Duncan-Hurst I worked alongside the heads of every functional area — portfolio
          management, trading, operations, compliance, finance — learning each workflow in
          enough detail to automate it. As the firm wound down in its final year, I also took
          direct responsibility for operations, compliance administration, and backup trading.
          At Relational Investors I was backup to the head trader at an eight-billion-dollar
          activist fund. In every technology role across thirty years, the prerequisite for
          automating a business function was understanding it cold. Building Nexus wasn&apos;t
          a technologist guessing at workflows — it was someone who has done them, or sat with
          the people who do them, building the tool he wishes he&apos;d had.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          v1 — the prototype that taught me what mattered
        </h2>

        <p>
          The first version was deliberately narrow. Text-to-SQL, a single LLM call per question,
          one large system prompt containing the schema for our two most-asked-about tables
          (holdings and transactions). The model returned SQL, we executed it inside our
          perimeter, we rendered the result to a data grid. No client data ever reached the LLM.
        </p>

        <p>
          It shipped to production. Usage was low. But the lessons fed everything that came
          next:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            A single system prompt can&apos;t carry the schema for a real OMS platform — there
            are hundreds of tables and thousands of columns. The prompt would never fit.
          </li>
          <li>
            Users wanted more than rows in a grid. They wanted summaries, comparisons, multi-step
            questions (&ldquo;get news for my top five holdings&rdquo;), document Q&amp;A against
            the policy library.
          </li>
          <li>
            Single-shot calls have no memory. Conversation needs orchestration, not just a longer
            prompt.
          </li>
          <li>
            And — quietly — users wanted the answer to speak English back to them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          v2 — the rewrite
        </h2>

        <p>
          I started over in October 2025. The new agent has:
        </p>

        <NexusArchitectureDiagram />

        <p>
          <strong>A LangGraph workflow with five intent paths</strong>, chosen at runtime by an
          LLM router: SQL for direct portfolio queries; TOOL for external integrations; CHAIN
          for multi-step workflows (the news-for-top-five-holdings case); KNOWLEDGE for document
          Q&amp;A with strict grounding and source citations; OUT_OF_SCOPE for graceful
          declines.
        </p>

        <p>
          <strong>RAG over the schema</strong> instead of a monolithic prompt. Table definitions
          and per-table documentation are retrieved per-query from a Qdrant vector store, so
          coverage scales with the data model rather than the context window.
        </p>

        <p>
          <strong>Redis-checkpointed conversation state</strong> with full versioning and
          time-travel debugging. LangSmith observability with per-request tracing control. An
          audit log with stage-by-stage timing.
        </p>

        <p>
          <strong>Two MCP roles</strong>, which is the unusual part:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Nexus <em>consumes</em> external MCP servers — third-party market-data providers
            and an internal REST API — with progressive tool discovery for wrapper-style
            servers, tool whitelisting, response filtering before narrative generation, and
            automatic session-context injection into tool calls.
          </li>
          <li>
            Nexus <em>publishes</em> its own MCP server — read-only access to holdings,
            transactions, performance and composites — so external AI agents (Claude Desktop,
            Cursor, Cowork, MCP Inspector) can query INDATA portfolio data over the open
            protocol. As of mid-2026, almost no buy-side technology vendor has shipped one.
          </li>
        </ul>

        <p>
          <strong>Genuine LLM neutrality</strong> across four providers — OpenAI direct,
          Anthropic direct, Azure OpenAI Service (for GPT/DeepSeek on Azure), Azure AI Foundry
          (for Claude on Azure) — with per-task model selection in a single YAML file. Clients
          choose their LLM, including Entra ID authentication for enterprise Azure deployments.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          The privacy trade-off, honestly told
        </h2>

        <p>
          The press release truthfully says: &ldquo;no actual client data is sent to the LLM,
          only the metadata.&rdquo; That is accurate at the query-construction step — when the
          model generates SQL, it sees column and table names, never rows.
        </p>

        <p>
          But Nexus produces conversational narrative responses. That means the result rows
          <em> are </em>
          sent to the LLM at narrative-generation time, after the query has executed inside our
          perimeter. This was a conscious design decision: the UX of conversational answers is
          substantially better than rendering grids, and the industry&apos;s posture on sending
          data to commercial LLM APIs has matured — paid-tier providers (Anthropic, OpenAI,
          Azure) offer enforceable contractual privacy guarantees, no training on data,
          retention controls.
        </p>

        <p>
          The honest framing is two-part: schema-only at query construction; result rows sent to
          the LLM only for narrative generation, under explicit privacy terms; all client data
          remains inside the perimeter at execution. The naive &ldquo;no data ever to the
          LLM&rdquo; framing oversimplifies and erodes credibility with technical readers. I
          chose precision over marketing.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          The frontend
        </h2>

        <p>
          The user-facing surface is an embeddable React 19 widget that drops into INDATA&apos;s
          existing host shell. It renders in three modes — embedded side-panel inside the host
          app, standalone, full-screen pop-out — and uses <code>createPortal</code> to escape
          host CSS interference cleanly. Runtime configuration via{" "}
          <code>window.indataConfig</code> means a single built artifact serves every deployment.
          AG Grid for tabular results, Recharts for visualization (the chart spec is generated by
          the same agent), React Markdown for narrative, and host-inherited Dark/Light theming.
        </p>

        <p>
          I originally built the frontend with Google Antigravity / Gemini, then migrated it to
          Claude Code earlier this year. Both shipped production code; I have informed
          comparative opinions on what working alongside each is actually like. That&apos;s a
          future post.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What this is — and isn&apos;t
        </h2>

        <p>
          Nexus is not the only AI work at INDATA — natural-language features have been part of
          our Architect AI product for years. Nexus is the next-generation layer underneath:
          the AI platform, the MCP server, the LLM-neutral abstraction, the orchestrated agent.
          It is in production at one buy-side client today, with additional rollouts in
          progress. Active development continues — API Viewer, Dashboards, a growing SQL RAG
          few-shot library, deployment automation — and a newly hired AI-forward developer is
          about to join the team to help extend the system.
        </p>

        <p>
          I&apos;ve been the sole contributor on both repositories to date and the sole merge
          authority going forward as the team scales.
        </p>
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
        <p className="font-medium text-zinc-800 dark:text-zinc-200">Corroboration</p>
        <p>
          INDATA&apos;s May 12, 2026 press release for the launch:{" "}
          <a
            href="https://www.indataipm.com/indata-announces-major-software-release/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            indataipm.com — press release
          </a>
          . Product page:{" "}
          <a
            href="https://www.indataipm.com/indata-nexus/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            INDATA Nexus
          </a>
          . The named author of the quoted material is INDATA&apos;s President; I built the
          system, he announced it.
        </p>
        <p>
          For deeper conversation about the design, the implementation details that aren&apos;t
          described here, or anything else —{" "}
          <a
            href="mailto:jarlnelson@outlook.com"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            jarlnelson@outlook.com
          </a>
          .
        </p>
      </div>
    </article>
  );
}
