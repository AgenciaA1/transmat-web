import { SITE } from "@/lib/constants";
import { SERVICIOS } from "@/data/servicios";
import { INDUSTRIAS } from "@/data/industrias";

/** Resumen legible por agentes de IA. Costo mínimo; el peso real lo lleva el marcado estructurado. */
export function GET() {
  const texto = [
    `# ${SITE.nombre}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Servicios",
    ...SERVICIOS.map((s) => `- [${s.nombre}](${SITE.url}${s.ruta}): ${s.lead}`),
    "",
    "## Industrias",
    ...INDUSTRIAS.map((i) => `- [${i.nombre}](${SITE.url}/industrias/${i.slug}): ${i.lead}`),
    "",
    "## Planificar una operación",
    `- [Planificador](${SITE.url}/planificador): cuatro pasos y equipos candidatos antes de dejar datos.`,
    `- Emergencias 24/7: ${SITE.telefono}`,
    "",
    `Contacto: ${SITE.email} · ${SITE.direccion}`,
  ].join("\n");
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
