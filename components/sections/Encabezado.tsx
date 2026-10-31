import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Cabecera de sección: eyebrow, título y bajada. */
export function Encabezado({ eyebrow, titulo, lead, acciones, className, id }: { eyebrow: string; titulo: ReactNode; lead?: ReactNode; acciones?: ReactNode; className?: string; id?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-h2">
          {titulo}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-lead text-tm-texto">{lead}</p>}
      </div>
      {acciones && <div className="flex shrink-0 flex-wrap gap-3">{acciones}</div>}
    </div>
  );
}
