import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext para Cloudflare Workers: el sistema de publicación de A1 (igual que
 * agea.cl). Sin caché incremental por ahora: el sitio es estático en su mayoría.
 * Publicar: `npm run cf:deploy` (requiere `npx wrangler login` con la cuenta de la agencia).
 */
export default defineCloudflareConfig({});
