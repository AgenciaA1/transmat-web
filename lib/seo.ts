import type { Metadata } from "next";
import { INDEXABLE, SITE } from "./constants";

/**
 * Metadata por página: title ≤ 60 caracteres, description ≤ 155, canónica, OpenGraph y Twitter.
 * Mientras el sitio vive en previsualización no se indexa (NEXT_PUBLIC_INDEXABLE).
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/fotos/hero-grua.webp",
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const imagen = image.startsWith("http") ? image : `${SITE.url}${image}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots:
      noindex || !INDEXABLE
        ? { index: false, follow: false, nocache: true }
        : {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
          },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.nombre,
      locale: "es_CL",
      images: [{ url: imagen, width: 1600, height: 1067, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imagen] },
  };
}
