# transmat-web — Sitio Transmat 5.0 (Agencia A1)

Sitio de Transmat Chile sobre el **sistema web de A1**: Next.js 16 + TypeScript + Tailwind v4, contenido
como código, OpenNext en Cloudflare Workers (cuenta de la agencia). Referencia viva del sistema:
`~/Claude/Projects/Agea/web 2.0/agea-web` y https://agea.cl. Lee `README.md` primero.

## Fuentes de verdad (en este orden)
1. Instrucciones de Felipe (web@auno.cl).
2. `~/Claude/Projects/Transmat/CONTEXTO_TRANSMAT_AGENTE_COPY.md` — cifras, flota, proyectos, reglas de voz.
3. `~/Claude/Projects/Transmat/Transmat_Web_5.0_Propuesta/docs/01_ARQUITECTURA_MAPA_DE_SITIO_Y_CONTENIDO.md`
   — mapa de sitio aprobado, modelo de contenido, redirecciones, plan de contenido.
4. `…/Transmat_Web_5.0_Propuesta/docs/inventario/` — inventario exacto del sitio actual (base de migración).

## Reglas que no se negocian
- **Ninguna cifra, modelo de equipo, proyecto, cliente ni dato de contacto se inventa.** Todo sale de
  `data/*.ts` (y de MDX en fase 3). Lo que no está verificado se marca pendiente (`validar`, `enLevantamiento`,
  "dato pendiente"), no se rellena.
- `data/flota.ts`, `data/proyectos.ts` y `data/articulos-recientes.ts` son **generados** por
  `tools/generar_datos.py`: no editarlos a mano; corregir la fuente u `OVERRIDES` y correr `npm run datos`.
- Paleta: rojo `#DF0821` (único acento), negro `#0A0A0A`, blanco; verde y azul solo como estado. Roboto,
  títulos en mayúsculas y peso 900. Tokens en `app/globals.css` (`@theme`), nunca colores sueltos.
- Tono: español de Chile, B2B industrial, informe de ingeniería. Sin épica, sin "los mejores", **sin
  precios, plazos ni disponibilidad**, sin clientes o faenas no aprobados.
- Medición: cada CTA emite un evento del contrato (`lib/analytics.ts`); nunca datos personales en el dataLayer.
  Formularios con consentimiento explícito sin premarcar y honeypot.
- Rendimiento y accesibilidad: todo visible en reposo, `prefers-reduced-motion` respetado, foco visible,
  alt en imágenes, sin dependencias nuevas sin justificar.
- **No desplegar (`npm run cf:deploy`), cambiar visibilidad del repo ni compartir fuera del equipo sin
  autorización expresa de Felipe.** `NEXT_PUBLIC_INDEXABLE` solo se activa el día del lanzamiento.

## Cómo trabajar
- `npm run dev` (puerto 3000) o `preview_start` con `transmat-web`. Verificar a 1440 px y 375 px.
- Antes de commit: `npm run check` (tipos, lint, build). Commits en español; rama `main`; PR para cambios grandes.
- Rutas del mapa de sitio aún sin contenido viven en `app/[...slug]` con `data/mapa-sitio.ts`; al construir
  una sección real, crear su ruta propia y quitarla de ahí.
