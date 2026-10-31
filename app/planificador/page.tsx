import { Planificador } from "@/components/planificador/Planificador";
import { TIPOS_OPERACION } from "@/lib/solicitud-schema";
import { buildMetadata } from "@/lib/seo";
import type { TipoOperacion } from "@/data/tipos";

export const metadata = buildMetadata({
  title: "Planificador de operación | Transmat",
  description: "Cuéntanos qué necesitas mover y te mostramos los equipos candidatos de la flota. Cuatro pasos y una ficha de pre-factibilidad revisada por ingeniería.",
  path: "/planificador",
});

type Params = Promise<{ op?: string; t?: string }>;

export default async function PaginaPlanificador({ searchParams }: { searchParams: Params }) {
  const sp = await searchParams;
  const op = (TIPOS_OPERACION as readonly string[]).includes(sp.op ?? "") ? (sp.op as TipoOperacion) : undefined;
  const t = sp.t ? Math.max(1, Math.min(800, Math.round(Number(sp.t)) || 120)) : undefined;

  return (
    <div className="container-tm grid gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_.7fr]">
      <div>
        <p className="eyebrow">Planificador de operación</p>
        <h1 className="mt-4 text-h1">De la necesidad a la solicitud calificada</h1>
        <p className="mt-4 max-w-2xl text-lead text-tm-texto">Cuatro preguntas. Ves los equipos candidatos antes de dejar un dato de contacto, y la solicitud llega al equipo comercial con todo lo que necesita para responderte.</p>
        <div className="mt-10">
          <Planificador inicial={{ op, t }} />
        </div>
      </div>
      <aside className="lg:pt-32">
        <div className="border border-tm-linea bg-tm-gris-900 p-6">
          <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Qué ocurre en el fondo</h2>
          <ul className="mt-4 divide-y divide-tm-linea text-small text-tm-texto">
            <li className="py-3">
              <strong className="font-medium text-white">Cuatro preguntas, no catorce.</strong> Cada paso pide un dato que el equipo comercial usa: operación, carga, faena y ventana.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">Devuelve valor antes de pedir datos.</strong> Los equipos candidatos salen del registro de flota por capacidad nominal.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">Consentimiento sin premarcar.</strong> Finalidad declarada y ningún dato personal en la capa de medición.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">La emergencia no pasa por un formulario.</strong> Se desvía directo a teléfono y WhatsApp.
            </li>
            <li className="py-3">
              <strong className="font-medium text-white">Sin precios ni plazos automáticos.</strong> Los define un ejecutivo con ingeniería.
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
