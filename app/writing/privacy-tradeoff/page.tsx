import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "The privacy trade-off no AI agent paper wants to discuss — Jarl Nelson",
  description:
    "The honest two-part framing for AI agents on regulated data: schema-only at query construction, results sent under commercial privacy guarantees at narrative time. Why precision earns more trust than the simplified claim.",
};

export default function PrivacyEssay() {
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
          The privacy trade-off no AI agent paper wants to discuss.
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          May 2026 · 5 min read
        </p>
      </header>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          The marketing copy for AI agents built on regulated data — health
          records, brokerage data, attorney-client material, defense data —
          almost always contains some version of the same sentence:
        </p>

        <blockquote className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-5 italic text-zinc-600 dark:text-zinc-400">
          No customer data is ever sent to the LLM.
        </blockquote>

        <p>
          It&apos;s reassuring. It&apos;s often technically true in some
          narrow sense. And when readers who know what they&apos;re looking
          at see it, they immediately start asking what the rest of the
          sentence is.
        </p>

        <p>
          I want to write the rest of the sentence down, because the
          industry will be more trusted for saying it out loud, and because
          I think the honest version is actually more defensible than the
          marketing one.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What &ldquo;no data to the LLM&rdquo; usually means
        </h2>

        <p>
          In a text-to-SQL system — or any agent that translates a natural-
          language question into a structured query — there are two distinct
          moments where data could be sent to the LLM.
        </p>

        <p>
          <strong>Moment one: query construction.</strong> The agent receives
          the user&apos;s question and needs to turn it into a database
          query. To do that, the LLM needs to see the schema of the data —
          table names, column names, the natural-language description of
          each table, often a handful of example queries for in-context
          learning. It does <em>not</em> need to see the rows themselves. A
          well-designed system sends only metadata at this step, and that&apos;s
          what most &ldquo;no data to the LLM&rdquo; claims correctly
          describe.
        </p>

        <p>
          <strong>Moment two: narrative generation.</strong> If the system
          is conversational — if it returns prose answers instead of raw
          grids — then after the query runs, the result rows have to be
          summarized into natural language. To do that, the LLM needs to
          see the actual results. The customer data. The dollar amounts,
          the ticker symbols, the share counts, the timestamps.
        </p>

        <p>
          Marketing claims about &ldquo;no data ever to the LLM&rdquo;
          almost always elide the second moment. They&apos;re describing a
          system that produces grids, not narratives. Or a system whose
          narrative is templated server-side after the LLM has finished. Or,
          honestly, a system that hasn&apos;t shipped narrative responses
          yet.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          The real trade-off
        </h2>

        <p>
          The user experience of a conversational answer is substantially
          better than the user experience of a grid. By an embarrassing
          margin, in fact. Once you&apos;ve seen the same data summarized in
          a single confident sentence (&ldquo;Your top ten holdings represent
          forty-three percent of the portfolio&apos;s market value, with the
          largest single position being NVDA at six point eight
          percent&rdquo;), going back to a raw grid feels like a regression.
        </p>

        <p>
          So when you&apos;re designing this kind of system, you face a real
          choice. You can:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Ship the grid-only version and truthfully say no data ever
            reaches the LLM.
          </li>
          <li>
            Ship the conversational version and accept that result rows are
            sent to the LLM at narrative-generation time.
          </li>
          <li>
            Ship the conversational version and lie about it. (Hopefully
            not.)
          </li>
        </ul>

        <p>
          We took the second option for{" "}
          <Link
            href="/work/nexus"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            INDATA Nexus
          </Link>
          . It was a conscious decision, not an oversight, and it was
          predicated on a fact about the LLM-provider landscape that has
          quietly matured in the last eighteen months.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          What the industry got right
        </h2>

        <p>
          Commercial LLM providers — Anthropic, OpenAI, Microsoft Azure —
          now offer paid-tier API agreements that look a lot like the data
          protections enterprises have had from their cloud providers for a
          decade. No training on customer data by default. Configurable or
          minimal retention. Standard data-processing agreements that
          plug into existing compliance frameworks. Enterprise SOC 2 and
          HIPAA postures where they apply.
        </p>

        <p>
          That is not the same thing as &ldquo;the data never leaves your
          perimeter,&rdquo; and we should not pretend otherwise. But it is
          a meaningful, contractually enforceable, audit-trail-able
          protection — the same kind that financial services and healthcare
          have used to put customer data into AWS, Azure, GCP, Snowflake,
          and Salesforce for the last decade and a half. The objection to
          commercial LLM APIs in 2024 was almost entirely about the absence
          of those guarantees. Most of those guarantees now exist.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          The honest framing
        </h2>

        <p>
          For our system, the precise truth is a two-part statement:
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            At query construction, only schema metadata is sent to the
            LLM — column names, table names, descriptive documentation,
            example queries. No customer row data reaches the model at this
            step.
          </li>
          <li>
            At narrative generation, the result rows of the
            already-authorized query <em>are</em> sent to the LLM, under a
            paid-tier commercial agreement with explicit privacy terms — no
            training on data, retention limits, standard processor
            obligations.
          </li>
        </ol>

        <p>
          All data remains inside the customer&apos;s authorization
          boundary at the execution layer; the query runs against the
          customer&apos;s data store with the customer&apos;s permissions;
          row-level access controls still apply. The LLM only ever sees
          rows that the requesting user is already entitled to see in
          every other surface we offer.
        </p>

        <p>
          That is the version I would defend in front of an auditor,
          because it is the version that&apos;s true. It is also the
          version that the head of risk at any sophisticated client will
          recognize as honest, and engage with on its merits, instead of
          treating with suspicion.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          Why the simple version is worse for trust
        </h2>

        <p>
          Here is the practical thing I&apos;d say to other AI-agent
          builders: the simplified claim is more dangerous than the
          two-part claim, even though it sounds safer.
        </p>

        <p>
          When a technically sophisticated reader — a CISO, a head of risk,
          a deal lawyer — encounters &ldquo;no data ever goes to the
          LLM,&rdquo; one of two things happens. Either they believe it,
          buy the product, and discover the truth later (very bad), or
          they don&apos;t believe it, lose trust in you, and either kill
          the deal or apply punitive conditions to it (also bad). The
          honest two-part version pre-empts both failure modes. The first
          time you say it, you sound less impressive than the marketing
          copy. The second and third time you say it, you sound like the
          only vendor in the room who has thought about it seriously.
        </p>

        <p>
          The buy-side, the legal world, the healthcare world, the public
          sector — they are full of people who have been doing data
          governance professionally for thirty years. They are not going to
          believe a one-sentence claim. They are going to want the
          two-paragraph version. The vendors that lead with the
          two-paragraph version are the ones that get the second meeting.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">
          A closing thought
        </h2>

        <p>
          I think we&apos;re going to look back at the 2024–2025 era of AI
          marketing the way we look back at the 1999 era of cloud
          marketing: full of claims that sounded technically reassuring and
          turned out, on inspection, to mean something narrower than what
          the reader assumed. The vendors who built durable trust then
          were the ones who explained the trade-offs out loud. I think
          it&apos;s the same play this time.
        </p>
      </div>

      <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        If you&apos;re wrestling with the same trade-off and want to compare
        notes —{" "}
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
