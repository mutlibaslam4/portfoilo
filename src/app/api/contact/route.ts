import { profile } from "@/data/site";
import { siteUrl } from "@/lib/site";

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
    // no Resend key: deliver through FormSubmit (free, no key; the inbox owner confirms once by email)
    const to = process.env.CONTACT_TO ?? profile.email;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: "POST",
        // FormSubmit rejects requests that don't look like they come from a website
        headers: { "Content-Type": "application/json", Accept: "application/json", Origin: siteUrl, Referer: `${siteUrl}/` },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (res.ok && String(data.success) === "true") return Response.json({ ok: true });
    } catch {}
    return Response.json({ ok: false, error: "Could not send message." }, { status: 502 });
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
