import { NextResponse } from "next/server";
import { contact } from "@/lib/content";

const v = contact.form.validation;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 200, email: 320, message: 5000 } as const;

function bad(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad(v.invalidRequest);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return bad(v.invalidRequest);

  const data = body as Record<string, unknown>;
  const name = str(data.name);
  const email = str(data.email);
  const message = str(data.message);

  if (!name) return bad(v.nameRequired);
  if (name.length > MAX.name) return bad(v.tooLong);
  if (!email) return bad(v.emailRequired);
  if (email.length > MAX.email) return bad(v.tooLong);
  if (!EMAIL_RE.test(email)) return bad(v.emailInvalid);
  if (!message) return bad(v.messageRequired);
  if (message.length < 10) return bad(v.messageTooShort);
  if (message.length > MAX.message) return bad(v.tooLong);

  // TODO: forward to an email provider / CRM.
  console.log("[contact] New enquiry", { name, email, message, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
