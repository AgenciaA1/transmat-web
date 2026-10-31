import { Button } from "@/components/ui/Button";
import { IconCheck, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { PROYECTOS } from "@/data/proyectos";
import { servicio } from "@/data/servicios";
import { SITE, whatsappHref } from "@/lib/constants";
import { jsonLd, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

const s = servicio("emergencias")!;

export const metadata = buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: "/emergencias" });

/** Landing de llamada directa: el teléfono arriba, qué cubre, qué informar y un caso. Sin formulario. */
export default function Emergencias() {
  const caso = PROYECTOS.find((p) => p.slug === "servicio-rescate-carga-de-alto-tonelaje-ruta-b-400");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema({ nombre: s.nombre, descripcion: s.metaDescription, path: "/emergencias", alcance: s.alcance }))} />
      <section className="border-b border-tm-linea bg-[linear-gradient(110deg,rgba(223,8,33,.22),rgba(10,10,10,0)_60%)]">
        <div className="container-tm grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">Emergencias 24/7 · respuesta inmediata</p>
            <h1 className="mt-5 text-display">Llama ahora</h1>
            <p className="mt-5 max-w-xl text-lead text-tm-texto">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SITE.telefonoHref} tamano="lg" evento="phone_click" eventoParams={{ ubicacion_cta: "emergencias_hero" }}>
                <IconPhone width={18} height={18} /> {SITE.telefono}
              </Button>
              <Button href={whatsappHref("Hola Transmat, tengo una emergencia y necesito coordinar una maniobra de rescate.")} variante="contorno" tamano="lg" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "emergencias_hero" }}>
                <IconWhatsApp width={18} height={18} className="text-tm-verde-texto" /> WhatsApp {SITE.whatsapp}
              </Button>
            </div>
          </div>
          <div className="panel-hud p-6 md:p-8">
            <h2 className="font-mono text-overline font-medium normal-case tracking-[0.14em] text-tm-rojo-texto">Qué informar al llamar</h2>
            <ul className="mt-4 divide-y divide-tm-linea text-small text-tm-texto">
              {["Qué equipo o carga está detenido y su peso aproximado", "Dónde está: ruta y kilómetro, faena o puerto", "Estado del equipo: volcado, siniestrado, sin tracción", "Acceso al lugar y condiciones del terreno", "Persona de contacto en el sitio"].map((t) => (
                <li key={t} className="flex gap-3 py-3">
                  <IconCheck width={16} height={16} className="mt-1 shrink-0 text-tm-rojo-texto" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-tm grid gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h2 className="text-h2">Qué cubre el servicio</h2>
          <ul className="mt-6 grid gap-3">
            {s.alcance.map((a) => (
              <li key={a} className="flex gap-3 border-t border-tm-linea pt-3 text-tm-texto">
                <IconCheck width={18} height={18} className="mt-1 shrink-0 text-tm-rojo-texto" /> {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-tm-texto-suave">Recuperación de equipos siniestrados en minas, puertos, campos eólicos, faenas particulares y lugares remotos, con coordinación logística y gestión con autoridades y servicios de emergencia.</p>
        </div>
        {caso && (
          <div className="panel-hud p-6 md:p-8">
            <p className="eyebrow">Caso ejecutado</p>
            <h2 className="mt-3 text-h3">{caso.titulo}</h2>
            <p className="mt-3 text-small text-tm-texto">{caso.resumen}</p>
            <Link href={`/proyectos/${caso.slug}`} className="mt-5 inline-block font-mono text-overline uppercase tracking-[0.14em] text-tm-rojo-texto hover:text-white">
              Ver el caso →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
