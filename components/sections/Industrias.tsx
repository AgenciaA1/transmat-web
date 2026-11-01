import Image from "next/image";
import Link from "next/link";
import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";
import { INDUSTRIAS } from "@/data/industrias";
import { PROYECTOS } from "@/data/proyectos";

export function Industrias() {
  return (
    <section className="border-t border-tm-linea py-20 md:py-28" aria-labelledby="titulo-industrias">
      <div className="container-tm">
        <Encabezado eyebrow="Entrada por industria" id="titulo-industrias" titulo="Cada industria mueve cargas distintas" lead="Elige la tuya y verás los casos ejecutados, los equipos que usamos y cómo planificamos ahí." />
        <ul className="mt-12 grid gap-px border border-tm-linea bg-tm-linea sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIAS.map((ind, i) => {
            const caso = PROYECTOS.find((p) => ind.casos.includes(p.slug));
            return (
              <Reveal as="li" key={ind.slug} delay={i * 60} className="bg-tm-fondo">
                <Link href={`/industrias/${ind.slug}`} data-ev="industria_view" data-ev-params={JSON.stringify({ industria: ind.slug, origen: "home" })} className="group flex h-full flex-col transition-colors duration-fast hover:bg-tm-fondo-2 focus-visible:bg-tm-fondo-2 active:bg-tm-fondo-3">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={ind.foto} alt={ind.fotoAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-(--tm-foto) transition-transform duration-slow ease-tm group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-tm-fondo via-tm-fondo/30 to-transparent" />
                    <h3 className="absolute bottom-4 left-5 right-5 text-h3">{ind.nombre}</h3>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-small text-tm-texto">{ind.lead}</p>
                    <p className="mt-4 font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">{ind.enLevantamiento ? "Casos en levantamiento" : "Caso ejecutado"}</p>
                    <p className="mt-1 text-small text-tm-tinta">{caso ? caso.titulo : "Se publica con el cliente en la fase 3"}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-overline uppercase tracking-[0.14em] text-tm-acento-texto underline-offset-4 group-hover:underline group-focus-visible:underline group-active:underline">
                      Ver industria <IconArrow width={14} height={14} />
                    </span>
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
