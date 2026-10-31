import type { Industria } from "./tipos";

/**
 * Entrada por industria (docs/01 §4, R-01). Los trabajos y casos salen del sitio actual
 * (home, corporativo y 19 proyectos publicados) y del contexto maestro §3.3.
 * Fotos: stock provisional del banco de A1 hasta contar con fotografía propia de faena.
 */
export const INDUSTRIAS: Industria[] = [
  {
    slug: "mineria",
    nombre: "Gran y mediana minería",
    corto: "Minería",
    lead: "Traslado de equipos de gran tonelaje, izajes en faena y apoyo en paradas de planta y mantenciones mayores.",
    trabajos: [
      "Traslado de camiones de extracción y chasis (Komatsu 730 y 930E, Liebherr T 264, CAT 794)",
      "Mantención de chancadores primarios y fundiciones (Chuquicamata, ENAMI Paipote, Altonorte)",
      "Carga de componentes de rotopala de 160 t en maniobra tándem",
      "Desmontaje y volteo de tolvas de camiones mineros",
    ],
    casos: ["carga-componente-rotopala", "mantencion-mayor-enami-paipote", "mantencion-chancador-primario"],
    equipos: ["XCMG XCA600", "Grove GMK7450", "Liebherr LTM 1250-5.1", "Líneas modulares"],
    foto: "/fotos/transporte.webp",
    fotoAlt: "Tractocamión con equipo minero sobre cama baja",
    metaTitle: "Izaje y transporte para minería | Transmat",
    metaDescription: "Traslado de CAEX, mantención de chancadores y fundiciones, componentes de 160 t. Grúas de 35 a 800 t y líneas modulares en el norte de Chile.",
  },
  {
    slug: "energia",
    nombre: "Energía",
    corto: "Energía",
    lead: "Montaje y transporte para proyectos solares, eólicos, termosolares, de transmisión y de almacenamiento.",
    trabajos: [
      "Transporte de transformadores de 218 t (AES Andes)",
      "Mantenimiento de aerogeneradores con Wind Power Jib (parques Tchamma y Calama)",
      "Montaje de evaporador en la planta termosolar Cerro Dominador",
      "Componentes de subestaciones y sistemas BESS",
    ],
    casos: ["traslado-de-transformadores-aes-andes", "mantenimiento-en-parques-eolicos-tchamma-y-calama", "proyecto-cerro-dominador-traslado-evaporador"],
    equipos: ["XCMG XCA750SA", "XCMG XCA600", "Líneas modulares"],
    foto: "/fotos/energia.webp",
    fotoAlt: "Grúa en montaje de aerogenerador",
    metaTitle: "Izaje y montaje para energía | Transmat",
    metaDescription: "Transformadores de 218 t, aerogeneradores, plantas termosolares y BESS. Grúas con Wind Power Jib y líneas modulares.",
  },
  {
    slug: "construccion-y-montaje",
    nombre: "Construcción y montaje industrial",
    corto: "Construcción",
    lead: "Izaje y montaje de estructuras, puentes y módulos con ingeniería de maniobra.",
    trabajos: [
      "Izaje de vigas para la reposición del Puente Quillahua",
      "Montaje de módulos de aire acondicionado en techumbre con jib offset de 40° y 75 m de radio",
      "Izaje de la mesa de corte láser más grande de Chile (Cimtec)",
      "Plantas de tratamiento de agua, infraestructura industrial en acero y hormigón",
    ],
    casos: ["puente-quillahua", "montaje-mesa-de-corte-cimtec"],
    equipos: ["XCMG XCA500BR", "Grove GMK6300L"],
    foto: "/fotos/montaje.webp",
    fotoAlt: "Grúa en montaje de estructura industrial",
    metaTitle: "Izaje y montaje industrial | Transmat",
    metaDescription: "Montaje de estructuras, puentes y módulos con estudio de carga y simulación de maniobra. Grúas de 35 a 800 t.",
  },
  {
    slug: "puertos-y-logistica",
    nombre: "Puertos y logística",
    corto: "Puertos",
    lead: "Carga de proyecto desde Puerto Angamos, Mejillones y Antofagasta; rutas especiales, permisos, escolta y bodegaje en La Negra.",
    trabajos: [
      "Carga de componentes de 160 t en Puerto Angamos",
      "Traslado de camiones de extracción desde La Negra hasta Puerto Angamos",
      "Gestión de permisos de carga sobredimensionada y escolta propia",
      "Rescate de generador de 140 t en la Ruta B-400",
    ],
    casos: ["carga-componente-rotopala", "traslado-caex-liebherr", "servicio-rescate-carga-de-alto-tonelaje-ruta-b-400"],
    equipos: ["Líneas modulares", "Mercedes-Benz Actros 3363", "Volvo FH540"],
    foto: "/fotos/portuaria.webp",
    fotoAlt: "Grúas en operación portuaria",
    metaTitle: "Carga de proyecto y logística portuaria | Transmat",
    metaDescription: "Carga de proyecto en Angamos, Mejillones y Antofagasta, permisos, escolta y bodegaje en La Negra. Líneas modulares y camas bajas.",
  },
  {
    slug: "ferroviaria",
    nombre: "Ferroviaria",
    corto: "Ferroviaria",
    lead: "Traslado de material rodante y carga de proyecto por rutas especiales.",
    trabajos: [
      "Traslado de locomotora de 120 t desde Puerto Angamos a Estación Central (EFE)",
      "12 líneas modulares traccionadas por dos Mercedes-Benz Actros 3363",
      "Recuperación de material rodante siniestrado",
    ],
    casos: ["traslado-de-locomotora-hacia-estacion-central-efe-ferrocarriles"],
    equipos: ["Líneas modulares", "Mercedes-Benz Actros 3363"],
    foto: "/fotos/transporte.webp",
    fotoAlt: "Transporte de carga especial sobre líneas modulares",
    metaTitle: "Transporte ferroviario de material rodante | Transmat",
    metaDescription: "Locomotoras y material rodante sobre líneas modulares, con permisos de ruta y escolta. Caso EFE: 120 t de Angamos a Estación Central.",
  },
  {
    slug: "agua-y-desalinizacion",
    nombre: "Agua y desalinización",
    corto: "Desalinización",
    lead: "Izaje y transporte de componentes para plantas desaladoras, acueductos y plantas de tratamiento.",
    trabajos: [
      "Componentes de plantas desaladoras y estaciones de bombeo",
      "Estanques, recipientes y módulos de proceso",
      "Plantas de tratamiento de agua (obras civiles)",
    ],
    casos: [],
    equipos: ["Grúas todo terreno", "Camas bajas"],
    foto: "/fotos/portuaria.webp",
    fotoAlt: "Operación de izaje en borde costero",
    enLevantamiento: true,
    metaTitle: "Izaje y transporte para desalinización | Transmat",
    metaDescription: "Componentes de plantas desaladoras, acueductos y plantas de tratamiento. Casos en levantamiento con el cliente.",
  },
];

export const industria = (slug: string) => INDUSTRIAS.find((i) => i.slug === slug);
