"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IconAlert, IconArrow } from "@/components/ui/Icons";
import { OPERACIONES } from "@/lib/planificador";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/constants";
import type { TipoOperacion } from "@/data/tipos";

/**
 * Primer paso del planificador, en la Home (docs/HOME_A_CONVERSION.md §2). Pide dos datos
 * (operación y peso) y continúa en /planificador con ese contexto. La emergencia no pasa por
 * ningún formulario: desvía al teléfono.
 */
export function SelectorNecesidad() {
  const router = useRouter();
  const [op, setOp] = useState<TipoOperacion | null>(null);
  const [peso, setPeso] = useState(120);
  const [iniciado, setIniciado] = useState(false);

  const iniciar = () => {
    if (!iniciado) {
      setIniciado(true);
      track("rfq_start", { origen: "home" });
    }
  };

  const continuar = () => {
    if (!op) return;
    track("rfq_step", { paso: 1, tipo_operacion: op, peso_t: peso, origen: "home" });
    router.push(`/planificador?op=${op}&t=${peso}`);
  };

  return (
    <section className="container-tm -mt-10 relative z-10 pb-20 md:pb-28" aria-labelledby="titulo-selector">
      <div className="panel-hud grid gap-0 lg:grid-cols-[1.4fr_.9fr]">
        <div className="p-6 md:p-9">
          <p className="eyebrow">Planificador de operación · paso 1 de 4</p>
          <h2 id="titulo-selector" className="mt-4 text-h2">
            ¿Qué necesitas mover?
          </h2>
          <p className="mt-3 max-w-xl text-tm-texto-suave">Con dos datos te mostramos los equipos candidatos de la flota. Los otros dos pasos los completas después.</p>

          <div role="radiogroup" aria-label="Tipo de operación" className="mt-7 grid gap-3 sm:grid-cols-2">
            {OPERACIONES.map((o) => {
              const activo = op === o.valor;
              return (
                <button
                  key={o.valor}
                  type="button"
                  role="radio"
                  aria-checked={activo}
                  onClick={() => {
                    iniciar();
                    setOp(o.valor);
                  }}
                  className={`rounded-sm border p-4 text-left transition-colors duration-fast ${activo ? "border-tm-rojo bg-tm-rojo/10" : "border-tm-linea-fuerte hover:border-white"}`}
                >
                  <span className="block text-[14px] font-black uppercase tracking-wide text-white">{o.nombre}</span>
                  <span className="mt-1 block text-small text-tm-texto-suave">{o.descripcion}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            <label htmlFor="peso-home" className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">
              Peso estimado de la carga
            </label>
            <div className="mt-2 grid items-center gap-4 sm:grid-cols-[1fr_120px]">
              <input id="peso-home" type="range" min={5} max={800} step={5} value={peso} className="tm-range" onChange={(e) => setPeso(+e.target.value)} onPointerDown={iniciar} onKeyDown={iniciar} />
              <output htmlFor="peso-home" className="rounded-sm border border-tm-linea-fuerte px-3 py-2 text-right font-mono text-lg text-white" data-tabular>
                {peso} t
              </output>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <a href={SITE.telefonoHref} data-ev="emergency_route" data-ev-params='{"origen":"home"}' className="inline-flex items-center gap-2 text-small text-tm-texto hover:text-white">
              <IconAlert width={16} height={16} className="text-tm-rojo-texto" /> ¿Es una emergencia? Llama al {SITE.telefono}
            </a>
            <Button onClick={continuar} disabled={!op} aria-disabled={!op}>
              Ver equipos candidatos <IconArrow width={16} height={16} />
            </Button>
          </div>
        </div>

        <aside className="border-t border-tm-linea bg-tm-negro p-6 md:p-9 lg:border-l lg:border-t-0">
          <h3 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Qué recibes</h3>
          <ul className="mt-4 divide-y divide-tm-linea text-small text-tm-texto">
            <li className="py-3">
              <strong className="font-medium text-white">Equipos candidatos</strong> de la flota por capacidad nominal, antes de dejar un solo dato de contacto.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">Una ficha de pre-factibilidad</strong> que revisa ingeniería con la tabla de carga del fabricante.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">Respuesta de un ejecutivo</strong>, no de un sistema automático. Sin precios ni plazos automáticos.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
