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
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Transmat | Izajes y transportes de alta complejidad en Chile",
  description: "Grúas de 35 a 800 t, más de 80 líneas modulares, ingeniería de maniobra y emergencias 24/7 desde La Negra, Antofagasta. Planifica tu operación en cuatro pasos.",
  path: "/",
});

/**
 * Home A · «Centro de mando», orientada a conversión (docs/HOME_A_CONVERSION.md).
 * Orden: promesa → acción (paso 1 del planificador) → por dónde entrar (industrias, servicios)
 * → evidencia (flota, casos) → confianza (CGO) → emergencias → contenido → cierre.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SelectorNecesidad />
      <Industrias />
      <Servicios />
      <FlotaRangos />
      <ProyectosDestacados />
      <CgoPromesa />
      <BandaEmergencias />
      <ArticulosRecientes />
      <CierreCta />
    </>
  );
}
