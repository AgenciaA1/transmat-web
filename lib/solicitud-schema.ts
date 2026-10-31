import { z } from "zod";

export const TIPOS_OPERACION = ["izaje", "transporte", "combinada", "montaje"] as const;
export const INDUSTRIAS_PLANIFICADOR = [
  "Minería",
  "Energía",
  "Construcción y montaje",
  "Puertos y logística",
  "Ferroviaria",
  "Agua y desalinización",
  "Otra",
] as const;
export const ZONAS = ["Antofagasta", "Calama", "Otra comuna del norte de Chile", "Otra región"] as const;
export const VENTANAS = [
  { valor: "7d", label: "Menos de 7 días", nota: "Requiere disponibilidad inmediata." },
  { valor: "2-4s", label: "2 a 4 semanas", nota: "Ruta, permisos y asignación de equipos." },
  { valor: "1-3m", label: "1 a 3 meses", nota: "Estudio de carga y simulación de maniobra." },
  { valor: "3m+", label: "Más de 3 meses", nota: "Planificación de proyecto." },
] as const;

/**
 * Solicitud del planificador (RFQ) y del contacto. Consentimiento explícito, sin
 * premarcar (Ley 21.719). El honeypot `website` debe venir vacío.
 */
export const solicitudSchema = z.object({
  tipo: z.enum(["planificador", "contacto"]),
  operacion: z.enum(TIPOS_OPERACION).optional(),
  pesoT: z.number().min(1).max(800).optional(),
  tipoCarga: z.string().trim().max(120).optional().or(z.literal("")),
  industria: z.string().trim().max(60).optional().or(z.literal("")),
  zona: z.string().trim().max(60).optional().or(z.literal("")),
  ventana: z.string().trim().max(10).optional().or(z.literal("")),
  equiposCandidatos: z.array(z.string().max(80)).max(8).optional(),
  nombre: z.string().trim().min(2, "Indica tu nombre.").max(120),
  empresa: z.string().trim().max(160).optional().or(z.literal("")),
  correo: z.string().trim().min(1, "Indica tu correo.").email("Revisa el formato del correo."),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  mensaje: z.string().trim().max(4000).optional().or(z.literal("")),
  consentimiento: z.boolean().refine((v) => v === true, "Marca el consentimiento para enviar la solicitud."),
  /** Origen de la solicitud: página, UTM y referencia. Sin datos personales. */
  origen: z
    .object({
      pagina: z.string().max(200).optional(),
      utm: z.string().max(400).optional(),
      referrer: z.string().max(400).optional(),
    })
    .optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SolicitudInput = z.infer<typeof solicitudSchema>;
