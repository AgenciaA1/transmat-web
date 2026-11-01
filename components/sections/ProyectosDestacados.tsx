import Image from "next/image";
import Link from "next/link";
import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PROYECTOS } from "@/data/proyectos";
import { industria } from "@/data/industrias";
import { formatearFecha } from "@/lib/utils";

/** Tres casos destacados con datos técnicos (docs/01 §3.5): evidencia, no galería. */
export function ProyectosDestacados() {
  const casos = PROYECTOS.filter((p) => p.destacado).slice(0, 3);
  return (
    <section className="border-t border-tm-linea bg-tm-fondo-2 py-20 md:py-28" aria-labelledby="titulo-proyectos">
      <div className="container-tm">
        <Encabezado
          eyebrow="Proyectos"
          id="titulo-proyectos"
          titulo="Casos con toneladas, equipos y lugar"
          lead="Diecinueve casos publicados. Cada uno pasa a ficha técnica: qué se movió, con qué configuración, dónde y cuándo."
          acciones={
            <Button href="/proyectos" variante="contorno">
              Ver los 19 casos
            </Button>
          }
        />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {casos.map((p, i) => {
            const ind = industria(p.industria);
            return (
              <Reveal as="li" key={p.slug} delay={i * 60} className="flex flex-col border border-tm-linea bg-tm-fondo">
                <Link href={`/proyectos/${p.slug}`} className="group flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-tm-linea bg-tm-fondo">
                    {p.imagen ? (
                      <Image src={p.imagen} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-(--tm-foto-2) transition-transform duration-slow ease-tm group-hover:scale-[1.03]" />
                    ) : (
                      <div className="rejilla absolute inset-0 opacity-60" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-2 font-mono text-overline uppercase tracking-[0.12em]">
                      {ind && <span className="border border-tm-linea-fuerte px-2 py-0.5 text-tm-tinta">{ind.corto}</span>}
                      <time dateTime={p.fecha} className="border border-tm-linea-fuerte px-2 py-0.5 text-tm-texto-suave">
                        {formatearFecha(p.fecha)}
                      </time>
                    </div>
                    <h3 className="mt-4 text-h4 transition-colors duration-fast group-hover:text-tm-acento-texto group-active:text-tm-acento-texto">{p.titulo}</h3>
                    <p className="mt-3 text-small text-tm-texto">{p.resumen}</p>
                    {p.equipos.length > 0 && (
                      <p className="mt-4 font-mono text-overline uppercase tracking-[0.12em] text-tm-texto-suave">
                        Equipos · <span className="text-tm-tinta">{p.equipos.join(" · ")}</span>
                      </p>
                    )}
                    {p.cliente && <p className="mt-1 font-mono text-overline uppercase tracking-[0.12em] text-tm-texto-suave">Cliente · {p.cliente}</p>}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
