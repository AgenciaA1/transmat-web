# Revisión de motion de la Home A (criterios de Apple, *Designing Fluid Interfaces*)

**Fecha:** 31 de octubre de 2026 · **Alcance:** todas las animaciones e interacciones de `app/page.tsx`, header, menú móvil, barra móvil y pie · **Método:** skill `apple-motion` + medición en el DOM (propiedades y duraciones calculadas, muestreo de opacidad durante las transiciones) · **Estado:** correcciones aplicadas en este repo; `npm run check` en verde.

Los cuatro criterios pedidos: (1) reacciona al soltar en vez de al apretar; (2) no se puede interrumpir a mitad de camino; (3) ignora la velocidad del gesto; (4) duración fija donde iría un resorte.

## Hallazgo transversal: las duraciones de motion nunca llegaban al CSS

Tailwind v4 no genera utilidades `duration-*` a partir de los tokens `--duration-*` del tema. Las clases `duration-fast` y `duration-slow` que usaba todo el sitio no existían: cada transición caía a los 150 ms por defecto de Tailwind (medido: botón 0,15 s en vez de 0,2 s; zoom de foto 0,15 s en vez de 0,6 s). Además, Tailwind v4 mueve con las propiedades `translate` y `scale`, no con `transform`, así que el levantamiento del botón al hover no transicionaba: saltaba. Corregido con utilidades propias en `globals.css` y con la lista de propiedades correcta en `Button.tsx`. Medido después: botón 0,2 s sobre `translate, scale, …`; foto 0,6 s.

## Inventario, criterio que incumplía y corrección

| Animación | Criterio | Qué pasaba | Corrección |
|---|---|---|---|
| Enlaces de navegación, desplegables, pie, tarjetas de industrias, flota, proyectos y artículos, tabla de flota, títulos de servicios | 1 · al soltar | Solo tenían `hover`. En pantalla táctil no existe hover: nada respondía hasta soltar y navegar. | Estado `active:` en todos (color o fondo). `TrackClicks` registra un `touchstart` pasivo, sin el cual iOS Safari no aplica `:active`. Destello gris del sistema desactivado para que el estado pulsado sea el propio. |
| Botones (`Button`), barra móvil, opciones del planificador | 1 · al soltar | El estado pulsado existía desde la revisión HIG, pero entraba con la misma duración que el hover (150 ms). | Regla global: al apretar, la transición dura 100 ms; al soltar, la del elemento. Botón: `scale 0.98` al apretar, además de perder la elevación. Opciones: `scale 0.99`. |
| Reveals al hacer scroll (23 elementos) | 2, 3 y 4 | Al cruzar el umbral se disparaba una animación de 600 ms más un desfase por tarjeta (hasta 300 ms). No se podía revertir al subir, duraba lo mismo con un flick que con un scroll lento, y era una duración fija sobre un gesto. | Animación ligada al scroll (`animation-timeline: view()`): la entrada sigue el dedo 1:1, es reversible e interrumpible y no tiene duración. Medido: opacidad 0,75 a media entrada, 0 al subir, 1 al terminar. El escalonado pasa a ser un desfase del rango (4 % por tarjeta). Sin soporte, cae a una transición de 320 ms con curva de resorte. Nada se aplica sobre el primer viewport ni con `prefers-reduced-motion`. |
| Menú móvil | 4 · duración fija (y sin motion) | Aparecía y desaparecía de golpe con el atributo `hidden`. | Entra y sale por el mismo camino (desde el header hacia abajo, 8 px) con la curva de resorte, usando `@starting-style` y transición discreta de `display`, así `hidden` sigue sacándolo del árbol accesible. Interrumpible: si se vuelve a tocar a mitad, retoma desde el valor actual. Medido: 0 → 0,70 → 0,95 → 1 en 320 ms. |
| Desplegables del header | 4 · duración fija | Fundido plano de 150 ms sin origen. | Nacen desde su disparador (`origin-top`, escala 0,98 → 1, 4 px de desplazamiento) con la curva de resorte y vuelven por el mismo camino; 60 ms de gracia al salir para cruzar en diagonal. |
| Deslizador de peso | ninguno | Nativo: sigue el puntero 1:1 y se puede soltar en cualquier punto. | Solo se acortó la respuesta del pulgar al apretar (100 ms). El valor también se escribe a mano. |
| Punto de la opción elegida | 4 | Aparecía de golpe. | Entra desde su centro (`scale 0,5 → 1`) con la curva de resorte vía `@starting-style`. |
| Radar del hero (barrido 26 s, pulso 4,5 s) | fuera de los cuatro criterios | El pulso se repetía a 0,22 Hz, dentro de la banda de ~0,2 Hz que Apple pide evitar por sensibilidad vestibular. | Pulso a 9 s (0,11 Hz). Con `prefers-reduced-motion` se detiene. |
| Zoom de fotos al hover, cambios de color al hover | ninguno | Transiciones CSS: interrumpibles y reversibles por construcción. | Solo recuperaron su duración real al existir `duration-*`. |

## Lo que no existe en la Home y por qué no se agregó

No hay elementos arrastrables ni lanzables (hojas, carruseles, tarjetas que se deslizan): el único gesto con velocidad es el scroll, y los reveals ya lo siguen. El menú móvil se abre por toque, no por arrastre, así que no corresponde proyección de momentum ni rubber-banding. Si en la fase 3 aparece una hoja o un carrusel, va con resorte real en JavaScript (velocidad de salida, proyección y bandas elásticas), no con CSS.

## El resorte en CSS

`--ease-spring` es un resorte críticamente amortiguado (damping 1,0, sin rebote) muestreado en 21 puntos como `linear()`. Mantiene el carácter de resorte (arranque rápido, asentamiento suave) para transiciones disparadas por toque, donde no hay velocidad que heredar. Para gestos con velocidad no sirve: ahí hace falta un resorte en JavaScript.

## Verificación

- `npm run check`: tipos, lint y build sin errores.
- Escritorio 1920×1080: botón 0,2 s sobre `translate, scale, …`; foto 0,6 s; desplegable con origen arriba, escala 0,98, retardo de salida 60 ms, curva `linear(...)`; 23 reveals ligados al scroll con rango `entry 5 % → 45 %`; pulso 9 s.
- Móvil 375×812: menú 0 → 1 de opacidad en 320 ms con la curva de resorte y `display` discreto; logo del header a 32 px.
