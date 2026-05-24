import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP servers and the buy-side — Jarl Nelson",
  description:
    "Reflections from publishing a production MCP server for buy-side investment-management data. What changes, what doesn't, and what to think about if you're another vendor considering one.",
};

export default function McpEssay() {
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
          MCP servers and the buy-side: what it changes, what it doesn&apos;t.
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          May 2026 · 6 min read
        </p>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          We launched INDATA Nexus in May 2026, and one of the pieces
          underneath it is a Model Context Protocol server — a read-only
          endpoint that lets external AI clients (Claude.ai, Claude Desktop,
          Cursor, Cowork, MCP Inspector, anything that speaks MCP) query
          INDATA portfolio data directly. I built and maintain it, and as far
          as I can tell, we are one of the very few buy-side technology
          vendors to have shipped one in production as of mid-2026.
        </p>

        <p>
          I&apos;d like to write down what publishing one actually changed,
          what it didn&apos;t, and the things I&apos;d tell another vendor in
          an adjacent industry to think about before they ship one.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          For readers who haven&apos;t looked at MCP yet
        </h2>

        <p>
          Skip this section if you have. MCP — the Model Context Protocol —
          is an open standard introduced by Anthropic in late 2024 that lets
          AI applications talk to data sources and tools through a uniform
          interface. It is roughly to AI clients what ODBC was to relational
          databases in the 1990s: an abstraction layer that lets the consumer
          and the producer change independently. A client can speak to a
          hundred different servers; a server can be consumed by a hundred
          different clients; neither needs to know the other&apos;s
          implementation.
        </p>

        <p>
          You can build MCP servers that publish tools (capabilities the
          client can invoke — &ldquo;send this email,&rdquo; &ldquo;create
          this issue&rdquo;), resources (data the client can read), or
          prompts (workflow templates the client can offer to the user).
          Our server is in the tools-and-resources category: read-only
          access to holdings, transactions, performance and composite-
          membership data for INDATA Architect client portfolios.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What changed for clients
        </h2>

        <p>
          The most concrete change: a portfolio manager at one of our clients
          can now point Claude Desktop at our MCP server, authenticate with a
          pre-shared token, and ask questions of their own portfolio data
          inside a conversation alongside their other tools and documents.
          They didn&apos;t need to wait for INDATA to build a Slack
          integration or a Teams bot or a custom GPT or any of the dozen
          point-products that used to be necessary for &ldquo;getting
          portfolio data into AI.&rdquo; The client picked their AI tool;
          our server speaks the open protocol; the two find each other.
        </p>

        <p>
          The second change is less visible but, I suspect, more
          consequential. We&apos;ve always been able to serve our own AI
          features through our own UI. But the questions a portfolio manager
          asks <em>inside their own AI workflow</em> are different from the
          questions they ask inside a vendor product. They&apos;re more
          conversational, more cross-domain, more &ldquo;please combine this
          portfolio data with my research notes and this earnings transcript
          and tell me what you think.&rdquo; The MCP server lets that
          workflow exist without our needing to build it. We are a
          contributor to the client&apos;s AI surface, not the proprietor
          of it.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What didn&apos;t change
        </h2>

        <p>
          The underlying data-governance work is exactly the same. Our
          clients are regulated buy-side firms. The fact that a portfolio
          manager is now consuming the data through Claude Desktop instead
          of through our web UI does not change what data they&apos;re
          allowed to see, who&apos;s accountable for showing it, or how the
          audit trail needs to read at the end of the quarter. We still own
          authentication and authorization at the server. We still log every
          tool invocation. We still rate-limit, validate inputs, and enforce
          permissions row-by-row when the data is fetched. The protocol is a
          transport; the responsibility is unchanged.
        </p>

        <p>
          The compliance conversations also did not get easier or harder.
          They got more concrete. &ldquo;Is it safe to expose our data to
          AI?&rdquo; is the wrong question. The right questions — what
          data, to which authenticated user, audited how, retained where —
          are the same questions that have existed for any client-data
          system since the 1990s. MCP just makes them more obviously
          answerable in a structured way.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          Things I&apos;d tell another vendor before shipping one
        </h2>

        <p>
          <strong>Be selective about what you expose.</strong> The protocol
          makes it easy to publish every tool you have. Don&apos;t. Each
          surface you expose is a contract you now own across all clients
          that consume it. Start with read-only data tools that have
          stable semantics; add action tools cautiously.
        </p>

        <p>
          <strong>Treat the server like a public API.</strong> Even if
          it&apos;s gated behind authentication, multiple AI clients will
          consume it, often without your knowing in advance which. Version
          your tool schemas. Document units, time zones, NULL semantics, and
          edge cases inside the schema descriptions themselves — the LLM
          calling the tool is reading them. Our server returns period-return
          columns as percent units (0.02 means 0.02 percent, not 2 percent),
          and that nuance is in the docstring because we cannot trust every
          consuming client to know it from outside context.
        </p>

        <p>
          <strong>Pay attention to response size.</strong> Tools that return
          a megabyte of JSON are useless to an LLM with a finite context
          window. Build response filtering at the server level — temporal
          filters, sort + limit, projection of fields the caller asked for.
          We have static filters (top-N most recent) and dynamic filters
          (the LLM extracts a date range from the user&apos;s question and
          we apply it). Both are essential; the static ones save you when
          the LLM forgets to be selective.
        </p>

        <p>
          <strong>Make authentication boring.</strong> A pre-shared Bearer
          token that mirrors your existing API auth is good enough for the
          first six months. OAuth and dynamic client registration are real
          improvements, but they&apos;re also where MCP server projects bog
          down indefinitely. Ship the boring version; iterate from
          production usage.
        </p>

        <p>
          <strong>Eat your own dogfood early.</strong> The first MCP client
          of your MCP server should be the AI agent you ship to your own
          users. If you build the server and your own agent against it at
          the same time, you find every awkward schema decision before any
          external client hits it. We did this from week one and it saved
          us multiple breaking-change reissues.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          The wider point
        </h2>

        <p>
          Publishing an MCP server is not, in the end, a technical decision.
          It&apos;s a posture. It says: our customers will consume their
          own data through whatever AI surface they prefer, and our job is
          to make that connection work safely rather than to fight it. For
          a vendor whose competitive moat used to be &ldquo;we have the
          interface customers see every day,&rdquo; that&apos;s a real
          shift. The vendors who get there earliest set the schema
          conventions everyone else has to follow.
        </p>

        <p>
          For the buy-side specifically, I think this is happening sooner
          than most of the industry has noticed. Asset managers, hedge
          funds and wealth-management platforms have been waiting for
          &ldquo;the AI feature&rdquo; from their software vendors for
          three years. The thing they want is not a feature. It&apos;s the
          ability to bring their own AI and have it work with their own
          data. MCP is how you give them that.
        </p>
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        I&apos;m happy to talk through the implementation details, the
        compliance posture, or the schema design with anyone working through
        the same problem.{" "}
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
