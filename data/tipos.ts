/**
 * Modelo de contenido de Transmat 5.0 (docs/01 §6 del repo transmat-web-5).
 * Una cifra, una fuente: todo lo que se publica sale de data/*.ts o de MDX.
 */

export type CategoriaEquipo =
  | "gruas-moviles"
  | "semirremolques"
  | "tractocamiones"
  | "camiones-pluma"
  | "gruas-horquilla";

export type Equipo = {
  id: string;
  categoria: CategoriaEquipo;
  /** todo-terreno | rough-terrain | crawler | cama-baja | rampla | linea-modular | tractocamion | pluma-articulada | horquilla */
  subtipo: string;
  marca: string;
  modelo: string;
  /** Capacidad nominal en toneladas. null cuando el dato no está publicado (tractocamiones). */
  capacidadT: number | null;
  /** Longitud de pluma principal en metros; null = dato pendiente del cliente (D2). */
  plumaM: number | null;
  /** Ficha técnica PDF publicada hoy en transmat.cl; se migra en fase 3. */
  fichaPdf: string | null;
  configuracion: string | null;
  destacado: boolean;
  unidades: number;
};

export type IndustriaSlug =
  | "mineria"
  | "energia"
  | "construccion-y-montaje"
  | "puertos-y-logistica"
  | "ferroviaria"
  | "agua-y-desalinizacion";

export type Industria = {
  slug: IndustriaSlug;
  nombre: string;
  /** Nombre corto para menús y chips */
  corto: string;
  lead: string;
  trabajos: string[];
  /** slugs de PROYECTOS ya publicados */
  casos: string[];
  equipos: string[];
  foto: string;
  fotoAlt: string;
  /** true cuando aún no hay caso publicado: se marca como brecha (R-01) */
  enLevantamiento?: boolean;
  metaTitle: string;
  metaDescription: string;
};

export type Servicio = {
  slug: string;
  /** Ruta pública (los 4 servicios actuales conservan URL raíz) */
  ruta: string;
  nombre: string;
  marca: "Transmat" | "Transkrane" | "Transtruck";
  lead: string;
  alcance: string[];
  cta: string;
  /** Operación del planificador que preselecciona */
  operacion: TipoOperacion | null;
  nuevo?: boolean;
  metaTitle: string;
  metaDescription: string;
};

export type Proyecto = {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  industria: IndustriaSlug;
  equipos: string[];
  cliente: string | null;
  imagen: string | null;
  urlActual: string;
  destacado: boolean;
};

export type ArticuloResumen = {
  titulo: string;
  ruta: string;
  urlActual: string;
  fecha: string;
  tema: TemaArticulo;
  imagen: string | null;
  descripcion: string;
};

export type TemaArticulo =
  | "mineria"
  | "energia"
  | "logistica-y-transporte"
  | "equipos-y-tecnologia"
  | "transmat";

export type Cifra = {
  clave: string;
  valor: string;
  label: string;
  fuente: string;
  /** Pendiente de validación del cliente (R-15). No se publica si es true y `publicar` es false. */
  validar?: boolean;
  publicar: boolean;
  nota?: string;
};

export type Sucursal = {
  nombre: string;
  direccion: string;
  comuna: string;
  mapa: string;
  principal: boolean;
};

export type Tecnologia = {
  nombre: string;
  descripcion: string;
  beneficio: string;
};

export type TipoOperacion = "izaje" | "transporte" | "combinada" | "montaje";

export type PaginaPlanificada = {
  ruta: string;
  titulo: string;
  descripcion: string;
  fase: 2 | 3;
};
