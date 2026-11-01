import Image from "next/image";
import { RadarPluma } from "@/components/brand/RadarPluma";
import { Button } from "@/components/ui/Button";
import { IconPhone } from "@/components/ui/Icons";
import { cifra } from "@/data/cifras";
import { SITE } from "@/lib/constants";

/**
 * Hero de alta conversión (docs/HOME_A_CONVERSION.md §1): tagline oficial como titular,
 * promesa en una frase, dos acciones (planificar · emergencias) y cifras de la ficha única.
 * Fotografía de stock provisional hasta contar con fotografía propia de faena.
 */
export function Hero() {
  const cifras = ["capacidad", "izajes", "lineas", "trayectoria"].map(cifra).filter(Boolean);
  return (
    <section className="relative isolate overflow-hidden border-b border-tm-linea" aria-labelledby="titulo-hero">
      <Image src="/fotos/hero-grua.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[62%_40%] opacity-50 saturate-[.75]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,.97)_0%,rgba(10,10,10,.86)_40%,rgba(10,10,10,.35)_100%),linear-gradient(0deg,rgba(10,10,10,1)_0%,rgba(10,10,10,0)_35%)]" />
      <div aria-hidden className="rejilla absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_70%_45%,#000_0%,transparent_70%)]" />

      <div className="container-tm grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <div>
          <p className="eyebrow">Izajes y transportes de alta complejidad · La Negra, Antofagasta</p>
          <h1 id="titulo-hero" className="mt-6 text-display">
            Expertos en cada <span className="text-tm-rojo">movimiento.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lead text-tm-texto">
            Planificamos y ejecutamos izajes de <strong className="font-medium text-white">35 a 800 toneladas</strong> y transportes de cargas especiales para minería, energía e industria en el norte de Chile.
            Cuéntanos qué necesitas mover y te decimos con qué equipos y cómo.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/planificador" tamano="lg" evento="cta_click" eventoParams={{ ubicacion_cta: "hero", destino: "planificador" }}>
              Planificar mi operación
            </Button>
            <Button href={SITE.telefonoHref} variante="contorno" tamano="lg" evento="phone_click" eventoParams={{ ubicacion_cta: "hero" }}>
              <IconPhone width={16} height={16} className="shrink-0 text-tm-rojo-texto" />
              {/* En ancho compacto la etiqueta y el número se apilan a propósito, en vez de cortarse al azar. */}
              <span className="flex flex-col items-start gap-0.5 text-left sm:flex-row sm:items-center sm:gap-2.5">
                <span>Emergencias 24/7</span>
                <span aria-hidden className="hidden sm:inline">
                  ·
                </span>
                <span>{SITE.telefono}</span>
              </span>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-tm-linea pt-6 sm:grid-cols-4">
            {cifras.map((c) => (
              <div key={c!.clave}>
                <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">{c!.label}</dt>
                <dd className="mt-1 text-[1.6rem] font-black leading-none text-white" data-tabular>
                  {c!.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-[620px] lg:justify-self-end">
          <RadarPluma className="h-auto w-full overflow-visible" />
        </div>
      </div>
    </section>
  );
}
