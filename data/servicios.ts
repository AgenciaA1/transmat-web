import type { Servicio } from "./tipos";

/**
 * Servicios (docs/01 §4). Los cuatro actuales conservan su URL raíz; el quinto es nuevo (R-03)
 * y queda marcado hasta validarlo con el cliente. Copy reformulado sobre el sitio actual y el
 * contexto maestro §2.4 y §3.
 */
export const SERVICIOS: Servicio[] = [
  {
    slug: "arriendo-de-gruas",
    ruta: "/arriendo-de-gruas",
    nombre: "Arriendo de grúas",
    marca: "Transkrane",
    lead: "Grúas de 35 a 800 t con operador y rigger certificados, en la configuración que exige la maniobra.",
    alcance: ["Grúas todo terreno, rough terrain y sobre orugas", "SuperLift, Wind Power Jib, Luffing Jib y jib fijo", "Operadores y riggers certificados", "Disponibilidad 24/7 y mantención preventiva calendarizada"],
    cta: "Planificar un izaje",
    operacion: "izaje",
    metaTitle: "Arriendo de grúas de 35 a 800 t | Transmat",
    metaDescription: "Rental de grúas todo terreno, RT y crawler con operador y rigger certificados. XCMG, Grove, Liebherr, Terex. Base en La Negra, Antofagasta.",
  },
  {
    slug: "transporte-de-cargas-especiales",
    ruta: "/transporte-de-cargas-especiales",
    nombre: "Transporte de cargas especiales",
    marca: "Transtruck",
    lead: "Cargas sobredimensionadas y de sobrepeso por carretera, con permisos, escolta propia y GPS en tiempo real.",
    alcance: ["Más de 80 líneas modulares para cargas sobre 100 t", "Camas bajas y ramplas extensibles de 30 a 126 t", "Tractocamiones Mercedes-Benz Actros 3363, Volvo FH540, MAN y Mack", "Gestión de permisos, coordinación con autoridades y escolta propia"],
    cta: "Planificar un transporte",
    operacion: "transporte",
    metaTitle: "Transporte de cargas especiales y sobredimensionadas | Transmat",
    metaDescription: "Líneas modulares, camas bajas de 30 a 126 t, permisos y escolta propia. Traslados de locomotoras, transformadores y camiones mineros en Chile.",
  },
  {
    slug: "ingenieria-y-montaje",
    ruta: "/ingenieria-y-montaje",
    nombre: "Ingeniería y montaje",
    marca: "Transmat",
    lead: "Planificación e izaje crítico con estudio de carga, simulación de maniobra y supervisión en terreno.",
    alcance: ["Evaluación de sitio con dron DJI Mavic 3E y Moasure", "Estudio de carga y simulación con CRANEbee", "Planner riggers especializados en izaje crítico", "Referencia normativa ASME B30.5 e ISO 9927"],
    cta: "Planificar un montaje",
    operacion: "montaje",
    metaTitle: "Ingeniería de izaje y montaje industrial | Transmat",
    metaDescription: "Estudio de carga, simulación de maniobra y montaje de alto tonelaje con planner riggers. Casos en minería, energía y construcción.",
  },
  {
    slug: "emergencias",
    ruta: "/emergencias",
    nombre: "Emergencias 24/7",
    marca: "Transmat",
    lead: "Rescate de equipos siniestrados y recuperación de cargas en carretera, faena o zonas remotas, a cualquier hora.",
    alcance: ["Recuperación de maquinaria de alto tonelaje, contenedores y material rodante", "Logística y rescate en carretera", "Coordinación con autoridades y servicios de emergencia", "Cobertura desde La Negra y Calama"],
    cta: "Llamar ahora",
    operacion: null,
    metaTitle: "Emergencias 24/7: rescate de cargas y equipos | Transmat",
    metaDescription: "Respuesta inmediata para rescate de equipos siniestrados y cargas de alto tonelaje en carretera, minas, puertos y faenas remotas.",
  },
  {
    slug: "logistica-de-proyectos-y-almacenamiento",
    ruta: "/servicios/logistica-de-proyectos-y-almacenamiento",
    nombre: "Logística de proyectos y almacenamiento",
    marca: "Transmat",
    lead: "Gestión integral de la carga de proyecto: rutas, permisos, coordinación multiservicio, bodegaje y cross-docking en La Negra.",
    alcance: ["16.200 m² de instalaciones en el sector industrial La Negra", "Almacenamiento estratégico y cross-docking industrial", "Coordinación de izaje, transporte y montaje en un solo contrato"],
    cta: "Planificar una operación",
    operacion: "combinada",
    nuevo: true,
    metaTitle: "Logística de proyectos y almacenamiento | Transmat",
    metaDescription: "Gestión integral de carga de proyecto con bodegaje y cross-docking en La Negra, Antofagasta.",
  },
];

export const servicio = (slug: string) => SERVICIOS.find((s) => s.slug === slug);
