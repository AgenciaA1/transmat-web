import type { NextConfig } from "next";
import { INDEXABLE } from "./lib/constants";

/**
 * Redirecciones 301 desde el sitio WordPress actual (docs/01 §7 del repo
 * transmat-web-5). Regla: ninguna URL con tráfico se pierde. Los 60 artículos,
 * los 19 proyectos, los 4 servicios, /contacto, /emergencias y
 * /trabaja-con-nosotros conservan su URL y no aparecen aquí.
 */
const redireccionesSitioAnterior: { source: string; destination: string }[] = [
  { source: "/equipamiento", destination: "/flota" },
  { source: "/grua-movil/:slug*", destination: "/flota/gruas-moviles" },
  { source: "/semirremolque/:slug*", destination: "/flota/semirremolques" },
  { source: "/tracto-camion/:slug*", destination: "/flota/tractocamiones" },
  { source: "/camion-pluma/:slug*", destination: "/flota/camiones-pluma" },
  { source: "/proyectos-45", destination: "/proyectos" },
  { source: "/traslado-caex", destination: "/proyectos/traslado-camiones-caex-hitachi-mantoverde" },
  { source: "/articulos-noticias", destination: "/articulos" },
  { source: "/noticia/:slug", destination: "/noticias/:slug" },
  { source: "/centro-de-gestion-operacional-transmat", destination: "/cgo" },
  { source: "/tecnologia-y-vanguardia", destination: "/transmat/tecnologia" },
  { source: "/corporativo-expertos-en-cada-movimiento", destination: "/transmat" },
  { source: "/contactanos", destination: "/contacto" },
  { source: "/politica-de-privacidad", destination: "/privacidad" },
  // Taxonomía de WordPress (100 categorías, 320 etiquetas, 3 autores): al hub.
  { source: "/category/:slug*", destination: "/articulos" },
  { source: "/tag/:slug*", destination: "/articulos" },
  { source: "/author/:slug*", destination: "/articulos" },
];

/**
 * Cabeceras de seguridad, heredadas del sistema A1 (agea-web). La CSP va en
 * modo informe mientras se observa; la aplicada solo fuerza HTTPS.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://transmat.cl https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Fase 2: las fotos van preoptimizadas en WebP dentro de public/. La
    // optimización en el borde (Cloudflare Images) se decide en fase 3.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "transmat.cl", pathname: "/wp-content/**" }],
  },
  async redirects() {
    return redireccionesSitioAnterior.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy-Report-Only", value: csp },
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      ...(INDEXABLE
        ? []
        : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
    ];
  },
};

export default nextConfig;
