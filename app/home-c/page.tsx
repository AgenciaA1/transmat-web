import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SelectorNecesidad } from "@/components/sections/SelectorNecesidad";
import { Industrias } from "@/components/sections/Industrias";
import { Servicios } from "@/components/sections/Servicios";
import { FlotaRangos } from "@/components/sections/FlotaRangos";
import { ProyectosDestacados } from "@/components/sections/ProyectosDestacados";
import { CgoPromesa } from "@/components/sections/CgoPromesa";
import { BandaEmergencias } from "@/components/sections/BandaEmergencias";
import { ArticulosRecientes } from "@/components/sections/ArticulosRecientes";
import { CierreCta } from "@/components/sections/CierreCta";
import { BloqueTema } from "@/components/ui/BloqueTema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Home C · propuesta de look | Transmat",
  description: "Variante de look de la Home A: negro predominante con bloques rojos y blancos en una intercalación no lineal.",
  path: "/home-c",
  noindex: true,
});

/**
 * Variante C, solo de look (pedido de Felipe, 2-nov-2026): el negro sigue siendo el color
 * principal y el rojo y el blanco entran como acentos de bloque, sin alternancia regular.
 * Negro: hero, planificador, servicios, proyectos, CGO, cierre y pie. Rojo: industrias y
 * emergencias. Blanco: flota y artículos. Mismos componentes y contenido que la A (`/`).
 */
export default function HomeC() {
  return (
    <>
      <p className="border-b border-tm-linea bg-tm-gris-900 px-5 py-2.5 text-center font-mono text-[11.5px] uppercase tracking-[0.12em] text-tm-texto-suave">
        Propuesta de look C · negro predominante con bloques rojo y blanco ·{" "}
        <Link href="/" className="text-white underline underline-offset-4 hover:text-tm-rojo-texto">
          Ver A
        </Link>{" "}
        ·{" "}
        <Link href="/home-b" className="text-white underline underline-offset-4 hover:text-tm-rojo-texto">
          Ver B
        </Link>
      </p>
      <Hero />
      <BloqueTema tema="negro" fondo={false}>
        <SelectorNecesidad />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <Industrias />
      </BloqueTema>
      <BloqueTema tema="negro">
        <Servicios />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <FlotaRangos />
      </BloqueTema>
      <BloqueTema tema="negro">
        <ProyectosDestacados />
      </BloqueTema>
      <BloqueTema tema="negro">
        <CgoPromesa />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <BandaEmergencias />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <ArticulosRecientes />
      </BloqueTema>
      <BloqueTema tema="negro">
        <CierreCta />
      </BloqueTema>
    </>
  );
}
