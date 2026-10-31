import { SITE } from "./constants";
import type { Equipo, Proyecto } from "@/data/tipos";

/** JSON-LD centralizado y tipado. Validar en Rich Results Test antes del lanzamiento. */
type Json = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organizacion`;
const WEB_ID = `${SITE.url}/#website`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.nombre,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-transmat.png`,
    image: `${SITE.url}/fotos/hero-grua.webp`,
    description: SITE.description,
    slogan: SITE.tagline,
    telephone: SITE.telefono,
    email: SITE.email,
    areaServed: { "@type": "Country", name: "Chile" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Héctor Gómez Cobo 630, La Negra",
      addressLocality: "Antofagasta",
      addressRegion: "Región de Antofagasta",
      addressCountry: "CL",
    },
    sameAs: Object.values(SITE.redes),
    knowsAbout: [
      "Izaje de alta complejidad",
      "Arriendo de grúas todo terreno",
      "Transporte de cargas especiales y sobredimensionadas",
      "Líneas modulares",
      "Ingeniería de maniobras y rigging",
      "Montaje industrial",
      "Rescate de equipos de alto tonelaje",
    ],
    serviceType: ["Arriendo de grúas", "Transporte de cargas especiales", "Ingeniería y montaje", "Emergencias 24/7"],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEB_ID,
    url: SITE.url,
    name: SITE.nombre,
    inLanguage: "es-CL",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Inicio", href: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function serviceSchema({ nombre, descripcion, path, alcance }: { nombre: string; descripcion: string; path: string; alcance: readonly string[] }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nombre,
    description: descripcion,
    url: `${SITE.url}${path}`,
    serviceType: nombre,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Chile" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Alcance · ${nombre}`,
      itemListElement: alcance.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c } })),
    },
  };
}

/** Product + PropertyValue por equipo de la flota. */
export function equipoSchema(e: Equipo, path: string): Json {
  const props: Json[] = [];
  if (e.capacidadT) props.push({ "@type": "PropertyValue", name: "Capacidad nominal", value: e.capacidadT, unitText: "t" });
  if (e.plumaM) props.push({ "@type": "PropertyValue", name: "Pluma principal", value: e.plumaM, unitText: "m" });
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${e.marca} ${e.modelo}`.trim(),
    url: `${SITE.url}${path}`,
    ...(e.marca && { brand: { "@type": "Brand", name: e.marca } }),
    ...(e.configuracion && { description: e.configuracion }),
    ...(props.length && { additionalProperty: props }),
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", businessFunction: "http://purl.org/goodrelations/v1#LeaseOut", seller: { "@id": ORG_ID } },
  };
}

/** CreativeWork por caso de proyecto. */
export function proyectoSchema(p: Proyecto, path: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    additionalType: "Caso de proyecto",
    name: p.titulo,
    description: p.resumen,
    url: `${SITE.url}${path}`,
    datePublished: p.fecha,
    ...(p.imagen && { image: p.imagen }),
    about: p.equipos.map((e) => ({ "@type": "Product", name: e })),
    provider: { "@id": ORG_ID },
    inLanguage: "es-CL",
  };
}

export function jsonLd(schema: Json | Json[]) {
  return { __html: JSON.stringify(schema).replace(/</g, "\\u003c") };
}
