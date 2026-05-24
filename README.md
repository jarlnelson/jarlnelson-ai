# jarlnelson.ai

Personal site for Jarl Nelson. Built with Next.js 15 (App Router) + Tailwind CSS, with an embedded "Ask the agent" chat powered by Anthropic Claude. Deploys to Vercel.

## Local preview

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
#  Then edit .env.local and paste in your ANTHROPIC_API_KEY
#  (get one at https://console.anthropic.com/settings/keys)

# 3. Run the dev server
npm run dev
```

Then open **http://localhost:3000**.

The Ask Jarl agent on the home page will fail with a clear error if `ANTHROPIC_API_KEY` is missing. The rest of the site renders fine without it — you can preview the visual design before adding the key.

## Production build (locally)

```bash
npm run build
npm run start
```

## Project structure

```
jarlnelson_ai/
├── app/
│   ├── layout.tsx                Root layout + theme provider + nav + footer
│   ├── page.tsx                  Home (hero, featured work, agent embed)
│   ├── globals.css               Tailwind + theme variables
│   ├── about/page.tsx
│   ├── work/page.tsx             Work index
│   ├── work/nexus/page.tsx       NEXUS case study (centerpiece)
│   ├── outside/page.tsx          Running / 6-Star quest
│   ├── writing/page.tsx          Essays index (placeholder)
│   ├── contact/page.tsx
│   ├── not-found.tsx             Styled 404
│   ├── icon.tsx                  Favicon (JN monogram, generated)
│   ├── apple-icon.tsx            Apple touch icon
│   ├── opengraph-image.tsx       OG card (1200×630) for social sharing
│   ├── twitter-image.tsx         Twitter card (reuses OG)
│   ├── sitemap.ts                sitemap.xml generation
│   ├── robots.ts                 robots.txt generation
│   └── api/chat/route.ts         Streaming Anthropic chat endpoint
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx         Dark/light theme context
│   ├── ThemeToggle.tsx
│   ├── NexusArchitectureDiagram.tsx  SVG agent-workflow diagram
│   └── AskJarlChat.tsx           Streaming chat UI with starter chips
├── lib/
│   ├── agent-knowledge.ts        Agent system prompt + curated knowledge
│   └── rate-limit.ts             In-memory rate limiting for the chat API
└── public/
```

## Tech notes

- **Next.js 15** with the App Router
- **React 19**
- **Tailwind CSS** with a small CSS-variable theme layer for dark/light
- **Inter** + **Source Serif 4** via `next/font`
- **lucide-react** for icons
- **Vercel AI SDK** (`ai` + `@ai-sdk/anthropic`) for the streaming chat
- **react-markdown** for rendering agent responses
- Default **dark mode** with a light toggle in the header
- **Edge runtime** for the `/api/chat` route (fast cold starts, global distribution)

## The "Ask Jarl" agent — important context

The agent on the home page:

- Speaks ABOUT Jarl in the third person — does not impersonate him.
- Is briefed only from `lib/agent-knowledge.ts`, which is **public content** (curated, not the full private working profile doc).
- Has guardrails: won't commit Jarl to anything, won't discuss compensation, won't reveal INDATA internals beyond the press release / product page / case study, won't speculate about other people, redirects job-related questions to email.
- Is rate-limited (12 requests/minute, 100/day per IP) via `lib/rate-limit.ts`. For production at scale, swap this for Upstash Redis or Vercel KV — the interface is intentionally narrow to make the swap painless.
- Uses **Claude Haiku 4.5** by default for cost/latency. Upgrade to Sonnet by changing one line in `app/api/chat/route.ts` if quality needs lifting.

Before publishing the agent, read through `lib/agent-knowledge.ts` carefully — it is the single source of truth for what the agent says about you. Any fact in there will be quoted to visitors; any guardrail there is the wall between you and an internet stranger.

## Phases

- **Phase 1 — Static MVP** ✅ Home, Work index, NEXUS case study, About, Writing index, Outside, Contact.
- **Phase 2 — Polish** ✅ Favicon, sitemap, robots, OG/Twitter images, 404 page, SVG architecture diagram on the NEXUS case study.
- **Phase 3 — Ask Jarl agent** ✅ Streaming chat embedded on the home page, system-prompted, rate-limited, source-published.
- **Phase 4 — Writing** (in progress). First piece: "Claude Code, Google Antigravity, and shipping production AI software in 2026."

## Deployment to Vercel (when ready)

1. Push to a GitHub repo (suggestion: `github.com/<your-handle>/jarlnelson-ai`).
2. Connect the repo in Vercel — it auto-detects Next.js.
3. In Vercel's project settings → **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` (required) — your Anthropic API key
   - `NEXT_PUBLIC_SITE_URL` (optional) — set to `https://jarlnelson.ai` once the domain is configured
4. Vercel ships a preview URL (`*.vercel.app`) immediately. Use it to validate before pointing the real domain.
5. When `jarlnelson.ai` is registered, add it in Vercel's **Domains** tab and follow the DNS instructions.

## Content sources

Site copy is drawn from `Career_Profile_Working_Doc.md` in the parent project folder. That file is the canonical synthesis; update it first when a fact changes, then propagate to the pages here.
