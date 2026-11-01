"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IconAlert, IconArrow } from "@/components/ui/Icons";
import { OPERACIONES, candidatos } from "@/lib/planificador";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/constants";
import type { TipoOperacion } from "@/data/tipos";

const PESO_MIN = 5;
const PESO_MAX = 800;
const PESO_PASO = 5;

/**
 * Primer paso del planificador, en la Home (docs/HOME_A_CONVERSION.md §2). Pide dos datos
 * (operación y peso), muestra al instante los equipos candidatos por capacidad nominal y sigue
 * en /planificador (paso 2, la carga) con ese contexto. La emergencia no pasa por ningún
 * formulario: desvía al teléfono.
 */
export function SelectorNecesidad() {
  const router = useRouter();
  const [op, setOp] = useState<TipoOperacion | null>(null);
  const [peso, setPeso] = useState(120);
  const [iniciado, setIniciado] = useState(false);

  const lista = useMemo(() => (op ? candidatos(op, peso).slice(0, 4) : []), [op, peso]);

  const iniciar = () => {
    if (!iniciado) {
      setIniciado(true);
      track("rfq_start", { origen: "home" });
    }
  };

  const fijarPeso = (valor: number) => {
    if (Number.isNaN(valor)) return;
    setPeso(Math.min(PESO_MAX, Math.max(PESO_MIN, Math.round(valor))));
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
          <p className="mt-3 max-w-xl text-tm-texto-suave">Con dos datos ves los equipos candidatos de la flota. Los otros pasos los completas después.</p>

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
                  className={`flex gap-3 rounded-sm border p-4 text-left transition-[color,background-color,border-color,scale] duration-fast ease-tm active:scale-[0.99] active:bg-tm-tinta/5 ${activo ? "border-tm-acento bg-tm-acento/10" : "border-tm-linea-fuerte hover:border-tm-tinta"}`}
                >
                  {/* Indicador de selección: la elección no se comunica solo con el color del borde.
                      El punto entra con un resorte corto desde su propio centro. */}
                  <span aria-hidden className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-fast ${activo ? "border-tm-acento" : "border-tm-linea-fuerte"}`}>
                    {activo && <span className="h-2.5 w-2.5 rounded-full bg-tm-acento transition-[scale,opacity] duration-fast ease-spring starting:scale-50 starting:opacity-0" />}
                  </span>
                  <span>
                    <span className="block text-[14px] font-black uppercase tracking-wide text-tm-tinta">{o.nombre}</span>
                    <span className="mt-1 block text-small text-tm-texto-suave">{o.descripcion}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            <label htmlFor="peso-home" className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">
              Peso estimado de la carga
            </label>
            <div className="mt-1 grid items-center gap-4 sm:grid-cols-[1fr_150px]">
              <input id="peso-home" type="range" min={PESO_MIN} max={PESO_MAX} step={PESO_PASO} value={peso} className="tm-range" onChange={(e) => setPeso(+e.target.value)} onPointerDown={iniciar} onKeyDown={iniciar} />
              {/* El valor también se escribe: quien conoce el peso exacto no tiene que buscarlo con el deslizador. */}
              <div className="flex items-center rounded-sm border border-tm-linea-fuerte transition-colors duration-fast focus-within:border-tm-tinta">
                <input
                  type="number"
                  inputMode="numeric"
                  min={PESO_MIN}
                  max={PESO_MAX}
                  step={PESO_PASO}
                  value={peso}
                  aria-label="Peso estimado de la carga, en toneladas"
                  className="min-h-11 w-full bg-transparent px-3 text-right font-mono text-lg text-tm-tinta focus:outline-none"
                  data-tabular
                  onFocus={iniciar}
                  onChange={(e) => fijarPeso(e.target.valueAsNumber)}
                />
                <span aria-hidden className="pr-3 font-mono text-lg text-tm-texto-suave">
                  t
                </span>
              </div>
            </div>
          </div>

          {/* Respuesta inmediata: los candidatos aparecen aquí, antes de pedir un solo dato de contacto. */}
          <div className="mt-7 border-t border-tm-linea pt-5" aria-live="polite">
            {op ? (
              <>
                <p className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">
                  Equipos candidatos para <span className="text-tm-tinta">{peso} t</span> · capacidad nominal
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {lista.map((c) => (
                    <li key={c.id} className="rounded-sm border border-tm-linea bg-tm-fondo px-3.5 py-3">
                      <span className="block text-[13px] font-black uppercase tracking-wide text-tm-tinta">{c.nombre}</span>
                      <span className="mt-1 block font-mono text-small text-tm-texto" data-tabular>
                        {c.detalle}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-small text-tm-texto-suave">La capacidad a un radio dado la define la tabla de carga del fabricante; ingeniería la valida en la pre-factibilidad.</p>
              </>
            ) : (
              <p className="text-small text-tm-texto-suave">Elige el tipo de operación para ver los equipos candidatos y continuar.</p>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <a href={SITE.telefonoHref} data-ev="emergency_route" data-ev-params='{"origen":"home"}' className="inline-flex min-h-11 items-center gap-2 text-small text-tm-texto hover:text-tm-tinta active:text-tm-acento-texto">
              <IconAlert width={16} height={16} className="text-tm-acento-texto" /> ¿Es una emergencia? Llama al {SITE.telefono}
            </a>
            <Button onClick={continuar} disabled={!op}>
              Continuar al paso 2 <IconArrow width={16} height={16} />
            </Button>
          </div>
        </div>

        <aside className="border-t border-tm-linea bg-tm-fondo p-6 md:p-9 lg:border-l lg:border-t-0">
          <h3 className="eyebrow font-medium">Qué recibes</h3>
          <ul className="mt-4 divide-y divide-tm-linea text-small text-tm-texto">
            <li className="py-3">
              <strong className="font-medium text-tm-tinta">Equipos candidatos</strong> de la flota por capacidad nominal, aquí mismo y antes de dejar un solo dato de contacto.
            </li>
            <li className="py-3">
              <strong className="font-medium text-tm-tinta">Una ficha de pre-factibilidad</strong> que revisa ingeniería con la tabla de carga del fabricante.
            </li>
            <li className="py-3">
              <strong className="font-medium text-tm-tinta">Respuesta de un ejecutivo</strong>, no de un sistema automático. Sin precios ni plazos automáticos.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
