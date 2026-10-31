/**
 * Capa de medición. Contrato de eventos de la propuesta 5.0 (docs/01 §10):
 * rfq_start · rfq_step · rfq_result_shown · rfq_submit (clave) · whatsapp_click (clave)
 * · phone_click (clave) · emergency_route (clave) · video_cta_click · ficha_equipo_view
 * · industria_view · cv_submit · cta_click.
 * Nunca se envían datos personales al dataLayer: solo intención y contexto.
 */
export type EventoMedicion =
  | "rfq_start"
  | "rfq_step"
  | "rfq_result_shown"
  | "rfq_submit"
  | "whatsapp_click"
  | "phone_click"
  | "emergency_route"
  | "video_cta_click"
  | "ficha_equipo_view"
  | "industria_view"
  | "cv_submit"
  | "cta_click";

type DataLayerEvent = { event: EventoMedicion } & Record<string, string | number | boolean | undefined>;

export function pushDataLayer(evento: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(evento);
}

export function track(event: EventoMedicion, params: Record<string, string | number | boolean | undefined> = {}): void {
  pushDataLayer({ event, pagina: typeof window === "undefined" ? undefined : window.location.pathname, ...params });
}
