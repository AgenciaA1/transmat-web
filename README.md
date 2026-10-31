# transmat-web — Sitio Transmat 5.0

Sitio web de Transmat Chile (izajes y transportes de alta complejidad) construido con el **sistema web de
Agencia A1**: Next.js + TypeScript + Tailwind CSS v4, contenido como código, publicado con OpenNext en
Cloudflare Workers. Referencia del sistema: agea.cl.

| Qué | Dónde |
|---|---|
| Previsualización (Cloudflare, cuenta de la agencia) | <https://transmat-web.web-6f2.workers.dev> |
| Repositorio | <https://github.com/AgenciaA1/transmat-web> |
| Propuesta, arquitectura e inventario del sitio actual | <https://github.com/AgenciaA1/transmat-web-5> (`docs/01_ARQUITECTURA_MAPA_DE_SITIO_Y_CONTENIDO.md`) |
| Decisiones de conversión de la Home | [docs/HOME_A_CONVERSION.md](docs/HOME_A_CONVERSION.md) |

## Estado (fase 2)

- **Home A «Centro de mando»**, orientada a conversión: la única variante, aprobada por A1 el 30-oct-2026.
- **Planificador de operación** (`/planificador`) funcional de punta a punta: 4 pasos, equipos candidatos
  desde `data/flota.ts`, consentimiento explícito, `POST /api/solicitud` y `/gracias`.
- **Emergencias** (`/emergencias`), **Contacto** (`/contacto`) y **Gracias** reales.
- El resto del mapa de sitio aprobado existe como páginas en desarrollo con su propósito declarado y con
  datos reales donde ya los hay (fichas de flota, casos, artículos). Se construyen en la fase 3.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
```

En Claude Code: `preview_start` con el servidor `transmat-web` (`.claude/launch.json`).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run check` | `typecheck` + `lint` + `build` (lo mismo que corre el CI) |
| `npm run datos` | Regenera `data/flota.ts`, `data/proyectos.ts` y `data/articulos-recientes.ts` desde el inventario del repo `transmat-web-5` (`docs/inventario/raw`) |
| `npm run cf:preview` | Build con OpenNext y previsualización local del Worker |
| `npm run cf:deploy` | Build con OpenNext y despliegue al Worker `transmat-web` de la cuenta Cloudflare de la agencia. **Solo con autorización de Felipe.** Requiere `npx wrangler login` la primera vez. |

## Estructura

```
app/            rutas (App Router): /, /planificador, /emergencias, /contacto, /gracias, api/solicitud,
                [...slug] (mapa de sitio en desarrollo), robots, sitemap, llms.txt
components/     layout (Header, Footer, MobileBar), sections (Home), planificador, formularios, ui, brand
data/           registro maestro: cifras, industrias, servicios, flota*, proyectos*, articulos-recientes*,
                sucursales, tecnologias, navegacion, mapa-sitio, tipos   (* generados)
lib/            constants, seo, schema (JSON-LD), analytics (contrato de eventos), utils,
                planificador (equipos candidatos), solicitud-schema (Zod)
tools/          generar_datos.py
public/         brand/ (logos oficiales), fotos/ (stock provisional), favicon.svg
```

## Variables de entorno

Ver `.env.example`. Sin ninguna, el sitio funciona: el planificador valida y registra la solicitud; con
`RESEND_API_KEY`, `SOLICITUD_EMAIL_INTERNO` y `RESEND_FROM_EMAIL` además envía correo. El sitio no se
indexa hasta que `NEXT_PUBLIC_INDEXABLE` valga `true` (día del lanzamiento en transmat.cl).

## Reglas

Ver [CLAUDE.md](CLAUDE.md): ninguna cifra, modelo ni cliente se inventa; paleta y tono de marca;
nada se despliega sin autorización de Felipe (web@auno.cl).
