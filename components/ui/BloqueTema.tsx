import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tema = "negro" | "rojo" | "blanco";

/**
 * Envuelve una sección con otro juego de tokens (fondo, tinta, acento, CTA) sin tocar sus
 * componentes: las secciones pintan con `bg-tm-fondo`, `text-tm-tinta`, etc., y aquí se
 * redefinen por bloque (`.tema-rojo`, `.tema-blanco` en globals.css). Con `fondo={false}` el
 * bloque no pinta su propio fondo (útil cuando la sección se superpone a la anterior).
 */
export function BloqueTema({ tema, fondo = true, children, className }: { tema: Tema; fondo?: boolean; children: ReactNode; className?: string }) {
  return <div className={cn(tema === "rojo" && "tema-rojo", tema === "blanco" && "tema-blanco", fondo && "bg-tm-fondo text-tm-texto", className)}>{children}</div>;
}
