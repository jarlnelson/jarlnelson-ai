import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jarlnelson.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work/nexus", priority: 0.95, changeFrequency: "monthly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/writing", priority: 0.75, changeFrequency: "weekly" },
    { path: "/writing/claude-code-and-antigravity", priority: 0.9, changeFrequency: "monthly" },
    { path: "/writing/mcp-servers-buy-side", priority: 0.85, changeFrequency: "monthly" },
    { path: "/writing/privacy-tradeoff", priority: 0.8, changeFrequency: "monthly" },
    { path: "/outside", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
