import { Button } from "@/components/ui/Button";
import { IconWhatsApp } from "@/components/ui/Icons";
import { SITE, whatsappHref } from "@/lib/constants";

export function CierreCta() {
  return (
    <section className="border-t border-tm-linea py-20 md:py-28" aria-labelledby="titulo-cierre">
      <div className="container-tm">
        <div className="panel-hud grid gap-8 p-8 md:grid-cols-[1.2fr_.8fr] md:p-12">
          <div>
            <p className="eyebrow">Siguiente paso</p>
            <h2 id="titulo-cierre" className="mt-4 text-h1">
              Pongamos en marcha tu proyecto
            </h2>
            <p className="mt-4 max-w-xl text-lead text-tm-texto">Describe la carga, la faena y la fecha. Un ejecutivo de Transmat revisa la solicitud con ingeniería y te contacta.</p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Button href="/planificador" tamano="lg" evento="cta_click" eventoParams={{ ubicacion_cta: "cierre", destino: "planificador" }}>
              Planificar mi operación
            </Button>
            <Button href={whatsappHref("Hola Transmat, quiero consultar por una operación.")} variante="contorno" tamano="lg" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "cierre" }}>
              <IconWhatsApp width={18} height={18} className="text-tm-whatsapp" /> Escribir por WhatsApp
            </Button>
            <p className="mt-2 text-center font-mono text-small text-tm-texto-suave">
              {SITE.email} · {SITE.telefono}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
