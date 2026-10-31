import { Button } from "@/components/ui/Button";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { SITE, whatsappHref } from "@/lib/constants";

/** Banda de emergencias: la ruta de contacto directo, sin formulario. */
export function BandaEmergencias() {
  return (
    <section className="border-t border-tm-linea bg-[linear-gradient(110deg,rgba(223,8,33,.22),rgba(10,10,10,0)_60%)] py-14" aria-labelledby="titulo-emergencias">
      <div className="container-tm flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Emergencias 24/7</p>
          <h2 id="titulo-emergencias" className="mt-3 text-h2">
            Equipo siniestrado o carga detenida: llama ahora
          </h2>
          <p className="mt-3 text-tm-texto">Rescate de maquinaria de alto tonelaje, contenedores y material rodante en carretera, faena o zonas remotas. Cobertura desde La Negra y Calama, con coordinación con autoridades.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={SITE.telefonoHref} tamano="lg" evento="phone_click" eventoParams={{ ubicacion_cta: "banda_emergencias" }}>
            <IconPhone width={18} height={18} /> {SITE.telefono}
          </Button>
          <Button href={whatsappHref("Hola Transmat, tengo una emergencia y necesito coordinar una maniobra de rescate.")} variante="contorno" tamano="lg" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "banda_emergencias" }}>
            <IconWhatsApp width={18} height={18} className="text-tm-verde-texto" /> WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
