/**
 * rate-limit.ts
 *
 * Lightweight in-memory rate limiting for the chat API.
 *
 * In-memory is fine for MVP and single-instance deploys. Once the site is
 * behind a CDN with multiple regions, swap this for Upstash Redis or Vercel
 * KV — the interface is intentionally narrow to make that swap painless.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Limits
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_DAY = 100;

const dailyBuckets = new Map<string, Bucket>();

/**
 * Returns null if the request is allowed, or an object describing
 * the rate-limit hit if blocked.
 */
export function checkRateLimit(identifier: string): {
  blocked: boolean;
  reason?: string;
  retryAfterSeconds?: number;
} {
  const now = Date.now();

  // ---- short window ----
  const bucket = buckets.get(identifier);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    bucket.count += 1;
    if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
      return {
        blocked: true,
        reason: "Too many requests in the last minute. Please slow down.",
        retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
      };
    }
  }

  // ---- daily window ----
  const daily = dailyBuckets.get(identifier);
  if (!daily || daily.resetAt < now) {
    dailyBuckets.set(identifier, { count: 1, resetAt: now + DAILY_WINDOW_MS });
  } else {
    daily.count += 1;
    if (daily.count > MAX_REQUESTS_PER_DAY) {
      return {
        blocked: true,
        reason: "Daily quota reached. Try again tomorrow or email Jarl directly.",
        retryAfterSeconds: Math.ceil((daily.resetAt - now) / 1000),
      };
    }
  }

  return { blocked: false };
}

/**
 * Extract a stable-ish identifier from a request. Falls back to "anonymous"
 * if no headers are present (e.g. during local dev).
 */
export function getRequestIdentifier(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "anonymous";
}
