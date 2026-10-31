# Home A · «Centro de mando» — decisiones de conversión

**Versión:** 1.0 · **Fecha:** 30 de octubre de 2026 · **Estado:** construida en `app/page.tsx`, para revisión de Felipe y del cliente
**Base:** arquitectura aprobada (repo `transmat-web-5`, `docs/01` §4–§10), auditoría 360 (ago-2026) y propuesta 5.0

## Qué debe lograr la Home

El sitio actual recibe atención (124.953 sesiones en doce meses, el video concentra la interacción) y no
recibe solicitudes (6 envíos en 28 días, 86,4 % de abandono del único formulario, ninguna página de
servicio con formulario). La Home A tiene una sola función: **convertir una necesidad técnica en una
solicitud calificada o en una llamada**, sin perder el nivel de marca de la propuesta 5.0.

## Dirección visual

«Centro de mando»: negro, rojo como único acento, Roboto en mayúsculas, Roboto Mono para datos, rejilla
técnica y esquinas HUD. Es la dirección A de la propuesta 5.0, la única que se construye (decisión de
Felipe, 30-oct-2026). El movimiento es sobrio: revelado al entrar en pantalla, radar de pluma en giro
lento, nada que compita con los datos. `prefers-reduced-motion` apaga todo.

## Orden de la página y por qué

| # | Bloque | Función de conversión | Origen |
|---|---|---|---|
| 1 | **Hero**: tagline oficial, promesa en una frase, dos acciones (planificar · emergencias con teléfono visible), cuatro cifras de la ficha única | Decir en cinco segundos qué hace Transmat y qué puede hacer el visitante ahora | Auditoría H-002 (cifras), contexto maestro §2.1 (tagline ausente del hero actual) |
| 2 | **Selector de necesidad** (paso 1 del planificador, en la Home): operación + peso → equipos candidatos | La acción principal se inicia sin salir de la Home; la emergencia se desvía al teléfono | Propuesta 5.0 pieza 01; auditoría H-011 |
| 3 | **Industrias** (6) con un caso ejecutado cada una | Segunda puerta de entrada; cada tarjeta mide `industria_view` | Auditoría H-005; R-01 |
| 4 | **Servicios** (4 + 1 propuesto) con alcance y CTA al planificador preseleccionado | Cada servicio termina en una solicitud, no en "ver equipamiento" | Auditoría H-011 |
| 5 | **Flota por rango** (62 equipos desde el registro) y tabla de grúas destacadas con pluma y configuración | Evidencia de capacidad con datos exactos; enlaza a fichas por modelo | Propuesta 5.0 pieza 02; R-04 |
| 6 | **Proyectos destacados** (3) con industria, equipos y cliente ya publicado | Evidencia con toneladas y lugar | Principio §3.5; R-05 |
| 7 | **CGO** como promesa de trazabilidad en cinco etapas | Responde la objeción "¿cómo sé qué pasa con mi carga?" | Auditoría H-003 |
| 8 | **Banda de emergencias** con teléfono y WhatsApp | Ruta de contacto directo medida | Auditoría H-022 (eventos de llamada) |
| 9 | **Artículos recientes** (3) | Mantiene el canal de mejor interacción visible | Auditoría §resumen (tráfico orgánico 3,25×) |
| 10 | **Cierre**: planificador + WhatsApp + correo y teléfono como texto | Última oportunidad de acción; los datos de contacto se pueden copiar | Propuesta 5.0 límites |

Elementos persistentes: header con teléfono de emergencias y CTA «Planificar operación»; **barra fija inferior
en móvil** con Llamar · WhatsApp · Planificar; footer con datos de contacto y firma oficial.

## Qué se mide

Contrato de eventos (`lib/analytics.ts`): `rfq_start` (home o planificador), `rfq_step`, `rfq_result_shown`,
**`rfq_submit`**, **`phone_click`**, **`whatsapp_click`**, **`emergency_route`**, `industria_view`,
`cta_click` (con `ubicacion_cta` y `destino`). Las acciones clave son las que corresponden a un hecho
comercial, no a una carga de página (auditoría H-021). Ningún dato personal entra al dataLayer.

## Qué es real y qué es provisional

- **Real:** cifras (ficha única con marcas `validar`), 62 equipos con capacidad y ficha PDF, 19 casos,
  62 artículos, contacto, sucursales, políticas.
- **Provisional:** fotografías de stock (D6), longitud de pluma en 53 equipos (D2), textos de industrias y
  servicios reformulados sobre la copia actual (a validar con el cliente), página de gracias sin plazo
  de respuesta declarado (D4), sucursal Calama sin dirección (pendiente del cliente).
- **Sin construir aún (fase 3):** páginas del mapa de sitio más allá de Home, planificador, emergencias y
  contacto; existen como marcadores con su propósito y datos reales.

## Decisiones tomadas y abiertas

- Se usa «+15 años» (contexto maestro) aunque el sitio actual diga también «10 años» y «fundación en 2005»;
  queda marcado para la ficha única (R-15).
- La capacidad «35 a 800 t» es la cifra corporativa; el mayor equipo listado es la XCA750SA (750 t). A validar.
- El planificador no entrega precios ni plazos; devuelve equipos candidatos por capacidad nominal y deja
  la validación a ingeniería, como exige la regla de marca.
- Sin GTM activo hasta decidir una sola vía de etiquetado (auditoría H-020); los eventos ya se emiten al dataLayer.
