import Link from "next/link";
import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FLOTA } from "@/data/flota";
import { resumenFlota } from "@/lib/planificador";
import { formatearToneladas } from "@/lib/utils";

const NOMBRES: Record<string, string> = {
  "gruas-moviles": "Grúas móviles",
  semirremolques: "Semirremolques",
  tractocamiones: "Tractocamiones",
  "camiones-pluma": "Camiones pluma",
  "gruas-horquilla": "Grúas horquilla",
};
const DETALLE: Record<string, string> = {
  "gruas-moviles": "Todo terreno, rough terrain y sobre orugas",
  semirremolques: "Camas bajas, ramplas y líneas modulares",
  tractocamiones: "Mercedes-Benz, Volvo, MAN, Mack, Freightliner",
  "camiones-pluma": "Pluma articulada",
  "gruas-horquilla": "Zoomlion, XCMG, Hyster",
};

/** Flota por rango, dibujada desde data/flota.ts (62 equipos del inventario + contexto maestro). */
export function FlotaRangos() {
  const resumen = resumenFlota();
  const destacadas = FLOTA.filter((e) => e.categoria === "gruas-moviles" && e.destacado).sort((a, b) => (b.capacidadT ?? 0) - (a.capacidadT ?? 0));
  return (
    <section className="border-t border-tm-linea py-20 md:py-28" aria-labelledby="titulo-flota">
      <div className="container-tm">
        <Encabezado
          eyebrow="Flota"
          id="titulo-flota"
          titulo="La flota como catálogo, no como lista"
          lead="Cada equipo tendrá su ficha: capacidad, pluma, configuraciones, ficha técnica del fabricante y los casos donde se usó."
          acciones={
            <Button href="/flota" variante="contorno">
              Ver catálogo completo
            </Button>
          }
        />
        <ul className="mt-12 grid gap-px border border-tm-linea bg-tm-linea sm:grid-cols-2 lg:grid-cols-5">
          {resumen.map((r, i) => (
            <Reveal as="li" key={r.categoria} delay={i * 50} className="bg-tm-negro">
              <Link href={`/flota/${r.categoria}`} className="block h-full p-6 transition-colors duration-fast hover:bg-tm-gris-900 active:bg-tm-gris-800">
                <p className="font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">{DETALLE[r.categoria]}</p>
                <h3 className="mt-2 text-h4">{NOMBRES[r.categoria]}</h3>
                <p className="mt-5 text-[2rem] font-black leading-none text-white" data-tabular>
                  {r.cantidad}
                  <span className="ml-1 text-small font-normal text-tm-texto-suave">{r.cantidad === 1 ? "equipo" : "equipos"}</span>
                </p>
                <p className="mt-2 font-mono text-small text-tm-texto" data-tabular>
                  {r.rango ? (r.rango.min === r.rango.max ? formatearToneladas(r.rango.max) : `${formatearToneladas(r.rango.min)} a ${formatearToneladas(r.rango.max)}`) : "Capacidad según configuración"}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 overflow-x-auto border border-tm-linea">
          <table className="w-full min-w-[640px] text-left text-small">
            <caption className="sr-only">Grúas destacadas de la flota</caption>
            <thead>
              <tr className="bg-tm-gris-900 font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">
                <th className="px-5 py-3 font-medium">Grúa destacada</th>
                <th className="px-5 py-3 font-medium">Capacidad</th>
                <th className="px-5 py-3 font-medium">Pluma</th>
                <th className="px-5 py-3 font-medium">Configuración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tm-linea">
              {destacadas.map((e) => (
                <tr key={e.id}>
                  <td className="px-5 py-3 font-black uppercase text-white">
                    <Link href={`/flota/${e.categoria}/${e.id}`} className="-my-3 block py-3 transition-colors duration-fast hover:text-tm-rojo-texto active:text-tm-rojo-texto">
                      {e.marca} {e.modelo}
                    </Link>
                  </td>
                  <td className="px-5 py-3 font-mono text-white" data-tabular>
                    {e.capacidadT ? formatearToneladas(e.capacidadT) : "—"}
                  </td>
                  <td className="px-5 py-3 font-mono" data-tabular>
                    {e.plumaM ? `${e.plumaM} m` : "pendiente"}
                  </td>
                  <td className="px-5 py-3 text-tm-texto">{e.configuracion ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-small text-tm-texto-suave">Capacidades nominales según fichas del fabricante publicadas por Transmat. La capacidad a un radio dado la define la tabla de carga.</p>
      </div>
    </section>
  );
}
