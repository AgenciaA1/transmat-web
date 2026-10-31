import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaginaEnDesarrollo } from "@/components/sections/PaginaEnDesarrollo";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { ARTICULOS } from "@/data/articulos-recientes";
import { FLOTA } from "@/data/flota";
import { INDUSTRIAS, industria } from "@/data/industrias";
import { PAGINAS, paginaPlanificada } from "@/data/mapa-sitio";
import { PROYECTOS } from "@/data/proyectos";
import { SERVICIOS } from "@/data/servicios";
import { jsonLd, equipoSchema, proyectoSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatearFecha, formatearToneladas } from "@/lib/utils";

/**
 * Rutas del mapa de sitio aprobado (docs/01 §4) que se desarrollan en la fase 3. Cada una
 * existe ya como marcador con su propósito, y las fichas de flota, casos y artículos muestran
 * los datos reales del registro. Lo que no está en el mapa devuelve 404.
 */
export const dynamicParams = false;

const CATEGORIAS = ["gruas-moviles", "semirremolques", "tractocamiones", "camiones-pluma", "gruas-horquilla"] as const;
const NOMBRE_CAT: Record<string, string> = { "gruas-moviles": "Grúas móviles", semirremolques: "Semirremolques", tractocamiones: "Tractocamiones", "camiones-pluma": "Camiones pluma", "gruas-horquilla": "Grúas horquilla" };

const partes = (ruta: string) => ruta.replace(/^\/|\/$/g, "").split("/");

export function generateStaticParams(): { slug: string[] }[] {
  return [
    ...PAGINAS.map((p) => partes(p.ruta)),
    ...PROYECTOS.map((p) => ["proyectos", p.slug]),
    ...ARTICULOS.map((a) => partes(a.ruta)),
    ...FLOTA.map((e) => ["flota", e.categoria, e.id]),
  ].map((slug) => ({ slug }));
}

function resolver(slug: string[]) {
  const ruta = "/" + slug.join("/");
  const pagina = paginaPlanificada(ruta);
  if (pagina) return { tipo: "pagina" as const, ruta, pagina };
  if (slug[0] === "proyectos" && slug.length === 2) {
    const p = PROYECTOS.find((x) => x.slug === slug[1]);
    if (p) return { tipo: "proyecto" as const, ruta, p };
  }
  if (slug[0] === "flota" && slug.length === 3 && (CATEGORIAS as readonly string[]).includes(slug[1])) {
    const e = FLOTA.find((x) => x.categoria === slug[1] && x.id === slug[2]);
    if (e) return { tipo: "equipo" as const, ruta, e };
  }
  const a = ARTICULOS.find((x) => x.ruta === ruta);
  if (a) return { tipo: "articulo" as const, ruta, a };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const r = resolver((await params).slug);
  if (!r) return {};
  if (r.tipo === "pagina") return buildMetadata({ title: `${r.pagina.titulo} | Transmat`, description: r.pagina.descripcion, path: r.ruta });
  if (r.tipo === "proyecto") return buildMetadata({ title: `${r.p.titulo} | Proyectos Transmat`, description: r.p.resumen, path: r.ruta, image: r.p.imagen ?? undefined });
  if (r.tipo === "equipo") return buildMetadata({ title: `${r.e.marca} ${r.e.modelo} | Flota Transmat`, description: r.e.configuracion ?? `${NOMBRE_CAT[r.e.categoria]} de la flota Transmat.`, path: r.ruta });
  return buildMetadata({ title: `${r.a.titulo} | Transmat`, description: r.a.descripcion || r.a.titulo, path: r.ruta, type: "article" });
}

export default async function Pagina({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const r = resolver(slug);
  if (!r) notFound();

  if (r.tipo === "proyecto") {
    const ind = industria(r.p.industria);
    return (
      <PaginaEnDesarrollo eyebrow={`Proyecto · ${ind?.corto ?? ""} · ${formatearFecha(r.p.fecha)}`} titulo={r.p.titulo} descripcion={r.p.resumen} fase={3} enlaceActual={r.p.urlActual}>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(proyectoSchema(r.p, r.ruta))} />
        <dl className="grid gap-px border border-tm-linea bg-tm-linea sm:grid-cols-3">
          {[
            ["Industria", ind?.nombre ?? "—"],
            ["Equipos mencionados", r.p.equipos.length ? r.p.equipos.join(" · ") : "Se completa en la ficha (R-05)"],
            ["Cliente", r.p.cliente ?? "Por confirmar con el cliente"],
          ].map(([t, v]) => (
            <div key={t} className="bg-tm-gris-900 p-5">
              <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">{t}</dt>
              <dd className="mt-2 text-small text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-small text-tm-texto-suave">La ficha técnica completa (carga, toneladas, configuración, origen y destino, fecha, galería) se construye con los datos del cliente en la fase 3.</p>
      </PaginaEnDesarrollo>
    );
  }

  if (r.tipo === "equipo") {
    const casos = PROYECTOS.filter((p) => p.equipos.some((eq) => eq.toLowerCase().replace(/\s/g, "").includes(r.e.modelo.toLowerCase().replace(/\s/g, "").slice(0, 6))));
    return (
      <PaginaEnDesarrollo eyebrow={`Flota · ${NOMBRE_CAT[r.e.categoria]}`} titulo={`${r.e.marca} ${r.e.modelo}`} descripcion={r.e.configuracion ?? "Ficha técnica según el fabricante."} fase={3}>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(equipoSchema(r.e, r.ruta))} />
        <dl className="grid gap-px border border-tm-linea bg-tm-linea sm:grid-cols-4">
          {[
            ["Capacidad nominal", r.e.capacidadT ? formatearToneladas(r.e.capacidadT) : "Según configuración"],
            ["Pluma principal", r.e.plumaM ? `${r.e.plumaM} m` : "Dato pendiente (D2)"],
            ["Tipo", r.e.subtipo.replace(/-/g, " ")],
            ["Unidades", String(r.e.unidades)],
          ].map(([t, v]) => (
            <div key={t} className="bg-tm-gris-900 p-5">
              <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">{t}</dt>
              <dd className="mt-2 text-h4 text-white" data-tabular>
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          {r.e.fichaPdf && (
            <Button href={r.e.fichaPdf} variante="contorno" tamano="sm">
              Ficha técnica del fabricante (PDF)
            </Button>
          )}
          {r.e.categoria === "gruas-moviles" && r.e.capacidadT && (
            <Button href={`/planificador?op=izaje&t=${Math.round(r.e.capacidadT * 0.6)}`} tamano="sm" evento="cta_click" eventoParams={{ ubicacion_cta: "ficha_equipo", destino: "planificador" }}>
              Planificar un izaje con este rango
            </Button>
          )}
        </div>
        {casos.length > 0 && (
          <div className="mt-8">
            <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Casos donde se usó</h2>
            <ul className="mt-3 grid gap-2">
              {casos.map((c) => (
                <li key={c.slug}>
                  <Link href={`/proyectos/${c.slug}`} className="text-small text-tm-texto hover:text-white">
                    {c.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PaginaEnDesarrollo>
    );
  }

  if (r.tipo === "articulo") {
    return (
      <PaginaEnDesarrollo eyebrow={`Artículo · ${formatearFecha(r.a.fecha)}`} titulo={r.a.titulo} descripcion={r.a.descripcion || "Artículo técnico publicado en transmat.cl; se migra a MDX en la fase 3 conservando su URL."} fase={3} enlaceActual={r.a.urlActual}>
        <Button href={r.a.urlActual} variante="contorno" tamano="sm">
          Leer el artículo publicado hoy
        </Button>
      </PaginaEnDesarrollo>
    );
  }

  // Página del mapa de sitio: industrias y servicios muestran ya su contenido base.
  const ind = slug[0] === "industrias" && slug[1] ? INDUSTRIAS.find((i) => i.slug === slug[1]) : undefined;
  const srv = SERVICIOS.find((s) => s.ruta === r.ruta);
  return (
    <PaginaEnDesarrollo eyebrow={slug[0] === "industrias" ? "Industria" : slug[0] === "flota" ? "Flota" : "Sección"} titulo={r.pagina.titulo} descripcion={r.pagina.descripcion} fase={r.pagina.fase}>
      {ind && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Qué hacemos en {ind.corto.toLowerCase()}</h2>
            <ul className="mt-3 grid gap-2">
              {ind.trabajos.map((t) => (
                <li key={t} className="flex gap-3 text-small text-tm-texto">
                  <IconCheck width={16} height={16} className="mt-1 shrink-0 text-tm-rojo-texto" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Casos publicados</h2>
            <ul className="mt-3 grid gap-2">
              {ind.casos.length ? (
                PROYECTOS.filter((p) => ind.casos.includes(p.slug)).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/proyectos/${p.slug}`} className="text-small text-tm-texto hover:text-white">
                      {p.titulo}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-small text-tm-texto-suave">Sin caso publicado todavía: se levanta con el cliente (R-01).</li>
              )}
            </ul>
          </div>
        </div>
      )}
      {srv && (
        <div>
          <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Alcance</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {srv.alcance.map((a) => (
              <li key={a} className="flex gap-3 text-small text-tm-texto">
                <IconCheck width={16} height={16} className="mt-1 shrink-0 text-tm-rojo-texto" /> {a}
              </li>
            ))}
          </ul>
        </div>
      )}
      {slug[0] === "flota" && slug[1] && (
        <ul className="grid gap-px border border-tm-linea bg-tm-linea sm:grid-cols-2 lg:grid-cols-3">
          {FLOTA.filter((e) => e.categoria === slug[1]).map((e) => (
            <li key={e.id} className="bg-tm-gris-900">
              <Link href={`/flota/${e.categoria}/${e.id}`} className="flex h-full items-center justify-between gap-4 p-4 hover:bg-tm-gris-800">
                <span className="text-small font-black uppercase text-white">
                  {e.marca} {e.modelo}
                </span>
                <span className="font-mono text-small text-tm-rojo-texto" data-tabular>
                  {e.capacidadT ? formatearToneladas(e.capacidadT) : "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PaginaEnDesarrollo>
  );
}
