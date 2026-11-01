import Link from "next/link";
import { IconArrow, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { SITE, whatsappHref } from "@/lib/constants";

/** Barra fija inferior en móvil: Llamar · WhatsApp · Planificar (docs/01 §5). */
export function MobileBar() {
  // Etiquetas de 12 px (mínimo HIG en móvil: 11 pt) y estado pulsado en cada acción.
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 py-2 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-fast";
  return (
    <nav aria-label="Acciones rápidas" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-tm-linea bg-tm-negro/92 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      <a href={SITE.telefonoHref} data-ev="phone_click" data-ev-params='{"ubicacion_cta":"barra_movil"}' className={`${item} text-white active:bg-white/10`}>
        <IconPhone className="text-tm-rojo-texto" /> Llamar
      </a>
      <a href={whatsappHref("Hola Transmat, quiero consultar por una operación.")} target="_blank" rel="noopener" data-ev="whatsapp_click" data-ev-params='{"ubicacion_cta":"barra_movil"}' className={`${item} border-x border-tm-linea text-white active:bg-white/10`}>
        <IconWhatsApp className="text-tm-verde-texto" /> WhatsApp
      </a>
      <Link href="/planificador" data-ev="cta_click" data-ev-params='{"ubicacion_cta":"barra_movil","destino":"planificador"}' className={`${item} bg-tm-rojo text-white active:bg-tm-rojo-oscuro`}>
        <IconArrow /> Planificar
      </Link>
    </nav>
  );
}
