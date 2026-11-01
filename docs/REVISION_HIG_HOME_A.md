# Revisión de la Home A contra las Human Interface Guidelines de Apple

**Fecha:** 30 de octubre de 2026 · **Alcance:** `app/page.tsx` y sus secciones, header, barra móvil, menú móvil y pie, a 1440 px y 375 px · **Método:** skill `apple-look` (HIG, 123 páginas) + medición en el DOM (tamaños reales de texto y de controles, contraste calculado desde los tokens) · **Estado:** todas las correcciones aplicadas en este mismo repo; `npm run check` en verde.

Qué aplica a un sitio web: los principios y los fundamentos de las HIG (accesibilidad, color, tipografía, layout, escritura) y las convenciones de botones y entrada de datos. No aplican los componentes nativos (tab bars, Liquid Glass, Dynamic Type como API); donde la HIG dice "pt", en web se lee "px CSS".

## Resumen

La Home tiene tesis: un «centro de mando» que responde (equipos candidatos) antes de preguntar. Lo que se recuerda es el radar con alcances reales de pluma (90 m y 150 m, con modelos) y el planificador incrustado en la portada. La paleta negro/rojo/blanco es la de la marca, así que no es un default; el riesgo de plantilla estaba en repetir esquinas HUD, rejilla y monoespaciada en todas partes, y se concentró en tres paneles.

Calificación antes de corregir: **problemas críticos** (menú móvil inoperante, 39 controles bajo el mínimo táctil, texto bajo 11 px, selección solo por color). Después: **buena**; quedan dos puntos bajos documentados como decisión.

## Hallazgos, del más grave al más leve

### 1 · Crítico — El menú móvil no aparecía

- **Qué estaba mal.** Bajo 1280 px, al tocar el botón de menú el panel quedaba con altura 0 (medido: `top 68, height 0`). El header lleva `backdrop-filter`, y esa propiedad convierte al header en bloque contenedor de cualquier descendiente `position: fixed`; `top: 68px; bottom: 0` dentro de un contenedor de 68 px da 0 px de alto. La navegación completa era inalcanzable en móvil.
- **Regla.** `design-principles.md › Familiarity`: "Provide clear feedback… Show when controls are available". `layout.md › Size classes`: "Keep functionality the same as size classes change".
- **Corrección.** `components/layout/MobileMenu.tsx`: el panel pasa a `absolute inset-x-0 top-full h-[calc(100dvh-var(--header-height))]` respecto del header, que es fijo. Verificado: 744 px de alto a 375×812.

### 2 · Crítico — 39 controles bajo el mínimo táctil

- **Qué estaba mal.** A 375 px: enlaces del pie de 17 px de alto con 10 px de separación, contacto del pie 21 px, redes 15 px, legales 15 px, enlaces de la tabla de flota 17 px, "¿Es una emergencia?" 21 px, títulos de servicio 24 px, deslizador de peso de 24 px con pulgar de 20 px. En escritorio las redes y legales (15 px) también quedaban bajo el mínimo de 20 pt.
- **Regla.** `accessibility.md › Mobility`: iOS 44×44 pt por defecto, 28×28 pt mínimo; "Consider spacing between controls as important as size". `buttons.md › Best practices`: "a button needs a hit region of at least 44x44 pt".
- **Corrección.** Padding vertical en los enlaces de listas del pie (`py-2`, `py-1.5`, `py-2.5`), enlaces de la tabla como `block py-3 -my-3`, enlace de emergencia con `min-h-11`, tamaño `sm` de `Button` con `min-h-11`, deslizador de 44 px con pulgar de 28 px (`globals.css`). Verificado: 0 controles bajo 28 px a 375 px.

### 3 · Crítico — Texto bajo 11 px

- **Qué estaba mal.** Etiquetas de la barra móvil (Llamar · WhatsApp · Planificar) a 10,5 px, siendo la navegación principal en móvil; etiquetas de industria y fecha en proyectos y artículos a 10,5 px; distintivo "Propuesta · a validar" a 10 px; legales del pie a 11 px, justo en el límite; navegación de escritorio a 11,5 px y 60 % de blanco.
- **Regla.** `accessibility.md › Vision` y `typography.md › Ensuring legibility`: iOS mínimo 11 pt; "if you're using a custom font with a thin weight, aim for larger than the recommended sizes".
- **Corrección.** Barra móvil 12 px; etiquetas al token `text-overline` (11,5 px); distintivo 11 px; legales 11,5 px; navegación 12 px y 82 % de blanco. Verificado: ningún texto visible bajo 11 px.

### 4 · Crítico — La opción elegida se distinguía solo por color

- **Qué estaba mal.** El tipo de operación seleccionado cambiaba borde y fondo a rojo sin ningún otro indicador.
- **Regla.** `accessibility.md › Vision`: "Convey information with more than color alone… Offer visual indicators, like distinct shapes or icons". `color.md › Inclusive color`.
- **Corrección.** `SelectorNecesidad.tsx`: indicador de radio (círculo con punto) además del borde; `aria-checked` ya existía.

### 5 · Alto — Botones sin estado pulsado

- **Qué estaba mal.** `Button`, las opciones del planificador, la barra móvil y el menú solo tenían hover. En táctil no hay hover: al pulsar nada respondía.
- **Regla.** `buttons.md › Best practices`: "Always include a press state for a custom button. Without a press state, a button can feel unresponsive".
- **Corrección.** `active:` en todas las variantes (rojo oscurece y pierde la elevación; contorno rellena 10 % de blanco; opciones 5 %); el pulgar del deslizador escala al arrastrar.

### 6 · Alto — Demasiados botones prominentes por pantalla

- **Qué estaba mal.** En Servicios había cinco botones rojos, uno por tarjeta, más el del header: tres rojos a la vez en escritorio. En CGO, un segundo botón rojo al planificador (el cuarto de la página).
- **Regla.** `buttons.md › Style`: "Keep the number of prominent buttons to one or two per view. Presenting too many prominent buttons increases cognitive load". "Use style — not size — to visually distinguish the preferred choice".
- **Corrección.** Acciones de tarjeta en contorno y "Ver servicio" como enlace con flecha; en CGO "Planificar con trazabilidad" pasa a enlace. El rojo queda para header, hero, planificador, banda de emergencias y cierre: nunca más de dos por pantalla.

### 7 · Alto — El rojo significaba cosas distintas

- **Qué estaba mal.** `rojo-texto` marcaba a la vez acciones (enlaces "Ver industria", botón enlace) y texto no interactivo (títulos de columnas del pie, 20 checks de alcance, rangos de capacidad, etiquetas de industria y tema). Además, esquinas HUD rojas en 11 paneles.
- **Regla.** `color.md › Best practices`: "if you use your brand color to indicate that a borderless button is interactive, using the same or similar color to stylize noninteractive text is confusing". `branding.md › Best practices`: "Using your brand color too broadly can overwhelm your interface and dilute its impact… use it intentionally for primary actions or status indicators".
- **Corrección.** Checks y títulos de columna en gris; rangos en gris claro; etiquetas de categoría neutras; los enlaces rojos llevan subrayado (siempre en la variante `enlace`, al hover y foco en "Ver industria"). Esquinas HUD solo en los tres paneles de mando (planificador, etapas CGO, cierre); las tarjetas de servicios y proyectos pasan a borde plano. Se conservan la palabra "movimiento.", el eyebrow con guion (firma), el radar y los CTA.

### 8 · Alto — El botón prometía lo que la pantalla siguiente no daba

- **Qué estaba mal.** "Ver equipos candidatos" llevaba al paso 2 del planificador ("La carga"); los candidatos aparecían recién en el paso 4.
- **Regla.** `writing.md › Best practices`: "use the button label to hint at the next step… be consistent with what you choose". `design-principles.md › Familiarity`: "Provide clear feedback… indicate when content changes".
- **Corrección.** Los candidatos se calculan y muestran en la propia Home al elegir operación y peso (hasta cuatro, con capacidad nominal, con `aria-live`), y el botón dice "Continuar al paso 2", que es exactamente lo que ocurre. Antes de elegir, un texto dice qué falta para continuar. Esto cumple en la portada la promesa del panel lateral: candidatos antes de dejar un solo dato de contacto.

### 9 · Medio — El peso solo se podía fijar con el deslizador

- **Qué estaba mal.** El valor era un `output` de solo lectura; quien sabe que su carga pesa 163 t debía buscar el valor en pasos de 5.
- **Regla.** `design-principles.md › Agency`: "Let people do things their own way". `entering-data.md`: "Supporting all available input methods… consider using a number formatter".
- **Corrección.** Campo numérico editable (5 a 800 t, `inputMode="numeric"`) sincronizado con el deslizador, con unidad visible y límites aplicados al escribir.

### 10 · Medio — Etiquetas de cifras más altas que la cifra

- **Qué estaba mal.** En móvil, "AÑOS EN IZAJE Y TRANSPORTE DE ALTO TONELAJE" ocupaba tres líneas en mono mayúsculas de 11,5 px sobre un "+15" de 25 px: la jerarquía se invertía.
- **Regla.** `typography.md › Conveying hierarchy`: "maintain the relative hierarchy and visual distinction of text elements". `writing.md › Getting started`: "If you can use fewer words, do so".
- **Corrección.** `data/cifras.ts`: "años de trayectoria" y "capacidad de izaje". Valores, fuentes y marcas `validar` no cambian.

### 11 · Medio — Textos que se partían al azar

- **Qué estaba mal.** A 1440 px el teléfono del header caía en dos líneas; a 375 px el botón de emergencias del hero se cortaba a mitad de frase (77 px de alto).
- **Regla.** `layout.md › Adaptability`: "Design a layout that adapts gracefully… horizontally adjacent views may need to stack vertically".
- **Corrección.** Header con `whitespace-nowrap` y el prefijo "Emergencias 24/7 ·" oculto entre 1280 y 1535 px (queda el número, que es lo que se marca). En el hero la etiqueta y el número se apilan a propósito en ancho compacto.

### 12 · Bajo — Apariencia solo oscura (sin cambio)

- **Qué.** `color-scheme: dark` sin variante clara.
- **Regla.** `color.md › Best practices`: "Make sure all your app's colors work well in light, dark, and increased contrast contexts".
- **Decisión.** Para un sitio de marca B2B con paleta negro/rojo es una elección de identidad. Se documenta; una variante clara se evalúa en la fase 3 si el cliente la pide. Los contrastes sí se verificaron en la apariencia existente (ver abajo).

### 13 · Bajo — Desplegables solo por hover y foco (pendiente fase 3)

- **Qué.** En tablets de 1280 px o más no hay forma de abrir los submenús con el dedo. Mitigado porque el elemento padre es una página real (`/industrias`, `/servicios`, `/flota`, `/transmat`).
- **Pendiente.** Abrir también con clic o toque y cerrar con Escape, cuando se construya la navegación definitiva.

## Contraste (calculado desde los tokens, WCAG 2.x)

| Par | Ratio | Umbral |
|---|---|---|
| Texto 82 % blanco / negro | 13,2:1 | 4,5:1 |
| Texto suave 60 % blanco / negro | 7,3:1 | 4,5:1 |
| Rojo texto `#ff5a6b` / negro | 6,5:1 | 4,5:1 |
| Blanco / rojo `#df0821` (botón) | 5,0:1 | 4,5:1 |
| "movimiento." `#df0821` / negro (104 px, 900) | 3,95:1 | 3:1 (texto grande en negrita) |
| Verde texto `#62c46d` / negro | 9,1:1 | 4,5:1 |
| Ámbar `#ffd27a` / negro | 13,9:1 | 4,5:1 |

## Lo que funciona y hay que conservar

- El orden de la Home: promesa → acción → entradas → evidencia → confianza → emergencia → contenido → cierre.
- La ruta de emergencia sin formulario, repetida donde corresponde (header, hero, planificador, banda y barra móvil).
- Todo visible en reposo; los reveals solo se aplican bajo el primer viewport y nunca con `prefers-reduced-motion`; el radar se detiene con la misma preferencia.
- Foco visible con anillo blanco y halo oscuro; enlace "Saltar al contenido"; cada sección con `aria-labelledby`; números tabulares en datos.
- El desenfoque del header y de la barra móvil está en la capa funcional, no en el contenido, como pide la guía de materiales.

## Ajustes posteriores al header (31 de octubre, a pedido de Felipe)

- El logo se veía pequeño y borroso: el PNG oficial traía un 38 % de aire transparente, así que a 28 px de alto el isotipo medía 17 px. Se recortó el archivo de `public/brand` al área con tinta (1639×291, mismo archivo de `logos/`, sin redibujar) y se muestra a 40 px en escritorio y 32 px en móvil. Proporción verificada igual a la natural: sin deformación.
- El teléfono se cortaba en dos líneas: ahora va en una sola, con el prefijo "Emergencias 24/7" visible desde 1536 px y solo el número entre 1280 y 1535 px.
- La barra pasa a todo el ancho de la ventana (no al contenedor de 1280 px), con 84 px de alto en escritorio y más separación entre logo, menú, teléfono y botón.

## Verificación

- `npm run check`: tipos, lint y build (184 rutas) sin errores.
- Medición a 375×812 tras los cambios: 0 controles bajo 28 px, 0 textos bajo 11 px, menú móvil de 744 px, sin desplazamiento horizontal.
- Medición a 1440×900: header en una línea, un solo botón rojo por pantalla fuera del header, sin errores de consola.
