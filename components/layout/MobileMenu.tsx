"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu, IconWhatsApp, IconPhone } from "@/components/ui/Icons";
import { NAV } from "@/data/navegacion";
import { SITE, whatsappHref } from "@/lib/constants";

export function MobileMenu() {
  const ruta = usePathname();
  // Se guarda la ruta en la que se abrió: al navegar, el menú queda cerrado sin efectos.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const abierto = abiertoEn === ruta;
  const setAbierto = (v: boolean) => setAbiertoEn(v ? ruta : null);

  useEffect(() => {
    document.documentElement.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [abierto]);

  return (
    <div className="xl:hidden">
      <button type="button" aria-expanded={abierto} aria-controls="menu-movil" onClick={() => setAbierto(!abierto)} className="inline-flex h-11 w-11 items-center justify-center border border-tm-linea-fuerte text-white transition-colors duration-fast active:bg-white/10">
        {abierto ? <IconClose /> : <IconMenu />}
        <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
      </button>

      {/* Posicionado respecto del header (que es fijo): el backdrop-filter del header lo convierte
          en contenedor de cualquier descendiente `fixed`, por eso el panel no puede ser `fixed`. */}
      {/* Entra y sale por el mismo camino (desde el header hacia abajo), con curva de resorte;
          la transición de `display` es discreta, así que `hidden` sigue sacándolo del árbol accesible. */}
      <div
        id="menu-movil"
        hidden={!abierto}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-height))] overflow-y-auto bg-tm-negro transition-[opacity,translate,display] transition-discrete duration-base ease-spring starting:-translate-y-2 starting:opacity-0 [&[hidden]]:-translate-y-2 [&[hidden]]:opacity-0"
      >
        <nav aria-label="Principal, móvil" className="container-tm py-6 pb-10">
          <ul className="divide-y divide-tm-linea border-y border-tm-linea">
            {NAV.map((g) => (
              <li key={g.href} className="py-3">
                <Link href={g.href} className="block py-2.5 text-h4 font-black uppercase text-white active:text-tm-rojo-texto">
                  {g.label}
                </Link>
                {g.items && (
                  <ul className="mt-1 grid pb-2">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="block py-2.5 text-small text-tm-texto active:text-white">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <a href={SITE.telefonoHref} data-ev="phone_click" data-ev-params='{"ubicacion_cta":"menu_movil"}' className="inline-flex items-center gap-3 border border-tm-linea-fuerte px-4 py-3 font-mono text-small text-white">
              <IconPhone className="text-tm-rojo-texto" /> Emergencias 24/7 · {SITE.telefono}
            </a>
            <a href={whatsappHref("Hola Transmat, quiero consultar por una operación.")} target="_blank" rel="noopener" data-ev="whatsapp_click" data-ev-params='{"ubicacion_cta":"menu_movil"}' className="inline-flex items-center gap-3 border border-tm-linea-fuerte px-4 py-3 font-mono text-small text-white">
              <IconWhatsApp className="text-tm-verde-texto" /> WhatsApp · {SITE.whatsapp}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
