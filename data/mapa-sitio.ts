import type { PaginaPlanificada } from "./tipos";
import { INDUSTRIAS } from "./industrias";
import { SERVICIOS } from "./servicios";

/**
 * Mapa de sitio aprobado (docs/01 §4). Las páginas de fase 3 existen hoy como marcador
 * de posición con su propósito declarado, para que la navegación y los enlaces de la Home
 * sean reales y no caigan en 404 durante la revisión.
 */
export const PAGINAS: PaginaPlanificada[] = [
  { ruta: "/industrias", titulo: "Industrias", descripcion: "Entrada por industria: minería, energía, construcción y montaje, puertos y logística, ferroviaria, agua y desalinización.", fase: 3 },
  ...INDUSTRIAS.map((i) => ({ ruta: `/industrias/${i.slug}`, titulo: i.nombre, descripcion: i.lead, fase: 3 as const })),
  { ruta: "/servicios", titulo: "Servicios", descripcion: "Arriendo de grúas, transporte de cargas especiales, ingeniería y montaje, emergencias 24/7, logística de proyectos y almacenamiento.", fase: 3 },
  ...SERVICIOS.filter((s) => s.slug !== "emergencias").map((s) => ({ ruta: s.ruta, titulo: s.nombre, descripcion: s.lead, fase: 3 as const })),
  { ruta: "/flota", titulo: "Flota", descripcion: "Catálogo filtrable por tipo y capacidad: grúas móviles, semirremolques, tractocamiones, camiones pluma y grúas horquilla, con ficha por modelo.", fase: 3 },
  { ruta: "/flota/gruas-moviles", titulo: "Grúas móviles", descripcion: "Grúas todo terreno, rough terrain y sobre orugas de 35 a 750 t, con ficha técnica por modelo.", fase: 3 },
  { ruta: "/flota/semirremolques", titulo: "Semirremolques", descripcion: "Camas bajas, ramplas extensibles y líneas modulares.", fase: 3 },
  { ruta: "/flota/tractocamiones", titulo: "Tractocamiones", descripcion: "Mercedes-Benz Actros 3363, Volvo FH540, MAN TGS, Mack y Freightliner.", fase: 3 },
  { ruta: "/flota/camiones-pluma", titulo: "Camiones pluma", descripcion: "Camión pluma articulada Volvo VM 330 de 27,5 t.", fase: 3 },
  { ruta: "/flota/gruas-horquilla", titulo: "Grúas horquilla", descripcion: "Zoomlion, XCMG y Hyster, de 10 a 32 t.", fase: 3 },
  { ruta: "/proyectos", titulo: "Proyectos", descripcion: "Casos como ficha técnica: qué se movió, cuántas toneladas, con qué equipos y configuración, dónde y cuándo. Filtrables por industria, servicio y equipo.", fase: 3 },
  { ruta: "/cgo", titulo: "CGO Transmat", descripcion: "Centro de Gestión Operacional: tu operación visible en línea, con etapas, GPS, reportes por orden de trabajo y estado de pago.", fase: 3 },
  { ruta: "/transmat", titulo: "Quiénes somos", descripcion: "Transmat desde 2005: base en La Negra, sucursal en Calama, valores y equipo.", fase: 3 },
  { ruta: "/transmat/tecnologia", titulo: "Tecnología", descripcion: "Control GPS, grúas a control remoto, cámaras 360°, almohadillas estabilizadoras, Moasure y dron DJI Mavic 3E.", fase: 3 },
  { ruta: "/transmat/seguridad-y-certificaciones", titulo: "Seguridad y certificaciones", descripcion: "Política SGI 2026, políticas de alcohol y drogas, RSE y SSOMA; referencia ASME B30.5 e ISO 9927; flota Euro 6.", fase: 3 },
  { ruta: "/transmat/sostenibilidad", titulo: "Sostenibilidad", descripcion: "Flota Euro 6, participación en proyectos de energía renovable y reducción de huella.", fase: 3 },
  { ruta: "/trabaja-con-nosotros", titulo: "Trabaja con nosotros", descripcion: "Áreas, cultura y postulación con CV.", fase: 3 },
  { ruta: "/articulos", titulo: "Artículos", descripcion: "60 artículos técnicos en cinco temas: minería, energía, logística y transporte, equipos y tecnología, Transmat.", fase: 3 },
  { ruta: "/noticias", titulo: "Noticias", descripcion: "Participación en Exponor, mantenimientos mayores y alianzas.", fase: 3 },
  { ruta: "/privacidad", titulo: "Política de privacidad", descripcion: "Tratamiento de datos personales conforme a la Ley 21.719.", fase: 3 },
  { ruta: "/cookies", titulo: "Política de cookies", descripcion: "Uso de cookies y consentimiento.", fase: 3 },
  { ruta: "/terminos", titulo: "Términos de uso", descripcion: "Condiciones de uso del sitio.", fase: 3 },
];

export const paginaPlanificada = (ruta: string) => PAGINAS.find((p) => p.ruta === ruta);
