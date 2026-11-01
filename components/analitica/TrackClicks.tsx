"use client";

import { useEffect } from "react";
import { track, type EventoMedicion } from "@/lib/analytics";

/** Captura los clics en elementos con data-ev y los envía al dataLayer. */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-ev]");
      if (!el) return;
      let params: Record<string, string | number | boolean> = {};
      try {
        params = el.dataset.evParams ? JSON.parse(el.dataset.evParams) : {};
      } catch {
        params = {};
      }
      track(el.dataset.ev as EventoMedicion, params);
    };
    // iOS Safari solo aplica :active cuando el documento escucha touchstart: así el estado pulsado
    // de botones y enlaces aparece al apretar, no al soltar.
    const noop = () => {};
    document.addEventListener("click", onClick);
    document.addEventListener("touchstart", noop, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("touchstart", noop);
    };
  }, []);
  return null;
}
