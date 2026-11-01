# Home B · variante de look (bloques rojo y blanco)

**Fecha:** 1 de noviembre de 2026 · **Pedido de Felipe:** una variante que cambie solo el look: la A es completamente negra; la B alterna bloques de contenido con fondos rojos y blancos · **Ruta:** `/home-b` (no indexable, fuera del sitemap) · **La A sigue en `/`.**

## Cómo está hecha

Las dos Homes usan **los mismos componentes, el mismo contenido y el mismo orden**. Lo único que cambia es el juego de tokens por bloque:

- Las secciones ya no pintan con colores fijos (`bg-tm-negro`, `text-white`, `text-tm-rojo-texto`) sino con **tokens semánticos**: `bg-tm-fondo`, `bg-tm-fondo-2`, `text-tm-tinta`, `text-tm-texto`, `text-tm-acento-texto`, `bg-tm-cta` y `text-tm-cta-texto` en los botones. En la Home A valen exactamente lo mismo que la paleta negra anterior.
- `components/ui/BloqueTema.tsx` envuelve una sección con `.tema-rojo` o `.tema-blanco` (definidos en `app/globals.css`), que redefinen esos tokens. `fondo={false}` evita pintar el fondo del bloque cuando la sección se superpone a la anterior (la tarjeta del planificador sobre el hero).
- Fuera de un bloque (header, barra móvil, pie, hero) todo sigue en negro.

Secuencia de la B: hero negro → planificador (tarjeta blanca flotando) → industrias rojo → servicios blanco → flota rojo → proyectos blanco → CGO rojo → emergencias blanco → artículos rojo → cierre blanco → pie negro.

## Tokens por tema

| Token | Home A (negro) | Bloque rojo | Bloque blanco |
|---|---|---|---|
| fondo / fondo-2 / fondo-3 | #0a0a0a / #111113 / #18181b | #df0821 / #c70720 / #b50619 | #ffffff / #f4f4f5 / #e8e8eb |
| tinta (títulos, datos) | #ffffff | #ffffff | #0a0a0a |
| texto / texto suave | blanco 82 % / 60 % | blanco 100 % / 96 % | negro 84 % / 62 % |
| acento (guiones, bordes activos) | #df0821 | #ffffff | #df0821 |
| acento texto (eyebrows, enlaces) | #ff5a6b | #ffffff | #df0821 |
| CTA fondo / texto / hover | #df0821 / #fff / #b50619 | #fff / #df0821 / #ffe4e7 | #df0821 / #fff / #b50619 |
| esquinas HUD | #df0821 | #ffffff | #df0821 |
| fotos (opacidad) | 0,7 y 0,8 | 1 | 1 |

## Contrastes (WCAG 2.x)

| Par | Ratio | Umbral |
|---|---|---|
| Rojo: blanco sobre #df0821 | 5,01:1 | 4,5:1 |
| Rojo: blanco 96 % sobre #df0821 | ≈4,7:1 | 4,5:1 |
| Rojo: blanco sobre fondo-2 #c70720 | 6,04:1 | 4,5:1 |
| Rojo: CTA blanco con texto #df0821 | 5,01:1 | 4,5:1 |
| Blanco: negro 84 % sobre blanco | 13,0:1 | 4,5:1 |
| Blanco: negro 62 % sobre blanco | 5,66:1 | 4,5:1 |
| Blanco: #df0821 sobre blanco (eyebrows, enlaces) | 5,01:1 | 4,5:1 |
| Blanco: verde WhatsApp #2f8a37 sobre blanco | 4,36:1 | 3:1 (icono) |

Nota de diseño: sobre el rojo de marca solo el blanco puro alcanza 4,5:1, así que en los bloques rojos la jerarquía se hace con peso y tamaño, no con transparencias. Sobre blanco el rojo de marca puro sí sirve para texto.

## Qué mirar al comparar

- A conserva el carácter «centro de mando»: negro continuo, el rojo solo en acciones.
- B gana ritmo y contraste entre secciones, a costa de que el rojo deje de ser exclusivo de las acciones: en los bloques rojos el botón principal es blanco.
- Las fotos de stock se ven completas en B (sin velo oscuro); con fotografía propia de faena habrá que revisar el recorte sobre fondos claros.
