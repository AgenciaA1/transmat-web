import type { Sucursal } from "./tipos";

/** Fuente: sitio actual (footer y página Corporativo) y contexto maestro §2.7. */
export const SUCURSALES: Sucursal[] = [
  {
    nombre: "Base operativa La Negra",
    direccion: "Héctor Gómez Cobo 630",
    comuna: "La Negra, Antofagasta",
    mapa: "https://maps.app.goo.gl/uP7rrg5CD8iry7Rw6",
    principal: true,
  },
  {
    nombre: "Sucursal Calama",
    direccion: "Dirección pendiente de confirmar con el cliente",
    comuna: "Calama",
    mapa: "",
    principal: false,
  },
];
