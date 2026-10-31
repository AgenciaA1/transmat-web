import { INDUSTRIAS } from "./industrias";
import { SERVICIOS } from "./servicios";

export type NavLink = { label: string; href: string; detalle?: string };
export type NavGroup = { label: string; href: string; items?: NavLink[] };

/** Header (docs/01 §5). Los grupos despliegan sus hijos en escritorio. */
export const NAV: NavGroup[] = [
  { label: "Industrias", href: "/industrias", items: INDUSTRIAS.map((i) => ({ label: i.nombre, href: `/industrias/${i.slug}`, detalle: i.lead })) },
  { label: "Servicios", href: "/servicios", items: SERVICIOS.map((s) => ({ label: s.nombre, href: s.ruta, detalle: s.lead })) },
  {
    label: "Flota",
    href: "/flota",
    items: [
      { label: "Grúas móviles", href: "/flota/gruas-moviles", detalle: "Todo terreno, rough terrain y sobre orugas · 35 a 750 t" },
      { label: "Semirremolques", href: "/flota/semirremolques", detalle: "Camas bajas, ramplas y líneas modulares" },
      { label: "Tractocamiones", href: "/flota/tractocamiones", detalle: "Mercedes-Benz, Volvo, MAN, Mack, Freightliner" },
      { label: "Camiones pluma", href: "/flota/camiones-pluma", detalle: "Pluma articulada de 27,5 t" },
      { label: "Grúas horquilla", href: "/flota/gruas-horquilla", detalle: "10 a 32 t" },
    ],
  },
  { label: "Proyectos", href: "/proyectos" },
  {
    label: "Transmat",
    href: "/transmat",
    items: [
      { label: "Quiénes somos", href: "/transmat" },
      { label: "Tecnología", href: "/transmat/tecnologia" },
      { label: "Seguridad y certificaciones", href: "/transmat/seguridad-y-certificaciones" },
      { label: "Sostenibilidad", href: "/transmat/sostenibilidad" },
      { label: "CGO Transmat", href: "/cgo" },
      { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
    ],
  },
  { label: "Artículos", href: "/articulos" },
];

export const FOOTER: { titulo: string; items: NavLink[] }[] = [
  { titulo: "Industrias", items: INDUSTRIAS.map((i) => ({ label: i.nombre, href: `/industrias/${i.slug}` })) },
  { titulo: "Servicios", items: SERVICIOS.map((s) => ({ label: s.nombre, href: s.ruta })) },
  { titulo: "Flota", items: NAV[2].items! },
  { titulo: "Transmat", items: [...NAV[4].items!, { label: "Proyectos", href: "/proyectos" }, { label: "Artículos", href: "/articulos" }] },
];
