/**
 * Datos de contacto y marca verificados (CONTEXTO_TRANSMAT_AGENTE_COPY.md §2.7 y sitio actual).
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "https://transmat.cl",
  nombre: "Transmat",
  legalName: "Transmat SpA",
  tagline: "Expertos en cada movimiento",
  description:
    "Izajes y transportes de alta complejidad en el norte de Chile: grúas de 35 a 800 t, más de 80 líneas modulares, ingeniería de maniobra y emergencias 24/7. Base en La Negra, Antofagasta, y sucursal en Calama.",
  telefono: "+56 9 9774 1505",
  telefonoHref: "tel:+56997741505",
  whatsapp: "+56 9 7485 3606",
  whatsappNumero: "56974853606",
  email: "contacto@transmat.cl",
  direccion: "Héctor Gómez Cobo 630, La Negra, Antofagasta, Chile",
  mapa: "https://maps.app.goo.gl/uP7rrg5CD8iry7Rw6",
  redes: {
    linkedin: "https://www.linkedin.com/company/transmat-chile/",
    instagram: "https://www.instagram.com/transmatcl/",
    facebook: "https://www.facebook.com/transmatcl",
    youtube: "https://www.youtube.com/channel/UCraGbxIPca45FWv48JzYjrQ",
  },
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "",
} as const;

/** El sitio no se indexa salvo que NEXT_PUBLIC_INDEXABLE valga exactamente "true". */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/** Enlace de WhatsApp con mensaje inicial. */
export function whatsappHref(texto?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
