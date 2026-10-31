import { FLOTA } from "@/data/flota";
import type { Equipo, TipoOperacion } from "@/data/tipos";

export type Candidato = {
  id: string;
  nombre: string;
  detalle: string;
  nota: string;
  /** Utilización nominal (peso / capacidad), null cuando no aplica */
  utilizacion: number | null;
  equipo?: Equipo;
};

export const OPERACIONES: { valor: TipoOperacion; nombre: string; descripcion: string; etiqueta: string }[] = [
  { valor: "izaje", nombre: "Izaje", descripcion: "Elevar y posicionar una carga con grúa.", etiqueta: "izaje" },
  { valor: "transporte", nombre: "Transporte de carga especial", descripcion: "Traslado por ruta con líneas modulares, camas bajas o ramplas.", etiqueta: "transporte" },
  { valor: "combinada", nombre: "Izaje y transporte", descripcion: "Carga, traslado y descarga en una sola operación.", etiqueta: "izaje y transporte" },
  { valor: "montaje", nombre: "Montaje con ingeniería", descripcion: "Estudio de carga, simulación de maniobra y montaje.", etiqueta: "montaje" },
];

export const TIPOS_CARGA = [
  "Equipo minero (camión, pala, chasis)",
  "Transformador o equipo eléctrico",
  "Estructura o módulo",
  "Material rodante",
  "Componente eólico o solar",
  "Estanque o recipiente",
  "Otro",
];

const nombre = (e: Equipo) => `${e.marca} ${e.modelo}`.trim();

/**
 * Equipos candidatos por capacidad NOMINAL. La capacidad real depende del radio y de la
 * configuración, que valida ingeniería con la tabla de carga del fabricante.
 */
export function candidatos(operacion: TipoOperacion, pesoT: number): Candidato[] {
  const out: Candidato[] = [];
  const necesitaGrua = operacion !== "transporte";
  const necesitaTransporte = operacion === "transporte" || operacion === "combinada";

  if (necesitaGrua) {
    const gruas = FLOTA.filter((e) => e.categoria === "gruas-moviles" && e.capacidadT !== null && e.capacidadT >= pesoT)
      .sort((a, b) => (a.capacidadT ?? 0) - (b.capacidadT ?? 0))
      .slice(0, 3);
    for (const g of gruas) {
      out.push({
        id: g.id,
        nombre: nombre(g),
        detalle: `${g.capacidadT} t nominal${g.plumaM ? ` · pluma ${g.plumaM} m` : ""}`,
        nota: g.configuracion ?? `Grúa ${g.subtipo === "crawler" ? "sobre orugas" : g.subtipo === "rough-terrain" ? "rough terrain" : "todo terreno"}.`,
        utilizacion: g.capacidadT ? pesoT / g.capacidadT : null,
        equipo: g,
      });
    }
    if (!gruas.length) {
      out.push({
        id: "tandem",
        nombre: "Sobre 750 t: izaje tándem o configuración especial",
        detalle: "Evaluación de ingeniería",
        nota: "Transmat ha ejecutado izajes tándem (dos grúas sobre la misma carga). Requiere estudio de carga y simulación de maniobra.",
        utilizacion: null,
      });
    }
  }

  if (necesitaTransporte) {
    if (pesoT <= 126) {
      out.push({
        id: "camas-bajas",
        nombre: "Camas bajas y ramplas extensibles",
        detalle: "30 a 126 t",
        nota: "Semirremolques de plataforma rebajada o de largo variable (Randon, Tremac, Goren, Titan).",
        utilizacion: pesoT / 126,
      });
    }
    if (pesoT > 100) {
      out.push({
        id: "lineas-modulares",
        nombre: "Líneas modulares",
        detalle: "+80 unidades · cargas de más de 100 t",
        nota: "Ejes múltiples, dirección independiente por eje, acoplables en ancho y largo.",
        utilizacion: null,
      });
    }
    out.push(
      pesoT > 250
        ? {
            id: "actros-3363",
            nombre: "Mercedes-Benz Actros 3363",
            detalle: "Configuraciones especiales sobre 250 t",
            nota: "Motor OM473 de 625 hp y 3.000 Nm. Dos de las únicas unidades en Chile.",
            utilizacion: null,
          }
        : {
            id: "tractocamion",
            nombre: "Tractocamión Volvo FH540, MAN TGS o Mercedes-Benz Actros 3363",
            detalle: "Según configuración y ruta",
            nota: "La asignación depende de las líneas, la pendiente de la ruta y los permisos.",
            utilizacion: null,
          },
    );
  }
  return out;
}

export function resumenFlota() {
  const porCategoria = (c: Equipo["categoria"]) => FLOTA.filter((e) => e.categoria === c);
  const rango = (items: Equipo[]) => {
    const caps = items.map((e) => e.capacidadT).filter((c): c is number => c !== null);
    return caps.length ? { min: Math.min(...caps), max: Math.max(...caps) } : null;
  };
  return (["gruas-moviles", "semirremolques", "tractocamiones", "camiones-pluma", "gruas-horquilla"] as const).map((c) => {
    const items = porCategoria(c);
    return { categoria: c, cantidad: items.reduce((n, e) => n + (e.unidades || 1), 0), modelos: items.length, rango: rango(items), destacados: items.filter((e) => e.destacado) };
  });
}
