import { Button } from "@/components/ui/Button";
import { IconCheck, IconWhatsApp } from "@/components/ui/Icons";
import { SITE, whatsappHref } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Solicitud recibida | Transmat", description: "Recibimos tu solicitud. Un ejecutivo de Transmat la revisa con ingeniería y te contacta.", path: "/gracias", noindex: true });

export default async function Gracias({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { tipo } = await searchParams;
  const esPlanificador = tipo === "planificador";
  return (
    <div className="container-tm py-20 md:py-28">
      <div className="panel-hud mx-auto max-w-2xl p-8 md:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-tm-verde text-tm-verde-texto">
          <IconCheck />
        </span>
        <p className="eyebrow mt-6">{esPlanificador ? "Solicitud de pre-factibilidad" : "Consulta"} recibida</p>
        <h1 className="mt-4 text-h1">Ya está en manos de un ejecutivo</h1>
        <p className="mt-4 text-lead text-tm-texto">
          {esPlanificador
            ? "Tu solicitud llegó con la operación, la carga, la faena, la ventana de fecha y los equipos candidatos. Ingeniería la revisa con la tabla de carga y un ejecutivo de Transmat te contacta por correo o teléfono."
            : "Tu mensaje llegó al equipo de Transmat. Un ejecutivo te contacta por correo o teléfono."}
        </p>
        <p className="mt-4 text-small text-tm-texto-suave">Si la operación es urgente, no esperes la respuesta: el servicio de emergencias atiende 24/7.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={SITE.telefonoHref} evento="phone_click" eventoParams={{ ubicacion_cta: "gracias" }}>
            Emergencias · {SITE.telefono}
          </Button>
          <Button href={whatsappHref("Hola Transmat, acabo de enviar una solicitud desde el sitio.")} variante="contorno" evento="whatsapp_click" eventoParams={{ ubicacion_cta: "gracias" }}>
            <IconWhatsApp width={16} height={16} className="text-tm-verde-texto" /> WhatsApp
          </Button>
          <Button href="/" variante="contorno">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
