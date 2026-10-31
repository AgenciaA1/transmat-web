"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { IconAlert, IconArrow, IconWhatsApp } from "@/components/ui/Icons";
import { OPERACIONES, TIPOS_CARGA, candidatos } from "@/lib/planificador";
import { INDUSTRIAS_PLANIFICADOR, VENTANAS, ZONAS, solicitudSchema } from "@/lib/solicitud-schema";
import { track } from "@/lib/analytics";
import { SITE, whatsappHref } from "@/lib/constants";
import type { TipoOperacion } from "@/data/tipos";

const formSchema = solicitudSchema.pick({ nombre: true, empresa: true, correo: true, telefono: true, consentimiento: true, website: true });
type FormInput = z.infer<typeof formSchema>;

const ETIQUETA: Record<TipoOperacion, string> = { izaje: "izaje", transporte: "transporte", combinada: "izaje y transporte", montaje: "montaje" };

/**
 * Planificador de operación (R-07): cuatro pasos, equipos candidatos antes de pedir datos,
 * consentimiento explícito y emergencia desviada al teléfono. Emite el contrato de eventos.
 */
export function Planificador({ inicial }: { inicial: { op?: TipoOperacion; t?: number } }) {
  const router = useRouter();
  const [paso, setPaso] = useState<1 | 2 | 3 | 4>(inicial.op ? 2 : 1);
  const [op, setOp] = useState<TipoOperacion | null>(inicial.op ?? null);
  const [peso, setPeso] = useState(inicial.t ?? 120);
  const [tipoCarga, setTipoCarga] = useState("");
  const [industria, setIndustria] = useState("");
  const [zona, setZona] = useState("");
  const [ventana, setVentana] = useState("");
  const [emergencia, setEmergencia] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!inicial.op) track("rfq_start", { origen: "planificador" });
  }, [inicial.op]);

  const lista = useMemo(() => (op ? candidatos(op, peso) : []), [op, peso]);

  const ir = (n: 1 | 2 | 3 | 4) => {
    setPaso(n);
    track("rfq_step", { paso: n, tipo_operacion: op ?? "sin_definir" });
    if (n === 4 && op) track("rfq_result_shown", { peso_t: peso, equipos_candidatos: candidatos(op, peso).map((c) => c.id).join(",") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const form = useForm<FormInput>({ resolver: zodResolver(formSchema), defaultValues: { nombre: "", empresa: "", correo: "", telefono: "", consentimiento: false, website: "" } });

  const enviar = form.handleSubmit(async (datos) => {
    if (!op) return;
    setEnviando(true);
    setError(null);
    const params = new URLSearchParams(window.location.search);
    const utm = [...params.entries()].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => `${k}=${v}`).join("&");
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "planificador",
          operacion: op,
          pesoT: peso,
          tipoCarga,
          industria,
          zona,
          ventana,
          equiposCandidatos: lista.map((c) => c.id),
          ...datos,
          origen: { pagina: window.location.pathname, utm: utm || undefined, referrer: document.referrer || undefined },
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track("rfq_submit", { tipo_operacion: op, peso_t: peso, industria, zona, ventana, consentimiento: true });
      router.push("/gracias?tipo=planificador");
    } catch {
      setError("No pudimos registrar la solicitud. Intenta de nuevo o escríbenos por WhatsApp.");
      setEnviando(false);
    }
  });

  const pasos = (
    <ol className="mb-8 flex gap-1.5" aria-label="Progreso">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className={`h-1 flex-1 ${n <= paso ? "bg-tm-rojo" : "bg-tm-linea-fuerte"}`} aria-current={n === paso ? "step" : undefined} />
      ))}
    </ol>
  );
  const campo = "w-full rounded-sm border border-tm-linea-fuerte bg-tm-negro px-3.5 py-3 text-white placeholder:text-tm-texto-suave focus:border-white focus:outline-none";
  const etiqueta = "mb-2 block font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave";

  return (
    <div className="panel-hud p-6 md:p-9" aria-live="polite">
      {pasos}

      {paso === 1 && (
        <>
          <h2 className="text-h2">¿Qué necesitas resolver?</h2>
          <p className="mt-2 text-tm-texto-suave">Elige la operación principal. Si combina izaje y traslado, elige la combinada.</p>
          <div role="radiogroup" aria-label="Tipo de operación" className="mt-6 grid gap-3 sm:grid-cols-2">
            {OPERACIONES.map((o) => (
              <button key={o.valor} type="button" role="radio" aria-checked={op === o.valor} onClick={() => setOp(o.valor)} className={`rounded-sm border p-4 text-left transition-colors ${op === o.valor ? "border-tm-rojo bg-tm-rojo/10" : "border-tm-linea-fuerte hover:border-white"}`}>
                <span className="block text-[14px] font-black uppercase tracking-wide text-white">{o.nombre}</span>
                <span className="mt-1 block text-small text-tm-texto-suave">{o.descripcion}</span>
              </button>
            ))}
          </div>
          <label className="mt-6 flex cursor-pointer gap-3 text-small text-tm-texto">
            <input
              type="checkbox"
              checked={emergencia}
              onChange={(e) => {
                setEmergencia(e.target.checked);
                if (e.target.checked) track("emergency_route", { origen: "planificador" });
              }}
              className="mt-1 h-4 w-4 accent-tm-rojo"
            />
            <span>
              <strong className="font-medium text-white">Es una emergencia</strong>: rescate de carga, equipo detenido o parada no programada.
            </span>
          </label>
          {emergencia && (
            <div className="mt-4 border border-tm-linea-fuerte border-l-[3px] border-l-tm-rojo bg-tm-rojo/8 p-4 text-small text-tm-texto">
              <p className="flex gap-2">
                <IconAlert width={18} height={18} className="shrink-0 text-tm-rojo-texto" />
                <span>
                  <strong className="font-medium text-white">Ruta de emergencia.</strong> No pasa por un formulario: Transmat opera un servicio de emergencias 24/7. Llama o escribe ahora y un ejecutivo coordina el rescate o la maniobra.
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button href={SITE.telefonoHref} tamano="sm" evento="phone_click" eventoParams={{ ubicacion_cta: "planificador_emergencia" }}>
                  Llamar {SITE.telefono}
                </Button>
                <Button href={whatsappHref("Hola Transmat, tengo una emergencia y necesito coordinar una maniobra de rescate.")} variante="contorno" tamano="sm" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "planificador_emergencia" }}>
                  <IconWhatsApp width={16} height={16} className="text-tm-verde-texto" /> WhatsApp
                </Button>
              </div>
            </div>
          )}
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="text-small text-tm-texto-suave">Paso 1 de 4</span>
            <Button onClick={() => ir(2)} disabled={!op}>
              Continuar <IconArrow width={16} height={16} />
            </Button>
          </div>
        </>
      )}

      {paso === 2 && (
        <>
          <h2 className="text-h2">La carga</h2>
          <p className="mt-2 text-tm-texto-suave">Peso estimado y, si lo sabes, el tipo de carga. No necesitas la ficha exacta: ingeniería la valida después.</p>
          <div className="mt-6">
            <label htmlFor="peso" className={etiqueta}>
              Peso estimado
            </label>
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_140px]">
              <input id="peso" type="range" min={5} max={800} step={5} value={peso} className="tm-range" onChange={(e) => setPeso(+e.target.value)} />
              <div className="flex items-center gap-2">
                <input type="number" min={1} max={800} value={peso} aria-label="Peso en toneladas" className={`${campo} text-right`} data-tabular onChange={(e) => setPeso(Math.max(1, Math.min(800, Math.round(+e.target.value || 1))))} />
                <span className="font-mono text-white">t</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="tipo-carga" className={etiqueta}>
              Tipo de carga (opcional)
            </label>
            <select id="tipo-carga" value={tipoCarga} onChange={(e) => setTipoCarga(e.target.value)} className={campo}>
              <option value="">Selecciona</option>
              {TIPOS_CARGA.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <Button variante="contorno" onClick={() => ir(1)}>
              Volver
            </Button>
            <Button onClick={() => ir(3)}>
              Continuar <IconArrow width={16} height={16} />
            </Button>
          </div>
        </>
      )}

      {paso === 3 && (
        <>
          <h2 className="text-h2">La faena</h2>
          <p className="mt-2 text-tm-texto-suave">Dónde y cuándo. Define la ruta, los permisos y qué equipos conviene asignar.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="industria" className={etiqueta}>
                Industria
              </label>
              <select id="industria" value={industria} onChange={(e) => setIndustria(e.target.value)} className={campo}>
                <option value="">Selecciona</option>
                {INDUSTRIAS_PLANIFICADOR.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="zona" className={etiqueta}>
                Zona de la faena
              </label>
              <select id="zona" value={zona} onChange={(e) => setZona(e.target.value)} className={campo}>
                <option value="">Selecciona</option>
                {ZONAS.map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>
          <fieldset className="mt-6">
            <legend className={etiqueta}>Ventana de fecha</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {VENTANAS.map((v) => (
                <button key={v.valor} type="button" role="radio" aria-checked={ventana === v.valor} onClick={() => setVentana(v.valor)} className={`rounded-sm border p-4 text-left transition-colors ${ventana === v.valor ? "border-tm-rojo bg-tm-rojo/10" : "border-tm-linea-fuerte hover:border-white"}`}>
                  <span className="block text-[14px] font-black uppercase tracking-wide text-white">{v.label}</span>
                  <span className="mt-1 block text-small text-tm-texto-suave">{v.nota}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-8 flex justify-between gap-4">
            <Button variante="contorno" onClick={() => ir(2)}>
              Volver
            </Button>
            <Button onClick={() => ir(4)} disabled={!(industria && zona && ventana)}>
              Ver equipos candidatos <IconArrow width={16} height={16} />
            </Button>
          </div>
        </>
      )}

      {paso === 4 && op && (
        <>
          <h2 className="text-h2">Equipos candidatos</h2>
          <p className="mt-2 text-tm-texto-suave">
            Para <strong className="font-medium text-white">{ETIQUETA[op]}</strong> de <strong className="font-medium text-white">{peso} t</strong>
            {tipoCarga && ` · ${tipoCarga}`} · {industria} · {zona} · {VENTANAS.find((v) => v.valor === ventana)?.label}.
          </p>
          <ul className="mt-6 grid gap-3">
            {lista.map((c) => (
              <li key={c.id} className="grid gap-1 border border-tm-linea-fuerte bg-tm-negro p-4 sm:grid-cols-[1fr_auto]">
                <strong className="text-[15px] font-black uppercase text-white">{c.nombre}</strong>
                <span className="font-mono text-small text-tm-texto sm:text-right" data-tabular>
                  {c.detalle}
                </span>
                <p className="text-small text-tm-texto-suave sm:col-span-2">{c.nota}</p>
                {c.utilizacion !== null && (
                  <div className="sm:col-span-2">
                    <div className="h-1.5 bg-tm-linea" role="img" aria-label={`Utilización nominal ${Math.round(c.utilizacion * 100)} por ciento`}>
                      <div className="h-full bg-tm-rojo" style={{ width: `${Math.min(100, Math.round(c.utilizacion * 100))}%` }} />
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-tm-texto-suave">Utilización nominal: {Math.round(c.utilizacion * 100)} %</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 border border-tm-linea-fuerte border-l-[3px] border-l-tm-azul bg-tm-azul/10 p-4 text-small text-tm-texto">
            <strong className="font-medium text-white">Capacidad nominal, no capacidad real.</strong> La capacidad a tu radio operativo y la configuración (contrapeso, SuperLift, jib) las valida ingeniería con la tabla de carga del fabricante.
            {op !== "izaje" && " El transporte incluye gestión de rutas, permisos de carga sobredimensionada y coordinación en ruta."}
          </div>

          <form onSubmit={enviar} noValidate className="mt-8">
            <h3 className="text-h3">Solicitar ficha de pre-factibilidad</h3>
            <p className="mt-1 text-small text-tm-texto-suave">Tres datos y un consentimiento. La solicitud llega con origen, equipos candidatos y ventana de fecha.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className={etiqueta}>
                  Nombre
                </label>
                <input id="nombre" autoComplete="name" className={campo} {...form.register("nombre")} />
                {form.formState.errors.nombre && <p className="mt-1 text-small text-tm-rojo-texto">{form.formState.errors.nombre.message}</p>}
              </div>
              <div>
                <label htmlFor="empresa" className={etiqueta}>
                  Empresa
                </label>
                <input id="empresa" autoComplete="organization" className={campo} {...form.register("empresa")} />
              </div>
              <div>
                <label htmlFor="correo" className={etiqueta}>
                  Correo
                </label>
                <input id="correo" type="email" autoComplete="email" className={campo} {...form.register("correo")} />
                {form.formState.errors.correo && <p className="mt-1 text-small text-tm-rojo-texto">{form.formState.errors.correo.message}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className={etiqueta}>
                  Teléfono (opcional)
                </label>
                <input id="telefono" type="tel" autoComplete="tel" className={campo} {...form.register("telefono")} />
              </div>
            </div>
            <div className="hidden" aria-hidden>
              <label htmlFor="website">Sitio web</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
            </div>
            <label className="mt-5 flex cursor-pointer gap-3 text-small text-tm-texto">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-tm-rojo" {...form.register("consentimiento")} />
              <span>
                Autorizo a Transmat a usar estos datos solo para responder esta solicitud, según su{" "}
                <Link href="/privacidad" className="underline underline-offset-4 hover:text-white">
                  política de privacidad
                </Link>
                . Puedo revocarlo en cualquier momento.
              </span>
            </label>
            {form.formState.errors.consentimiento && <p className="mt-1 text-small text-tm-rojo-texto">{form.formState.errors.consentimiento.message}</p>}
            {error && (
              <p role="alert" className="mt-3 text-small text-tm-rojo-texto">
                {error}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Button variante="contorno" onClick={() => ir(3)}>
                Volver
              </Button>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(`Hola Transmat, necesito planificar ${ETIQUETA[op]} de ${peso} t${tipoCarga ? ` (${tipoCarga})` : ""}${industria ? ` en ${industria}` : ""}${zona ? `, zona ${zona}` : ""}.`)}
                  variante="contorno"
                  evento="whatsapp_click"
                  eventoParams={{ ubicacion_cta: "planificador_resultado" }}
                >
                  <IconWhatsApp width={16} height={16} className="text-tm-verde-texto" /> Prefiero WhatsApp
                </Button>
                <button type="submit" disabled={enviando} className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-tm-rojo px-6 py-3.5 text-[12.5px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-tm-rojo-oscuro disabled:opacity-50">
                  {enviando ? "Enviando…" : "Solicitar ficha"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
