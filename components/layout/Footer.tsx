import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FOOTER } from "@/data/navegacion";
import { SUCURSALES } from "@/data/sucursales";
import { SITE, whatsappHref } from "@/lib/constants";

export function Footer() {
  const base = SUCURSALES.find((s) => s.principal)!;
  return (
    <footer className="border-t border-tm-linea bg-tm-gris-900 pb-[calc(var(--barra-movil)+24px)] md:pb-0">
      <div className="container-tm grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div className="max-w-sm">
          <Logo alto={30} />
          <p className="mt-5 text-small text-tm-texto-suave">{SITE.description}</p>
          <address className="mt-6 not-italic text-small text-tm-texto">
            <a href={base.mapa} target="_blank" rel="noopener" className="block hover:text-white">
              {base.direccion}, {base.comuna}, Chile
            </a>
            <a href={SITE.telefonoHref} data-ev="phone_click" data-ev-params='{"ubicacion_cta":"footer"}' className="mt-2 block font-mono hover:text-white">
              {SITE.telefono}
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener" data-ev="whatsapp_click" data-ev-params='{"ubicacion_cta":"footer"}' className="block font-mono hover:text-white">
              WhatsApp {SITE.whatsapp}
            </a>
            <a href={`mailto:${SITE.email}`} className="block font-mono hover:text-white">
              {SITE.email}
            </a>
          </address>
          <ul className="mt-6 flex flex-wrap gap-4 font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave">
            {Object.entries(SITE.redes).map(([k, v]) => (
              <li key={k}>
                <a href={v} target="_blank" rel="noopener" className="hover:text-white">
                  {k}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {FOOTER.map((col) => (
          <div key={col.titulo}>
            <h2 className="font-mono text-overline font-medium tracking-[0.14em] text-tm-rojo-texto">{col.titulo}</h2>
            <ul className="mt-4 grid gap-2.5">
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="text-small text-tm-texto hover:text-white">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-tm-linea">
        <div className="container-tm flex flex-wrap items-center justify-between gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.1em] text-tm-texto-suave">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} · {SITE.tagline}.
          </p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/privacidad" className="hover:text-white">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-white">
                Términos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
