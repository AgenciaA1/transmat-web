import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Marcador de posición para las páginas de la fase 3: declara qué tendrá la sección y cómo se
 * relaciona con el resto, para que la navegación aprobada sea recorrible durante la revisión.
 */
export function PaginaEnDesarrollo({ eyebrow, titulo, descripcion, fase, children, enlaceActual }: { eyebrow: string; titulo: string; descripcion: string; fase: 2 | 3; children?: ReactNode; enlaceActual?: string }) {
  return (
    <div className="container-tm py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-h1">{titulo}</h1>
        <p className="mt-4 text-lead text-tm-texto">{descripcion}</p>
      </div>
      {children && <div className="mt-10">{children}</div>}
      <div className="mt-12 border border-dashed border-tm-ambar/50 p-5 text-small text-tm-texto">
        <p>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-tm-ambar">Fase {fase} · en desarrollo</span>
          <br />
          Esta página forma parte del mapa de sitio aprobado y se construye con el look validado en la Home.
          {enlaceActual && (
            <>
              {" "}
              Mientras tanto, el contenido vigente está en{" "}
              <a href={enlaceActual} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">
                transmat.cl
              </a>
              .
            </>
          )}
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/planificador" evento="cta_click" eventoParams={{ ubicacion_cta: "pagina_en_desarrollo", destino: "planificador" }}>
          Planificar operación
        </Button>
        <Link href="/" className="inline-flex items-center px-2 font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave hover:text-white">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
