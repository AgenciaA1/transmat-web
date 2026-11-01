import type { Cifra } from "./tipos";

/**
 * Ficha única de cifras corporativas. Fuente primaria: CONTEXTO_TRANSMAT_AGENTE_COPY.md §2.2
 * (ago-2026). Las que el sitio actual contradice quedan marcadas `validar` (R-15) y no se publican
 * hasta que Transmat confirme fecha y responsable.
 */
export const CIFRAS: Cifra[] = [
  { clave: "trayectoria", valor: "+15", label: "años de trayectoria", fuente: "Contexto maestro §2.2", publicar: true, validar: true, nota: "El sitio actual publica además «10 años impulsando a la industria» y «fundación en 2005» (21 años). Se usa +15 por instrucción del contexto maestro." },
  { clave: "izajes", valor: "+10.000", label: "izajes al año", fuente: "Contexto maestro §2.2", publicar: true },
  { clave: "gruas", valor: "+30", label: "grúas de alto tonelaje", fuente: "Contexto maestro §2.2", publicar: true, validar: true, nota: "La tabla de /equipamiento/ lista 36 grúas móviles." },
  { clave: "capacidad", valor: "35 a 800 t", label: "capacidad de izaje", fuente: "Contexto maestro §2.2", publicar: true, validar: true, nota: "El mayor equipo listado es la XCA750SA (750 t)." },
  { clave: "lineas", valor: "+80", label: "líneas modulares", fuente: "Contexto maestro §2.2 (dossier: 82)", publicar: true },
  { clave: "camas", valor: "30 a 126 t", label: "camas bajas y ramplas", fuente: "Contexto maestro §2.2", publicar: true },
  { clave: "emergencias", valor: "24/7", label: "servicio de emergencias", fuente: "Contexto maestro §2.2", publicar: true },
  { clave: "clientes", valor: "+250", label: "clientes atendidos al año", fuente: "Sitio actual, página Corporativo", publicar: true, validar: true },
  { clave: "instalaciones", valor: "16.200 m²", label: "de instalaciones en La Negra", fuente: "Sitio actual, página Corporativo", publicar: true },
  { clave: "fundacion", valor: "2005", label: "año de fundación", fuente: "Sitio actual, página Corporativo", publicar: false, validar: true, nota: "No se publica hasta resolver la contradicción con «+15 años»." },
];

export const cifra = (clave: string): Cifra | undefined => CIFRAS.find((c) => c.clave === clave && c.publicar);
