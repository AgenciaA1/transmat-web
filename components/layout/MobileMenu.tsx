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
      <button type="button" aria-expanded={abierto} aria-controls="menu-movil" onClick={() => setAbierto(!abierto)} className="inline-flex h-11 w-11 items-center justify-center border border-tm-linea-fuerte text-white">
        {abierto ? <IconClose /> : <IconMenu />}
        <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
      </button>

      <div id="menu-movil" hidden={!abierto} className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto bg-tm-negro">
        <nav aria-label="Principal, móvil" className="container-tm py-6">
          <ul className="divide-y divide-tm-linea border-y border-tm-linea">
            {NAV.map((g) => (
              <li key={g.href} className="py-3">
                <Link href={g.href} className="block py-2 text-h4 font-black uppercase text-white">
                  {g.label}
                </Link>
                {g.items && (
                  <ul className="mt-1 grid gap-1 pb-2">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="block py-1.5 text-small text-tm-texto">
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
