import Link from "next/link";
import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconArrow, IconCheck } from "@/components/ui/Icons";
import { SERVICIOS } from "@/data/servicios";
import { SITE } from "@/lib/constants";

export function Servicios() {
  return (
    <section className="border-t border-tm-linea bg-tm-gris-900 py-20 md:py-28" aria-labelledby="titulo-servicios">
      <div className="container-tm">
        <Encabezado eyebrow="Servicios" id="titulo-servicios" titulo="Transporte, izaje, ingeniería y logística en un solo proveedor" lead="Cuatro servicios que hoy operan y uno que proponemos sumar. Todos terminan en una solicitud concreta, no en un formulario genérico." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50} className="flex flex-col border border-tm-linea bg-tm-negro p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-overline uppercase tracking-[0.14em] text-tm-rojo-texto">{s.marca}</span>
                {s.nuevo && <span className="rounded-sm border border-tm-ambar/60 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-tm-ambar">Propuesta · a validar</span>}
              </div>
              <h3 className="mt-3 text-h3">
                <Link href={s.ruta} className="-my-1 inline-block py-1 transition-colors duration-fast hover:text-tm-rojo-texto active:text-tm-rojo-texto">
                  {s.nombre}
                </Link>
              </h3>
              <p className="mt-3 text-tm-texto">{s.lead}</p>
              <ul className="mt-5 grid gap-2 text-small text-tm-texto sm:grid-cols-2">
                {s.alcance.map((a) => (
                  <li key={a} className="flex gap-2">
                    <IconCheck width={16} height={16} className="mt-1 shrink-0 text-tm-texto-suave" /> {a}
                  </li>
                ))}
              </ul>
              {/* Un solo botón prominente por pantalla (HIG › Buttons › Style): aquí la acción va en
                  contorno y el detalle como enlace; el rojo queda para el hero, el planificador y el cierre. */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                {s.operacion ? (
                  <Button href={`/planificador?op=${s.operacion}`} variante="contorno" tamano="sm" evento="cta_click" eventoParams={{ ubicacion_cta: `servicio_${s.slug}`, destino: "planificador" }}>
                    {s.cta}
                  </Button>
                ) : (
                  <Button href={SITE.telefonoHref} variante="contorno" tamano="sm" evento="phone_click" eventoParams={{ ubicacion_cta: "servicio_emergencias" }}>
                    {s.cta} · {SITE.telefono}
                  </Button>
                )}
                <Button href={s.ruta} variante="enlace">
                  Ver servicio <IconArrow width={14} height={14} />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
