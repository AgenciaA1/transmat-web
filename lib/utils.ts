import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge debe conocer los tokens propios del @theme (tamaños y duraciones). */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "small", "overline"] }],
      duration: [{ duration: ["instant", "fast", "base", "slow", "slower"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Miles con punto y decimales con coma (español de Chile). */
export function formatearNumero(n: number, decimales = 0): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(n);
}

/** Toneladas: "126,88 t", "750 t". */
export function formatearToneladas(t: number): string {
  return `${formatearNumero(t, Number.isInteger(t) ? 0 : 1)} t`;
}

export function formatearFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
