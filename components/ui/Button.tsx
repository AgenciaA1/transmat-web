import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { EventoMedicion } from "@/lib/analytics";

type Variante = "rojo" | "contorno" | "blanco" | "enlace";
type Tamano = "md" | "sm" | "lg";

/* Cada variante tiene estado hover y estado pulsado (`active:`), como pide HIG › Buttons. */
/* Colores por token semántico (cta, tinta, acento): dentro de un BloqueTema rojo o blanco el botón
   se invierte solo, sin variantes nuevas. En la Home A los tokens valen lo mismo que antes. */
const variantes: Record<Variante, string> = {
  rojo: "bg-tm-cta text-tm-cta-texto shadow-[0_10px_28px_var(--tm-cta-sombra)] hover:bg-tm-cta-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-tm-cta-hover active:shadow-none",
  contorno: "border border-tm-linea-fuerte text-tm-tinta hover:border-tm-tinta hover:bg-tm-tinta/5 active:scale-[0.98] active:bg-tm-tinta/10",
  blanco: "bg-white text-tm-negro hover:bg-neutral-200 active:scale-[0.98] active:bg-neutral-300",
  // El enlace lleva subrayado siempre: la interactividad no depende solo del color.
  enlace: "min-h-11 px-0 py-0 text-[12.5px] text-tm-acento-texto underline decoration-tm-acento-texto/40 underline-offset-4 hover:decoration-current active:opacity-70",
};
/* Mínimo táctil de 44 px (mínimo HIG en móvil) incluso en el tamaño chico. */
const tamanos: Record<Tamano, string> = {
  sm: "min-h-11 px-4 py-2.5 text-[12px]",
  md: "min-h-12 px-6 py-3.5 text-[12.5px]",
  lg: "min-h-13 px-8 py-4 text-[13px]",
};

type Props = {
  href?: string;
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
  /** Evento de medición emitido al hacer clic (lo captura TrackClicks) */
  evento?: EventoMedicion;
  eventoParams?: Record<string, string | number | boolean>;
  externo?: boolean;
} & Omit<ComponentProps<"button">, "children">;

export function Button({ href, variante = "rojo", tamano = "md", className, children, evento, eventoParams, externo, ...rest }: Props) {
  const clases = cn(
    // Tailwind v4 mueve con `translate` y `scale` (no `transform`): deben estar en la lista o el hover salta sin transición.
    "inline-flex items-center justify-center gap-2.5 rounded-sm font-black uppercase tracking-[0.12em] transition-[translate,scale,background-color,border-color,color,box-shadow,opacity,text-decoration-color] duration-fast ease-tm",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0",
    variantes[variante],
    variante !== "enlace" && tamanos[tamano],
    className,
  );
  const data = evento ? { "data-ev": evento, "data-ev-params": eventoParams ? JSON.stringify(eventoParams) : undefined } : {};

  if (href) {
    const esExterno = externo ?? /^(https?:|tel:|mailto:)/.test(href);
    return esExterno ? (
      <a href={href} className={clases} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener" : undefined} {...data}>
        {children}
      </a>
    ) : (
      <Link href={href} className={clases} {...data}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={clases} {...data} {...rest}>
      {children}
    </button>
  );
}
