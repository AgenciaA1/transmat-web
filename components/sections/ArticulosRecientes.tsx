import Link from "next/link";
import { Encabezado } from "./Encabezado";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ARTICULOS } from "@/data/articulos-recientes";
import { formatearFecha } from "@/lib/utils";

const TEMAS: Record<string, string> = {
  mineria: "Minería",
  energia: "Energía",
  "logistica-y-transporte": "Logística y transporte",
  "equipos-y-tecnologia": "Equipos y tecnología",
  transmat: "Transmat",
};

/** Los tres artículos más recientes del sitio actual (el tráfico de mejor interacción). */
export function ArticulosRecientes() {
  const recientes = ARTICULOS.slice(0, 3);
  return (
    <section className="border-t border-tm-linea bg-tm-gris-900 py-20 md:py-28" aria-labelledby="titulo-articulos">
      <div className="container-tm">
        <Encabezado
          eyebrow="Artículos"
          id="titulo-articulos"
          titulo="Datos del sector, un artículo al mes"
          lead="Sesenta artículos técnicos sobre minería, energía y logística en Chile, el contenido que más tiempo de lectura genera hoy."
          acciones={
            <Button href="/articulos" variante="contorno">
              Ver todos
            </Button>
          }
        />
        <ul className="mt-12 grid gap-px border border-tm-linea bg-tm-linea md:grid-cols-3">
          {recientes.map((a, i) => (
            <Reveal as="li" key={a.ruta} delay={i * 50} className="bg-tm-negro">
              <Link href={a.ruta} className="flex h-full flex-col p-6 transition-colors duration-fast hover:bg-tm-gris-800">
                <div className="flex flex-wrap gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em]">
                  <span className="border border-tm-rojo px-2 py-0.5 text-tm-rojo-texto">{TEMAS[a.tema]}</span>
                  <time dateTime={a.fecha} className="border border-tm-linea-fuerte px-2 py-0.5 text-tm-texto-suave">
                    {formatearFecha(a.fecha)}
                  </time>
                </div>
                <h3 className="mt-4 text-h4 normal-case">{a.titulo}</h3>
                {a.descripcion && <p className="mt-3 text-small text-tm-texto">{a.descripcion}</p>}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
