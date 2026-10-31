import type { MetadataRoute } from "next";
import { INDEXABLE, SITE } from "@/lib/constants";

const BOTS_IA = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Google-Extended", "PerplexityBot", "Applebot-Extended", "meta-externalagent", "Amazonbot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  // En previsualización se bloquea todo: indexar el prototipo duplicaría el contenido de transmat.cl.
  if (!INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/gracias"] }, ...BOTS_IA.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", "/gracias"] }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
