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
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
