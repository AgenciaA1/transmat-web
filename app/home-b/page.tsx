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
  title: "Home B · propuesta de look | Transmat",
  description: "Variante de look de la Home A: misma estructura y contenido, con bloques alternados en rojo y blanco.",
  path: "/home-b",
  noindex: true,
});

/**
 * Variante B, solo de look (pedido de Felipe, 31-oct-2026): la misma Home A, con los mismos
 * componentes, contenido y orden; cambian únicamente los tokens por bloque. La A sigue en `/`.
 * No se indexa ni entra al sitemap (docs/HOME_B_LOOK.md).
 */
export default function HomeB() {
  return (
    <>
      <p className="border-b border-tm-linea bg-tm-gris-900 px-5 py-2.5 text-center font-mono text-[11.5px] uppercase tracking-[0.12em] text-tm-texto-suave">
        Propuesta de look B · bloques rojo y blanco · mismo contenido que la A ·{" "}
        <Link href="/" className="text-white underline underline-offset-4 hover:text-tm-rojo-texto">
          Ver A
        </Link>{" "}
        ·{" "}
        <Link href="/home-c" className="text-white underline underline-offset-4 hover:text-tm-rojo-texto">
          Ver C
        </Link>
      </p>
      <Hero />
      {/* La tarjeta del planificador se superpone al hero: sin fondo propio, para que flote entre el negro y el rojo. */}
      <BloqueTema tema="blanco" fondo={false}>
        <SelectorNecesidad />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <Industrias />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <Servicios />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <FlotaRangos />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <ProyectosDestacados />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <CgoPromesa />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <BandaEmergencias />
      </BloqueTema>
      <BloqueTema tema="rojo">
        <ArticulosRecientes />
      </BloqueTema>
      <BloqueTema tema="blanco">
        <CierreCta />
      </BloqueTema>
    </>
  );
}
