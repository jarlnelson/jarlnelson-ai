import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/agent-knowledge";
import { checkRateLimit, getRequestIdentifier } from "@/lib/rate-limit";

// Edge runtime gives faster cold starts and global distribution
export const runtime = "edge";

// Max tokens per response — generous enough for detailed answers, capped
// for cost safety
const MAX_TOKENS = 800;

// Hard cap on conversation length sent to the model
const MAX_MESSAGES = 30;
const MAX_CHARS_PER_MESSAGE = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isChatMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false;
  const obj = m as Record<string, unknown>;
  return (
    (obj.role === "user" || obj.role === "assistant") &&
    typeof obj.content === "string"
  );
}

export async function POST(req: Request) {
  // ---- Rate limit ----
  const identifier = getRequestIdentifier(req);
  const limit = checkRateLimit(identifier);
  if (limit.blocked) {
    return new Response(
      JSON.stringify({
        error: limit.reason ?? "Rate limited",
        retryAfter: limit.retryAfterSeconds,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...(limit.retryAfterSeconds
            ? { "Retry-After": String(limit.retryAfterSeconds) }
            : {}),
        },
      }
    );
  }

  // ---- Parse + validate body ----
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const raw = Array.isArray(body.messages) ? body.messages : null;
  if (!raw || raw.length === 0) {
    return new Response(JSON.stringify({ error: "messages required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Trim the conversation to bounded size + length, with strict shape filter
  const trimmed: ChatMessage[] = raw
    .slice(-MAX_MESSAGES)
    .filter(isChatMessage)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (trimmed.length === 0) {
    return new Response(
      JSON.stringify({ error: "No valid messages in payload" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // ---- Check for API key ----
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Server is not configured with an Anthropic API key. Set ANTHROPIC_API_KEY in the environment.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // ---- Stream the response ----
  try {
    const result = await streamText({
      model: anthropic("claude-haiku-4-5"),
      system: SYSTEM_PROMPT,
      messages: trimmed,
      maxTokens: MAX_TOKENS,
      temperature: 0.3,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[/api/chat] streamText error:", err);
    return new Response(
      JSON.stringify({
        error: "The agent had a problem. Try again, or email Jarl directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
