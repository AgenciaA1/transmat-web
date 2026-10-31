import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Logotipo oficial (archivo real de logos/, nunca redibujado). */
export function Logo({ className, alto = 30, enlace = true }: { className?: string; alto?: number; enlace?: boolean }) {
  const ancho = Math.round(alto * (1921 / 451));
  const img = <Image src="/brand/logo-transmat-blanco.png" alt="Transmat" width={ancho} height={alto} priority className={cn("h-auto w-auto", className)} style={{ height: alto }} />;
  return enlace ? (
    <Link href="/" aria-label="Transmat, inicio" className="inline-flex items-center">
      {img}
    </Link>
  ) : (
    img
  );
}
