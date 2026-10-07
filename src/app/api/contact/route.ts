import { profile } from "@/data/site";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // honeypot — bots fill every field; pretend success and drop it
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const message = clean(body.message, 4000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // not configured yet: log so the flow can be tested locally
    console.log("[contact] RESEND_API_KEY not set — message not emailed:", { name, email, message });
    return Response.json({ ok: true, dev: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? profile.email],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      html: `<p><b>${esc(name)}</b> (${esc(email)})</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ ok: false, error: "Could not send message." }, { status: 502 });
  return Response.json({ ok: true });
}
