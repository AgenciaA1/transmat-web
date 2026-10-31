import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/** Solo páginas reales. Las de la fase 3 entran al sitemap cuando tengan contenido. */
export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  return [
    { url: SITE.url, lastModified: hoy, changeFrequency: "weekly", priority: 1 },
    ...["/planificador", "/emergencias", "/contacto"].map((p) => ({ url: `${SITE.url}${p}`, lastModified: hoy, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
