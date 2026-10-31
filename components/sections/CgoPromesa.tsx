import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** CGO como promesa de trazabilidad, no como lista de funciones (auditoría H-003). */
const ETAPAS = [
  ["Creación de OT", "Tu solicitud se convierte en una orden de trabajo con alcance y recursos."],
  ["Ingreso", "Ruta, permisos, matriz de riesgos y equipos asignados."],
  ["Programación", "Monitor de disponibilidad de recursos físicos y humanos."],
  ["Ejecución", "Reporte diario desde terreno vía app, GPS en tiempo real y checklist de equipamiento."],
  ["Cierre y estado de pago", "Legajo digital por OT con reportes PDF y estados de pago en línea."],
];

export function CgoPromesa() {
  return (
    <section className="border-t border-tm-linea py-20 md:py-28" aria-labelledby="titulo-cgo">
      <div className="container-tm grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <Encabezado eyebrow="CGO Transmat" id="titulo-cgo" titulo="Tu operación, visible en línea" lead="El Centro de Gestión Operacional ya controla cada orden de trabajo en terreno. En el sitio nuevo, el cliente ve su proyecto en las mismas etapas." />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cgo" variante="contorno">
              Conocer el CGO
            </Button>
            <Button href="/planificador" evento="cta_click" eventoParams={{ ubicacion_cta: "cgo", destino: "planificador" }}>
              Planificar con trazabilidad
            </Button>
          </div>
        </div>
        <Reveal as="ol" className="panel-hud divide-y divide-tm-linea">
          {ETAPAS.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[48px_1fr] gap-4 p-5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-small ${i === 3 ? "border-tm-rojo text-tm-rojo-texto shadow-[0_0_0_4px_rgba(223,8,33,.2)]" : "border-tm-linea-fuerte text-tm-texto"}`} data-tabular>
                {i + 1}
              </span>
              <div>
                <h3 className="text-h4">{t}</h3>
                <p className="mt-1 text-small text-tm-texto">{d}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
