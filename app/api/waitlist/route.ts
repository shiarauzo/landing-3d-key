import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ensureWaitlistTable, getSql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string;
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Ese correo no se ve válido" },
      { status: 422 },
    );
  }

  try {
    await ensureWaitlistTable();
    const sql = getSql();

    // ON CONFLICT DO NOTHING → duplicates are a no-op. If no row comes back,
    // the email was already registered.
    const rows = await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    const isNew = rows.length > 0;

    if (isNew && process.env.RESEND_API_KEY) {
      await sendConfirmation(email);
    }

    return NextResponse.json({ ok: true, alreadyIn: !isNew });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json(
      { error: "No pudimos guardarte, inténtalo de nuevo" },
      { status: 500 },
    );
  }
}

async function sendConfirmation(email: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.WAITLIST_FROM ?? "UNIT <onboarding@resend.dev>",
      to: email,
      subject: "Estás dentro — UNIT",
      text: [
        "Estás en la lista de UNIT.",
        "",
        "Te escribiremos primero cuando la unidad 001 esté lista.",
        "",
        "— UNIT",
      ].join("\n"),
    });
  } catch (err) {
    // A failed confirmation email shouldn't fail the signup itself.
    console.error("[waitlist] resend error:", err);
  }
}
