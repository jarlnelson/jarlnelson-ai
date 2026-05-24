/**
 * NexusArchitectureDiagram
 *
 * A restrained, type-led SVG diagram of the INDATA Nexus agent workflow.
 * Theme-aware via currentColor + a single CSS-variable accent.
 *
 * Layout: top-down. User question → router → five paths → convergence.
 * LLM-driven nodes are highlighted with the accent color.
 */
export default function NexusArchitectureDiagram() {
  const accent = "var(--accent)";
  const stroke = "currentColor";

  // Column x-centers for the five paths (matches the SVG viewBox 720 wide)
  const cols = {
    sql: 80,
    tool: 220,
    chain: 360,
    knowledge: 500,
    out: 640,
  };

  // Box dimensions
  const boxW = 120;
  const boxH = 36;
  const boxX = (cx: number) => cx - boxW / 2;

  return (
    <figure
      className="my-10 text-zinc-800 dark:text-zinc-200"
      aria-label="Diagram of the INDATA Nexus agent workflow"
    >
      <svg
        viewBox="0 0 720 620"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
      >
        <defs>
          <marker
            id="nx-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.75" />
          </marker>
          <marker
            id="nx-arrow-accent"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: accent }} opacity="0.95" />
          </marker>
        </defs>

        {/* Title strip */}
        <text
          x="360"
          y="22"
          textAnchor="middle"
          fontSize="11"
          fill={stroke}
          opacity="0.75"
          style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          INDATA Nexus · Agent Workflow
        </text>

        {/* ---- Pre-router ---- */}

        {/* User Question */}
        <g transform="translate(0,46)">
          <rect
            x={boxX(360)}
            y="0"
            width={boxW}
            height={boxH}
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x="360"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill={stroke}
            opacity="0.95"
          >
            User Question
          </text>
        </g>
        <line
          x1="360"
          y1="82"
          x2="360"
          y2="100"
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="1"
          markerEnd="url(#nx-arrow)"
        />

        {/* Session + Tool Prep (compressed into a single small node) */}
        <g transform="translate(0,106)">
          <rect
            x={boxX(360)}
            y="0"
            width={boxW}
            height={boxH}
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x="360"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill={stroke}
            opacity="0.95"
          >
            Session + Tools
          </text>
        </g>
        <line
          x1="360"
          y1="142"
          x2="360"
          y2="160"
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="1"
          markerEnd="url(#nx-arrow)"
        />

        {/* Query Router (LLM) */}
        <g transform="translate(0,166)">
          <rect
            x={boxX(360) - 30}
            y="0"
            width={boxW + 60}
            height="44"
            rx="6"
            style={{ fill: accent, fillOpacity: 0.08, stroke: accent, strokeOpacity: 0.65 }}
          />
          <text
            x="360"
            y="19"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill={stroke}
          >
            Query Router
          </text>
          <text
            x="360"
            y="34"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            LLM · classifies intent
          </text>
        </g>

        {/* Branching connector */}
        <line
          x1="360"
          y1="218"
          x2="360"
          y2="240"
          stroke={stroke}
          strokeOpacity="0.6"
        />
        <line
          x1={cols.sql}
          y1="240"
          x2={cols.out}
          y2="240"
          stroke={stroke}
          strokeOpacity="0.6"
        />
        {Object.values(cols).map((cx) => (
          <line
            key={cx}
            x1={cx}
            y1="240"
            x2={cx}
            y2="262"
            stroke={stroke}
            strokeOpacity="0.6"
            markerEnd="url(#nx-arrow)"
          />
        ))}

        {/* ---- Five paths ---- */}

        {/* SQL path */}
        <g>
          <rect
            x={boxX(cols.sql)}
            y="268"
            width={boxW}
            height="56"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x={cols.sql}
            y="287"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={stroke}
          >
            SQL
          </text>
          <text
            x={cols.sql}
            y="304"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            RAG → Gen SQL
          </text>
          <text
            x={cols.sql}
            y="317"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            → Execute
          </text>
        </g>

        {/* TOOL path */}
        <g>
          <rect
            x={boxX(cols.tool)}
            y="268"
            width={boxW}
            height="56"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x={cols.tool}
            y="287"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={stroke}
          >
            TOOL
          </text>
          <text
            x={cols.tool}
            y="304"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            Select tool
          </text>
          <text
            x={cols.tool}
            y="317"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            → Invoke (MCP)
          </text>
        </g>

        {/* CHAIN path */}
        <g>
          <rect
            x={boxX(cols.chain)}
            y="268"
            width={boxW}
            height="56"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x={cols.chain}
            y="287"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={stroke}
          >
            CHAIN
          </text>
          <text
            x={cols.chain}
            y="304"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            Multi-step
          </text>
          <text
            x={cols.chain}
            y="317"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            SQL → Tools
          </text>
        </g>

        {/* KNOWLEDGE path */}
        <g>
          <rect
            x={boxX(cols.knowledge)}
            y="268"
            width={boxW}
            height="56"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x={cols.knowledge}
            y="287"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={stroke}
          >
            KNOWLEDGE
          </text>
          <text
            x={cols.knowledge}
            y="304"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            Doc retrieval
          </text>
          <text
            x={cols.knowledge}
            y="317"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            → Cite + answer
          </text>
        </g>

        {/* OUT_OF_SCOPE path */}
        <g>
          <rect
            x={boxX(cols.out)}
            y="268"
            width={boxW}
            height="56"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x={cols.out}
            y="287"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={stroke}
          >
            OUT OF SCOPE
          </text>
          <text
            x={cols.out}
            y="304"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            Polite decline
          </text>
          <text
            x={cols.out}
            y="317"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            + capability hint
          </text>
        </g>

        {/* ---- Convergence ---- */}

        {/* Down-arrows from each path */}
        {Object.values(cols).map((cx) => (
          <line
            key={`down-${cx}`}
            x1={cx}
            y1="324"
            x2={cx}
            y2="360"
            stroke={stroke}
            strokeOpacity="0.6"
          />
        ))}
        <line
          x1={cols.sql}
          y1="360"
          x2={cols.out}
          y2="360"
          stroke={stroke}
          strokeOpacity="0.6"
        />
        <line
          x1="360"
          y1="360"
          x2="360"
          y2="382"
          stroke={stroke}
          strokeOpacity="0.6"
          markerEnd="url(#nx-arrow)"
        />

        {/* Narrative Generation (LLM) */}
        <g transform="translate(0,388)">
          <rect
            x={boxX(360) - 30}
            y="0"
            width={boxW + 60}
            height="44"
            rx="6"
            style={{ fill: accent, fillOpacity: 0.08, stroke: accent, strokeOpacity: 0.65 }}
          />
          <text
            x="360"
            y="19"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill={stroke}
          >
            Narrative Generation
          </text>
          <text
            x="360"
            y="34"
            textAnchor="middle"
            fontSize="10"
            fill={stroke}
            opacity="0.78"
          >
            LLM · natural-language summary
          </text>
        </g>
        <line
          x1="360"
          y1="438"
          x2="360"
          y2="458"
          stroke={stroke}
          strokeOpacity="0.6"
          markerEnd="url(#nx-arrow)"
        />

        {/* Format + Save + Audit (compressed) */}
        <g transform="translate(0,464)">
          <rect
            x={boxX(360)}
            y="0"
            width={boxW}
            height={boxH}
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x="360"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill={stroke}
            opacity="0.95"
          >
            Format + Audit
          </text>
        </g>
        <line
          x1="360"
          y1="500"
          x2="360"
          y2="520"
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="1"
          markerEnd="url(#nx-arrow)"
        />

        {/* Response */}
        <g transform="translate(0,526)">
          <rect
            x={boxX(360)}
            y="0"
            width={boxW}
            height={boxH}
            rx="6"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.55"
          />
          <text
            x="360"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill={stroke}
            opacity="0.95"
          >
            Response (streamed)
          </text>
        </g>

        {/* Legend (bottom of diagram) */}
        <g transform="translate(160,592)">
          <rect
            x="0"
            y="-9"
            width="14"
            height="14"
            rx="3"
            style={{ fill: accent, fillOpacity: 0.2, stroke: accent, strokeOpacity: 0.7 }}
          />
          <text x="22" y="2" fontSize="11" fill={stroke} opacity="0.9">
            LLM-driven step
          </text>

          <rect
            x="180"
            y="-9"
            width="14"
            height="14"
            rx="3"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.7"
          />
          <text x="202" y="2" fontSize="11" fill={stroke} opacity="0.9">
            Deterministic step
          </text>
        </g>
      </svg>
      <figcaption className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-prose mx-auto leading-relaxed">
        An LLM router classifies each query into one of five paths (SQL, TOOL, CHAIN,
        KNOWLEDGE, OUT_OF_SCOPE), executes it, then a second LLM call narrates the result.
        Nexus also <em>publishes</em> its own MCP server alongside this — so external AI
        clients (Claude Desktop, Cursor, Cowork) can query the data directly.
      </figcaption>
    </figure>
  );
}
