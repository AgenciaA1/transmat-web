"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { solicitudSchema } from "@/lib/solicitud-schema";
import { track } from "@/lib/analytics";

const esquema = solicitudSchema.pick({ nombre: true, empresa: true, correo: true, telefono: true, mensaje: true, consentimiento: true, website: true }).extend({
  mensaje: z.string().trim().min(20, "Cuéntanos brevemente qué necesitas (mínimo 20 caracteres).").max(4000),
});
type Input = z.infer<typeof esquema>;

/** Formulario corto de contacto con consentimiento explícito y origen. Reutiliza /api/solicitud. */
export function FormularioContacto() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<Input>({ resolver: zodResolver(esquema), defaultValues: { nombre: "", empresa: "", correo: "", telefono: "", mensaje: "", consentimiento: false, website: "" } });
  const campo = "w-full rounded-sm border border-tm-linea-fuerte bg-tm-negro px-3.5 py-3 text-white placeholder:text-tm-texto-suave focus:border-white focus:outline-none";
  const etiqueta = "mb-2 block font-mono text-overline uppercase tracking-[0.14em] text-tm-texto-suave";

  const enviar = form.handleSubmit(async (datos) => {
    setError(null);
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "contacto", ...datos, origen: { pagina: window.location.pathname, referrer: document.referrer || undefined } }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track("rfq_submit", { tipo_operacion: "contacto", consentimiento: true });
      router.push("/gracias?tipo=contacto");
    } catch {
      setError("No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.");
    }
  });

  const e = form.formState.errors;
  return (
    <form onSubmit={enviar} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-nombre" className={etiqueta}>
            Nombre
          </label>
          <input id="c-nombre" autoComplete="name" className={campo} {...form.register("nombre")} />
          {e.nombre && <p className="mt-1 text-small text-tm-rojo-texto">{e.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor="c-empresa" className={etiqueta}>
            Empresa
          </label>
          <input id="c-empresa" autoComplete="organization" className={campo} {...form.register("empresa")} />
        </div>
        <div>
          <label htmlFor="c-correo" className={etiqueta}>
            Correo
          </label>
          <input id="c-correo" type="email" autoComplete="email" className={campo} {...form.register("correo")} />
          {e.correo && <p className="mt-1 text-small text-tm-rojo-texto">{e.correo.message}</p>}
        </div>
        <div>
          <label htmlFor="c-telefono" className={etiqueta}>
            Teléfono (opcional)
          </label>
          <input id="c-telefono" type="tel" autoComplete="tel" className={campo} {...form.register("telefono")} />
        </div>
      </div>
      <div>
        <label htmlFor="c-mensaje" className={etiqueta}>
          Qué necesitas
        </label>
        <textarea id="c-mensaje" rows={5} className={campo} placeholder="Carga, faena, fecha aproximada…" {...form.register("mensaje")} />
        {e.mensaje && <p className="mt-1 text-small text-tm-rojo-texto">{e.mensaje.message}</p>}
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="c-website">Sitio web</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
      </div>
      <label className="flex cursor-pointer gap-3 text-small text-tm-texto">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-tm-rojo" {...form.register("consentimiento")} />
        <span>
          Autorizo a Transmat a usar estos datos solo para responder esta consulta, según su{" "}
          <Link href="/privacidad" className="underline underline-offset-4 hover:text-white">
            política de privacidad
          </Link>
          .
        </span>
      </label>
      {e.consentimiento && <p className="text-small text-tm-rojo-texto">{e.consentimiento.message}</p>}
      {error && (
        <p role="alert" className="text-small text-tm-rojo-texto">
          {error}
        </p>
      )}
      <button type="submit" disabled={form.formState.isSubmitting} className="inline-flex items-center justify-center rounded-sm bg-tm-rojo px-6 py-3.5 text-[12.5px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-tm-rojo-oscuro disabled:opacity-50">
        {form.formState.isSubmitting ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}
