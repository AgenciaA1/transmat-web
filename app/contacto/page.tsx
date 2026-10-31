import { FormularioContacto } from "@/components/formularios/FormularioContacto";
import { Button } from "@/components/ui/Button";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { SUCURSALES } from "@/data/sucursales";
import { SITE, whatsappHref } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto | Transmat",
  description: "Base en La Negra, Antofagasta, y sucursal en Calama. Teléfono, WhatsApp, correo y formulario de consulta con consentimiento.",
  path: "/contacto",
});

export default function Contacto() {
  return (
    <div className="container-tm grid gap-12 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="eyebrow">Contacto</p>
        <h1 className="mt-4 text-h1">Hablemos de tu operación</h1>
        <p className="mt-4 text-lead text-tm-texto">Si ya sabes qué necesitas mover, el planificador te muestra los equipos candidatos en cuatro pasos. Si prefieres, escríbenos directo.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/planificador" evento="cta_click" eventoParams={{ ubicacion_cta: "contacto", destino: "planificador" }}>
            Planificar operación
          </Button>
          <Button href={SITE.telefonoHref} variante="contorno" evento="phone_click" eventoParams={{ ubicacion_cta: "contacto" }}>
            <IconPhone width={16} height={16} className="text-tm-rojo-texto" /> {SITE.telefono}
          </Button>
          <Button href={whatsappHref("Hola Transmat, quiero consultar por una operación.")} variante="contorno" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "contacto" }}>
            <IconWhatsApp width={16} height={16} className="text-tm-verde-texto" /> WhatsApp
          </Button>
        </div>
        <dl className="mt-10 grid gap-6 border-t border-tm-linea pt-8 sm:grid-cols-2">
          {SUCURSALES.map((s) => (
            <div key={s.nombre}>
              <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-rojo-texto">{s.nombre}</dt>
              <dd className="mt-2 text-small text-tm-texto">
                {s.mapa ? (
                  <a href={s.mapa} target="_blank" rel="noopener" className="hover:text-white">
                    {s.direccion}, {s.comuna}
                  </a>
                ) : (
                  <>
                    {s.direccion}, {s.comuna}
                  </>
                )}
              </dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-rojo-texto">Correo</dt>
            <dd className="mt-2 text-small">
              <a href={`mailto:${SITE.email}`} className="text-tm-texto hover:text-white">
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-overline uppercase tracking-[0.14em] text-tm-rojo-texto">Emergencias</dt>
            <dd className="mt-2 text-small text-tm-texto">24/7 · {SITE.telefono}</dd>
          </div>
        </dl>
      </div>
      <div className="panel-hud p-6 md:p-9">
        <h2 className="text-h3">Escríbenos</h2>
        <p className="mt-2 text-small text-tm-texto-suave">Un ejecutivo de Transmat te responde por correo o teléfono.</p>
        <div className="mt-6">
          <FormularioContacto />
        </div>
      </div>
    </div>
  );
}
