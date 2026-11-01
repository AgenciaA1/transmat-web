"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Revela al entrar en pantalla. Todo es visible en reposo: nada se oculta sobre el primer
 * viewport ni con `prefers-reduced-motion`. Donde el navegador soporta animaciones ligadas al
 * scroll, la entrada sigue el gesto 1:1 (reversible, interrumpible, a la velocidad del dedo);
 * si no, cae a una transición corta disparada por IntersectionObserver.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0 }: { children: ReactNode; className?: string; as?: ElementType; delay?: number }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) {
      el.classList.add("scroll");
      return;
    }

    if (!("IntersectionObserver" in window)) return;
    el.classList.add("pre");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            el.style.transitionDelay = delay ? `${delay}ms` : "";
            el.classList.add("in");
            // El desfase solo vale para la entrada; no debe frenar transiciones posteriores.
            el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  // En la versión ligada al scroll el escalonado se expresa como desfase del rango: ~4 % por cada 60 ms.
  const style = { "--reveal-stagger": `${Math.min(Math.round(delay / 15), 20)}%` } as CSSProperties;

  return (
    <Tag ref={ref} style={style} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
