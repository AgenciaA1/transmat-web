import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Proporción del archivo en public/brand (el oficial de logos/, recortado al área con tinta: 1639×291). */
const PROPORCION = 1639 / 291;

/**
 * Logotipo oficial (archivo real de logos/, nunca redibujado). La altura visible se controla con
 * clases (`h-8 xl:h-10`); `alto` solo fija la proporción intrínseca para el layout.
 */
export function Logo({ className, alto = 40, enlace = true }: { className?: string; alto?: number; enlace?: boolean }) {
  const img = <Image src="/brand/logo-transmat-blanco.png" alt="Transmat" width={Math.round(alto * PROPORCION)} height={alto} priority className={cn("h-10 w-auto", className)} />;
  return enlace ? (
    <Link href="/" aria-label="Transmat, inicio" className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  ) : (
    img
  );
}
