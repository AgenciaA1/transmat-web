import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconChevron, IconPhone } from "@/components/ui/Icons";
import { MobileMenu } from "./MobileMenu";
import { NAV } from "@/data/navegacion";
import { SITE } from "@/lib/constants";

/**
 * Header fijo (docs/01 §5): navegación por industria, servicios y flota; teléfono de
 * emergencias visible y CTA al planificador. Los desplegables se abren con hover y con foco.
 */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-height) border-b border-tm-linea bg-tm-negro/85 backdrop-blur-md">
      <div className="container-tm flex h-full items-center justify-between gap-6">
        <Logo alto={28} />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {NAV.map((g) => (
              <li key={g.href} className="group relative">
                <Link href={g.href} className="inline-flex items-center gap-1 py-5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-tm-texto-suave transition-colors duration-fast hover:text-white focus-visible:text-white">
                  {g.label}
                  {g.items && <IconChevron width={14} height={14} className="opacity-60 transition-transform duration-fast group-hover:rotate-180" />}
                </Link>
                {g.items && (
                  <div className="invisible absolute left-1/2 top-full w-[min(92vw,620px)] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-fast group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="panel-hud grid grid-cols-2 gap-px bg-tm-linea p-px">
                      {g.items.map((it) => (
                        <li key={it.href} className="bg-tm-gris-900">
                          <Link href={it.href} className="block h-full px-5 py-4 transition-colors duration-fast hover:bg-tm-gris-800 focus-visible:bg-tm-gris-800">
                            <span className="block text-[14px] font-black uppercase tracking-wide text-white">{it.label}</span>
                            {it.detalle && <span className="mt-1 block text-small text-tm-texto-suave">{it.detalle}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={SITE.telefonoHref} data-ev="phone_click" data-ev-params='{"ubicacion_cta":"header"}' className="hidden items-center gap-2 font-mono text-[12.5px] tracking-wide text-white hover:text-tm-rojo-texto md:inline-flex">
            <IconPhone width={16} height={16} className="text-tm-rojo-texto" />
            <span>
              <span className="text-tm-texto-suave">Emergencias 24/7 · </span>
              {SITE.telefono}
            </span>
          </a>
          <Button href="/planificador" tamano="sm" evento="cta_click" eventoParams={{ ubicacion_cta: "header", destino: "planificador" }} className="hidden sm:inline-flex">
            Planificar operación
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
