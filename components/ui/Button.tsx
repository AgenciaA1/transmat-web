import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { EventoMedicion } from "@/lib/analytics";

type Variante = "rojo" | "contorno" | "blanco" | "enlace";
type Tamano = "md" | "sm" | "lg";

const variantes: Record<Variante, string> = {
  rojo: "bg-tm-rojo text-white shadow-[0_10px_28px_rgba(223,8,33,0.28)] hover:bg-tm-rojo-oscuro hover:-translate-y-0.5",
  contorno: "border border-tm-linea-fuerte text-white hover:border-white hover:bg-white/5",
  blanco: "bg-white text-tm-negro hover:bg-neutral-200",
  enlace: "text-tm-rojo-texto underline-offset-4 hover:underline px-0 py-0",
};
const tamanos: Record<Tamano, string> = {
  sm: "px-4 py-2.5 text-[11.5px]",
  md: "px-6 py-3.5 text-[12.5px]",
  lg: "px-8 py-4 text-[13px]",
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
    "inline-flex items-center justify-center gap-2.5 rounded-sm font-black uppercase tracking-[0.12em] transition-[transform,background-color,border-color,color,box-shadow] duration-fast ease-tm",
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
