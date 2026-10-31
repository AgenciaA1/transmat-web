import { NextResponse } from "next/server";
import { solicitudSchema } from "@/lib/solicitud-schema";

/**
 * Recibe las solicitudes del planificador y del contacto. Valida con Zod, descarta bots por
 * honeypot y, si hay proveedor de correo configurado, notifica a las casillas internas.
 * Nunca escribe datos personales en el log.
 */
export async function POST(req: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const resultado = solicitudSchema.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos.", detalles: resultado.error.issues.map((i) => ({ campo: i.path.join("."), mensaje: i.message })) },
      { status: 400 },
    );
  }
  const s = resultado.data;
  if (s.website) return NextResponse.json({ ok: true }); // honeypot: no se procesa, no se delata

  const key = process.env.RESEND_API_KEY;
  const destinos = process.env.SOLICITUD_EMAIL_INTERNO?.split(",").map((d) => d.trim()).filter(Boolean) ?? [];
  const remitente = process.env.RESEND_FROM_EMAIL;

  const resumen = [
    `Tipo: ${s.tipo}`,
    s.operacion && `Operación: ${s.operacion}`,
    s.pesoT && `Peso estimado: ${s.pesoT} t`,
    s.tipoCarga && `Tipo de carga: ${s.tipoCarga}`,
    s.industria && `Industria: ${s.industria}`,
    s.zona && `Zona: ${s.zona}`,
    s.ventana && `Ventana: ${s.ventana}`,
    s.equiposCandidatos?.length && `Equipos candidatos: ${s.equiposCandidatos.join(", ")}`,
    "",
    `Nombre: ${s.nombre}`,
    s.empresa && `Empresa: ${s.empresa}`,
    `Correo: ${s.correo}`,
    s.telefono && `Teléfono: ${s.telefono}`,
    s.mensaje && `Mensaje: ${s.mensaje}`,
    "",
    `Origen: ${s.origen?.pagina ?? "-"} · UTM: ${s.origen?.utm ?? "-"} · Referencia: ${s.origen?.referrer ?? "-"}`,
    `Consentimiento: sí · ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (key && destinos.length && remitente) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: remitente,
          to: destinos,
          reply_to: s.correo,
          subject: s.tipo === "planificador" ? `Solicitud de pre-factibilidad · ${s.operacion ?? ""} ${s.pesoT ?? ""} t` : "Nueva consulta desde transmat.cl",
          text: resumen,
        }),
      });
      if (!r.ok) console.error("[solicitud] correo no enviado:", r.status);
    } catch (e) {
      console.error("[solicitud] error de correo:", e instanceof Error ? e.message : e);
    }
  } else {
    // Sin proveedor configurado: se registra la intención sin datos personales.
    console.info("[solicitud]", JSON.stringify({ tipo: s.tipo, operacion: s.operacion, pesoT: s.pesoT, industria: s.industria, zona: s.zona, ventana: s.ventana, origen: s.origen?.pagina }));
  }

  return NextResponse.json({ ok: true });
}
